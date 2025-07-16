import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Heart, Phone, AlertTriangle, Users, FileText, ArrowRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import CyberbullyingSlideshow from "@/components/CyberbullyingSlideshow";
import CSASlideshow from "@/components/CSASlideshow";

const MasoomPage = () => {
  const [activeSection, setActiveSection] = useState<'intro' | 'cyberbullying' | 'csa'>('intro');
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [showCyberbullyingSlideshow, setShowCyberbullyingSlideshow] = useState(false);
  const [showCSASlideshow, setShowCSASlideshow] = useState(false);

  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const openCyberbullyingSlideshow = () => {
    setShowCyberbullyingSlideshow(true);
  };

  const closeCyberbullyingSlideshow = () => {
    setShowCyberbullyingSlideshow(false);
  };

  const openCSASlideshow = () => {
    setShowCSASlideshow(true);
  };

  const closeCSASlideshow = () => {
    setShowCSASlideshow(false);
  };

  const t = {
    en: {
      saveChildhood: "SAVE CHILDHOOD",
      fightAgainst: "FIGHT AGAINST CHILD SEXUAL ABUSE & CYBERBULLYING",
      language: "Language",
      aboutOrgs: "About Our Organizations",
      youngIndians: "Young Indians is the youth wing of CII. We are young leaders working to make India better by helping our communities and being responsible citizens.",
      masoom: "MASOOM works to make schools safer for children. We teach about safety, prevent abuse, and help children who face problems like bullying or harassment.",
      cii: "The Confederation of Indian Industry works with businesses and government to make India a better place for everyone to live and work.",
      mission: "Our Mission",
      missionText: "Together, we work to keep children safe by teaching them about dangers, providing help when needed, and making sure every child can grow up in a safe environment where they can learn and be happy.",
      digitalSafety: "Digital Safety & Cyberbullying",
      digitalSafetyDesc: "Learn how to stay safe online",
      digitalSafetyContent: "Learn about online safety, cyberbullying, and how to protect yourself from digital threats. Understand what to do if someone is mean to you online.",
      csaPrevention: "Child Sexual Abuse Prevention",
      csaPreventionDesc: "Important safety information for children",
      csaPreventionContent: "Learn about body safety, how to recognize inappropriate behavior, and what to do if someone makes you uncomfortable. Know your rights and how to get help.",
      didYouKnow: "Did you know?",
      didYouKnowText: "Many children don't report when bad things happen to them. We want to create safe places where children feel comfortable asking for help. Every adult should help protect children.",
      backToMain: "← Back to Main Page",
      
      // Cyberbullying section
      cyberbullyingTitle: "Digital Safety & Cyberbullying Awareness",
      cyberbullyingSubtitle: "Stay safe online and protect yourself from digital threats",
      whatIsCyberbullying: "What is Cyberbullying?",
      cyberbullyingDefinition: "Cyberbullying is when someone uses phones, computers, or social media to hurt, embarrass, or scare another person. Remember: Bullying is usually done by someone you know!",
      cyberbullyingTypes: [
        "Sending mean messages or comments",
        "Sharing embarrassing photos or videos without permission",
        "Spreading rumors or lies online",
        "Excluding someone from online groups on purpose"
      ],
      onlineThreats: "Online Threats You Should Know",
      cyberGrooming: "Cyber Grooming",
      cyberGroomingDesc: "When strangers build fake trust to harm you",
      groomingWarnings: [
        "Constant chatting and attention",
        "Asking for personal information",
        "Wanting to keep conversations secret",
        "Asking for photos or videos"
      ],
      phishingTricks: "Phishing Tricks",
      phishingDesc: "Fake messages to steal your information",
      phishingTypes: [
        "Phishing: Fake emails/websites",
        "Smishing: Fake text messages", 
        "Vishing: Fake phone calls",
        "Catfishing: Fake online profiles"
      ],
      safetyRules: "Simple Safety Rules",
      doList: "✅ DO",
      dontList: "❌ DON'T",
      doItems: [
        "Only chat with real-life friends",
        "Tell a trusted adult if something feels wrong",
        "Keep passwords private",
        "Block and report mean people",
        "Think before you post anything"
      ],
      dontItems: [
        "Share personal information (full name, address, school)",
        "Meet strangers from the internet",
        "Open emails from unknown people",
        "Respond to cyberbullies (just block them)",
        "Download unknown files or apps"
      ],
      rememberThis: "Remember This!",
      internetWarning: "🌐 The Internet is like a public place - not everything you see is real!",
      strangerWarning: "Just like you wouldn't talk to strangers in real life, don't trust strangers online.",
      getHelp: "Get Help Now",
      
      // CSA section
      csaTitle: "Child Sexual Abuse (CSA) Awareness",
      csaSubtitle: "Understanding, preventing, and staying safe",
      whatIsCSA: "What is Child Sexual Abuse (CSA)?",
      csaDefinition: "CSA is when an adult or older person does sexual things with a child. This is wrong and against the law. Important: It usually happens with people you know, not strangers!",
      keyFacts: "Key Facts",
      keyFactsList: [
        "Both girls AND boys can be victims",
        "85% happens with people you know",
        "Most vulnerable ages: 3-8 and 11-15 years",
        "Many children don't report it (53% keep it secret)"
      ],
      typesOfAbuse: "Types of Abuse",
      abuseTypes: [
        "Contact: Inappropriate touching",
        "Non-contact: Showing inappropriate pictures",
        "Online: Sending inappropriate messages",
        "Grooming: Building fake trust to harm"
      ],
      warningSigns: "Warning Signs - Tell a Trusted Adult If You Notice These",
      howYouFeel: "How You Might Feel",
      feelingsList: [
        "Sudden fears or anxiety",
        "Not wanting to be touched",
        "Feeling sad or angry often",
        "Problems sleeping",
        "Not wanting to go to school"
      ],
      physicalSigns: "Physical Signs",
      physicalSignsList: [
        "Pain in private areas",
        "Frequent stomach aches",
        "Eating too much or too little",
        "Problems walking or sitting",
        "Getting sick often"
      ],
      behaviorChanges: "Behavior Changes",
      behaviorChangesList: [
        "Becoming very quiet or aggressive",
        "Not wanting to be around certain people",
        "Having 'secrets' they can't tell",
        "Acting much older or younger",
        "Hurting themselves"
      ],
      bodySafetyRules: "Body Safety Rules - What Every Child Should Know",
      yourBodyBelongs: "Your Body Belongs to YOU!",
      bodyRights: [
        "You have the right to say 'NO' to unwanted touch",
        "Trust your feelings - if something feels wrong, it probably is",
        "No one should touch your private parts",
        "No one should ask you to touch their private parts",
        "You should never keep 'body secrets'"
      ],
      ifUncomfortable: "If Someone Makes You Uncomfortable",
      uncomfortableActions: [
        "Say 'NO' loudly and clearly",
        "Get away from that person",
        "Tell a trusted adult immediately",
        "Keep telling until someone believes you",
        "Remember: It's NEVER your fault!"
      ],
      pocsAct: "POCSO Act - Your Legal Protection",
      pocsaDescription: "The POCSO Act 2012 protects ALL children under 18 years from sexual abuse.",
      whatItCovers: "What it Covers",
      pocsoCoverage: [
        "Sexual assault (3-5 years punishment)",
        "Severe sexual assault (7 years to life)",
        "Sexual harassment (3 years)",
        "Child pornography (5-7 years)"
      ],
      yourRights: "Your Rights",
      rightsList: [
        "Police must help you",
        "Your identity stays private",
        "You can give statements at home",
        "The court will believe you"
      ],
      emergencyHelplines: "Emergency Helplines - Save These Numbers!",
      ourPromise: "Our Promise to You",
      pledgeTitle: "WE PLEDGE TO KEEP CHILDREN SAFE BY:",
      pledgeItems: [
        "Teaching you about personal safety",
        "Listening to you when you need help",
        "Making sure your school and neighborhood are safe",
        "Supporting any child who needs help"
      ],
      
      // Contact numbers
      childlineIndia: "Childline India",
      childlineDesc: "24/7 helpline for children",
      emergencyServices: "Emergency Services",
      emergencyDesc: "Police, Fire, Medical Emergency",
      cyberCrimeHelpline: "Cyber Crime Helpline",
      cyberCrimeDesc: "Report online crimes and bullying",
      womenHelpline: "Women Helpline",
      womenHelplineDesc: "Support for harassment and abuse",
      policeHelpline: "Police Helpline",
      policeHelplineDesc: "Report crimes immediately",
      reportOnlineCrimes: "Report Online Crimes:",
      visitCyberCrime: "Visit",
      pocsPortal: "POCSO Portal:",
      visitPocso: "Visit",
      toReportAbuse: "to report abuse",
      
      // Additional phrases
      call: "Call",
      remember: "Remember:",
      important: "Important:",
      rememberWarning: "If someone hurts you or makes you uncomfortable, it's NOT your fault! Tell a trusted adult like your parents, teacher, or school counselor. Keep telling until someone helps you."
    },
    hi: {
      saveChildhood: "बचपन बचाएं",
      fightAgainst: "बाल यौन शोषण और साइबर बुलिंग के खिलाफ लड़ाई",
      language: "भाषा",
      aboutOrgs: "हमारे संगठनों के बारे में",
      youngIndians: "यंग इंडियंस CII का युवा विंग है। हम युवा नेता हैं जो अपने समुदायों की मदद करके और जिम्मेदार नागरिक बनकर भारत को बेहतर बनाने के लिए काम कर रहे हैं।",
      masoom: "मासूम स्कूलों को बच्चों के लिए सुरक्षित बनाने का काम करता है। हम सुरक्षा के बारे में सिखाते हैं, दुर्व्यवहार को रोकते हैं, और उन बच्चों की मदद करते हैं जो बुलिंग या उत्पीड़न जैसी समस्याओं का सामना करते हैं।",
      cii: "भारतीय उद्योग परिसंघ व्यवसायों और सरकार के साथ मिलकर भारत को सभी के लिए रहने और काम करने के लिए एक बेहतर जगह बनाने का काम करता है।",
      mission: "हमारा मिशन",
      missionText: "मिलकर, हम बच्चों को खतरों के बारे में सिखाकर, जरूरत पड़ने पर मदद प्रदान करके, और यह सुनिश्चित करके कि हर बच्चा एक सुरक्षित वातावरण में बड़ा हो सके जहां वे सीख और खुश रह सकें, बच्चों को सुरक्षित रखने का काम करते हैं।",
      digitalSafety: "डिजिटल सुरक्षा और साइबर बुलिंग",
      digitalSafetyDesc: "ऑनलाइन सुरक्षित रहना सीखें",
      digitalSafetyContent: "ऑनलाइन सुरक्षा, साइबर बुलिंग के बारे में जानें और डिजिटल खतरों से खुद को कैसे बचाएं। समझें कि अगर कोई आपके साथ ऑनलाइन बुरा व्यवहार करे तो क्या करना चाहिए।",
      csaPrevention: "बाल यौन शोषण की रोकथाम",
      csaPreventionDesc: "बच्चों के लिए महत्वपूर्ण सुरक्षा जानकारी",
      csaPreventionContent: "शरीर की सुरक्षा के बारे में जानें, अनुचित व्यवहार को कैसे पहचानें, और अगर कोई आपको असहज महसूस कराए तो क्या करें। अपने अधिकारों को जानें और मदद कैसे प्राप्त करें।",
      didYouKnow: "क्या आपको पता है?",
      didYouKnowText: "कई बच्चे रिपोर्ट नहीं करते जब उनके साथ बुरी चीजें होती हैं। हम ऐसी सुरक्षित जगह बनाना चाहते हैं जहां बच्चे मदद मांगने में सहज महसूस करें। हर वयस्क को बच्चों की सुरक्षा में मदद करनी चाहिए।",
      backToMain: "← मुख्य पृष्ठ पर वापस",
      
      // Cyberbullying section in Hindi
      cyberbullyingTitle: "डिजिटल सुरक्षा और साइबर बुलिंग जागरूकता",
      cyberbullyingSubtitle: "ऑनलाइन सुरक्षित रहें और डिजिटल खतरों से खुद को बचाएं",
      whatIsCyberbullying: "साइबर बुलिंग क्या है?",
      cyberbullyingDefinition: "साइबर बुलिंग तब होती है जब कोई व्यक्ति फोन, कंप्यूटर या सोशल मीडिया का उपयोग करके किसी दूसरे व्यक्ति को चोट पहुंचाने, शर्मिंदा करने या डराने के लिए करता है। याद रखें: बुलिंग आमतौर पर किसी ऐसे व्यक्ति द्वारा की जाती है जिसे आप जानते हैं!",
      cyberbullyingTypes: [
        "अपमानजनक संदेश या टिप्पणियां भेजना",
        "बिना अनुमति के शर्मनाक फोटो या वीडियो साझा करना",
        "ऑनलाइन अफवाहें या झूठ फैलाना",
        "जानबूझकर किसी को ऑनलाइन समूह से बाहर करना"
      ],
      onlineThreats: "ऑनलाइन खतरे जिन्हें आपको जानना चाहिए",
      cyberGrooming: "साइबर ग्रूमिंग",
      cyberGroomingDesc: "जब अजनबी आपको नुकसान पहुंचाने के लिए नकली भरोसा बनाते हैं",
      groomingWarnings: [
        "लगातार चैटिंग और ध्यान देना",
        "व्यक्तिगत जानकारी मांगना",
        "बातचीत को गुप्त रखना चाहना",
        "फोटो या वीडियो मांगना"
      ],
      phishingTricks: "फिशिंग ट्रिक्स",
      phishingDesc: "आपकी जानकारी चुराने के लिए नकली संदेश",
      phishingTypes: [
        "फिशिंग: नकली ईमेल/वेबसाइट",
        "स्मिशिंग: नकली टेक्स्ट संदेश",
        "विशिंग: नकली फोन कॉल",
        "कैटफिशिंग: नकली ऑनलाइन प्रोफाइल"
      ],
      safetyRules: "सरल सुरक्षा नियम",
      doList: "✅ करें",
      dontList: "❌ न करें",
      doItems: [
        "केवल वास्तविक जीवन के दोस्तों के साथ चैट करें",
        "अगर कुछ गलत लगे तो किसी विश्वसनीय वयस्क को बताएं",
        "पासवर्ड गुप्त रखें",
        "बुरे लोगों को ब्लॉक करें और रिपोर्ट करें",
        "कुछ भी पोस्ट करने से पहले सोचें"
      ],
      dontItems: [
        "व्यक्तिगत जानकारी साझा न करें (पूरा नाम, पता, स्कूल)",
        "इंटरनेट से अजनबियों से न मिलें",
        "अज्ञात लोगों से ईमेल न खोलें",
        "साइबर बुलियों का जवाब न दें (बस उन्हें ब्लॉक करें)",
        "अज्ञात फाइलें या ऐप्स डाउनलोड न करें"
      ],
      rememberThis: "यह याद रखें!",
      internetWarning: "🌐 इंटरनेट एक सार्वजनिक स्थान की तरह है - आप जो कुछ भी देखते हैं वह सब सच नहीं है!",
      strangerWarning: "जैसे आप वास्तविक जीवन में अजनबियों से बात नहीं करते, वैसे ही ऑनलाइन अजनबियों पर भरोसा न करें।",
      getHelp: "अभी मदद लें",
      
      // CSA section in Hindi
      csaTitle: "बाल यौन शोषण (CSA) जागरूकता",
      csaSubtitle: "समझना, रोकना और सुरक्षित रहना",
      whatIsCSA: "बाल यौन शोषण (CSA) क्या है?",
      csaDefinition: "CSA तब होता है जब कोई वयस्क या बड़ा व्यक्ति बच्चे के साथ यौन गतिविधियां करता है। यह गलत है और कानून के खिलाफ है। महत्वपूर्ण: यह आमतौर पर उन लोगों के साथ होता है जिन्हें आप जानते हैं, अजनबियों के साथ नहीं!",
      keyFacts: "मुख्य तथ्य",
      keyFactsList: [
        "लड़के और लड़कियां दोनों पीड़ित हो सकते हैं",
        "85% मामले उन लोगों के साथ होते हैं जिन्हें आप जानते हैं",
        "सबसे संवेदनशील उम्र: 3-8 और 11-15 साल",
        "कई बच्चे इसकी रिपोर्ट नहीं करते (53% इसे गुप्त रखते हैं)"
      ],
      typesOfAbuse: "शोषण के प्रकार",
      abuseTypes: [
        "संपर्क: अनुचित स्पर्श",
        "गैर-संपर्क: अनुचित तस्वीरें दिखाना",
        "ऑनलाइन: अनुचित संदेश भेजना",
        "ग्रूमिंग: नुकसान पहुंचाने के लिए नकली भरोसा बनाना"
      ],
      warningSigns: "चेतावनी के संकेत - अगर आप इन्हें देखें तो किसी विश्वसनीय वयस्क को बताएं",
      howYouFeel: "आप कैसा महसूस कर सकते हैं",
      feelingsList: [
        "अचानक डर या चिंता",
        "छुआ जाना पसंद न करना",
        "अक्सर उदास या गुस्साईल महसूस करना",
        "सोने में समस्या",
        "स्कूल जाना न चाहना"
      ],
      physicalSigns: "शारीरिक संकेत",
      physicalSignsList: [
        "निजी हिस्सों में दर्द",
        "बार-बार पेट दर्द",
        "बहुत ज्यादा या बहुत कम खाना",
        "चलने या बैठने में समस्या",
        "अक्सर बीमार पड़ना"
      ],
      behaviorChanges: "व्यवहार में बदलाव",
      behaviorChangesList: [
        "बहुत शांत या आक्रामक हो जाना",
        "कुछ लोगों के आसपास नहीं रहना चाहना",
        "ऐसे 'राज' होना जो न बता सकें",
        "बहुत बड़े या छोटे की तरह व्यवहार करना",
        "खुद को नुकसान पहुंचाना"
      ],
      bodySafetyRules: "शरीर सुरक्षा नियम - हर बच्चे को क्या जानना चाहिए",
      yourBodyBelongs: "आपका शरीर आपका है!",
      bodyRights: [
        "आपको अनचाहे स्पर्श के लिए 'नहीं' कहने का अधिकार है",
        "अपनी भावनाओं पर भरोसा करें - अगर कुछ गलत लगता है, तो शायद यह गलत है",
        "किसी को भी आपके निजी हिस्सों को नहीं छूना चाहिए",
        "किसी को भी आपसे उनके निजी हिस्सों को छूने के लिए नहीं कहना चाहिए",
        "आपको कभी भी 'शरीर के राज' नहीं रखने चाहिए"
      ],
      ifUncomfortable: "अगर कोई आपको असहज महसूस कराता है",
      uncomfortableActions: [
        "जोर से और स्पष्ट रूप से 'नहीं' कहें",
        "उस व्यक्ति से दूर हो जाएं",
        "तुरंत किसी विश्वसनीय वयस्क को बताएं",
        "तब तक बताते रहें जब तक कोई आप पर विश्वास न करे",
        "याद रखें: यह कभी भी आपकी गलती नहीं है!"
      ],
      pocsAct: "POCSO अधिनियम - आपकी कानूनी सुरक्षा",
      pocsaDescription: "POCSO अधिनियम 2012 यौन शोषण से 18 साल से कम उम्र के सभी बच्चों की सुरक्षा करता है।",
      whatItCovers: "यह क्या कवर करता है",
      pocsoCoverage: [
        "यौन हमला (3-5 साल की सजा)",
        "गंभीर यौन हमला (7 साल से आजीवन)",
        "यौन उत्पीड़न (3 साल)",
        "बाल पोर्नोग्राफी (5-7 साल)"
      ],
      yourRights: "आपके अधिकार",
      rightsList: [
        "पुलिस को आपकी मदद करनी चाहिए",
        "आपकी पहचान गुप्त रहती है",
        "आप घर पर बयान दे सकते हैं",
        "अदालत आप पर विश्वास करेगी"
      ],
      emergencyHelplines: "आपातकालीन हेल्पलाइन - इन नंबरों को सेव करें!",
      ourPromise: "आपसे हमारा वादा",
      pledgeTitle: "हम बच्चों को सुरक्षित रखने का संकल्प लेते हैं:",
      pledgeItems: [
        "आपको व्यक्तिगत सुरक्षा के बारे में सिखाकर",
        "जब आपको मदद की जरूरत हो तो आपकी बात सुनकर",
        "यह सुनिश्चित करके कि आपका स्कूल और मोहल्ला सुरक्षित है",
        "किसी भी बच्चे की मदद करके जिसे सहायता की जरूरत है"
      ],
      
      // Contact numbers in Hindi
      childlineIndia: "चाइल्डलाइन इंडिया",
      childlineDesc: "बच्चों के लिए 24/7 हेल्पलाइन",
      emergencyServices: "आपातकालीन सेवाएं",
      emergencyDesc: "पुलिस, अग्निशमन, मेडिकल इमरजेंसी",
      cyberCrimeHelpline: "साइबर क्राइम हेल्पलाइन",
      cyberCrimeDesc: "ऑनलाइन अपराध और बुलिंग की रिपोर्ट करें",
      womenHelpline: "महिला हेल्पलाइन",
      womenHelplineDesc: "उत्पीड़न और दुर्व्यवहार के लिए सहायता",
      policeHelpline: "पुलिस हेल्पलाइन",
      policeHelplineDesc: "तुरंत अपराध की रिपोर्ट करें",
      reportOnlineCrimes: "ऑनलाइन अपराध की रिपोर्ट करें:",
      visitCyberCrime: "पर जाएं",
      pocsPortal: "POCSO पोर्टल:",
      visitPocso: "पर जाएं",
      toReportAbuse: "दुर्व्यवहार की रिपोर्ट करने के लिए",
      
      // Additional phrases in Hindi
      call: "कॉल करें",
      remember: "याद रखें:",
      important: "महत्वपूर्ण:",
      rememberWarning: "अगर कोई आपको चोट पहुंचाता है या असहज महसूस कराता है, तो यह आपकी गलती नहीं है! अपने माता-पिता, शिक्षक या स्कूल काउंसलर जैसे किसी विश्वसनीय वयस्क को बताएं। तब तक बताते रहें जब तक कोई आपकी मदद न करे।"
    }
  };

  const currentLang = t[language];

  const CyberbullyingContent = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {currentLang.cyberbullyingTitle}
        </h2>
        <p className="text-lg text-gray-600">
          {currentLang.cyberbullyingSubtitle}
        </p>
      </div>

      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-xl text-blue-900">{currentLang.whatIsCyberbullying}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-800 leading-relaxed mb-4">
            {currentLang.cyberbullyingDefinition}
          </p>
          <ul className="space-y-2 text-blue-800">
            {currentLang.cyberbullyingTypes.map((type, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                {type}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="text-xl text-orange-900">{currentLang.onlineThreats}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">{currentLang.cyberGrooming}</h4>
              <p className="text-sm text-orange-700 mb-2">{currentLang.cyberGroomingDesc}</p>
              <ul className="text-xs text-orange-600 space-y-1">
                {currentLang.groomingWarnings.map((warning, index) => (
                  <li key={index}>• {warning}</li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-white rounded border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">{currentLang.phishingTricks}</h4>
              <p className="text-sm text-orange-700 mb-2">{currentLang.phishingDesc}</p>
              <ul className="text-xs text-orange-600 space-y-1">
                {currentLang.phishingTypes.map((type, index) => (
                  <li key={index}>• <strong>{type.split(':')[0]}:</strong> {type.split(':')[1]}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">{currentLang.safetyRules}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-800 mb-3">{currentLang.doList}</h4>
              <ul className="space-y-2 text-gray-700">
                {currentLang.doItems.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-800 mb-3">{currentLang.dontList}</h4>
              <ul className="space-y-2 text-gray-700">
                {currentLang.dontItems.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-600 mr-2">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="text-xl text-purple-900">{currentLang.rememberThis}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center p-4 bg-white rounded border border-purple-200">
            <p className="text-purple-800 font-medium mb-2">
              {currentLang.internetWarning}
            </p>
            <p className="text-purple-700">
              {currentLang.strangerWarning}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-xl text-red-900 flex items-center gap-2">
            <Phone className="w-5 h-5" />
            {currentLang.getHelp}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: currentLang.childlineIndia, number: "1098", desc: currentLang.childlineDesc },
              { name: currentLang.emergencyServices, number: "112", desc: currentLang.emergencyDesc },
              { name: currentLang.cyberCrimeHelpline, number: "1930", desc: currentLang.cyberCrimeDesc }
            ].map((contact, index) => (
              <div key={index} className="p-3 bg-white rounded border border-red-200">
                <div className="font-medium text-red-800">{contact.name}</div>
                <div className="text-sm text-red-600 mb-2">{contact.desc}</div>
                <Button
                  size="sm"
                  onClick={() => handleCall(contact.number)}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  {currentLang.call} {contact.number}
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-white rounded border border-red-200">
            <p className="text-sm text-red-700">
              <strong>{currentLang.reportOnlineCrimes}</strong> {currentLang.visitCyberCrime} <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="underline">cybercrime.gov.in</a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const CSAContent = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {currentLang.csaTitle}
        </h2>
        <p className="text-lg text-gray-600">
          {currentLang.csaSubtitle}
        </p>
      </div>

      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-xl text-blue-900">{currentLang.whatIsCSA}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-800 leading-relaxed mb-4">
            {currentLang.csaDefinition}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">{currentLang.keyFacts}</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                {currentLang.keyFactsList.map((fact, index) => (
                  <li key={index}>• {fact}</li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-white rounded border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">{currentLang.typesOfAbuse}</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                {currentLang.abuseTypes.map((type, index) => (
                  <li key={index}>• <strong>{type.split(':')[0]}:</strong> {type.split(':')[1]}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="text-xl text-orange-900">{currentLang.warningSigns}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-semibold text-orange-800 mb-2">{currentLang.howYouFeel}</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                {currentLang.feelingsList.map((feeling, index) => (
                  <li key={index}>• {feeling}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-orange-800 mb-2">{currentLang.physicalSigns}</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                {currentLang.physicalSignsList.map((sign, index) => (
                  <li key={index}>• {sign}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-orange-800 mb-2">{currentLang.behaviorChanges}</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                {currentLang.behaviorChangesList.map((change, index) => (
                  <li key={index}>• {change}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-xl text-green-900">{currentLang.bodySafetyRules}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-white rounded border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">{currentLang.yourBodyBelongs}</h4>
              <ul className="text-green-700 space-y-2">
                {currentLang.bodyRights.map((right, index) => (
                  <li key={index}>• {right}</li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-white rounded border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">{currentLang.ifUncomfortable}</h4>
              <ul className="text-green-700 space-y-2">
                {currentLang.uncomfortableActions.map((action, index) => (
                  <li key={index}>• {action}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="text-xl text-purple-900">{currentLang.pocsAct}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-purple-800 mb-4">
            {currentLang.pocsaDescription}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-white rounded border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2">{currentLang.whatItCovers}</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                {currentLang.pocsoCoverage.map((coverage, index) => (
                  <li key={index}>• {coverage}</li>
                ))}
              </ul>
            </div>
            <div className="p-3 bg-white rounded border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2">{currentLang.yourRights}</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                {currentLang.rightsList.map((right, index) => (
                  <li key={index}>• {right}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert className="border-yellow-200 bg-yellow-50">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-800">
          <strong>{currentLang.remember}</strong> {currentLang.rememberWarning}
        </AlertDescription>
      </Alert>

      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-xl text-red-900 flex items-center gap-2">
            <Phone className="w-5 h-5" />
            {currentLang.emergencyHelplines}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: currentLang.childlineIndia, number: "1098", desc: currentLang.childlineDesc },
              { name: currentLang.emergencyServices, number: "112", desc: currentLang.emergencyDesc },
              { name: currentLang.womenHelpline, number: "181", desc: currentLang.womenHelplineDesc },
              { name: currentLang.policeHelpline, number: "100", desc: currentLang.policeHelplineDesc }
            ].map((contact, index) => (
              <div key={index} className="p-3 bg-white rounded border border-red-200">
                <div className="font-medium text-red-800">{contact.name}</div>
                <div className="text-sm text-red-600 mb-2">{contact.desc}</div>
                <Button
                  size="sm"
                  onClick={() => handleCall(contact.number)}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  {currentLang.call} {contact.number}
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-white rounded border border-red-200">
            <p className="text-sm text-red-700">
              <strong>{currentLang.pocsPortal}</strong> {currentLang.visitPocso} <a href="https://pocso.ncpcrweb.in" target="_blank" rel="noopener noreferrer" className="underline">pocso.ncpcrweb.in</a> {currentLang.toReportAbuse}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-xl text-blue-900">{currentLang.ourPromise}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center p-6 bg-white rounded border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-4">{currentLang.pledgeTitle}</h3>
            <div className="text-blue-700 space-y-2">
              {currentLang.pledgeItems.map((item, index) => (
                <p key={index}>• {item}</p>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto p-6 py-12">
        {/* Language Toggle - positioned at top right */}
        <div className="flex justify-end mb-6">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-3">
            <div className="text-sm text-gray-600 mb-2 font-medium flex items-center gap-2">
              <Globe className="w-4 h-4" />
              {currentLang.language}:
            </div>
            <Button
              onClick={toggleLanguage}
              variant="outline"
              size="sm"
              className="w-full"
            >
              {language === 'en' ? 'हिंदी' : 'English'}
            </Button>
          </div>
        </div>

        {/* Header with Logos */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6 space-x-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">Yi</div>
              <div className="text-sm text-gray-600">Young Indians</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">MASOOM</div>
              <div className="text-sm text-gray-600">Making Schools Safe</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">CII</div>
              <div className="text-sm text-gray-600">Confederation of Indian Industry</div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {currentLang.saveChildhood}
          </h1>
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">
            {currentLang.fightAgainst}
          </h2>
        </div>

        {activeSection === 'intro' && (
          <div className="space-y-8">
            {/* About Section */}
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-900 flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  {currentLang.aboutOrgs}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-white rounded border border-blue-200">
                    <h3 className="font-bold text-orange-600 mb-2">Young Indians (Yi)</h3>
                    <p className="text-sm text-gray-700">
                      {currentLang.youngIndians}
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded border border-blue-200">
                    <h3 className="font-bold text-blue-600 mb-2">MASOOM (Making Schools Safe)</h3>
                    <p className="text-sm text-gray-700">
                      {currentLang.masoom}
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded border border-blue-200">
                    <h3 className="font-bold text-purple-600 mb-2">CII</h3>
                    <p className="text-sm text-gray-700">
                      {currentLang.cii}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mission Statement */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-xl text-green-900 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  {currentLang.mission}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-800 leading-relaxed text-center text-lg">
                  {currentLang.missionText}
                </p>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card 
                className="border-blue-200 bg-blue-50 hover:bg-blue-100 cursor-pointer transition-colors"
                onClick={openCyberbullyingSlideshow}
              >
                <CardHeader>
                  <CardTitle className="text-xl text-blue-900 flex items-center gap-3">
                    <Shield className="w-8 h-8" />
                    <div className="flex-1">
                      {currentLang.digitalSafety}
                      <CardDescription className="text-blue-700 mt-1">
                        {currentLang.digitalSafetyDesc}
                      </CardDescription>
                    </div>
                    <ArrowRight className="w-5 h-5 text-blue-600" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-800">
                    {currentLang.digitalSafetyContent}
                  </p>
                </CardContent>
              </Card>

              <Card 
                className="border-red-200 bg-red-50 hover:bg-red-100 cursor-pointer transition-colors"
                onClick={openCSASlideshow}
              >
                <CardHeader>
                  <CardTitle className="text-xl text-red-900 flex items-center gap-3">
                    <Shield className="w-8 h-8" />
                    <div className="flex-1">
                      {currentLang.csaPrevention}
                      <CardDescription className="text-red-700 mt-1">
                        {currentLang.csaPreventionDesc}
                      </CardDescription>
                    </div>
                    <ArrowRight className="w-5 h-5 text-red-600" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-red-800">
                    {currentLang.csaPreventionContent}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Statistics Alert */}
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                <strong>{currentLang.didYouKnow}</strong> {currentLang.didYouKnowText}
              </AlertDescription>
            </Alert>
          </div>
        )}

        {activeSection === 'cyberbullying' && (
          <div>
            <Button 
              onClick={() => setActiveSection('intro')} 
              variant="outline" 
              className="mb-6"
            >
              {currentLang.backToMain}
            </Button>
            <CyberbullyingContent />
          </div>
        )}

        {activeSection === 'csa' && (
          <div>
            <Button 
              onClick={() => setActiveSection('intro')} 
              variant="outline" 
              className="mb-6"
            >
              {currentLang.backToMain}
            </Button>
            <CSAContent />
          </div>
        )}

        {/* Cyberbullying Slideshow Modal */}
        {showCyberbullyingSlideshow && (
          <CyberbullyingSlideshow
            onClose={closeCyberbullyingSlideshow}
            language={language}
          />
        )}

        {/* CSA Slideshow Modal */}
        {showCSASlideshow && (
          <CSASlideshow
            onClose={closeCSASlideshow}
            language={language}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MasoomPage;
