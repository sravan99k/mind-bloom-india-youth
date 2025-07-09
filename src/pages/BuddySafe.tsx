
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Heart, Phone, AlertTriangle, Users, Brain, ArrowRight, Globe, Smile, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const BuddySafe = () => {
  const [showMore, setShowMore] = useState(false);

  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  const incidentTypes = [
    {
      title: "Cyberbullying & Online Harassment",
      description: "Learn how to stay safe online and protect yourself from digital bullying.",
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      color: "border-blue-200 bg-blue-50 hover:bg-blue-100",
      link: "/cyberbullying-awareness",
      stats: "37% of students experience this"
    },
    {
      title: "Physical Bullying & Violence",
      description: "Understand your rights to physical safety and how to get help.",
      icon: <Users className="w-8 h-8 text-red-600" />,
      color: "border-red-200 bg-red-50 hover:bg-red-100",
      link: "/physical-bullying-awareness",
      stats: "42% of students face this challenge"
    },
    {
      title: "Academic Pressure & Mental Health",
      description: "Balance your studies with your wellbeing and learn stress management.",
      icon: <Brain className="w-8 h-8 text-purple-600" />,
      color: "border-purple-200 bg-purple-50 hover:bg-purple-100",
      link: "/academic-pressure-awareness",
      stats: "68% of students report high stress"
    },
    {
      title: "Substance Abuse & Peer Pressure",
      description: "Make healthy choices and learn how to say no to harmful substances.",
      icon: <AlertTriangle className="w-8 h-8 text-orange-600" />,
      color: "border-orange-200 bg-orange-50 hover:bg-orange-100",
      link: "/substance-abuse-awareness",
      stats: "23% face peer pressure issues"
    }
  ];

  const additionalCategories = [
    {
      title: "Online Safety & Privacy",
      description: "Protecting yourself and your information online, including digital addiction and privacy.",
      icon: <Globe className="w-8 h-8 text-teal-600" />,
      color: "border-teal-200 bg-teal-50 hover:bg-teal-100",
      link: "/online-safety-awareness",
      stats: "Focus: Internet safety, healthy screen habits"
    },
    {
      title: "Respect & Relationships",
      description: "Building safe, respectful, and inclusive connections with understanding of consent.",
      icon: <HeartHandshake className="w-8 h-8 text-pink-600" />,
      color: "border-pink-200 bg-pink-50 hover:bg-pink-100",
      link: "/respect-relationships-awareness",
      stats: "Focus: Consent, inclusion, understanding differences"
    },
    {
      title: "Mental Health & Emotional Wellbeing",
      description: "Caring for your mind and feelings, including body image and emotional regulation.",
      icon: <Smile className="w-8 h-8 text-green-600" />,
      color: "border-green-200 bg-green-50 hover:bg-green-100",
      link: "/mental-health-awareness",
      stats: "Focus: Emotions, body image, coping strategies"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      <div className="max-w-6xl mx-auto p-6 py-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-12 h-12 text-teal-600 mr-3" />
            <Heart className="w-8 h-8 text-pink-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            BuddySafe: Student Safety Awareness
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Understanding the challenges faced by students in India and knowing where to get help. 
            You're not alone - support is always available, and you deserve to feel safe and supported.
          </p>
        </div>

        <Alert className="mb-8 border-teal-200 bg-teal-50">
          <Phone className="h-4 w-4 text-teal-600" />
          <AlertDescription className="text-teal-800">
            <strong>Emergency Situations:</strong> If you're in immediate danger, call 112 (Emergency Services) immediately. 
            Your safety is the most important thing.
          </AlertDescription>
        </Alert>

        {/* Main Topic Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {incidentTypes.map((incident, index) => (
            <Link key={index} to={incident.link}>
              <Card className={`shadow-lg transition-all duration-200 cursor-pointer ${incident.color}`}>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    {incident.icon}
                    <div className="flex-1">
                      <CardTitle className="text-xl text-gray-900">
                        {incident.title}
                      </CardTitle>
                      <CardDescription className="text-sm font-medium text-gray-600">
                        {incident.stats}
                      </CardDescription>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm mb-4">
                    {incident.description}
                  </p>
                  <div className="flex items-center text-sm font-medium text-blue-600">
                    Learn more about staying safe
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Show More Button */}
        <div className="text-center mb-8">
          <Button
            onClick={() => setShowMore(!showMore)}
            variant="outline"
            className="bg-white border-teal-200 text-teal-700 hover:bg-teal-50"
          >
            {showMore ? "Show Less" : "Show More Categories"}
            <ArrowRight className={`w-4 h-4 ml-2 transition-transform ${showMore ? "rotate-90" : ""}`} />
          </Button>
        </div>

        {/* Additional Categories - Show/Hide */}
        {showMore && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 animate-fade-in">
            {additionalCategories.map((category, index) => (
              <Link key={index} to={category.link}>
                <Card className={`shadow-lg transition-all duration-200 cursor-pointer ${category.color}`}>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      {category.icon}
                      <div className="flex-1">
                        <CardTitle className="text-xl text-gray-900">
                          {category.title}
                        </CardTitle>
                        <CardDescription className="text-sm font-medium text-gray-600">
                          {category.stats}
                        </CardDescription>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 text-sm mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center text-sm font-medium text-blue-600">
                      Learn more about staying safe
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Quick Help Section */}
        <Card className="shadow-lg border-green-200 bg-green-50 mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-green-900 flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Need Help Right Now?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-800 mb-4">
              If you need immediate support, these helplines are available 24/7:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "Emergency Services", number: "112", desc: "Police, Fire, Medical Emergency" },
                { name: "Childline India", number: "1098", desc: "Child protection & support" },
                { name: "Mental Health Helpline", number: "9152987821", desc: "Talk to someone who cares" }
              ].map((contact, index) => (
                <div key={index} className="p-3 bg-white rounded border border-green-200">
                  <div className="font-medium text-green-800">{contact.name}</div>
                  <div className="text-sm text-green-600 mb-2">{contact.desc}</div>
                  <Button
                    size="sm"
                    onClick={() => handleCall(contact.number)}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Call {contact.number}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Support Message */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <h3 className="font-semibold text-blue-900 mb-2">📚 What You'll Learn</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Your rights as a student in India</li>
                <li>• How to recognize different types of challenges</li>
                <li>• Practical steps to protect yourself and others</li>
                <li>• Where to find help and support when you need it</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-4">
              <h3 className="font-semibold text-purple-900 mb-2">🤗 Remember</h3>
              <p className="text-sm text-purple-800">
                You are brave for learning about these topics. Every student deserves to feel safe, 
                respected, and supported. If you're facing any challenges, please don't suffer in silence. 
                <strong> You matter, you are not alone, and help is always available.</strong>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BuddySafe;
