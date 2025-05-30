
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      title: "Fun Mental Health Check",
      description: "Interactive assessments that feel like games, covering stress, emotions, and wellbeing!",
      icon: "🧠",
      emoji: "🎮",
      color: "bg-gradient-to-br from-blue-100 to-blue-200 border-blue-300",
      hoverColor: "hover:from-blue-200 hover:to-blue-300"
    },
    {
      title: "Cool Learning Resources",
      description: "Age-friendly activities, videos, and tools designed just for young minds like yours!",
      icon: "📚",
      emoji: "🌟",
      color: "bg-gradient-to-br from-green-100 to-green-200 border-green-300",
      hoverColor: "hover:from-green-200 hover:to-green-300"
    },
    {
      title: "School Helper Network",
      description: "Connect with caring teachers and counselors who want to support your journey!",
      icon: "🏫",
      emoji: "🤝",
      color: "bg-gradient-to-br from-purple-100 to-purple-200 border-purple-300",
      hoverColor: "hover:from-purple-200 hover:to-purple-300"
    },
    {
      title: "Progress Adventure",
      description: "Track your emotional growth like leveling up in a game with colorful charts!",
      icon: "📈",
      emoji: "🚀",
      color: "bg-gradient-to-br from-orange-100 to-orange-200 border-orange-300",
      hoverColor: "hover:from-orange-200 hover:to-orange-300"
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-20 left-20 w-20 h-20 bg-purple-200 rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-16 h-16 bg-blue-200 rounded-full animate-pulse delay-300"></div>
        <div className="absolute top-60 right-40 w-12 h-12 bg-green-200 rounded-full animate-pulse delay-700"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
              How NovoHealth
            </span>
            <br />
            <span className="text-gray-900">Makes You Awesome! ✨</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto font-medium">
            Our colorful platform provides super cool support for mental health 
            awareness and wellbeing for amazing students like you across India! 🇮🇳
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`${feature.color} ${feature.hoverColor} border-2 hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-rotate-1 cursor-pointer animate-fade-in relative overflow-hidden`}
              style={{animationDelay: `${index * 200}ms`}}
            >
              {/* Decorative corner element */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-white/30 rounded-bl-full"></div>
              
              <CardHeader className="text-center relative">
                <div className="text-6xl mb-4 animate-bounce" style={{animationDelay: `${index * 100}ms`}}>
                  {feature.icon}
                </div>
                <div className="absolute top-2 right-2 text-2xl animate-spin-slow">
                  {feature.emoji}
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 leading-tight">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-700 text-center font-medium text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action section */}
        <div className="text-center mt-16 animate-fade-in">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Start Your Awesome Journey? 🎊
            </h3>
            <p className="text-xl text-purple-100 mb-6">
              Join thousands of students already exploring their mental wellness!
            </p>
            <div className="flex justify-center space-x-4">
              <span className="text-4xl animate-bounce">🌟</span>
              <span className="text-4xl animate-bounce delay-100">🎨</span>
              <span className="text-4xl animate-bounce delay-200">🚀</span>
              <span className="text-4xl animate-bounce delay-300">💫</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
