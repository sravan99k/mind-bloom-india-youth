
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { TrendingUp, Calendar, Heart, Target, MessageSquare } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const DashboardStats = () => {
  const navigate = useNavigate();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m here to help you find mental health resources. How can I assist you today?' }
  ]);

  const handleTakeAssessment = () => {
    navigate('/assessment');
  };

  const handleContactCounselor = () => {
    navigate('/wellness#counselor-section');
  };

  const handleBrowseResources = () => {
    setIsChatbotOpen(true);
    // You can add logic here to fetch AI resources based on user's mental health state
  };

  const handleSendMessage = (message: string) => {
    // This is a simplified version - you'll need to integrate with an actual AI service
    const newMessages = [...chatMessages, { role: 'user', content: message }];
    setChatMessages(newMessages);
    
    // Simulate AI response
    setTimeout(() => {
      setChatMessages([...newMessages, { 
        role: 'assistant', 
        content: 'Based on your current state, I recommend checking out our guided meditation resources and connecting with a counselor for personalized support.'
      }]);
    }, 1000);
  };
  const stats = [
    {
      title: "Overall Wellbeing",
      value: "Good",
      description: "Based on your recent assessments",
      progress: 75,
      icon: Heart,
      color: "text-green-600"
    },
    {
      title: "Weekly Progress",
      value: "3/5",
      description: "Mindfulness sessions completed",
      progress: 60,
      icon: Target,
      color: "text-blue-600"
    },
    {
      title: "Streak",
      value: "7 days",
      description: "Consistent daily check-ins",
      progress: 100,
      icon: TrendingUp,
      color: "text-purple-600"
    },
    {
      title: "Next Assessment",
      value: "2 days",
      description: "Monthly wellbeing check",
      progress: 33,
      icon: Calendar,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Dashboard</h2>
        <p className="text-gray-600">Here's how you're doing with your mental health journey</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">{stat.value}</div>
                <p className="text-xs text-muted-foreground mb-3">{stat.description}</p>
                <Progress value={stat.progress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">{stat.progress}% complete</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200">
        <CardHeader>
          <CardTitle className="text-teal-800">Quick Actions</CardTitle>
          <CardDescription className="text-teal-600">
            Take care of your mental health today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={handleTakeAssessment}
              className="bg-teal-500 hover:bg-teal-600 text-white"
            >
              Take Assessment
            </Button>
            <Button 
              onClick={handleBrowseResources}
              variant="outline" 
              className="border-teal-300 text-teal-700 hover:bg-teal-50"
            >
              Browse Resources
            </Button>
            <Button 
              onClick={handleContactCounselor}
              variant="outline" 
              className="border-teal-300 text-teal-700 hover:bg-teal-50"
            >
              Contact Counselor
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Chatbot Modal */}
      <Dialog open={isChatbotOpen} onOpenChange={setIsChatbotOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-teal-600" />
              Mental Health Assistant
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-2">
            {chatMessages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.role === 'user' 
                      ? 'bg-teal-100 text-teal-900' 
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                  handleSendMessage(e.currentTarget.value);
                  e.currentTarget.value = '';
                }
              }}
            />
            <Button onClick={() => {
              const input = document.querySelector('input[type="text"]') as HTMLInputElement;
              if (input?.value.trim()) {
                handleSendMessage(input.value);
                input.value = '';
              }
            }}>
              Send
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardStats;
