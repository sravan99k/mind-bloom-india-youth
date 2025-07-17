import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Heart, Phone, AlertTriangle, Users, FileText, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import CyberbullyingSlideshow from "@/components/CyberbullingSlideshow";
import CSASlideshow from "@/components/CSASlideshow";
import AdultCSASlideshow from "@/components/AdultCSASlideshow";
import QuizModal from "@/components/QuizModal";
import GoogleTranslateDropdown from "@/components/GoogleTranslateDropdown";
import { cyberbullyingQuizQuestions } from "@/data/cyberbullyingQuiz";
import { csaQuizQuestions } from "@/data/csaQuiz";
import { adultQuizQuestions } from "@/data/adultquiz";

const MasoomPage = () => {

  type ContentType = 'cyberbullying' | 'csa' | 'adult';
  
  const [showSlideshow, setShowSlideshow] = useState<'none' | ContentType>('none');
  const [showQuiz, setShowQuiz] = useState<{isOpen: boolean, type: ContentType}>({isOpen: false, type: 'cyberbullying'});
  
  const handleOpenQuiz = (type: ContentType) => {
    setShowQuiz({isOpen: true, type});
  };
  
  const handleCloseQuiz = () => {
    setShowQuiz(prev => ({...prev, isOpen: false}));
  };
  
  const handleOpenSlideshow = (type: ContentType) => {
    setShowSlideshow(type);
  };

  const handleCloseSlideshow = () => {
    setShowSlideshow('none');
  };

  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  const CyberbullyingContent = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Cyberbullying</h1>
        <p className="text-xl text-blue-600 mb-6">Learn how to stay safe online</p>
        
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md text-left">
          <p className="text-gray-700 text-lg mb-6">
            Learn about online safety, cyberbullying, and how to protect yourself from digital threats. 
            Understand what to do if someone is mean to you online.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Button 
              onClick={() => handleOpenSlideshow('cyberbullying')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg"
            >
              Learn More
            </Button>
            <Button 
              onClick={() => handleOpenQuiz('cyberbullying')}
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 text-lg"
            >
              Take Quiz
            </Button>
          </div>
        </div>
      </div>

      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-xl text-blue-900">What is Cyberbullying?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-800 leading-relaxed mb-4">
            Cyberbullying is when someone uses phones, computers, or social media to hurt, 
            embarrass, or scare another person. Remember: <strong>Bullying is usually done by someone you know!</strong>
          </p>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Sending mean messages or comments
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Sharing embarrassing photos or videos without permission
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Spreading rumors or lies online
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Excluding someone from online groups on purpose
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="text-xl text-orange-900">Online Threats You Should Know</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">Cyber Grooming</h4>
              <p className="text-sm text-orange-700 mb-2">When strangers build fake trust to harm you</p>
              <ul className="text-xs text-orange-600 space-y-1">
                <li>• Constant chatting and attention</li>
                <li>• Asking for personal information</li>
                <li>• Wanting to keep conversations secret</li>
                <li>• Asking for photos or videos</li>
              </ul>
            </div>
            <div className="p-4 bg-white rounded border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">Phishing Tricks</h4>
              <p className="text-sm text-orange-700 mb-2">Fake messages to steal your information</p>
              <ul className="text-xs text-orange-600 space-y-1">
                <li>• <strong>Phishing:</strong> Fake emails/websites</li>
                <li>• <strong>Smishing:</strong> Fake text messages</li>
                <li>• <strong>Vishing:</strong> Fake phone calls</li>
                <li>• <strong>Catfishing:</strong> Fake online profiles</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Simple Safety Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-800 mb-3">✅ DO</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Only chat with real-life friends
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Tell a trusted adult if something feels wrong
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Keep passwords private
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Block and report mean people
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Think before you post anything
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-800 mb-3">❌ DON'T</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  Share personal information (full name, address, school)
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  Meet strangers from the internet
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  Open emails from unknown people
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  Respond to cyberbullies (just block them)
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  Download unknown files or apps
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="text-xl text-purple-900">Remember This!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center p-4 bg-white rounded border border-purple-200">
            <p className="text-purple-800 font-medium mb-2">
              🌐 The Internet is like a public place - not everything you see is real!
            </p>
            <p className="text-purple-700">
              Just like you wouldn't talk to strangers in real life, don't trust strangers online.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-xl text-red-900 flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Get Help Now
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Childline India", number: "1098", desc: "24/7 help for children in trouble" },
              { name: "Emergency Services", number: "112", desc: "Police, Fire, Medical Emergency" },
              { name: "Cyber Crime Helpline", number: "1930", desc: "Report online crimes and bullying" }
            ].map((contact, index) => (
              <div key={index} className="p-3 bg-white rounded border border-red-200">
                <div className="font-medium text-red-800">{contact.name}</div>
                <div className="text-sm text-red-600 mb-2">{contact.desc}</div>
                <Button
                  size="sm"
                  onClick={() => handleCall(contact.number)}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  Call {contact.number}
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-white rounded border border-red-200">
            <p className="text-sm text-red-700">
              <strong>Report Online Crimes:</strong> Visit <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="underline">cybercrime.gov.in</a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const CSAContent = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Child Sexual Abuse</h1>
        <p className="text-xl text-purple-600 mb-6">Important safety information for children</p>
        
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md text-left">
          <p className="text-gray-700 text-lg mb-6">
            Learn about body safety, how to recognize inappropriate behavior, and what to do if someone makes you uncomfortable. 
            Know your rights and how to get help.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Button 
              onClick={() => handleOpenSlideshow('csa')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 text-lg"
            >
              Learn More
            </Button>
            <Button 
              onClick={() => handleOpenQuiz('csa')}
              variant="outline"
              className="border-purple-600 text-purple-600 hover:bg-purple-50 px-6 py-3 text-lg"
            >
              Take Quiz
            </Button>
          </div>
        </div>
      </div>

      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-xl text-blue-900">What is Child Sexual Abuse?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-800 leading-relaxed mb-4">
            CSA is when an adult or older person does sexual things with a child. This is wrong and against the law.
            <strong> Important: It usually happens with people you know, not strangers!</strong>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Key Facts</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Both girls AND boys can be victims</li>
                <li>• 85% happens with people you know</li>
                <li>• Most vulnerable ages: 3-8 and 11-15 years</li>
                <li>• Many children don't report it (53% keep it secret)</li>
              </ul>
            </div>
            <div className="p-4 bg-white rounded border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Types of Abuse</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• <strong>Contact:</strong> Inappropriate touching</li>
                <li>• <strong>Non-contact:</strong> Showing inappropriate pictures</li>
                <li>• <strong>Online:</strong> Sending inappropriate messages</li>
                <li>• <strong>Grooming:</strong> Building fake trust to harm</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="text-xl text-orange-900">Warning Signs - Tell a Trusted Adult If You Notice These</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-semibold text-orange-800 mb-2">How You Might Feel</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Sudden fears or anxiety</li>
                <li>• Not wanting to be touched</li>
                <li>• Feeling sad or angry often</li>
                <li>• Problems sleeping</li>
                <li>• Not wanting to go to school</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-orange-800 mb-2">Physical Signs</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Pain in private areas</li>
                <li>• Frequent stomach aches</li>
                <li>• Eating too much or too little</li>
                <li>• Problems walking or sitting</li>
                <li>• Getting sick often</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-orange-800 mb-2">Behavior Changes</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Becoming very quiet or aggressive</li>
                <li>• Not wanting to be around certain people</li>
                <li>• Having "secrets" they can't tell</li>
                <li>• Acting much older or younger</li>
                <li>• Hurting themselves</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-xl text-green-900">Body Safety Rules - What Every Child Should Know</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-white rounded border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">Your Body Belongs to YOU!</h4>
              <ul className="text-green-700 space-y-2">
                <li>• You have the right to say "NO" to unwanted touch</li>
                <li>• Trust your feelings - if something feels wrong, it probably is</li>
                <li>• No one should touch your private parts</li>
                <li>• No one should ask you to touch their private parts</li>
                <li>• You should never keep "body secrets"</li>
              </ul>
            </div>
            <div className="p-4 bg-white rounded border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">If Someone Makes You Uncomfortable</h4>
              <ul className="text-green-700 space-y-2">
                <li>• Say "NO" loudly and clearly</li>
                <li>• Get away from that person</li>
                <li>• Tell a trusted adult immediately</li>
                <li>• Keep telling until someone believes you</li>
                <li>• Remember: It's NEVER your fault!</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="text-xl text-purple-900">POCSO Act - Your Legal Protection</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-purple-800 mb-4">
            The POCSO Act 2012 protects ALL children under 18 years from sexual abuse.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-white rounded border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2">What it Covers</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Sexual assault (3-5 years punishment)</li>
                <li>• Severe sexual assault (7 years to life)</li>
                <li>• Sexual harassment (3 years)</li>
                <li>• Child pornography (5-7 years)</li>
              </ul>
            </div>
            <div className="p-3 bg-white rounded border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2">Your Rights</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Police must help you</li>
                <li>• Your identity stays private</li>
                <li>• You can give statements at home</li>
                <li>• The court will believe you</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert className="border-yellow-200 bg-yellow-50">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-800">
          <strong>Remember:</strong> If someone hurts you or makes you uncomfortable, it's NOT your fault! 
          Tell a trusted adult like your parents, teacher, or school counselor. Keep telling until someone helps you.
        </AlertDescription>
      </Alert>

      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-xl text-red-900 flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Emergency Helplines - Save These Numbers!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Childline India", number: "1098", desc: "24/7 helpline for children" },
              { name: "Emergency Services", number: "112", desc: "Police, Fire, Medical Emergency" },
              { name: "Women Helpline", number: "181", desc: "Support for harassment and abuse" },
              { name: "Police Helpline", number: "100", desc: "Report crimes immediately" }
            ].map((contact, index) => (
              <div key={index} className="p-3 bg-white rounded border border-red-200">
                <div className="font-medium text-red-800">{contact.name}</div>
                <div className="text-sm text-red-600 mb-2">{contact.desc}</div>
                <Button
                  size="sm"
                  onClick={() => handleCall(contact.number)}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  Call {contact.number}
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-white rounded border border-red-200">
            <p className="text-sm text-red-700">
              <strong>POCSO Portal:</strong> Visit <a href="https://pocso.ncpcrweb.in" target="_blank" rel="noopener noreferrer" className="underline">pocso.ncpcrweb.in</a> to report abuse
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-xl text-blue-900">Our Promise to You</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center p-6 bg-white rounded border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-4">WE PLEDGE TO KEEP CHILDREN SAFE BY:</h3>
            <div className="text-blue-700 space-y-2">
              <p>• Teaching you about personal safety</p>
              <p>• Listening to you when you need help</p>
              <p>• Making sure your school and neighborhood are safe</p>
              <p>• Supporting any child who needs help</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderQuizModal = () => {
    if (!showQuiz.isOpen) return null;
    
    const quizData = showQuiz.type === 'cyberbullying' ? cyberbullyingQuizQuestions : csaQuizQuestions;
    const title = showQuiz.type === 'cyberbullying' ? 'Cyberbullying Quiz' : 'Child Safety Quiz';
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <QuizModal 
            isOpen={showQuiz.isOpen} 
            onClose={handleCloseQuiz} 
            title={title}
            questions={quizData}
            language="en"
          />
        </div>
      </div>
    );
  };

  const renderSlideshow = () => {
    if (showSlideshow === 'cyberbullying') {
      return (
        <div className="fixed inset-0 bg-white z-50 p-4 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <button 
              onClick={handleCloseSlideshow}
              className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 rounded-full p-2 z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <CyberbullyingSlideshow onClose={handleCloseSlideshow} />
          </div>
        </div>
      );
    } else if (showSlideshow === 'csa') {
      return (
        <div className="fixed inset-0 bg-white z-50 p-4 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <button 
              onClick={handleCloseSlideshow}
              className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 rounded-full p-2 z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <CSASlideshow onClose={handleCloseSlideshow} />
          </div>
        </div>
      );
    }
    return null;
  };

  const AdultCSAContent = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Adult CSA Awareness</h1>
        <p className="text-xl text-indigo-600 mb-6">Protecting Children: Educating Adults About Child Sexual Abuse</p>
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md text-left">
          <p className="text-gray-700 text-lg">
            Gain the knowledge and tools to recognize, prevent, and respond to child sexual abuse. Learn how abuse happens, its warning signs, and how to create safe environments for children through informed, proactive adult action.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Button 
              onClick={() => handleOpenSlideshow('adult')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 text-lg"
            >
              Learn More
            </Button>
            <Button 
              onClick={() => handleOpenQuiz('adult')}
              variant="outline"
              className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-6 py-3 text-lg"
            >
              Take Quiz
            </Button>
          </div>
        </div>
      </div>

      <Card className="border-indigo-200 bg-indigo-50">
        <CardHeader>
          <CardTitle className="text-xl text-indigo-900">Understanding Adult Survivors</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-indigo-800 leading-relaxed mb-4">
            Childhood sexual abuse can have lasting effects into adulthood. Many survivors experience 
            emotional, psychological, and physical impacts that continue throughout their lives.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded border border-indigo-200">
              <h4 className="font-semibold text-indigo-800 mb-2">Common Long-term Effects</h4>
              <ul className="text-sm text-indigo-700 space-y-1">
                <li>• Anxiety, depression, or PTSD</li>
                <li>• Difficulty with trust and relationships</li>
                <li>• Low self-esteem and self-blame</li>
                <li>• Physical health issues</li>
                <li>• Substance abuse or addiction</li>
              </ul>
            </div>
            <div className="p-4 bg-white rounded border border-indigo-200">
              <h4 className="font-semibold text-indigo-800 mb-2">Healing and Recovery</h4>
              <ul className="text-sm text-indigo-700 space-y-1">
                <li>• Therapy and counseling</li>
                <li>• Support groups for survivors</li>
                <li>• Self-care practices</li>
                <li>• Setting healthy boundaries</li>
                <li>• Learning to trust again</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="text-xl text-purple-900">How to Support a Survivor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-purple-800 mb-2">Do:</h4>
              <ul className="text-sm text-purple-700 space-y-2">
                <li>• <strong>Listen</strong> without judgment</li>
                <li>• <strong>Believe</strong> them</li>
                <li>• <strong>Respect</strong> their pace of healing</li>
                <li>• <strong>Offer</strong> ongoing support</li>
                <li>• <strong>Encourage</strong> professional help</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-800 mb-2">Don't:</h4>
              <ul className="text-sm text-purple-700 space-y-2">
                <li>• Ask for details about the abuse</li>
                <li>• Blame or question their actions</li>
                <li>• Pressure them to "get over it"</li>
                <li>• Share their story without permission</li>
                <li>• Try to be their therapist</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-xl text-red-900 flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Support Services for Adult Survivors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { 
                name: "iCALL Psychosocial Helpline", 
                number: "9152987821", 
                desc: "Mental health support for adults (Mon-Sat, 10AM-8PM)" 
              },
              { 
                name: "Snehi Mental Health Helpline", 
                number: "+91-11-40769002", 
                desc: "Emotional support for survivors" 
              },
              { 
                name: "RAHI Foundation", 
                number: "+91-11-41654002", 
                desc: "Support for women survivors of childhood sexual abuse" 
              },
              { 
                name: "VIMHANS Helpline", 
                number: "+91-11-26963892", 
                desc: "Professional mental health support" 
              }
            ].map((contact, index) => (
              <div key={index} className="p-3 bg-white rounded border border-red-200">
                <div className="font-medium text-red-800">{contact.name}</div>
                <div className="text-sm text-red-600 mb-2">{contact.desc}</div>
                <Button
                  size="sm"
                  onClick={() => handleCall(contact.number.replace(/\D/g, ''))}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  Call {contact.number}
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-white rounded border border-red-200">
            <p className="text-sm text-red-700">
              <strong>Online Support:</strong> Visit <a href="https://www.rainn.org/" target="_blank" rel="noopener noreferrer" className="underline">RAINN.org</a> or 
              <a href="https://www.1in6.org/" target="_blank" rel="noopener noreferrer" className="underline ml-2">1in6.org</a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Google Translate Dropdown */}
      <GoogleTranslateDropdown />
      
      <div className="max-w-6xl mx-auto p-6 py-12">
        {/* Header with Logos */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'end', gap: '4rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="/images/yi-logo.png" alt="Young Indians Logo" style={{ height: 60 }} />
            <span style={{ marginTop: 8, fontSize: 14, color: '#888', textAlign: 'center' }}></span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="/images/masoom-logo.png" alt="Masoom Logo" style={{ height: 60 }} />
            <span style={{ marginTop: 8, fontSize: 14, color: '#888', textAlign: 'center' }}></span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="/images/cii-logo.png" alt="CII Logo" style={{ height: 60 }} />
            <span style={{ marginTop: 8, fontSize: 14, color: '#888', textAlign: 'center' }}></span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">SAVE CHILDHOOD</h1>
        <h2 className="text-2xl font-semibold text-blue-600 mb-2 text-center">FIGHT AGAINST CHILD SEXUAL ABUSE & CYBERBULLYING</h2>

        <div className="space-y-8">
            {/* About Section */}
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-900 flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  About Our Organizations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-white rounded border border-blue-200">
                    <h3 className="font-bold text-orange-600 mb-2">Young Indians (Yi)</h3>
                    <p className="text-sm text-gray-700">
                      Young Indians is the youth wing of CII. We are young leaders working to make India better 
                      by helping our communities and being responsible citizens.
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded border border-blue-200">
                    <h3 className="font-bold text-blue-600 mb-2">MASOOM (Making Schools Safe)</h3>
                    <p className="text-sm text-gray-700">
                      MASOOM works to make schools safer for children. We teach about safety, prevent abuse, 
                      and help children who face problems like bullying or harassment.
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded border border-blue-200">
                    <h3 className="font-bold text-purple-600 mb-2">CII</h3>
                    <p className="text-sm text-gray-700">
                      The Confederation of Indian Industry works with businesses and government to make India 
                      a better place for everyone to live and work.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mission Statement */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-green-900 flex items-center justify-center gap-2">
                  <span></span> Our Mission 
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="max-w-3xl">
                  <p className="text-green-800 leading-relaxed text-center text-lg">
                    Together, we work to keep children safe by teaching them about dangers, providing help when needed, 
                    and making sure every child can grow up in a safe environment where they can learn and be happy.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cyberbullying Card */}
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl"></span>
                    <CardTitle className="text-2xl font-bold text-blue-900">Cyberbullying</CardTitle>
                  </div>
                  <p className="text-blue-700 text-lg">Learn how to stay safe online</p>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-800 mb-6">
                    Learn about online safety, cyberbullying, and how to protect yourself from digital threats. 
                    Understand what to do if someone is mean to you online.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenSlideshow('cyberbullying');
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg"
                    >
                      Learn More
                    </Button>
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenQuiz('cyberbullying');
                      }}
                      variant="outline"
                      className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 text-lg"
                    >
                      Take Quiz
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* CSA Card */}
              <Card className="border-purple-200 bg-purple-50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl"></span>
                    <CardTitle className="text-2xl font-bold text-purple-900">Child Sexual Abuse</CardTitle>
                  </div>
                  <p className="text-purple-700 text-lg">Important safety information for children</p>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-800 mb-6">
                    Learn about body safety, how to recognize inappropriate behavior, and what to do if someone 
                    makes you uncomfortable. Know your rights and how to get help.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenSlideshow('csa');
                      }}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 text-lg"
                    >
                      Learn More
                    </Button>
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenQuiz('csa');
                      }}
                      variant="outline"
                      className="border-purple-600 text-purple-600 hover:bg-purple-50 px-6 py-3 text-lg"
                    >
                      Take Quiz
                    </Button>
                  </div>
                </CardContent>
              </Card>

            </div>

            {/* Statistics Alert */}
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                <strong>Did you know?</strong> Many children don't report when bad things happen to them. 
                We want to create safe places where children feel comfortable asking for help. 
                Every adult should help protect children.
              </AlertDescription>
            </Alert>

            {/* Adult CSA Awareness Card */}
            <Card className="border-indigo-200 bg-indigo-50 mt-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-indigo-900">Adult CSA Awareness</CardTitle>
                <p className="text-indigo-700 text-lg">Protecting Children: Educating Adults About Child Sexual Abuse</p>
              </CardHeader>
              <CardContent>
                <p className="text-indigo-800 mb-4">
                  Gain the knowledge and tools to recognize, prevent, and respond to child sexual abuse. 
                  Learn how abuse happens, its warning signs, and how to create safe environments for children through informed, proactive adult action.
                </p>
                <ul className="space-y-2 mb-6 text-indigo-800 list-disc pl-5">
                  <li>Learn to identify subtle signs of potential abuse</li>
                  <li>Understand grooming behaviors used by perpetrators</li>
                  <li>Discover how to have age-appropriate conversations with children</li>
                  <li>Learn strategies for creating safe spaces in homes and communities</li>
                  <li>Know the steps to take if you suspect abuse is occurring</li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenSlideshow('adult');
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 text-lg"
                  >
                    Learn More
                  </Button>
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenQuiz('adult');
                    }}
                    variant="outline"
                    className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-6 py-3 text-lg"
                  >
                    Take Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

        {/* Cyberbullying Slideshow Popup */}
        {showSlideshow === 'cyberbullying' && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-xl font-semibold">Cyberbullying Information</h3>
                <button 
                  onClick={() => setShowSlideshow('none')}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="overflow-y-auto flex-1">
                <CyberbullyingSlideshow onClose={() => setShowSlideshow('none')} />
              </div>
            </div>
          </div>
        )}

        {/* Adult CSA Slideshow Popup */}
        {showSlideshow === 'adult' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="relative w-full max-w-5xl bg-white rounded-lg shadow-2xl h-[90vh] flex flex-col">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-xl font-semibold text-gray-900">Adult CSA Awareness</h3>
                <button 
                  onClick={() => setShowSlideshow('none')}
                  className="p-1 rounded-full hover:bg-gray-100"
                  aria-label="Close"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
              <div className="flex-1 overflow-hidden">
                <AdultCSASlideshow onClose={() => setShowSlideshow('none')} />
              </div>
            </div>
          </div>
        )}

        {/* CSA Slideshow Popup */}
        {showSlideshow === 'csa' && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-xl font-semibold">Child Safety Information</h3>
                <button 
                  onClick={() => setShowSlideshow('none')}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="overflow-y-auto flex-1">
                <CSASlideshow onClose={() => setShowSlideshow('none')} />
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Quiz Modals */}
      <QuizModal
        isOpen={showQuiz.isOpen && showQuiz.type === 'cyberbullying'}
        onClose={handleCloseQuiz}
        title="Cyberbullying Quiz"
        questions={cyberbullyingQuizQuestions}
        language="en"
      />
      
      <QuizModal
        isOpen={showQuiz.isOpen && showQuiz.type === 'csa'}
        onClose={handleCloseQuiz}
        title="Child Safety Quiz"
        questions={csaQuizQuestions}
        language="en"
      />
      
      <QuizModal
        isOpen={showQuiz.isOpen && showQuiz.type === 'adult'}
        onClose={handleCloseQuiz}
        title="Adult CSA Awareness Quiz"
        questions={adultQuizQuestions}
        language="en"
      />
      
      <Footer />
    </div>
  );
};

export default MasoomPage;