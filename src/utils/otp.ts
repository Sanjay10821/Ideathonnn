import { createClient } from '@supabase/supabase-js';

// ── Connect to Supabase ──────────────────────────────────────────────────────
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// ── Generate a random 4-digit OTP ────────────────────────────────────────────
function generateOTP(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// ── Send SMS via Twilio (through Supabase Edge Function) ──────────────────────
async function sendSMS(phone: string, otp: string): Promise<boolean> {
  try {
    const response = await fetch(
      `/functions/v1/dynamic-worker`, 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ phone, otp }),
      }
    );

    const data = await response.json();
    console.log("Edge function response:", data);
    
    // Accept any response that has an account_sid — means Twilio accepted it
    return data.data?.account_sid !== undefined;

  } catch (error) {
    console.error("SMS sending failed:", error);
    return false;
  }
}

// ── REQUEST OTP ───────────────────────────────────────────────────────────────
export async function requestOTP(phone: string): Promise<{
  success: boolean;
  error?: string;
}> {
  if (!/^\d{10}$/.test(phone)) {
    return { success: false, error: 'Please enter a valid 10-digit phone number.' };
  }

  const otp = generateOTP();
  const expires_at = new Date(Date.now() + 5 * 60 * 1000).toISOString();

  await supabase.from('otp_verifications').delete().eq('phone', phone);

  const { error: dbError } = await supabase
    .from('otp_verifications')
    .insert({ phone, otp, expires_at, verified: false });

  if (dbError) {
    console.error('Supabase insert error:', dbError);
    return { success: false, error: 'Could not save OTP. Please try again.' };
  }

  const smsSent = await sendSMS(phone, otp);

  if (!smsSent) {
    return { success: false, error: 'Could not send SMS. Please check your number and try again.' };
  }

  return { success: true };
}

// ── VERIFY OTP ────────────────────────────────────────────────────────────────
export async function verifyOTP(phone: string, enteredOTP: string): Promise<{
  success: boolean;
  error?: string;
}> {
  if (enteredOTP.length !== 4) {
    return { success: false, error: 'Please enter the complete 4-digit OTP.' };
  }

  const { data, error } = await supabase
    .from('otp_verifications')
    .select('*')
    .eq('phone', phone)
    .eq('otp', enteredOTP)
    .eq('verified', false)
    .single();

  if (error || !data) {
    return { success: false, error: 'Wrong OTP. Please check and try again.' };
  }

  if (new Date(data.expires_at) < new Date()) {
    return { success: false, error: 'OTP has expired. Please request a new one.' };
  }

  await supabase
    .from('otp_verifications')
    .update({ verified: true })
    .eq('id', data.id);

  return { success: true };
}