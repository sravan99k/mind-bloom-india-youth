import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Instagram, X } from 'lucide-react';

interface CyberbullyingSlideshowProps {
  onClose: () => void;
}

const CyberbullyingSlideshow: React.FC<CyberbullyingSlideshowProps> = ({ onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: '/images/masoom-images/digital 1.PNG',
      title: 'What is Internet?',
      content: [
        'The Internet is neither "an innovation for good" nor "an instrument of evil" or even "just a tool".',
        'It seems easy and getting easier all the time but it is in fact a complex entity.',
        'It is what YOU use it for.'
      ]
    },
    {
      id: 2,
      image: '/images/masoom-images/digital 2.PNG',
      title: 'What do you use Internet for?',
      content: [
        '• Chatting',
        '• Social Media apps',
        '• YouTube',
        '• Mailing',
        '• Browsing for school assignments and projects',
        '• Gaming',
        'What else??'
      ]
    },
    {
      id: 3,
      image: '/images/masoom-images/digital 3.PNG',
      title: 'Digital Footprint',
      content: [
        'Everything you do online leaves a digital footprint.',
        'This includes:',
        '• Websites you visit',
        '• Things you post or share',
        '• Photos you upload',
        '• Comments you make',
        'Be mindful of what you share online!'
      ]
    },
    {
      id: 4,
      image: '/images/masoom-images/d4 (2).png',
      title: 'Cyber Grooming',
      content: [
        'Adults may pretend to be children online to build trust for exploitation. Stay alert to the warning signs.',
        'Warning signs:',
        '• Secretive conversations',
        '• Inappropriate or sexual messages',
        '• Requests for personal info or photos',
        '• Asking to keep conversations secret',
        'Always inform a trusted adult if you feel uncomfortable!'
      ]
    },
    {
      id: 5,
      image: '/images/masoom-images/digital 4.PNG',
      title: 'Online Privacy',
      content: [
        'Protect your personal information:',
        '• Use strong, unique passwords',
        '• Be careful what you share on social media',
        '• Safe sharing: Hobbies, favorite bands, foods, etc.',
        '• Unsafe sharing: Full name, address, phone, passwords',
        '• Adjust privacy settings on your accounts',
        '• Think before you post, never share live location or travel plans',
        'Remember: Once online, always online!'
      ]
    },
    {
      id: 6,
      image: '/images/masoom-images/digital 5.PNG',
      title: 'Cyberbullying',
      content: [
        'Cyberbullying is bullying that takes place online.',
        'It can include:',
        '• Sending mean messages',
        '• Spreading rumors online',
        '• Posting embarrassing photos',
        '• Excluding someone on purpose',
        'Remember: Be kind online!'
      ]
    },
    {
      id: 6,
      image: '/images/masoom-images/digital 6.PNG',
      title: 'Staying Safe Online',
      content: [
        'Tips for staying safe:',
        '• Never share passwords',
        '• Be careful with strangers online',
        '• Think before clicking links',
        '• Tell a trusted adult if something makes you uncomfortable',
        '• Be a good digital citizen!'
      ]
    },
    {
      id: 7,
      image: '/images/masoom-images/digital 7.PNG',
      title: 'Social Media Safety',
      content: [
        'Using social media safely:',
        '• Set profiles to private',
        '• Only accept friend requests from people you know',
        '• Be careful with location sharing',
        '• Report any suspicious behavior',
        '• Camera phones make sharing photos and videos easy',
        '• Online pictures can be copied, edited, and shared without your consent',
        '',
        '📱 Popular Social Media Apps:',
        '• Instagram, SnapChat, TikTok, Discord, WhatsApp, YouTube',
        '',
        'Remember: Not everyone online is who they say they are!'
      ]
    },
    {
      id: 8,
      image: '/images/masoom-images/digital 8.PNG',
      title: 'Phishing, Smishing, Vishing, Catfishing',
      content: [
        'Tricks used to steal your personal information through fake messages or identities.',
        '',
        '• Phishing: Fake emails',
        '• Smishing: Fake text messages',
        '• Vishing: Voice calls pretending to be legitimate',
        '• Catfishing: Fake online profiles',
        '',
        'Be cautious of any suspicious requests for personal information!'
      ]
    },
    {
      id: 9,
      image: '/images/masoom-images/digital 9.png',
      title: 'Email Safety: Do\'s and Don\'ts',   
      content: [
        '✅ DO\'s',
        '• Open emails only from people you know and trust',
        '• Tell an adult if you get unsafe or cyberbully emails',
        '',
        '❌ DON\'Ts',
        '• Open messages from strangers',
        '• Click links or download from unknown emails',
        '• Reply to unknown senders (could be spam)',
        '• Respond to emails asking for private info',
        '• Share personal details about you or your family',
        '• Send photos to people you don\'t know'
      ]
    },
    {
      id: 10,
      image: '/images/masoom-images/digital 10.PNG',
      title: 'Online Scams & Malware',
      content: [
        '🛡️ Malware Protection',
        '• Malware is harmful software that can damage devices or steal information',
        '• Types: Viruses, spyware, ransomware',
        '• Never click unknown links or downloads',
        '• Install and update antivirus software',
        '• Keep all software updated',
        '',
        'When in doubt, ask a trusted adult!'
      ]
    },
    {
      id: 11,
      image: '/images/masoom-images/digital 11.PNG',
      title: 'Screen Time Balance',
      content: [
        'Healthy digital habits:',
        '• Take regular breaks from screens',
        '• Set time limits for device use',
        '• Make time for offline activities',
        '• Have device-free meals and family time',
        'Balance is key to digital wellbeing!'
      ]
    },
    {
      id: 13,
      image: '/images/masoom-images/digital 12.PNG',
      title: 'Critical Thinking Online',
      content: [
        'Not everything online is true!',
        '• Check multiple sources',
        '• Look for evidence',
        '• Be aware of fake news',
        '• Question what you see online',
        'Be a smart information consumer!'
      ]
    },
    {
      id: 14,
      image: '/images/masoom-images/digital 13.PNG',
      title: 'Positive Digital Footprint',
      content: [
        'Build a positive online presence:',
        '• Share positive content',
        '• Be kind in comments',
        '• Showcase your talents',
        '• Connect with positive communities',
        'Make your digital footprint something to be proud of!'
      ]
    },
    {
      id: 15,
      image: '/images/masoom-images/csa 12.PNG',
      title: 'Have you heard of CSAM, POCSO?',
      content: [
        '🚨 CSAM (Child Sexual Abuse Material)',
        '• Sexually explicit pictures or videos of children below 18',
        '• Creating, sharing, or possessing CSAM is illegal',
        '• Severely punishable by law',
        '',
        '🛡️ POCSO Act',
        '• Protection of Children from Sexual Offences',
        '• Protects all Indian children under 18 years',
        '• Provides legal protection against sexual abuse',
        '• Ensures child-friendly procedures for reporting and trials',
        '',
        'If you encounter any such content or situation, report it immediately to a trusted adult or authorities.'
      ]
    },
    {
      id: 16,
      image: '/images/masoom-images/csa 5.PNG',
      title: 'Cyber Crime Against Children',
      content: [
        '⚠️ Cyber Crime against Children is an offence under IT Act 2000',
        '',
        '🤝 Seek Help, You are not alone',
        '• Talk to Parents',
        '• Report to Teachers',
        '• Share with your best friends',
        '• Use Anonymous Helplines',
        '',
        'Remember: Speaking up is the first step to getting help and protecting yourself and others.'
      ]
    },
    {
      id: 17,
      image: '/images/masoom-images/csa 19.PNG',
      title: 'Websites to Report Cyber Crime',
      content: [
        '🌐 Find Help Online',
        '• Cyber Crime Portal: https://cybercrime.gov.in/',
        '• POCSO Website: https://pocso.ncpcrweb.in/',
        '',
        '📞 Emergency Helplines',
        '• Childline: 1098 (24/7)',
        '• National Emergency Number: 112',
        '',
        'Remember: These services are free and confidential. Don\'t hesitate to reach out if you need help.'
      ]
    }
  ];

  const handleClose = () => {
    onClose();
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const { title, content } = slides[currentSlide];

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-xl">
        <div className="relative h-full">
          {/* Main Content */}
          <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 80px)' }}>
            <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2 flex-shrink-0">
                <img
                  src={slides[currentSlide].image}
                  alt={title}
                  className="w-full h-auto max-h-[50vh] object-contain rounded-lg shadow-lg"
                  onError={(e) => {
                    console.error('Image failed to load:', slides[currentSlide].image);
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div className="md:w-1/2 overflow-y-auto max-h-[calc(100vh-200px)] pr-2">
                <div className="space-y-4">
                  {content.map((text, index) => {
                    // Check if the text contains a URL
                    const urlMatch = text.match(/https?:\/\/[^\s)]+/);
                    // Check if the text contains a phone number pattern
                    const phoneMatch = text.match(/(\d{3,})/);
                    
                    if (urlMatch) {
                      const url = urlMatch[0];
                      const displayText = text.replace(url, '').trim() || url;
                      return (
                        <p key={index} className="text-gray-700">
                          {text.split(url)[0]}
                          <a 
                            href={url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline break-all"
                          >
                            {displayText}
                          </a>
                        </p>
                      );
                    } else if (phoneMatch && (text.includes('1098') || text.includes('112'))) {
                      const phoneNumber = phoneMatch[0];
                      return (
                        <p key={index} className="text-gray-700">
                          {text.split(phoneNumber)[0]}
                          <a 
                            href={`tel:${phoneNumber}`}
                            className="text-blue-600 hover:underline"
                          >
                            {phoneNumber}
                          </a>
                        </p>
                      );
                    }
                    return (
                      <p key={index} className="text-gray-700">
                        {text}
                      </p>
                    );
                  })}
                </div>
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
          <span className="text-sm text-gray-500">
            Slide {currentSlide + 1} of {slides.length}
          </span>
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full ${
                  index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <Button 
            onClick={handleClose} 
            variant="outline" 
            size="sm"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CyberbullyingSlideshow;
