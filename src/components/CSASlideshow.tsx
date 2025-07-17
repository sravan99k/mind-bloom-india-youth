import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface CSASlideshowProps {
  onClose: () => void;
}

const CSASlideshow: React.FC<CSASlideshowProps> = ({ onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  interface Slide {
  id: number;
  image: string;
  title: string;
  content: string[];
  customContent?: React.ReactNode;
}

const slides: Slide[] = [
    {
      id: 1,
      image: '/public/images/masoom-images/csa 15.PNG',
      title: 'Personal Body Safety',
      content: [
        '• Your body belongs to you',
        '• Private parts are covered by a swimsuit',
        '• No one should touch your private parts except for health or cleaning reasons',
        '• It\'s okay to say NO to unwanted touches',
        '• Always tell a trusted adult if someone makes you uncomfortable'
      ]
    },
    {
      id: 2,
      image: '', // Empty since we're using custom layout
      title: 'Safe and Unsafe Touch',
      content: [
        'SAFE TOUCHES',
        '• Make you feel happy and cared for',
        '• Examples: Hugs from family, high-fives, handshakes',
        '• Doctor visits with parents present',
        '• Make you feel safe and loved',
        '\nUNSAFE TOUCHES',
        '• Make you feel uncomfortable or scared',
        '• Any touch on private parts (unless for health with parents)',
        '• If someone asks you to keep a touch a secret',
        '• Any touch that makes you feel confused or unsafe'
      ],
      customContent: (
        <div className="w-full px-4 py-2">
          <div className="flex flex-col md:flex-row gap-8 w-full h-full">
            {/* Left side - Safe Touch */}
            <div className="flex-1 flex flex-col items-center p-4 bg-green-50 rounded-lg">
              <div className="w-full h-48 md:h-64 mb-3 overflow-hidden rounded-lg border-2 border-green-200">
                <img 
                  src="/images/masoom-images/csa 17.PNG" 
                  alt="Safe touch examples"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center text-lg font-bold text-green-700 mb-3">SAFE TOUCH</div>
              <ul className="w-full space-y-2 text-gray-700 px-2">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">•</span>
                  <span>Makes you feel happy and safe</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">•</span>
                  <span>Appropriate hugs and high-fives</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">•</span>
                  <span>Doctor visits with parents present</span>
                </li>
              </ul>
            </div>
            
            {/* Right side - Unsafe Touch */}
            <div className="flex-1 flex flex-col items-center p-4 bg-red-50 rounded-lg">
              <div className="w-full h-48 md:h-64 mb-3 overflow-hidden rounded-lg border-2 border-red-200">
                <img 
                  src="/images/masoom-images/csa 18.PNG" 
                  alt="Unsafe touch examples"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center text-lg font-bold text-red-700 mb-3">UNSAFE TOUCH</div>
              <ul className="w-full space-y-2 text-gray-700 px-2">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 mt-1">•</span>
                  <span>Makes you feel uncomfortable or scared</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 mt-1">•</span>
                  <span>Touching private parts without a good reason</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 mt-1">•</span>
                  <span>Being asked to keep secrets from parents</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      image: '/images/masoom-images/csa 1.png',
      title: 'Your Body Belongs to You',
      content: [
        '• You have the right to say NO to any touch you don\'t like',
        '• Even if it\'s someone you know or love',
        '• Even if they offer you gifts or treats',
        '• Even if they tell you it\'s a secret',
        '• Your body is special and belongs only to you!'
      ]
    },
    
    {
      id: 5,
      image: '/images/masoom-images/csa 5.PNG',
      title: 'Safe Adults',
      content: [
        '• Parents or guardians',
        '• Teachers or school counselors',
        '• Doctors or nurses with parents present',
        '• Police officers',
        '• Remember: Safe adults will never ask you to keep secrets from your parents'
      ]
    },
    {
      id: 6,
      image: '/images/masoom-images/csa 6.PNG',
      title: 'Internet Safety',
      content: [
        '• Never share personal information online',
        '• Don\'t send pictures to people you don\'t know',
        '• Tell an adult if someone asks you to keep secrets online',
        '• If something makes you uncomfortable online, tell a trusted adult'
      ]
    },
    {
      id: 7,
      image: '/images/masoom-images/csa 7.PNG',
      title: 'It\'s Not Your Fault',
      content: [
        '• If someone touches you in a way that makes you uncomfortable, it\'s NEVER your fault',
        '• You won\'t get in trouble for telling the truth',
        '• Even if you said yes but then changed your mind, it\'s still not your fault',
        '• Always tell a trusted adult if something happens'
      ]
    },
    {
      id: 8,
      image: '/images/masoom-images/csa 8.PNG',
      title: 'Good Secrets vs. Bad Secrets',
      content: [
        'Good Secrets:',
        '• Are fun surprises (like a birthday gift)',
        '• Make you feel happy and excited',
        '• Are temporary and will be shared soon',
        '\nBad Secrets:',
        '• Make you feel worried or scared',
        '• Involve touching or other uncomfortable situations',
        '• Someone tells you not to tell anyone else',
        '• If it\'s a bad secret, tell a trusted adult right away!'
      ]
    },
    {
      id: 9,
      image: '/images/masoom-images/csa 22.PNG',    
      title: 'What to Do',
      content: [
        'If someone makes you uncomfortable:',
        '1. Say NO firmly',
        '2. Get away from the situation',
        '3. Tell a trusted adult right away',
        '4. Keep telling until someone helps you',
        'Remember: It\'s never too late to tell someone!'
      ]
    },
    {
      id: 10,
      image: '/images/masoom-images/csa 3.png',
      title: 'You Are Special',
      content: [
        '• Your body is special and belongs only to you',
        '• You have the right to feel safe',
        '• There are people who love you and want to protect you',
        '• If you ever feel scared or confused, talk to a trusted adult',
        'You are important and deserve to be safe!'
      ]
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleClose = () => {
    onClose();
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-xl">
        <div className="relative h-full">
          {/* Main Content */}
          <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 80px)' }}>
            <h2 className="text-2xl font-bold mb-4 text-center text-red-700">{currentSlideData.title}</h2>
            
            {currentSlideData.customContent ? (
              <div className="w-full">
                {currentSlideData.customContent}
              </div>
            ) : (
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2 flex-shrink-0">
                  <img
                    src={currentSlideData.image}
                    alt={currentSlideData.title}
                    className="w-full h-auto max-h-[50vh] object-contain rounded-lg shadow-lg"
                    onError={(e) => {
                      console.error('Image failed to load:', currentSlideData.image);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <div className="md:w-1/2">
                  <div className="space-y-4">
                    {currentSlideData.content.map((text, index) => {
                      const isBold = text.endsWith(':');
                      return (
                        <p 
                          key={index} 
                          className={`text-gray-700 ${isBold ? 'font-bold text-red-800' : 'pl-4'}`}
                        >
                          {text}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
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
          <span className="text-sm text-gray-500">
            Slide {currentSlide + 1} of {slides.length}
          </span>
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full ${
                  index === currentSlide ? 'bg-red-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <Button 
            onClick={handleClose} 
            variant="outline" 
            size="sm"
            className="text-red-600 hover:bg-red-50"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CSASlideshow;