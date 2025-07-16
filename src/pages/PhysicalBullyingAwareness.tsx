
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Users, Heart, Phone, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const PhysicalBullyingAwareness = () => {
  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <div className="max-w-4xl mx-auto p-6 py-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Users className="w-12 h-12 text-red-600 mr-3" />
            <Heart className="w-8 h-8 text-pink-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Understanding Physical Bullying & Violence
          </h1>
          <p className="text-lg text-gray-600">
            Your body and safety are important. Learn how to protect yourself and get help.
          </p>
        </div>

        <div className="space-y-8">
          {/* Why This Matters */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-xl text-red-900">Why This Matters</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-800 leading-relaxed">
                School should be a safe place where you can learn and grow without fear. 
                When you understand what physical bullying is and know how to respond, 
                you can protect yourself and help create a safer environment for everyone. 
                No one has the right to hurt your body or make you feel unsafe.
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
                Physical bullying is when someone uses their body or objects to hurt, 
                scare, or control another person. This includes:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Hitting, kicking, pushing, or shoving
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Throwing things at someone
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Damaging or stealing someone's belongings
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Making threatening gestures or blocking someone's way
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  Any unwanted physical contact that makes you uncomfortable
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
                Physical bullying can hurt your body and your feelings. You might feel scared 
                to go to certain places at school or be around certain people. You might have 
                bruises, scratches, or feel pain. It can also make you feel sad, angry, or worried. 
                You might not want to go to school or have trouble concentrating on your studies. 
                These reactions are normal, and it's important to get help.
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
                Your body belongs to you, and no one has the right to hurt you physically. 
                Every student deserves to feel safe at school and in their community. 
                You have the right to learn in a peaceful environment without fear of being hurt. 
                You are valuable, you are important, and your safety matters. 
                Violence is never okay, and it's never your fault when someone hurts you.
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
                  <span className="text-red-600 mr-2">✓</span>
                  Tell a trusted adult immediately - parents, teachers, or school counselors
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✓</span>
                  Stay near friends and avoid being alone in unsafe areas
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✓</span>
                  Walk away from dangerous situations when possible
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✓</span>
                  Document any injuries with photos and keep records
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✓</span>
                  Learn basic safety skills like staying alert and calling for help
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✓</span>
                  Report incidents to school authorities every time they happen
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
                Being a good bystander can help stop bullying and keep everyone safer:
              </p>
              <ul className="space-y-2 text-orange-800">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  Get help from an adult immediately - don't ignore it
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  If safe to do so, loudly say "Stop!" to draw attention
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  Don't film or take pictures - focus on getting help
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  Be a friend to the person who was hurt afterwards
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  Never join in or encourage the bullying
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
                  You have the right to be physically safe at school
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">★</span>
                  You have the right to report violence without fear of revenge
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">★</span>
                  You have the right to get medical help if you're injured
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">★</span>
                  You have the right to have adults take your concerns seriously
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">★</span>
                  You have the right to learn in a peaceful environment
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
                  Stay with friends in groups, especially in hallways and playgrounds
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">🛡️</span>
                  Learn the school layout and know where to find help quickly
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">🛡️</span>
                  Walk confidently and stay aware of your surroundings
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">🛡️</span>
                  Build friendships with kind, respectful classmates
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">🛡️</span>
                  Practice conflict resolution skills to solve problems peacefully
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
                  <strong>Emergency:</strong> If you're in immediate danger, call 112 right away!
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "Emergency Services", number: "112", desc: "Immediate help for dangerous situations" },
                  { name: "Childline India", number: "1098", desc: "Protection and support for children" },
                  { name: "Women Helpline", number: "181", desc: "Support for girls and women in trouble" },
                  { name: "Student Support", number: "1800-11-4477", desc: "Help with school-related problems" }
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
                You are brave for learning about this topic and seeking help when needed. 
                Physical bullying is serious, but it can be stopped when caring adults and 
                students work together. You deserve to feel safe every single day. 
                <strong>You are important, you are protected, and people care about your wellbeing.</strong>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PhysicalBullyingAwareness;
