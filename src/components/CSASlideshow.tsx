
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface CSASlideshowProps {
  onClose: () => void;
  language: 'en' | 'hi';
}

const CSASlideshow: React.FC<CSASlideshowProps> = ({ onClose, language }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: '/lovable-uploads/ae3f28fa-c48f-4270-b17b-8fcbeda53591.png',
      titleEn: 'Personal',
      titleHi: 'व्यक्तिगत',
      contentEn: [
        'What is personal to you?',
        'When I say personal how would you define it?',
        'Is it something you want to keep to yourself, to have full control of, to own it, right?',
        'Everyone has something personal, your toothbrush for instance. Would you like it if someone uses or touches your toothbrush? No, you wouldn\'t, cause the brush of the tooth belongs to you. The oxford dictionary defines "personal" to be "your own; not belonging to or connected with anyone else." What does it mean, personal is something that you own, and anyone does not have any connection with it nor can anyone control it? It\'s your own. Similarly, there are personal parts of the body. Try and think about what pops up when you think of personal parts of the body? Is it the head, the nose, the mouth, the ears, etc.? The 4 personal parts of the body are the chest, the genitals, and the part between our legs and buttock. These are your personal, private parts, and only you have control over them, just like your personal belongings. You should not let anyone see or touch them, nor you should see or touch others, respecting their personal body.'
      ],
      contentHi: [
        'आपके लिए व्यक्तिगत क्या है?',
        'जब मैं व्यक्तिगत कहता हूं तो आप इसे कैसे परिभाषित करेंगे?',
        'क्या यह कुछ ऐसा है जिसे आप अपने पास रखना चाहते हैं, जिस पर पूरा नियंत्रण रखना चाहते हैं, इसके मालिक बनना चाहते हैं, है न?',
        'हर किसी के पास कुछ व्यक्तिगत होता है, उदाहरण के लिए आपका टूथब्रश। क्या आपको यह पसंद आएगा यदि कोई आपके टूथब्रश का उपयोग करे या उसे छूए? नहीं, आप नहीं चाहेंगे, क्योंकि दांत का ब्रश आपका है। ऑक्सफोर्ड शब्दकोश "व्यक्तिगत" को "आपका अपना; किसी और से संबंधित या जुड़ा हुआ नहीं" के रूप में परिभाषित करता है। इसका मतलब है, व्यक्तिगत वह चीज़ है जिसका आप मालिक हैं, और किसी और का इससे कोई संबंध नहीं है और न ही कोई इसे नियंत्रित कर सकता है? यह आपका अपना है। इसी तरह, शरीर के व्यक्तिगत हिस्से होते हैं। शरीर के व्यक्तिगत हिस्सों के बारे में सोचने पर क्या ख्याल आता है? क्या यह सिर, नाक, मुंह, कान आदि है? शरीर के 4 व्यक्तिगत हिस्से हैं छाती, गुप्तांग, और हमारे पैरों और नितंबों के बीच का हिस्सा। ये आपके व्यक्तिगत, निजी हिस्से हैं, और केवल आपका इन पर नियंत्रण है, बिल्कुल आपकी व्यक्तिगत चीज़ों की तरह। आपको किसी को भी उन्हें देखने या छूने नहीं देना चाहिए, और न ही आपको दूसरों के व्यक्तिगत शरीर का सम्मान करते हुए उन्हें देखना या छूना चाहिए।'
      ]
    },
    {
      id: 2,
      image: '/lovable-uploads/629ca227-4508-4e6d-a71a-b1f793db12bc.png',
      titleEn: 'Safe and Unsafe touch',
      titleHi: 'सुरक्षित और असुरक्षित स्पर्श',
      contentEn: [
        'How do you feel, when your teacher pats your back while appreciating you, your mom cuddling you with love? You feel good, happy and comfortable, such touches are safe touches. These safe touches also include mother bathing you, or the doctor checking you in the presence of your parents/guardians, as these touches keep you clean and healthy. However, unsafe touches are not healthy for you, they make you feel uneasy, uncomfortable, sad, angry, shy or confused. These touches include, hitting, hair pulling, kicking, forcefully hugging or kissing, it is hurting you. Any touch even if it is on the tip of your finger which is making you feel uneasy is an unsafe touch.'
      ],
      contentHi: [
        'आप कैसा महसूस करते हैं, जब आपका शिक्षक आपकी सराहना करते हुए आपकी पीठ थपथपाता है, आपकी मां आपको प्यार से गले लगाती है? आप अच्छा, खुश और सहज महसूस करते हैं, ऐसे स्पर्श सुरक्षित स्पर्श हैं। इन सुरक्षित स्पर्शों में मां का आपको नहलाना, या आपके माता-पिता/अभिभावकों की उपस्थिति में डॉक्टर का आपकी जांच करना भी शामिल है, क्योंकि ये स्पर्श आपको साफ और स्वस्थ रखते हैं। हालांकि, असुरक्षित स्पर्श आपके लिए स्वस्थ नहीं हैं, वे आपको बेचैन, असहज, उदास, गुस्साईल, शर्मिंदा या भ्रमित महसूस कराते हैं। इन स्पर्शों में मारना, बाल खींचना, लात मारना, जबरदस्ती गले लगाना या चूमना शामिल है, यह आपको चोट पहुंचा रहा है। कोई भी स्पर्श, चाहे वह आपकी उंगली की नोक पर ही हो, जो आपको बेचैन महसूस कराता है, वह असुरक्षित स्पर्श है।'
      ]
    },
    {
      id: 3,
      image: '/lovable-uploads/d15ed1aa-6a6a-4337-b1b9-85502c1d1bde.png',
      titleEn: 'Learn to say NO!',
      titleHi: 'ना कहना सीखें!',
      contentEn: [
        'Remember!',
        'It is our body, and we are the boss of it, no one, no one can touch you inappropriately not a stranger nor a known person. Whenever you feel that someone is touching you inappropriately, you should learn to say NO at the top of your voice, scare the perpetrator, run to a trusted person like your parents/guardians, if at school to your teachers/headmasters. Tell them what happened, be open, be bold, be confident and strong to get the perpetrator punished.',
        'Do remember it is never your fault you don\'t have to feel guilty about it, it is the fault of the person who has done it. Be courageous and speak up!!!'
      ],
      contentHi: [
        'याद रखें!',
        'यह हमारा शरीर है, और हम इसके मालिक हैं, कोई भी, कोई भी आपको अनुचित तरीके से नहीं छू सकता, न तो कोई अजनबी और न ही कोई जाना-पहचाना व्यक्ति। जब भी आपको लगे कि कोई आपको अनुचित तरीके से छू रहा है, तो आपको अपनी आवाज़ के शीर्ष पर ना कहना सीखना चाहिए, अपराधी को डराना चाहिए, अपने माता-पिता/अभिभावकों जैसे किसी विश्वसनीय व्यक्ति के पास भागना चाहिए, अगर स्कूल में हैं तो अपने शिक्षकों/प्रधानाचार्यों के पास। उन्हें बताएं कि क्या हुआ, खुले रहें, साहसी बनें, आत्मविश्वास और मजबूती दिखाएं ताकि अपराधी को सजा मिल सके।',
        'याद रखें कि यह कभी भी आपकी गलती नहीं है, आपको इसके बारे में दोषी महसूस करने की जरूरत नहीं है, यह उस व्यक्ति की गलती है जिसने यह किया है। साहसी बनें और बोलें!!!'
      ]
    },
    {
      id: 4,
      image: '/lovable-uploads/adeb9533-9129-4148-9c0c-e1cff80afe93.png',
      titleEn: 'Punish the Perpetrator',
      titleHi: 'अपराधी को सजा दिलाएं',
      contentEn: [
        'The government had introduced the POCSO (Protection of Children from Sexual Offences) Act. The act protects children from sexual assault and harassment. Under which the accused is given a minimum of 8 years of prison. The punishment is for a minimum form of abuse too. Childline 1098, a helpline working for the protection of the rights of all children. The NGO is keen to safeguard each child in distress.'
      ],
      contentHi: [
        'सरकार ने POCSO (बच्चों को यौन अपराधों से सुरक्षा) अधिनियम पेश किया था। यह अधिनियम बच्चों को यौन हमले और उत्पीड़न से बचाता है। जिसके तहत आरोपी को कम से कम 8 साल की जेल दी जाती है। यह सजा न्यूनतम प्रकार के दुर्व्यवहार के लिए भी है। चाइल्डलाइन 1098, सभी बच्चों के अधिकारों की सुरक्षा के लिए काम करने वाली हेल्पलाइन। यह NGO संकट में पड़े हर बच्चे की सुरक्षा के लिए उत्सुक है।'
      ]
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlideData = slides[currentSlide];
  const title = language === 'en' ? currentSlideData.titleEn : currentSlideData.titleHi;
  const content = language === 'en' ? currentSlideData.contentEn : currentSlideData.contentHi;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-6xl max-h-[90vh] w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-red-50">
          <h2 className="text-xl font-bold text-red-900">
            {language === 'en' ? 'Child Sexual Abuse (CSA) Awareness' : 'बाल यौन शोषण (CSA) जागरूकता'}
          </h2>
          <Button onClick={onClose} variant="ghost" size="sm">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Slide Content */}
        <div className="relative h-[70vh] overflow-hidden">
          <div className="h-full flex items-center justify-center p-8">
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Text Content */}
              <div className="space-y-4 overflow-y-auto max-h-[60vh]">
                <h3 className="text-2xl lg:text-3xl font-bold text-red-900 mb-6">
                  {title}
                </h3>
                <div className="space-y-3">
                  {content.map((text, index) => (
                    <p 
                      key={index} 
                      className={`text-gray-700 leading-relaxed ${
                        text === 'Remember!' || text === 'याद रखें!' || 
                        text.includes('What is personal to you?') || text.includes('आपके लिए व्यक्तिगत क्या है?')
                          ? 'text-lg font-semibold text-red-800' 
                          : ''
                      }`}
                    >
                      {text}
                    </p>
                  ))}
                </div>
              </div>

              {/* Image */}
              <div className="flex justify-center">
                <img
                  src={currentSlideData.image}
                  alt={title}
                  className="w-full h-auto max-h-[50vh] object-contain rounded-lg shadow-lg"
                  onError={(e) => {
                    console.error('Image failed to load:', currentSlideData.image);
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <Button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white rounded-full p-3"
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white rounded-full p-3"
            disabled={currentSlide === slides.length - 1}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>

        {/* Footer with slide counter */}
        <div className="flex items-center justify-between p-4 bg-gray-50 border-t">
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentSlide ? 'bg-red-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CSASlideshow;
