import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      bridge_to_justice: "Bridge to Justice",
      hero_description: "Empowering marginalized and rural citizens with AI-driven legal assistance through accessible kiosks, voice-based guidance, and blockchain transparency",
      the_problem: "The Problem",
      problem_headline: "Millions are denied justice, not by choice, but by circumstance",
      problem_point_1: "700+ million rural Indians lack timely access to legal guidance",
      problem_point_2: "Limited digital literacy prevents citizens from navigating online portals",
      stats_cases_count: "4.5 Crore",
      stats_cases_label: "Pending cases in Indian courts",
      stats_rural: "Rural litigants",
      stats_duration: "Average case duration",
      exp_kiosk: "Experience the Kiosk Interface",
      kiosk_description: "Citizens can speak naturally in their local language. The AI understands context and emotion.",
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
      // Nav
      nav: {
        home: "Home",
        kiosk: "Kiosk Demo",
        features: "Features",
        tracking: "Case Tracking",
        impact: "Impact"
      },
      // Features
      features: {
        title: "Platform Features",
        description: "Comprehensive legal aid powered by AI, designed for accessibility, security, and real-world impact",
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
            desc: "Timely SMS and voice call reminders in user's language for hearings, documents, and meetings"
          },
          realtime: {
            title: "Real-Time Case Updates",
            desc: "Instant notifications when case status changes or new orders are issued"
          },
          docs: {
            title: "Document Verification",
            desc: "AI-powered verification of required documents to reduce adjournments"
          }
        }
      },
      // Tracking
      tracking: {
        title: "Case Tracking System",
        description: "Transparent, real-time case monitoring with blockchain verification and automated updates"
      },
      // Kiosk
      kiosk: {
        title: "Kiosk Interface Demo",
        subtitle: "Experience how marginalized citizens interact with LegalEdge kiosks through voice and simple touch"
      },
      // Impact
      impact: {
        title: "Social Impact & Vision",
        description: "Transforming lives by democratizing legal access and bringing dignity to justice",
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
      hero_description: "सुलभ कियोस्क, आवाज-आधारित मार्गदर्शन और ब्लॉकचेन पारदर्शिता के माध्यम से हाशिए पर रहने वाले और ग्रामीण नागरिकों को एआई-संचालित कानूनी सहायता के साथ सशक्त बनाना",
      the_problem: "समस्या",
      problem_headline: "लाखों लोगों को न्याय से वंचित रखा गया है, पसंद से नहीं, बल्कि परिस्थिति से",
      problem_point_1: "700+ मिलियन ग्रामीण भारतीयों के पास कानूनी मार्गदर्शन तक समय पर पहुंच नहीं है",
      problem_point_2: "सीमित डिजिटल साक्षरता नागरिकों को ऑनलाइन पोर्टल्स का उपयोग करने से रोकती है",
      stats_cases_count: "4.5 करोड़",
      stats_cases_label: "भारतीय न्यायालयों में लंबित मामले",
      stats_rural: "ग्रामीण वादी",
      stats_duration: "औसत केस अवधि",
      exp_kiosk: "कियोस्क इंटरफ़ेस का अनुभव करें",
      kiosk_description: "नागरिक अपनी स्थानीय भाषा में स्वाभाविक रूप से बोल सकते हैं। एआई संदर्भ और भावना को समझता है।",
      example_queries_label: "उदाहरण प्रश्न:",
      example_query_1: "मुझे मेरे केस की जानकारी चाहिए",
      example_query_2: "अगली तारीख कब है?",
      example_query_3: "मुझे वकील चाहिए",
      or_speak_your_language: "या अपनी भाषा बोलें",
      listening: "सुन रहे हैं...",
      language_label: "भाषा",
      what_would_you_like_to_do: "आप क्या करना चाहेंगे?",
      what_would_you_like_to_do_sub: "आप क्या करना चाहेंगे?",
      menu_case_status: "मेरे केस की स्थिति",
      menu_case_status_en: "मेरे केस की स्थिति",
      menu_new_case: "नया केस शुरू करें",
      menu_new_case_en: "नया केस शुरू करें",
      menu_reminders: "रिमाइंडर देखें",
      menu_reminders_en: "रिमाइंडर देखें",
      menu_find_lawyer: "वकील खोजें",
      menu_find_lawyer_en: "वकील खोजें",
      // Nav
      nav: {
        home: "होम",
        kiosk: "कियोस्क डेमो",
        features: "विशेषताएँ",
        tracking: "मामला ट्रैकिंग",
        impact: "प्रभाव"
      },
      // Features
      features: {
        title: "प्लेटफ़ॉर्म की विशेषताएँ",
        description: "सुलभता, सुरक्षा और वास्तविक प्रभाव के लिए AI द्वारा संचालित व्यापक कानूनी सहायता",
        voice_title: "वॉइस-फर्स्ट AI इंटरफ़ेस",
        voice_desc: "22+ भारतीय भाषाओं में प्राकृतिक भाषा प्रसंस्करण",
        multilingual_title: "बहुभाषी समर्थन",
        multilingual_desc: "कानूनी पहुँच में भाषा बाधाओं को तोड़ना",
        offline_title: "ऑफ़लाइन-फ़र्स्ट आर्किटेक्चर",
        offline_desc: "इंटरनेट कनेक्टिविटी के बिना काम करता है",
        blockchain_title: "ब्लॉकचेन पारदर्शिता",
        blockchain_desc: "छेड़छाड़-प्रूफ़ केस रिकॉर्ड और डेटा अखंडता",
        smart_automation_title: "स्मार्ट ऑटोमेशन फीचर",
        automation: {
          reminders: {
            title: "स्वचालित रिमाइंडर",
            desc: "सुनवाई, दस्तावेज़ जमा करने और वकील मीटिंग के लिए उपयोगकर्ता की भाषा में समय पर एसएमएस और वॉइस रिमाइंडर"
          },
          realtime: {
            title: "रीयल-टाइम केस अपडेट",
            desc: "जब केस की स्थिति बदलती है या नए आदेश जारी होते हैं तो तत्काल सूचनाएं"
          },
          docs: {
            title: "दस्तावेज़ सत्यापन",
            desc: "न्यायिक उपस्थिति से पहले आवश्यक दस्तावेज़ों का एआई-आधारित सत्यापन"
          }
        }
      },
      // Tracking
      tracking: {
        title: "मामला ट्रैकिंग सिस्टम",
        description: "ब्लॉकचेन सत्यापन और स्वत: अपडेट के साथ पारदर्शी, वास्तविक समय मामला निगरानी"
      },
      // Kiosk
      kiosk: {
        title: "कियोस्क इंटरफ़ेस डेमो",
        subtitle: "नागरिक अपनी भाषा में बोलकर LegalEdge कियोस्क का अनुभव कर सकते हैं"
      },
      // Impact
      impact: {
        title: "सामाजिक प्रभाव और विज़न",
        description: "कानूनी पहुँच को लोकतंत्रीकरण कर जीवन बदलना और सम्मान के साथ न्याय लाना",
        rural_citizens: "ग्रामीण नागरिक",
        rural_citizens_sub: "भारत भर में संभावित लाभार्थी",
        pending_cases: "लंबित मामले",
        pending_cases_sub: "ट्रैक और तेज़ किया जा सकता है",
        languages: "भाषाएँ",
        languages_sub: "भाषाई बाधाओं को तोड़ना",
        accessibility: "पहुंच",
        accessibility_sub: "कानूनी सहायता कभी भी, कहीं भी"
      }
    }
  },
  ta: {
    translation: {
      bridge_to_justice: "நீதிக்கான பாலம்",
      hero_description: "அணுகக்கூடிய கியோஸ்க்குகள், குரல் வழி வழிகாட்டுதல் மற்றும் பிளாக்செயினின் வெளிப்படைத்தன்மை ஆகியவற்றின் மூலம் ஏழை மற்றும் கிராமப்புற மக்களுக்கு AI உதவியுடன் சட்ட உதவிகளை வழங்குதல்",
      the_problem: "பிரச்சனை",
      problem_headline: "தற்செயலான சூழலால் லட்சக்கணக்கானோருக்கு நீதி மறுக்கப்படுகிறது",
      problem_point_1: "700+ மில்லியன் கிராமப்புற இந்தியர்களுக்கு சரியான நேரத்தில் சட்ட வழிகாட்டுதல் கிடைப்பதில்லை",
      problem_point_2: "குறைந்த டிஜிட்டல் அறிவு காரணமாக மக்களால் ஆன்லைன் இணையதளங்களை பயன்படுத்த முடிவதில்லை",
      stats_cases_count: "4.5 கோடி",
      stats_cases_label: "இந்திய நீதிமன்றங்களில் நிலுவையில் உள்ள வழக்குகள்",
      stats_rural: "கிராமப்புற வழக்குதாரர்கள்",
      stats_duration: "சராசரி வழக்கு காலம்",
      exp_kiosk: "கியோஸ்க் இடைமுகத்தை அனுபவியுங்கள்",
      kiosk_description: "பார்வையற்ற பெண்கள், முதியோர் மற்றும் கிராமப்புற மக்கள் தங்கள் சொந்த மொழியில் இயல்பாக பேசலாம். AI context மற்றும் உணர்வுகளை புரிந்து கொள்கிறது.",
      example_queries_label: "உதாரண கேள்விகள்:",
      example_query_1: "என் வழக்கின் விவரம் வேண்டும்",
      example_query_2: "அடுத்த தேதி எப்போது?",
      example_query_3: "ஒரு வழக்கறிஞர் தேவை",
      or_speak_your_language: "அல்லது உங்கள் மொழியில் பேசுங்கள்",
      listening: "கேட்கப்படுகிறது...",
      language_label: "மொழி",
      what_would_you_like_to_do: "நீங்கள் என்ன செய்ய விரும்புகிறீர்கள்?",
      what_would_you_like_to_do_sub: "நீங்கள் என்ன செய்ய விரும்புகிறீர்கள்?",
      menu_case_status: "என் வழக்கின் நிலை",
      menu_case_status_en: "My Case Status",
      menu_new_case: "புதிய வழக்கு துவக்கவும்",
      menu_new_case_en: "Start New Case",
      menu_reminders: "குறிப்புகள்",
      menu_reminders_en: "View Reminders",
      menu_find_lawyer: "வழக்கறிஞரை கண்டறியவும்",
      menu_find_lawyer_en: "Find Lawyer",
      // Nav
      nav: {
        home: "ஹோம்",
        kiosk: "கியோஸ்க் டெமோ",
        features: "செயற்கை நுண்ணறிவு சிறப்பம்சங்கள்",
        tracking: "வழக்கு டிராக்கிங்",
        impact: "பாதிப்பு"
      },
      // Features
      features: {
        title: "பிளாட்ஃபார் அம்சங்கள்",
        description: "அணுகுமுறை, பாதுகாப்பு மற்றும் உண்மையான தாக்கத்திற்காக AI மூலம் இயக்கப்படும் விரிவான சட்ட உதவி",
        voice_title: "குரல்-முதலில் AI இடைமுகம்",
        voice_desc: "22+ இந்திய மொழிகளில் இயல்புநிலை மொழி செயலாக்கம்",
        multilingual_title: "பலமொழி ஆதரவு",
        multilingual_desc: "சட்ட அணுகலில் மொழி தடைகளை உடைக்கும்",
        offline_title: "ஆஃப்லைன்-முதலாவது கட்டமைப்பு",
        offline_desc: "இணைய இணைப்பைத் தவிர வேலை செய்கிறது",
        blockchain_title: "ப்ளாக்செயின் தெளிவு",
        blockchain_desc: "மாற்றமடையாத வழக்கு பதிவுகள் மற்றும் தரவு ஒருங்கிணைப்பு",
        smart_automation_title: "ஸ்மார்ட் ஆட்டோமேஷன் அம்சங்கள்",
        automation: {
          reminders: {
            title: "தானாக நினைவூட்டல்கள்",
            desc: "நிலைமைகள், ஆவண சமர்ப்பிப்புகள் மற்றும் வழக்கறிஞர் சந்திப்புகளுக்கான தேவையான சந்திப்புகள்"
          },
          realtime: {
            title: "நേരடியாக வழக்கு புதுப்பிப்புகள்",
            desc: "வழக்கு நிலைமைகள் மாறும் போது உடனடி அறிவிப்புகள்"
          },
          docs: {
            title: "ஆவணச் சோதனை",
            desc: "நிகழ்ச்சி முன் தேவையான ஆவணங்களை சரிபார்க்க AI உதவுதல்"
          }
        }
      },
      // Tracking
      tracking: {
        title: "வழக்கு கண்காணிப்பு முறைமை",
        description: "ப்ளாக்செயின் சான்றிதழ் மற்றும் தானாகத் தகவல்களுடன் அச்சற்ற, நேரடி கண்காணிப்பு"
      },
      // Kiosk
      kiosk: {
        title: "கியோஸ்க் இடைமுக டெமோ",
        subtitle: "உங்கள் சொந்த மொழியில் பேசுவதைப் பயன்படுத்தி LegalEdge கியோஸ்க் எப்படி பயன்படுத்தப்படுகின்றது என்பதை அனுபவிக்கவும்"
      },
      // Impact
      impact: {
        title: "சமூக தாக்கமும் நோக்கமும்",
        description: "சட்ட அணுகலை மக்களுக்கு கொண்டு சென்று வாழ்க்கையை மாற்றுதல் மற்றும் நீதிக்கு மரியாதையை கொண்டுவருதல்",
        rural_citizens: "நாட்டுப்புற குடிமக்கள்",
        rural_citizens_sub: "இந்தியா முழுவதும் சாத்தியமான பயனாளர்கள்",
        pending_cases: "நிலுவையில் உள்ள வழக்குகள்",
        pending_cases_sub: "கண்காணிக்க மற்றும் வேகப்படுத்தக் கூடியவை",
        languages: "மொழிகள்",
        languages_sub: "மொழி தடைகளை உடைக்கும்",
        accessibility: "அணுகுமுறை",
        accessibility_sub: "எப்பொழுதும், எங்கும் சட்ட உதவி"
      }
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
  });

export default i18n;