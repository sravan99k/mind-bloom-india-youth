
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Globe, Heart, Phone, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const OnlineSafetyAwareness = () => {
  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">
      <div className="max-w-4xl mx-auto p-6 py-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Globe className="w-12 h-12 text-teal-600 mr-3" />
            <Heart className="w-8 h-8 text-pink-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Online Safety & Privacy
          </h1>
          <p className="text-lg text-gray-600">
            Learn how to stay safe online and protect your personal information.
          </p>
        </div>

        <div className="space-y-8">
          {/* Why This Matters */}
          <Card className="border-teal-200 bg-teal-50">
            <CardHeader>
              <CardTitle className="text-xl text-teal-900">Why This Matters</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-teal-800 leading-relaxed">
                The internet is an amazing place to learn, connect with friends, and have fun. But just like in 
                real life, there are some risks online. When you know how to stay safe and protect your privacy, 
                you can enjoy everything the internet offers while keeping yourself secure. Learning these skills 
                now will help you for your whole life!
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
                Online safety means protecting yourself and your information when using the internet. This includes:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">•</span>
                  Keeping your personal information private
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">•</span>
                  Being careful about what you share on social media
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">•</span>
                  Managing your screen time in healthy ways
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">•</span>
                  Recognizing and avoiding online dangers
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
                Spending too much time online or sharing too much information can make you feel anxious, 
                tired, or unsafe. You might worry about your privacy, feel overwhelmed by social media, 
                or have trouble focusing on schoolwork. These feelings are normal, and there are simple 
                ways to make your online experience much better and safer.
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
                You deserve to feel safe and in control of your online experience. Your personal information 
                belongs to you, and you have the right to decide what to share and what to keep private. 
                You also deserve to use technology in ways that make you feel good, not stressed or worried. 
                A healthy relationship with technology will help you succeed in school and life.
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
                  <span className="text-teal-600 mr-2">✓</span>
                  Use strong, unique passwords for all your accounts
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">✓</span>
                  Think twice before sharing personal information online
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">✓</span>
                  Check your privacy settings on social media regularly
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">✓</span>
                  Set limits on your screen time and take regular breaks
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">✓</span>
                  Be careful about clicking on suspicious links or downloads
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">✓</span>
                  Talk to trusted adults about your online experiences
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
                If you notice a friend sharing too much online or being unsafe:
              </p>
              <ul className="space-y-2 text-orange-800">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  Gently remind them about privacy settings
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  Suggest taking breaks from screens together
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  Encourage them to talk to a trusted adult
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  Be a good example with your own online behavior
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
                  You have the right to privacy online
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">★</span>
                  You have the right to control your personal information
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">★</span>
                  You have the right to use technology in healthy ways
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">★</span>
                  You have the right to learn about digital safety
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">★</span>
                  You have the right to ask for help with online issues
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Good Habits to Stay Safe */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Good Habits to Stay Safe</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">🛡️</span>
                  Create a daily routine that includes offline activities
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">🛡️</span>
                  Use devices in common areas where family can see you
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">🛡️</span>
                  Turn off notifications during study time and sleep
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">🛡️</span>
                  Regularly review and update your privacy settings
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">🛡️</span>
                  Keep your software and apps updated for security
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
                  <strong>Remember:</strong> If something online makes you uncomfortable, tell a trusted adult right away.
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "Cyber Crime Helpline", number: "1930", desc: "Report online crimes and get help" },
                  { name: "Childline India", number: "1098", desc: "Support for children facing problems" },
                  { name: "Mental Health Helpline", number: "9152987821", desc: "Talk about stress or anxiety" },
                  { name: "Student Helpline", number: "1800-11-4477", desc: "Academic and personal support" }
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
                You're smart for learning about online safety! The internet can be a wonderful place when you 
                know how to use it safely. Remember, it's always okay to ask questions, set boundaries, and 
                take breaks when you need them. 
                <strong> You have the power to create a positive online experience for yourself and others.</strong>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OnlineSafetyAwareness;
