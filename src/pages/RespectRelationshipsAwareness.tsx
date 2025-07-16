
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { HeartHandshake, Heart, Phone, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const RespectRelationshipsAwareness = () => {
  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
      <div className="max-w-4xl mx-auto p-6 py-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <HeartHandshake className="w-12 h-12 text-pink-600 mr-3" />
            <Heart className="w-8 h-8 text-rose-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Respect & Relationships
          </h1>
          <p className="text-lg text-gray-600">
            Building safe, respectful, and inclusive connections with everyone around you.
          </p>
        </div>

        <div className="space-y-8">
          {/* Why This Matters */}
          <Card className="border-pink-200 bg-pink-50">
            <CardHeader>
              <CardTitle className="text-xl text-pink-900">Why This Matters</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-pink-800 leading-relaxed">
                Learning about respect and healthy relationships is one of the most important things you can do. 
                When you understand consent, inclusion, and how to treat others with kindness, you create a 
                better world for everyone. These skills will help you build strong friendships, feel confident 
                about yourself, and know how to stand up for what's right.
              </p>
            </CardContent>
          </Card>

          {/* What Is It? */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">What Is It?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-4">
                Respect and healthy relationships mean treating everyone with kindness and understanding:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-pink-600 mr-2">•</span>
                  Understanding that everyone deserves to be treated with respect
                </li>
                <li className="flex items-start">
                  <span className="text-pink-600 mr-2">•</span>
                  Learning about consent - saying yes or no and respecting others' choices
                </li>
                <li className="flex items-start">
                  <span className="text-pink-600 mr-2">•</span>
                  Including everyone regardless of differences
                </li>
                <li className="flex items-start">
                  <span className="text-pink-600 mr-2">•</span>
                  Speaking up against harassment or discrimination
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* How It Can Affect You */}
          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="text-xl text-purple-900">How It Can Affect You</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-800 leading-relaxed">
                When you don't feel respected or included, it can make you sad, angry, or confused. You might 
                feel left out, uncomfortable, or unsafe. Some people might treat you differently because of 
                who you are, and that's not okay. These experiences can affect your confidence and happiness, 
                but remember - you are valuable exactly as you are.
              </p>
            </CardContent>
          </Card>

          {/* Why You Deserve Better */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-xl text-green-900">Why You Deserve Better</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-800 leading-relaxed">
                Every person deserves to be treated with respect, kindness, and dignity. You have the right 
                to feel safe and included no matter who you are, what you look like, or who you care about. 
                Your feelings matter, your voice matters, and you deserve relationships that make you feel 
                good about yourself. You also have the power to treat others with the same respect.
              </p>
            </CardContent>
          </Card>

          {/* What You Can Do */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">What You Can Do</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-pink-600 mr-2">✓</span>
                  Always ask before touching someone or doing something that affects them
                </li>
                <li className="flex items-start">
                  <span className="text-pink-600 mr-2">✓</span>
                  Listen when someone says "no" and respect their boundaries
                </li>
                <li className="flex items-start">
                  <span className="text-pink-600 mr-2">✓</span>
                  Include others in activities and conversations
                </li>
                <li className="flex items-start">
                  <span className="text-pink-600 mr-2">✓</span>
                  Speak up if you see someone being treated unfairly
                </li>
                <li className="flex items-start">
                  <span className="text-pink-600 mr-2">✓</span>
                  Learn about different types of people and families
                </li>
                <li className="flex items-start">
                  <span className="text-pink-600 mr-2">✓</span>
                  Tell a trusted adult if someone makes you uncomfortable
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* If You See It Happening */}
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="text-xl text-orange-900">If You See It Happening</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-orange-800 leading-relaxed mb-4">
                If you see someone being disrespected or excluded:
              </p>
              <ul className="space-y-2 text-orange-800">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  Invite the person to join your group or activity
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  Tell the person being mean to stop
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  Support the person who is being treated badly
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  Tell a teacher, parent, or trusted adult what you saw
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Your Rights as a Student */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-xl text-blue-900">Your Rights as a Student</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">★</span>
                  You have the right to be treated with respect
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">★</span>
                  You have the right to feel safe and included
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">★</span>
                  You have the right to express who you are
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">★</span>
                  You have the right to say no to things that make you uncomfortable
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">★</span>
                  You have the right to get help when you need it
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Good Habits to Stay Safe */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Good Habits for Healthy Relationships</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">🤝</span>
                  Practice saying "please," "thank you," and "I'm sorry"
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">🤝</span>
                  Listen carefully when others are talking
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">🤝</span>
                  Ask questions to learn about different people and cultures
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">🤝</span>
                  Stand up for yourself and others in respectful ways
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">🤝</span>
                  Talk to trusted adults about your relationships and feelings
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Get Help Now */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-xl text-red-900 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Get Help Now
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert className="mb-4 border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  <strong>Remember:</strong> You are never alone, and it's always okay to ask for help.
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "Women Helpline", number: "1091", desc: "Support for girls and women" },
                  { name: "Childline India", number: "1098", desc: "Help for children facing problems" },
                  { name: "Mental Health Helpline", number: "9152987821", desc: "Talk about your feelings" },
                  { name: "Student Helpline", number: "1800-11-4477", desc: "Support for students and families" }
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
            </CardContent>
          </Card>

          {/* Remember */}
          <Card className="border-pink-200 bg-pink-50">
            <CardHeader>
              <CardTitle className="text-xl text-pink-900">Remember</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-pink-800 leading-relaxed text-center">
                You have the power to make the world a kinder place by treating everyone with respect and 
                standing up for what's right. Every person is valuable and deserves to be treated well, 
                including you. 
                <strong> When we all choose kindness and inclusion, we create a better world for everyone.</strong>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RespectRelationshipsAwareness;
