export interface Dictionary {
  nav: {
    product: string;
    howItWorks: string;
    forDoctors: string;
    forIndia: string;
    evidence: string;
    developers: string;
    founder: string;
    roadmap: string;
    bookDemo: string;
  };
  hero: {
    badge: string;
    h1Line1: string;
    h1Line2: string;
    subhead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    founderLine: string;
    trustLine: string;
  };
  problem: {
    eyebrow: string;
    heading: string;
    intro: string;
    bridge: string;
  };
  platform: {
    eyebrow: string;
    heading: string;
    subhead: string;
  };
  demo: {
    heading: string;
    subhead: string;
    frontDeskTab: string;
    doctorTab: string;
    adminTab: string;
    caption: string;
  };
  howItWorks: {
    eyebrow: string;
    heading: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };
  splitAudience: {
    doctorTab: string;
    hospitalTab: string;
    doctorTitle: string;
    doctorDesc: string;
    hospitalTitle: string;
    hospitalDesc: string;
  };
  india: {
    eyebrow: string;
    heading: string;
    body: string;
  };
  security: {
    eyebrow: string;
    heading: string;
    body: string;
    disclaimer: string;
  };
  developers: {
    eyebrow: string;
    heading: string;
    body: string;
  };
  founder: {
    eyebrow: string;
    heading: string;
    role: string;
    bio: string;
    whySolo: string;
    note: string;
  };
  faq: {
    heading: string;
    subhead: string;
  };
  cta: {
    heading: string;
    subhead: string;
    button: string;
    success: string;
  };
}

export const DICTIONARY: Record<"en" | "hi", Dictionary> = {
  en: {
    nav: {
      product: "Product",
      howItWorks: "How it works",
      forDoctors: "For Doctors",
      forIndia: "For India",
      evidence: "Evidence",
      developers: "Developers",
      founder: "Founder",
      roadmap: "Roadmap",
      bookDemo: "Book a Demo",
    },
    hero: {
      badge: "BUILT FOR INDIA · SOLO-FOUNDED · OPEN SOURCE",
      h1Line1: "Your hospital,",
      h1Line2: "running on intelligence.",
      subhead: "One AI platform that manages patients, doctors and medical machines, so your team can focus on care, not chaos.",
      ctaPrimary: "Book a Live Demo",
      ctaSecondary: "Watch the 60-sec Story",
      founderLine: "Founded and built by Agam Singh · Early-stage · Open-source core",
      trustLine: "Built for India · DPDP-aware design · ABDM-ready roadmap",
    },
    problem: {
      eyebrow: "THE PROBLEM",
      heading: "Hospitals don’t have a data problem. They have a connection problem.",
      intro: "Registration lives on paper. Reports live in a lab system. Conversations live on WhatsApp. Machines hold results nobody should have to type in twice. Meanwhile doctors carry the paperwork home. Care is not short of data, it is short of connection.",
      bridge: "HospitalOS connects the people, the machines and the intelligence in one unified system.",
    },
    platform: {
      eyebrow: "THE PLATFORM",
      heading: "Four superpowers in one system",
      subhead: "A unified AI operating system engineered for Indian healthcare realities.",
    },
    demo: {
      heading: "See a hospital day in 60 seconds",
      subhead: "Click through three real workflows. Sample simulated data only.",
      frontDeskTab: "Front Desk & Triage",
      doctorTab: "Doctor AI Co-Pilot",
      adminTab: "Admin Command Center",
      caption: "Interactive preview with simulated real-time data.",
    },
    howItWorks: {
      eyebrow: "HOW IT WORKS",
      heading: "From chaos to clarity in three steps",
      step1Title: "1. Connect",
      step1Desc: "Link your front desk, doctors, and lab diagnostic analyzers. Start with one department.",
      step2Title: "2. Unify",
      step2Desc: "Every patient, report, and device reading lands on a single chronological timeline.",
      step3Title: "3. Automate",
      step3Desc: "AI handles reminders, summaries, and anomaly alerts. People handle compassionate care.",
    },
    splitAudience: {
      doctorTab: "For Doctors",
      hospitalTab: "For Hospitals",
      doctorTitle: "Get your evenings back.",
      doctorDesc: "Spend the consultation looking at the patient, not the screen. A clean history summary before they walk in. Notes drafted while you talk. You stay in charge of every decision.",
      hospitalTitle: "See everything, miss nothing.",
      hospitalDesc: "One screen for queues, beds, and staff load. Fewer missed follow-ups. Results that reach the record without re-typing. (Design targets for pilots, not claimed results).",
    },
    india: {
      eyebrow: "BUILT FOR INDIA",
      heading: "India’s digital health rails are laid. Hospital software has to plug in.",
      body: "ABDM has created more than 93 crore ABHA accounts and linked over 104 crore health records, with consent-based sharing at the core (PIB, July 2026). HospitalOS is designed for this reality: Hindi and English today, more regional languages next, WhatsApp-first communication, UPI payments, and ABDM-ready architecture.",
    },
    security: {
      eyebrow: "SECURITY & COMPLIANCE",
      heading: "Trust is a feature, not a footer",
      body: "India’s Digital Personal Data Protection Rules were notified in November 2025 and phase in over 18 months, with consent-manager provisions after one year and the main notice, consent, security-safeguard and breach-reporting duties from May 2027. HospitalOS is being designed to that standard from day one.",
      disclaimer: "HospitalOS assists clinicians and does not diagnose or replace them. We do not claim any certification we do not hold.",
    },
    developers: {
      eyebrow: "DEVELOPERS & OPEN SOURCE",
      heading: "An open core. A hosted platform. Built for builders.",
      body: "HospitalOS is an early-stage, open-source AI platform for hospital operations in India, building hosted cloud services for patient, doctor and device workflows. Read the code, run it, extend it, or help us connect the next machine.",
    },
    founder: {
      eyebrow: "THE FOUNDER",
      heading: "Built by one founder, in the open.",
      role: "Founder & Solo Builder, HospitalOS",
      bio: "Agam is a full-stack developer from Kanpur, India, building HospitalOS on his own. He works across React, Node.js, Express, MongoDB and GraphQL, builds with Google Cloud and Appwrite, and is deepening his machine-learning work with TensorFlow. With 80+ public repositories on GitHub, he builds in the open and ships fast.",
      whySolo: "One founder means direct accountability, fast decisions and no distance between a hospital’s problem and the code that fixes it.",
      note: "Indian hospitals deserve software built around how they actually work: Hindi-speaking patients, WhatsApp conversations, overloaded doctors and machines that don’t talk to each other. I’m building HospitalOS in the open, one real workflow at a time, and I’m looking for the hospitals and clinicians who want to shape it with me.",
    },
    faq: {
      heading: "Frequently Asked Questions",
      subhead: "Direct, transparent answers about HospitalOS.",
    },
    cta: {
      heading: "Let’s build India’s smartest hospital, together.",
      subhead: "Join the pilot waitlist or book a 20-minute live demonstration.",
      button: "Book My Demo",
      success: "Thank you! Agam will reach out personally within 48 hours.",
    },
  },
  hi: {
    nav: {
      product: "उत्पाद",
      howItWorks: "यह कैसे काम करता है",
      forDoctors: "डॉक्टरों के लिए",
      forIndia: "भारत के लिए",
      evidence: "शोध प्रमाण",
      developers: "डेवलपर्स",
      founder: "संस्थापक",
      roadmap: "रोडमैप",
      bookDemo: "डेमो बुक करें",
    },
    hero: {
      badge: "भारत के लिए निर्मित · एकल-संस्थापक · ओपन सोर्स",
      h1Line1: "आपका अस्पताल,",
      h1Line2: "आर्टिफिशियल इंटेलिजेंस पर संचालित।",
      subhead: "एक ऐसा एआई प्लेटफॉर्म जो मरीजों, डॉक्टरों और मेडिकल मशीनों को जोड़ता है, ताकि आपकी टीम कागजी कार्रवाई नहीं बल्कि इलाज पर ध्यान दे सके।",
      ctaPrimary: "लाइव डेमो बुक करें",
      ctaSecondary: "60-सेकंड की कहानी देखें",
      founderLine: "अगम सिंह द्वारा निर्मित एवं स्थापित · प्रारंभिक चरण · ओपन-सोर्स कोर",
      trustLine: "भारत के लिए निर्मित · DPDP कानून अनुरूप · ABDM-सक्षम रोडमैप",
    },
    problem: {
      eyebrow: "समस्या",
      heading: "अस्पतालों में डेटा की कमी नहीं है। उनके पास कनेक्शन की कमी है।",
      intro: "पंजीकरण कागजों पर होता है। रिपोर्ट लैब सिस्टम में बंद हैं। बातचीत व्हाट्सएप पर होती है। मशीनों के परिणामों को दोबारा टाइप किया जाता है। डॉक्टर रात को भी फाइलें भरते हैं। समस्या डेटा की नहीं, कनेक्शन की है।",
      bridge: "HospitalOS लोगों, मशीनों और बुद्धिमत्ता को एक एकीकृत सिस्टम में जोड़ता है।",
    },
    platform: {
      eyebrow: "प्लेटफ़ॉर्म",
      heading: "एक सिस्टम में चार महाशक्तियाँ",
      subhead: "भारतीय स्वास्थ्य सेवा की वास्तविकताओं के लिए बनाया गया एक एकीकृत एआई ऑपरेटिंग सिस्टम।",
    },
    demo: {
      heading: "60 सेकंड में देखें अस्पताल का एक दिन",
      subhead: "तीन वास्तविक कार्यप्रवाहों पर क्लिक करें। केवल नमूना सिमुलेशन डेटा।",
      frontDeskTab: "फ्रंट डेस्क और पंजीकरण",
      doctorTab: "डॉक्टर एआई को-पायलट",
      adminTab: "एडमिन कमांड सेंटर",
      caption: "सिम्युलेटेड वास्तविक समय डेटा के साथ इंटरैक्टिव पूर्वावलोकन।",
    },
    howItWorks: {
      eyebrow: "कार्यप्रणाली",
      heading: "अव्यवस्था से स्पष्टता तक तीन कदम",
      step1Title: "1. कनेक्ट करें",
      step1Desc: "अपने फ्रंट डेस्क, डॉक्टरों और लैब मशीनों को जोड़ें। एक विभाग से शुरुआत करें।",
      step2Title: "2. एकीकृत करें",
      step2Desc: "प्रत्येक मरीज, रिपोर्ट और रीडिंग एक ही डिजिटल टाइमलाइन पर आती है।",
      step3Title: "3. ऑटोमेट करें",
      step3Desc: "एआई रिमाइंडर, सारांश और अलर्ट संभालता है। इंसान संवेदनशील देखभाल करते हैं।",
    },
    splitAudience: {
      doctorTab: "डॉक्टरों के लिए",
      hospitalTab: "अस्पतालों के लिए",
      doctorTitle: "अपनी शामें वापस पाएं।",
      doctorDesc: "परामर्श के दौरान स्क्रीन के बजाय मरीज को देखें। आने से पहले संक्षिप्त इतिहास, बात करते समय स्वतः तैयार नोट्स। हर निर्णय पर आपका पूरा नियंत्रण।",
      hospitalTitle: "सब कुछ देखें, कुछ भी न चूकें।",
      hospitalDesc: "कतारों, बिस्तरों और कर्मचारियों के भार के लिए एक स्क्रीन। समय पर फॉलो-अप। बिना दोबारा टाइप किए मशीन परिणाम। (पायलट के लिए डिज़ाइन लक्ष्य)।",
    },
    india: {
      eyebrow: "भारत के लिए निर्मित",
      heading: "भारत के डिजिटल स्वास्थ्य बुनियादी ढांचे से सीधा जुड़ाव।",
      body: "ABDM ने 93 करोड़ से अधिक ABHA खाते बनाए हैं और 104 करोड़ से अधिक स्वास्थ्य रिकॉर्ड जोड़े हैं। HospitalOS इस वास्तविकता के लिए तैयार है: हिंदी और अंग्रेजी, व्हाट्सएप-फर्स्ट, यूपीआई भुगतान और ABDM-सक्षम आर्किटेक्चर।",
    },
    security: {
      eyebrow: "सुरक्षा एवं गोपनीयता",
      heading: "विश्वास एक सुरक्षा सुविधा है, फुटर नहीं",
      body: "भारत के डिजिटल व्यक्तिगत डेटा संरक्षण (DPDP) नियमों के अनुरूप सुरक्षा मानक। मरीज की सहमति, भूमिका-आधारित पहुंच और एन्क्रिप्शन के साथ पहले दिन से तैयार।",
      disclaimer: "HospitalOS चिकित्सकों की सहायता करता है, उनका स्थान नहीं लेता। हम केवल वैध मानकों का पालन करते हैं।",
    },
    developers: {
      eyebrow: "डेवलपर्स और ओपन सोर्स",
      heading: "एक ओपन कोर। एक होस्टेड प्लेटफॉर्म। रचनाकारों के लिए।",
      body: "HospitalOS भारत में अस्पताल संचालन के लिए एक प्रारंभिक चरण का ओपन-सोर्स एआई प्लेटफॉर्म है। कोड पढ़ें, इसे चलाएं, या अगली मशीन को कनेक्ट करने में मदद करें।",
    },
    founder: {
      eyebrow: "संस्थापक",
      heading: "एक संस्थापक द्वारा खुले तौर पर निर्मित।",
      role: "संस्थापक एवं एकल निर्माता, HospitalOS",
      bio: "अगम कानपुर, भारत से एक फुल-स्टैक डेवलपर हैं, जो स्वतंत्र रूप से HospitalOS का निर्माण कर रहे हैं। वे React, Node.js, Express, MongoDB, GraphQL और TensorFlow पर काम करते हैं। गिटहब पर 80+ पब्लिक रिपॉजिटरी के साथ, वे पारदर्शी तरीके से तेजी से काम करते हैं।",
      whySolo: "एक संस्थापक का अर्थ है सीधी जवाबदेही, त्वरित निर्णय और अस्पताल की समस्या और समाधान के बीच शून्य दूरी।",
      note: "भारतीय अस्पताल ऐसे सॉफ्टवेयर के हकदार हैं जो उनकी वास्तविक कार्यशैली पर आधारित हो: हिंदी भाषी मरीज, व्हाट्सएप बातचीत और व्यस्त डॉक्टर।",
    },
    faq: {
      heading: "अक्सर पूछे जाने वाले प्रश्न",
      subhead: "HospitalOS के बारे में पारदर्शी और स्पष्ट उत्तर।",
    },
    cta: {
      heading: "आइए मिलकर बनाएं भारत का सबसे समझदार अस्पताल।",
      subhead: "पायलट प्रतीक्षा सूची में शामिल हों या 20 मिनट का डेमो बुक करें।",
      button: "मेरा डेमो बुक करें",
      success: "धन्यवाद! अगम 48 घंटों के भीतर व्यक्तिगत रूप से संपर्क करेंगे।",
    },
  },
};
