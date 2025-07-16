
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Smile, Heart, Phone, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const MentalHealthAwareness = () => {
  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-4xl mx-auto p-6 py-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Smile className="w-12 h-12 text-green-600 mr-3" />
            <Heart className="w-8 h-8 text-pink-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mental Health & Emotional Wellbeing
          </h1>
          <p className="text-lg text-gray-600">
            Learning to care for your mind and feelings in healthy ways.
          </p>
        </div>

        <div className="space-y-8">
          {/* Why This Matters */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-xl text-green-900">Why This Matters</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-800 leading-relaxed">
                Your mental health is just as important as your physical health! Learning to understand 
                and take care of your emotions, thoughts, and feelings will help you feel happier, more 
                confident, and better able to handle challenges. When you know how to take care of your 
                mind, you can enjoy life more and be there for your friends and family too.
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
                Mental health and emotional wellbeing includes:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  Understanding your emotions and knowing they're normal
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  Learning healthy ways to deal with stress and difficult feelings
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  Feeling good about yourself and your body
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  Knowing when and how to ask for help when you're struggling
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
                Sometimes you might feel sad, worried, angry, or confused, and that's completely normal. 
                But if these feelings become very strong or last for a long time, they can make it hard 
                to concentrate in school, enjoy activities, or feel good about yourself. You might feel 
                tired, have trouble sleeping, or worry about how you look. Remember, these feelings are 
                real and important, and there are ways to feel better.
              </p>
            </CardContent>
          </Card>

          {/* Why You Deserve Better */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-xl text-blue-900">Why You Deserve Better</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-800 leading-relaxed">
                You deserve to feel happy, peaceful, and confident in yourself. You deserve to have 
                people who listen to you and support you when you're going through difficult times. 
                Your feelings matter, your mental health matters, and you are worthy of love and care 
                exactly as you are. Getting help for your mental health is just as normal and important 
                as getting help when you have a physical injury.
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
                  <span className="text-green-600 mr-2">✓</span>
                  Talk to someone you trust about your feelings
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Try deep breathing or mindfulness when you feel stressed
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Do activities that make you feel good and relaxed
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Get enough sleep, eat healthy foods, and exercise regularly
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Write in a journal about your thoughts and feelings
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Ask for help from a counselor, teacher, or parent when you need it
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* If You See It Happening */}
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="text-xl text-orange-900">If You See a Friend Struggling</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-orange-800 leading-relaxed mb-4">
                If you notice a friend seems sad, worried, or different than usual:
              </p>
              <ul className="space-y-2 text-orange-800">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  Let them know you care and are there to listen
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  Encourage them to talk to a trusted adult
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  Include them in fun activities
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  Tell a trusted adult if you're worried about their safety
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
                  You have the right to feel safe and supported at school
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">★</span>
                  You have the right to talk about your feelings without judgment
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">★</span>
                  You have the right to get help for your mental health
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">★</span>
                  You have the right to take breaks when you feel overwhelmed
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">★</span>
                  You have the right to privacy about your mental health
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Good Habits to Stay Safe */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Good Habits for Mental Wellbeing</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">🌱</span>
                  Start each day with something positive
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">🌱</span>
                  Practice gratitude by thinking of three good things daily
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">🌱</span>
                  Spend time in nature or doing activities you enjoy
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">🌱</span>
                  Connect with friends and family regularly
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">🌱</span>
                  Be kind to yourself when you make mistakes
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
                  <strong>Remember:</strong> If you're thinking about hurting yourself, call for help immediately. You matter!
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "Mental Health Helpline", number: "9152987821", desc: "Talk to someone who understands" },
                  { name: "Suicide Prevention", number: "9152987821", desc: "24/7 crisis support" },
                  { name: "Childline India", number: "1098", desc: "Support for children and teens" },
                  { name: "Student Helpline", number: "1800-11-4477", desc: "Academic and emotional support" }
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
                Your mental health journey is unique, and it's okay to have ups and downs. You are brave 
                for learning about mental health and taking care of yourself. Every feeling you have is 
                valid, and there are always people who want to help you feel better. 
                <strong> You are valuable, you are loved, and you deserve to feel happy and healthy.</strong>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MentalHealthAwareness;
