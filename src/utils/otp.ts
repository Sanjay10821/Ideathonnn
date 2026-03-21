import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function generateOTP(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

async function sendSMS(phone: string, otp: string): Promise<boolean> {
  try {
    const response = await fetch('/functions/v1/dynamic-worker', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ phone, otp }),
    });
    const data = await response.json();
    console.log('Edge function response:', data);
    return data.data?.account_sid !== undefined;
  } catch (error) {
    console.error('SMS sending failed:', error);
    return false;
  }
}

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

// ── CHECK IF PHONE IS ALREADY REGISTERED ─────────────────────────────────────
// Called before sending OTP so we catch duplicates at the earliest possible
// point — before the user wastes time entering and verifying an OTP.
// Returns the existing user's name so the popup can greet them by name.
export async function checkIfAlreadyRegistered(phone: string): Promise<{
  registered: boolean;
  name?: string;
  hasCard?: boolean; // true if they already have a NFC UID linked
}> {
  const { data, error } = await supabase
    .from('users')
    .select('name, nfc_uid')
    .eq('phone', phone)
    .maybeSingle();

  if (error || !data) return { registered: false };

  return {
    registered: true,
    name: data.name,
    hasCard: !!data.nfc_uid,
  };
}

// ── SAVE USER PROFILE ─────────────────────────────────────────────────────────
// Only called after OTP is verified. Returns alreadyRegistered: true if a race
// condition somehow lets a duplicate through (e.g. double submit). The UI
// treats this the same as the pre-OTP check — shows the already-registered popup.
export async function saveUserProfile(profile: {
  name: string;
  dob: string;
  gender: string;
  phone: string;
  aadhaar: string;
}): Promise<{
  success: boolean;
  userId?: string;
  alreadyRegistered?: boolean;
  existingName?: string;
  error?: string;
}> {
  // Guard against race conditions between the SEND OTP check and now
  const { data: existing } = await supabase
    .from('users')
    .select('id, name')
    .eq('phone', profile.phone)
    .maybeSingle();

  if (existing) {
    return {
      success: false,
      alreadyRegistered: true,
      existingName: existing.name,
    };
  }

  const { data, error } = await supabase
    .from('users')
    .insert({
      name: profile.name,
      dob: profile.dob,
      gender: profile.gender,
      phone: profile.phone,
      aadhaar_last4: profile.aadhaar.slice(-4),
      nfc_uid: null,
    })
    .select('id')
    .single();

  if (error || !data) {
    console.error('saveUserProfile error:', error);
    return { success: false, error: 'Could not save profile. Please try again.' };
  }

  return { success: true, userId: data.id };
}

export async function updateNfcUid(userId: string, nfcUid: string): Promise<{
  success: boolean;
  error?: string;
}> {
  const { error } = await supabase
    .from('users')
    .update({ nfc_uid: nfcUid })
    .eq('id', userId);

  if (error) {
    console.error('updateNfcUid error:', error);
    return { success: false, error: 'Could not link card UID. Please try again.' };
  }

  return { success: true };
}

export function generatePlaceholderNfcUid(): string {
  return Array.from({ length: 4 }, () =>
    Math.floor(Math.random() * 256).toString(16).padStart(2, '0').toUpperCase()
  ).join(':');
}

export async function lookupUserByNfcUid(nfcUid: string): Promise<{
  success: boolean;
  user?: { id: string; name: string; phone: string; gender: string };
  error?: string;
}> {
  const { data, error } = await supabase
    .from('users')
    .select('id, name, phone, gender')
    .eq('nfc_uid', nfcUid)
    .maybeSingle();

  if (error) {
    console.error('lookupUserByNfcUid error:', error);
    return { success: false, error: 'Database error during card lookup.' };
  }

  if (!data) {
    return { success: false, error: 'Card not recognised. Please register as a new user.' };
  }

  return { success: true, user: data };
}
