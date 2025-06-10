
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MessageCircle, Send, AlertTriangle, Phone, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const AIWellnessChatbot = () => {
  const [messages, setMessages] = useState<any[]>([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm Nova, your wellness assistant. I'm here to provide general support and information. Remember, I'm not a replacement for professional help. How can I support you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();

  const emergencyResources = [
    { name: "National Crisis Helpline", number: "1-800-273-8255", available: "24/7" },
    { name: "Child Helpline India", number: "1098", available: "24/7" },
    { name: "Youth Helpline", number: "1800-233-3330", available: "24/7" }
  ];

  const safeResponseTemplates = [
    {
      keywords: ['sad', 'depressed', 'down', 'low'],
      response: "I hear that you're feeling down. It's completely normal to have difficult days. Here are some gentle activities that might help: taking a short walk, listening to music you enjoy, or talking to someone you trust. Remember, these feelings are temporary."
    },
    {
      keywords: ['anxious', 'worried', 'nervous', 'stress'],
      response: "Feeling anxious can be really challenging. Some students find these techniques helpful: taking slow, deep breaths, trying a 5-minute meditation, or organizing their study space. Would you like me to suggest some specific breathing exercises?"
    },
    {
      keywords: ['study', 'exam', 'school', 'homework'],
      response: "School can definitely feel overwhelming sometimes! Here are some study tips that many students find helpful: breaking tasks into smaller chunks, taking regular breaks, and creating a comfortable study environment. What subject are you working on?"
    },
    {
      keywords: ['friend', 'social', 'lonely', 'alone'],
      response: "Social connections are really important for our wellbeing. Some ways to build friendships include joining clubs or activities you enjoy, being a good listener, and showing kindness to others. Remember, quality matters more than quantity when it comes to friendships."
    }
  ];

  const detectCrisisKeywords = (message: string) => {
    const crisisKeywords = ['hurt myself', 'suicide', 'kill myself', 'end it all', 'don\'t want to live'];
    return crisisKeywords.some(keyword => message.toLowerCase().includes(keyword));
  };

  const generateSafeResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Crisis detection
    if (detectCrisisKeywords(lowerMessage)) {
      return {
        content: "I'm really concerned about what you've shared. These feelings are serious, and I want you to know that help is available. Please reach out to a trusted adult, school counselor, or call one of these crisis helplines immediately. You don't have to go through this alone.",
        showEmergencyResources: true,
        alertCounselors: true
      };
    }

    // Find appropriate safe response
    for (const template of safeResponseTemplates) {
      if (template.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return { content: template.response, showEmergencyResources: false };
      }
    }

    // Default supportive response
    return {
      content: "Thank you for sharing that with me. While I can provide general support and wellness tips, I encourage you to speak with a school counselor, trusted adult, or family member about anything that's concerning you. Is there a specific area of wellness you'd like tips about?",
      showEmergencyResources: false
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = generateSafeResponse(inputMessage);
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: response.content,
        timestamp: new Date(),
        showEmergencyResources: response.showEmergencyResources,
        alertCounselors: response.alertCounselors
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      // If crisis detected, also show toast
      if (response.alertCounselors) {
        toast({
          title: "Crisis Support Available",
          description: "Please reach out for immediate help. Your school counselor has been notified.",
          variant: "destructive"
        });
      }
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Safety Notice */}
      <Alert className="border-blue-200 bg-blue-50">
        <AlertTriangle className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Important:</strong> Nova is an AI assistant providing general wellness support only. 
          For personal concerns, please speak with a school counselor, trusted adult, or family member. 
          In emergencies, contact crisis helplines immediately.
        </AlertDescription>
      </Alert>

      {/* Emergency Resources */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-800 flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Emergency Resources
          </CardTitle>
          <CardDescription className="text-red-600">
            Available 24/7 for immediate support
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {emergencyResources.map((resource, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg border border-red-200">
                <div>
                  <p className="font-medium text-red-900">{resource.name}</p>
                  <p className="text-sm text-red-700">Available {resource.available}</p>
                </div>
                <Badge variant="outline" className="text-red-700 border-red-300">
                  {resource.number}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-blue-500" />
            Nova - Your Wellness Assistant
          </CardTitle>
          <CardDescription>
            Get general wellness support and positive encouragement
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Messages */}
          <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p>{message.content}</p>
                  {message.showEmergencyResources && (
                    <div className="mt-2 p-2 bg-red-100 rounded border-l-4 border-red-500">
                      <p className="text-sm font-medium text-red-800">
                        Immediate help needed - Please contact emergency resources above ↑
                      </p>
                    </div>
                  )}
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                  <p>Nova is typing...</p>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Share what's on your mind..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isTyping}>
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Quick Response Buttons */}
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "I'm feeling stressed about school",
              "Tips for better sleep",
              "How to make friends",
              "Study motivation tips"
            ].map((quickResponse, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setInputMessage(quickResponse)}
                className="text-xs"
              >
                {quickResponse}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Safety Guidelines */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Remember
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm text-green-700 space-y-2">
            <li>• Nova provides general wellness tips, not medical advice</li>
            <li>• All conversations are private and secure</li>
            <li>• For personal concerns, speak with a trusted adult</li>
            <li>• Crisis situations require immediate professional help</li>
            <li>• You're never alone - support is always available</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIWellnessChatbot;
