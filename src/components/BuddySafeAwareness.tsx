
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Heart, Phone, AlertTriangle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IncidentType {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  stats: string;
  helplines: Array<{
    name: string;
    number: string;
    description: string;
  }>;
  preventionTips: string[];
}

const BuddySafeAwareness: React.FC = () => {
  const incidents: IncidentType[] = [
    {
      title: "Cyberbullying & Online Harassment",
      description: "Digital harassment, social media bullying, and online threats affecting students' mental health and academic performance.",
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      color: "border-blue-200 bg-blue-50",
      stats: "37% of students experience cyberbullying in India",
      helplines: [
        { name: "Cyber Crime Helpline", number: "1930", description: "24x7 cybercrime reporting" },
        { name: "Childline India", number: "1098", description: "Child protection services" },
        { name: "National Cyber Security Helpline", number: "155620", description: "Cyber security support" }
      ],
      preventionTips: [
        "Keep personal information private on social media",
        "Report and block users who send threatening messages",
        "Save evidence of cyberbullying (screenshots)",
        "Talk to trusted adults about online experiences"
      ]
    },
    {
      title: "Physical Bullying & Violence",
      description: "Physical aggression, intimidation, and violence in schools and educational institutions affecting student safety.",
      icon: <Users className="w-8 h-8 text-red-600" />,
      color: "border-red-200 bg-red-50",
      stats: "42% of students face physical bullying in schools",
      helplines: [
        { name: "Emergency Services", number: "112", description: "Immediate emergency response" },
        { name: "Women Helpline", number: "181", description: "Support for women and girls" },
        { name: "Student Helpline", number: "1800-11-4477", description: "Educational support services" }
      ],
      preventionTips: [
        "Report incidents to school authorities immediately",
        "Stay in groups and avoid isolated areas",
        "Learn basic self-defense techniques",
        "Document injuries and incidents for reporting"
      ]
    },
    {
      title: "Academic Pressure & Mental Health",
      description: "Extreme academic stress, exam anxiety, and mental health challenges leading to depression and self-harm.",
      icon: <Heart className="w-8 h-8 text-purple-600" />,
      color: "border-purple-200 bg-purple-50",
      stats: "68% of students report high academic stress levels",
      helplines: [
        { name: "Mental Health Helpline", number: "9152987821", description: "24x7 mental health support" },
        { name: "Sneha Suicide Prevention", number: "044-24640050", description: "Suicide prevention counseling" },
        { name: "iCall Psychosocial Helpline", number: "9152987821", description: "Psychological support" }
      ],
      preventionTips: [
        "Practice stress management techniques daily",
        "Maintain work-life balance with hobbies",
        "Seek counseling when feeling overwhelmed",
        "Talk openly about mental health with family"
      ]
    },
    {
      title: "Substance Abuse & Peer Pressure",
      description: "Drug abuse, alcohol consumption, and harmful peer pressure affecting student health and academic performance.",
      icon: <AlertTriangle className="w-8 h-8 text-orange-600" />,
      color: "border-orange-200 bg-orange-50",
      stats: "23% of students face peer pressure for substance abuse",
      helplines: [
        { name: "Drug De-addiction Helpline", number: "1800-11-0031", description: "Substance abuse support" },
        { name: "NIMHANS Helpline", number: "080-26995000", description: "Mental health & addiction" },
        { name: "Youth Helpline", number: "1800-233-3330", description: "Youth counseling services" }
      ],
      preventionTips: [
        "Choose friends who support positive choices",
        "Learn to say 'NO' confidently to peer pressure",
        "Engage in healthy activities and sports",
        "Seek help from counselors for addiction issues"
      ]
    }
  ];

  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Shield className="w-12 h-12 text-teal-600 mr-3" />
          <Heart className="w-8 h-8 text-pink-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          BuddySafe: Student Safety Awareness
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Understanding the top challenges faced by students in India and knowing where to get help. 
          You're not alone - support is always available.
        </p>
      </div>

      <Alert className="mb-8 border-teal-200 bg-teal-50">
        <Phone className="h-4 w-4 text-teal-600" />
        <AlertDescription className="text-teal-800">
          <strong>Emergency Situations:</strong> If you're in immediate danger, call 112 (Emergency Services) immediately. 
          Your safety is the top priority.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {incidents.map((incident, index) => (
          <Card key={index} className={`shadow-lg ${incident.color}`}>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                {incident.icon}
                <div>
                  <CardTitle className="text-xl text-gray-900">
                    {incident.title}
                  </CardTitle>
                  <CardDescription className="text-sm font-medium text-gray-600">
                    {incident.stats}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 text-sm">
                {incident.description}
              </p>
              
              <div>
                <h4 className="font-semibold text-gray-800 text-sm mb-2">📞 Get Help Now:</h4>
                <div className="space-y-2">
                  {incident.helplines.map((helpline, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-white rounded border">
                      <div className="flex-1">
                        <div className="font-medium text-sm text-gray-800">{helpline.name}</div>
                        <div className="text-xs text-gray-600">{helpline.description}</div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleCall(helpline.number)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1"
                      >
                        {helpline.number}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 text-sm mb-2">🛡️ Prevention Tips:</h4>
                <ul className="space-y-1">
                  {incident.preventionTips.map((tip, idx) => (
                    <li key={idx} className="text-xs text-gray-700 flex items-start">
                      <span className="text-teal-600 mr-2">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* National Resources Section */}
      <Card className="shadow-lg border-green-200 bg-green-50 mb-6">
        <CardHeader>
          <CardTitle className="text-xl text-green-900 flex items-center gap-2">
            <Phone className="w-5 h-5" />
            National Emergency & Support Numbers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Emergency Services", number: "112", desc: "Police, Fire, Medical Emergency" },
              { name: "Childline India", number: "1098", desc: "Child protection & rights" },
              { name: "Women Helpline", number: "181", desc: "24x7 support for women" },
              { name: "Mental Health Helpline", number: "9152987821", desc: "Psychological support" },
              { name: "Cyber Crime", number: "1930", desc: "Report cybercrime incidents" },
              { name: "Education Helpline", number: "1800-11-4477", desc: "Academic support services" }
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

      {/* Additional Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <h3 className="font-semibold text-blue-900 mb-2">📚 Additional Resources</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• National Commission for Protection of Child Rights (NCPCR)</li>
              <li>• Ministry of Education Student Support Portal</li>
              <li>• State Education Department Grievance Cell</li>
              <li>• School Counseling Services</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4">
            <h3 className="font-semibold text-purple-900 mb-2">🤝 Remember</h3>
            <p className="text-sm text-purple-800">
              Seeking help is a sign of strength, not weakness. Every student deserves to feel safe, 
              supported, and valued. If you or someone you know is facing any of these challenges, 
              reach out for help immediately.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BuddySafeAwareness;
