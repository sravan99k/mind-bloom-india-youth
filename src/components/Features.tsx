
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      title: "Mental Health Assessment",
      description: "Comprehensive assessments covering stress, depression, eating behaviors, and more.",
      icon: "🧠",
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: "Personalized Resources",
      description: "Age-appropriate resources and activities tailored to your specific needs.",
      icon: "📚",
      color: "bg-green-50 border-green-200"
    },
    {
      title: "School Support",
      description: "Connect with school counselors and administrators for additional support.",
      icon: "🏫",
      color: "bg-purple-50 border-purple-200"
    },
    {
      title: "Progress Tracking",
      description: "Monitor your mental health journey with regular check-ins and assessments.",
      icon: "📈",
      color: "bg-orange-50 border-orange-200"
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How MindfulMe Helps You
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our platform provides comprehensive support for mental health awareness 
            and wellbeing among school students across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className={`${feature.color} hover:shadow-lg transition-shadow duration-300`}>
              <CardHeader className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
