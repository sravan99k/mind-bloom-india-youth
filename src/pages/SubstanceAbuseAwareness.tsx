
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Heart, Phone, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const SubstanceAbuseAwareness = () => {
  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="max-w-4xl mx-auto p-6 py-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="w-12 h-12 text-orange-600 mr-3" />
            <Heart className="w-8 h-8 text-pink-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Understanding Substance Abuse & Peer Pressure
          </h1>
          <p className="text-lg text-gray-600">
            You have the power to make healthy choices. Learn how to stay strong and say no.
          </p>
        </div>

        <div className="space-y-8">
          {/* Why This Matters */}
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="text-xl text-orange-900">Why This Matters</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-orange-800 leading-relaxed">
                As you grow up, you might face situations where people offer you drugs, alcohol, 
                or cigarettes. Learning about these substances and how to handle peer pressure 
                helps you make smart, healthy choices that protect your body and mind. 
                When you know how to say "no" confidently, you can stay true to yourself 
                and focus on your dreams and goals.
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
                Substance abuse means using drugs, alcohol, or other harmful substances that 
                can hurt your body and mind. Peer pressure is when friends or classmates 
                try to get you to do something you're not comfortable with. This can include:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  Being offered cigarettes, alcohol, or drugs
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  Feeling pressured to try substances to "fit in"
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  Being told that "everyone is doing it"
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  Feeling like you need substances to have fun or be cool
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* How It Can Affect You */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-xl text-red-900">How It Can Affect You</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-800 leading-relaxed">
                Substances can harm your growing body and brain in serious ways. They can affect 
                your memory, concentration, and ability to learn. You might feel sick, have trouble 
                sleeping, or lose interest in activities you used to love. Substance use can also 
                lead to problems at school, fights with family, and trouble with the law. 
                Most importantly, it can become an addiction that's very hard to overcome.
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
                You deserve to grow up healthy, strong, and free from addiction. Your body and 
                mind are developing, and you have the right to protect them. Real friends will 
                respect your choices and support you in staying healthy. You don't need substances 
                to be fun, cool, or accepted. You are already amazing just as you are, and you 
                deserve relationships and activities that make you feel good without harmful substances.
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
                  <span className="text-orange-600 mr-2">✓</span>
                  Practice saying "No, thank you" confidently and clearly
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">✓</span>
                  Choose friends who respect your values and decisions
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">✓</span>
                  Find healthy ways to have fun like sports, music, or hobbies
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">✓</span>
                  Talk to trusted adults about peer pressure situations
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">✓</span>
                  Remove yourself from situations that make you uncomfortable
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">✓</span>
                  Learn about the real effects of substances on your body
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* If You See It Happening */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-xl text-blue-900">If You See It Happening</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-800 leading-relaxed mb-4">
                If you see friends struggling with substance use or peer pressure:
              </p>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Don't judge them, but show that you care about their wellbeing
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Encourage them to talk to a trusted adult or counselor
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Suggest healthy activities you can do together instead
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Tell an adult if you're worried about their safety
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Be a positive influence by making healthy choices yourself
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Your Rights as a Student */}
          <Card className="border-teal-200 bg-teal-50">
            <CardHeader>
              <CardTitle className="text-xl text-teal-900">Your Rights as a Student</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-teal-800">
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">★</span>
                  You have the right to say no to substances without explanation
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">★</span>
                  You have the right to a drug-free school environment
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">★</span>
                  You have the right to get help if you're struggling with addiction
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">★</span>
                  You have the right to choose friends who support healthy choices
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">★</span>
                  You have the right to accurate information about substance effects
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Good Habits to Stay Safe */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Good Habits to Stay Strong</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">💪</span>
                  Build confidence through achievements in school, sports, or hobbies
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">💪</span>
                  Surround yourself with positive role models and supportive friends
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">💪</span>
                  Practice stress management through exercise, music, or art
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">💪</span>
                  Set personal goals and work toward achieving them
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">💪</span>
                  Stay busy with activities that make you feel good about yourself
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
                  <strong>Remember:</strong> Getting help for substance problems is brave and the first step to recovery.
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "Drug De-addiction Helpline", number: "1800-11-0031", desc: "Free support for substance abuse problems" },
                  { name: "NIMHANS Helpline", number: "080-26995000", desc: "Mental health and addiction treatment" },
                  { name: "Youth Helpline", number: "1800-233-3330", desc: "Support and counseling for young people" },
                  { name: "Childline India", number: "1098", desc: "Help for children in difficult situations" }
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
                You are stronger than any pressure you might face, and you have the power to make 
                choices that protect your health and future. True friends will respect your decisions 
                and support you in staying healthy. Every day you choose to stay substance-free is 
                a victory for your body, mind, and dreams. 
                <strong>You are valuable, you are capable, and you deserve a bright, healthy future.</strong>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SubstanceAbuseAwareness;
