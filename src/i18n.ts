import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      bridge_to_justice: "Bridge to Justice",
      hero_description:
        "Empowering marginalized and rural citizens with AI-driven legal assistance through accessible kiosks, voice-based guidance, and blockchain transparency",

      /* ================= REQUIRED ADDITIONS ================= */
      launch_system: "Launch System",
      core_modules: "Core Modules",

      case_tracking: "Case Tracking",
      track_desc: "Track cases with full transparency and accountability",

      features_nav: "Features",
      feat_desc: "Explore AI-powered system features and workflows",

      chatbot_nav: "Chatbot",
      chat_desc: "Chat with an assistant to get guidance and intake help",

      open_module: "Open Module",

      tutorial_mode: "Tutorial Mode",
      step: "Step",
      skip: "Skip",

      tut_title_1: "Welcome to Legal Edge",
      tut_desc_1:
        "Your bridge to a faster, more transparent justice system. Ready for a quick tour?",
      tut_btn_start: "Start Tour",

      tut_title_2: "Launch the Kiosk",
      tut_desc_2:
        "Use the Launch System button to enter the public kiosk mode.",
      tut_btn_next: "Next",

      tut_title_3: "Core Intelligence",
      tut_desc_3:
        "Track cases, explore AI features, or use our smart intake chatbot.",
      tut_btn_finish: "Got it!",
      /* ================= END ADDITIONS ================= */

      the_problem: "The Problem",
      problem_headline:
        "Millions are denied justice, not by choice, but by circumstance",
      problem_point_1:
        "700+ million rural Indians lack timely access to legal guidance",
      problem_point_2:
        "Limited digital literacy prevents citizens from navigating online portals",

      stats_cases_count: "4.5 Crore",
      stats_cases_label: "Pending cases in Indian courts",
      stats_rural: "Rural litigants",
      stats_duration: "Average case duration",

      exp_kiosk: "Experience the Kiosk Interface",
      kiosk_description:
        "Citizens can speak naturally in their local language. The AI understands context and emotion.",

      example_queries_label: "Example queries:",
      example_query_1: "मुझे मेरे केस की जानकारी चाहिए",
      example_query_2: "अगली तारीख कब है?",
      example_query_3: "मुझे वकील चाहिए",

      or_speak_your_language: "Or Speak Your Language",
      listening: "Listening...",
      language_label: "Language",

      what_would_you_like_to_do: "What would you like to do?",
      what_would_you_like_to_do_sub: "What would you like to do?",

      menu_case_status: "मेरे केस की स्थिति",
      menu_case_status_en: "My Case Status",
      menu_new_case: "नया केस शुरू करें",
      menu_new_case_en: "Start New Case",
      menu_reminders: "रिमाइंडर देखें",
      menu_reminders_en: "View Reminders",
      menu_find_lawyer: "वकील खोजें",
      menu_find_lawyer_en: "Find Lawyer",

      nav: {
        home: "Home",
        kiosk: "Kiosk Demo",
        features: "Features",
        tracking: "Case Tracking",
        impact: "Impact"
      },

      features: {
        title: "Platform Features",
        description:
          "Comprehensive legal aid powered by AI, designed for accessibility, security, and real-world impact",
        voice_title: "Voice-First AI Interface",
        voice_desc: "Natural language processing in 22+ Indian languages",
        multilingual_title: "Multilingual Support",
        multilingual_desc: "Breaking language barriers in legal access",
        offline_title: "Offline-First Architecture",
        offline_desc: "Works without internet connectivity",
        blockchain_title: "Blockchain Transparency",
        blockchain_desc: "Tamper-proof case records and data integrity",
        smart_automation_title: "Smart Automation Features",
        automation: {
          reminders: {
            title: "Automated Reminders",
            desc:
              "Timely SMS and voice call reminders in user's language for hearings, documents, and meetings"
          },
          realtime: {
            title: "Real-Time Case Updates",
            desc:
              "Instant notifications when case status changes or new orders are issued"
          },
          docs: {
            title: "Document Verification",
            desc:
              "AI-powered verification of required documents to reduce adjournments"
          }
        }
      },

      tracking: {
        title: "Case Tracking System",
        description:
          "Transparent, real-time case monitoring with blockchain verification and automated updates"
      },

      kiosk: {
        title: "Kiosk Interface Demo",
        subtitle:
          "Experience how marginalized citizens interact with LegalEdge kiosks through voice and simple touch"
      },

      impact: {
        title: "Social Impact & Vision",
        description:
          "Transforming lives by democratizing legal access and bringing dignity to justice",
        rural_citizens: "Rural Citizens",
        rural_citizens_sub: "Potential beneficiaries across India",
        pending_cases: "Pending Cases",
        pending_cases_sub: "Can be tracked and expedited",
        languages: "Languages",
        languages_sub: "Breaking language barriers",
        accessibility: "Accessibility",
        accessibility_sub: "Legal aid anytime, anywhere"
      }
    }
  },

  hi: {
    translation: {
      bridge_to_justice: "न्याय का सेतु",
      hero_description:
        "सुलभ कियोस्क, आवाज-आधारित मार्गदर्शन और ब्लॉकचेन पारदर्शिता के माध्यम से हाशिए पर रहने वाले और ग्रामीण नागरिकों को एआई-संचालित कानूनी सहायता के साथ सशक्त बनाना",

      /* ================= REQUIRED ADDITIONS ================= */
      launch_system: "सिस्टम शुरू करें",
      core_modules: "मुख्य मॉड्यूल",

      case_tracking: "केस ट्रैकिंग",
      track_desc:
        "पूर्ण पारदर्शिता और जवाबदेही के साथ मामलों को ट्रैक करें",

      features_nav: "विशेषताएँ",
      feat_desc:
        "AI-संचालित सिस्टम सुविधाओं और कार्यप्रवाहों का अन्वेषण करें",

      chatbot_nav: "चैटबॉट",
      chat_desc:
        "मार्गदर्शन और सहायता के लिए सहायक से बातचीत करें",

      open_module: "मॉड्यूल खोलें",

      tutorial_mode: "ट्यूटोरियल मोड",
      step: "चरण",
      skip: "छोड़ें",

      tut_title_1: "Legal Edge में आपका स्वागत है",
      tut_desc_1:
        "तेज़ और पारदर्शी न्याय प्रणाली की ओर आपका सेतु। क्या आप एक छोटा टूर लेना चाहेंगे?",
      tut_btn_start: "टूर शुरू करें",

      tut_title_2: "कियोस्क लॉन्च करें",
      tut_desc_2:
        "सिस्टम लॉन्च बटन का उपयोग करके कियोस्क मोड में प्रवेश करें।",
      tut_btn_next: "आगे",

      tut_title_3: "मुख्य बुद्धिमत्ता",
      tut_desc_3:
        "यहाँ से केस ट्रैक करें, AI फीचर्स देखें या चैटबॉट का उपयोग करें।",
      tut_btn_finish: "समझ गया"
      /* ================= END ADDITIONS ================= */
    }
  },

  ta: {
    translation: {
      bridge_to_justice: "நீதிக்கான பாலம்",
      hero_description:
        "அணுகக்கூடிய கியோஸ்க்குகள், குரல் வழி வழிகாட்டுதல் மற்றும் பிளாக்செயின் வெளிப்படைத்தன்மை மூலம் கிராமப்புற மக்களுக்கு AI சட்ட உதவி",

      /* ================= REQUIRED ADDITIONS ================= */
      launch_system: "அமைப்பை தொடங்கு",
      core_modules: "முக்கிய தொகுதிகள்",

      case_tracking: "வழக்கு கண்காணிப்பு",
      track_desc:
        "முழு வெளிப்படைத்தன்மையுடன் வழக்குகளை கண்காணிக்கவும்",

      features_nav: "அம்சங்கள்",
      feat_desc:
        "AI இயக்கப்படும் அமைப்பு அம்சங்களை ஆராயுங்கள்",

      chatbot_nav: "சாட்போட்",
      chat_desc:
        "வழிகாட்டல் மற்றும் உதவிக்காக உதவியாளருடன் பேசுங்கள்",

      open_module: "தொகுதியைத் திறக்கவும்",

      tutorial_mode: "பயிற்சி முறை",
      step: "அடி",
      skip: "தவிர்",

      tut_title_1: "Legal Edge-க்கு வரவேற்கிறோம்",
      tut_desc_1:
        "வேகமான மற்றும் வெளிப்படையான நீதிக்கான உங்கள் பாலம். ஒரு சுருக்கமான சுற்றுலா வேண்டுமா?",
      tut_btn_start: "தொடங்கு",

      tut_title_2: "கியோஸ்க் தொடங்கு",
      tut_desc_2:
        "அமைப்பை தொடங்கி கியோஸ்க் முறையில் நுழையுங்கள்.",
      tut_btn_next: "அடுத்து",

      tut_title_3: "முக்கிய நுண்ணறிவு",
      tut_desc_3:
        "இங்கே வழக்குகளை கண்காணிக்கவும், AI அம்சங்களை ஆராயவும் அல்லது சாட்போட்டை பயன்படுத்தவும்.",
      tut_btn_finish: "புரிந்தது"
      /* ================= END ADDITIONS ================= */
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    returnNull: false,
    returnEmptyString: false
  });

export default i18n;
