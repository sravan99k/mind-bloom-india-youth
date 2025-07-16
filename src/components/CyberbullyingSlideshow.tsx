
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface CyberbullingSlideshowProps {
  onClose: () => void;
  language: 'en' | 'hi';
}

const CyberbullyingSlideshow: React.FC<CyberbullySlideshowProps> = ({ onClose, language }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: '/masoom-images/digital 1.PNG',
      titleEn: 'What is Internet?',
      titleHi: 'इंटरनेट क्या है?',
      contentEn: [
        'The Internet is neither "an innovation for good" nor "an instrument of evil" or even "just a tool".',
        'It seems easy and getting easier all the time but it is in fact a complex entity',
        'It is what YOU use it for'
      ],
      contentHi: [
        'इंटरनेट न तो "अच्छाई के लिए एक नवाचार" है और न ही "बुराई का साधन" या केवल "एक उपकरण"।',
        'यह आसान लगता है और हमेशा आसान होता जा रहा है लेकिन वास्तव में यह एक जटिल इकाई है',
        'यह वही है जिसके लिए आप इसका उपयोग करते हैं'
      ]
    },
    {
      id: 2,
      image: '/masoom-images/digital 2.PNG',
      titleEn: 'What do you use Internet for?',
      titleHi: 'आप इंटरनेट का उपयोग किसके लिए करते हैं?',
      contentEn: [
        '• Chatting',
        '• Social Media apps',
        '• Youtube',
        '• Mailing',
        '• Browsing for school assignments and projects',
        '• Gaming',
        'What else??'
      ],
      contentHi: [
        '• चैटिंग',
        '• सोशल मीडिया ऐप्स',
        '• यूट्यूब',
        '• मेलिंग',
        '• स्कूल असाइनमेंट और प्रोजेक्ट्स के लिए ब्राउज़िंग',
        '• गेमिंग',
        'और क्या??'
      ]
    },
    {
      id: 3,
      image: '/masoom-images/digital 3.PNG',
      titleEn: 'Have you ever felt unsafe using Internet?',
      titleHi: 'क्या आपने कभी इंटरनेट का उपयोग करते समय असुरक्षित महसूस किया है?',
      contentEn: [
        'What are Cyber Crimes?',
        'Cyber crimes are offences that may be committed by individuals or companies or institutions using computers, mobiles, internet.',
        'They are committed using social media apps, emails, chat rooms, gaming apps, dating sites, websites and others.'
      ],
      contentHi: [
        'साइबर अपराध क्या हैं?',
        'साइबर अपराध वे अपराध हैं जो व्यक्तियों या कंपनियों या संस्थानों द्वारा कंप्यूटर, मोबाइल, इंटरनेट का उपयोग करके किए जा सकते हैं।',
        'ये सोशल मीडिया ऐप्स, ईमेल, चैट रूम, गेमिंग ऐप्स, डेटिंग साइट्स, वेबसाइट्स और अन्य का उपयोग करके किए जाते हैं।'
      ]
    },
    {
      id: 4,
      image: '/masoom-images/digital 4.PNG',
      titleEn: 'But do not worry By being smart online, you can be safe',
      titleHi: 'लेकिन चिंता न करें ऑनलाइन स्मार्ट रहकर, आप सुरक्षित रह सकते हैं',
      contentEn: [
        '• The Internet can be a great place for you to have fun and learn. It has transformed the way we communicate, make friends, share updates, play games, and shop.',
        '• But there are some bad people on the internet that want to hurt kids and their family members. It is very important for you to be smart and safe when you use the internet.'
      ],
      contentHi: [
        '• इंटरनेट आपके लिए मज़े करने और सीखने के लिए एक शानदार जगह हो सकती है। इसने हमारे संवाद करने, दोस्त बनाने, अपडेट साझा करने, गेम खेलने और खरीदारी करने के तरीके को बदल दिया है।',
        '• लेकिन इंटरनेट पर कुछ बुरे लोग हैं जो बच्चों और उनके परिवार के सदस्यों को नुकसान पहुंचाना चाहते हैं। जब आप इंटरनेट का उपयोग करते हैं तो स्मार्ट और सुरक्षित रहना बहुत महत्वपूर्ण है।'
      ]
    },
    {
      id: 5,
      image: '/masoom-images/digital 5.PNG',
      titleEn: 'Digital Space is similar to Physical Space',
      titleHi: 'डिजिटल स्पेस फिजिकल स्पेस के समान है',
      contentEn: [
        'The Internet is very similar to the physical space like sidewalks or the hallways at the mall.',
        '• You have no expectation of privacy.',
        '• Everyone can use the space so long as there is no intent to cause harm or damage.',
        '• Everyone can see everyone and everything that is shared.',
        'Use the same precautions you would use in physical space.'
      ],
      contentHi: [
        'इंटरनेट भौतिक स्थान जैसे फुटपाथ या मॉल के हॉलवे के समान है।',
        '• आपको गोपनीयता की कोई अपेक्षा नहीं है।',
        '• हर कोई स्थान का उपयोग कर सकता है जब तक कि नुकसान या क्षति पहुंचाने का कोई इरादा न हो।',
        '• हर कोई हर किसी और हर चीज़ को देख सकता है जो साझा की जाती है।',
        'वही सावधानियां बरतें जो आप भौतिक स्थान में बरतते हैं।'
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
        <div className="flex items-center justify-between p-4 border-b bg-blue-50">
          <h2 className="text-xl font-bold text-blue-900">
            {language === 'en' ? 'Digital Safety & Cyberbullying' : 'डिजिटल सुरक्षा और साइबर बुलिंग'}
          </h2>
          <Button onClick={onClose} variant="ghost" size="sm">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Slide Content */}
        <div className="relative h-[70vh] overflow-hidden">
          <div className="h-full flex items-center justify-center p-8">
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Text Content */}
              <div className="space-y-4">
                <h3 className="text-2xl lg:text-3xl font-bold text-blue-900 mb-6">
                  {title}
                </h3>
                <div className="space-y-3">
                  {content.map((text, index) => (
                    <p 
                      key={index} 
                      className={`text-gray-700 leading-relaxed ${
                        text.startsWith('•') ? 'ml-4' : ''
                      } ${
                        text.includes('It is what YOU use it for') || text.includes('What else??') 
                          ? 'text-lg font-semibold text-blue-800' 
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
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3"
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3"
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
                  index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
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

export default CyberbullyingSlideshow;
