
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ResourceGrid = () => {
  const [activeFilter, setActiveFilter] = useState("All Resources");

  const filters = ["All Resources", "Stress Management", "Emotional Wellbeing", "Eating Habits", "Behavioral Support"];

  const resources = [
    {
      title: "Deep Breathing Exercises for Teens",
      description: "Simple 5-minute breathing techniques to reduce stress and anxiety.",
      category: "Stress Management",
      icon: "🧘",
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: "Understanding Your Emotions",
      description: "Learn to identify and process different emotional states.",
      category: "Emotional Wellbeing",
      icon: "💭",
      color: "bg-purple-50 border-purple-200"
    },
    {
      title: "Healthy Eating for Growing Bodies",
      description: "Nutrition tips for teenagers and developing positive eating habits.",
      category: "Eating Habits",
      icon: "🥗",
      color: "bg-green-50 border-green-200"
    },
    {
      title: "Conflict Resolution Skills",
      description: "How to handle disagreements with friends and family in a healthy way.",
      category: "Behavioral Support",
      icon: "🤝",
      color: "bg-orange-50 border-orange-200"
    },
    {
      title: "Mindfulness Meditation for Beginners",
      description: "Simple guided meditations for students to practice mindfulness.",
      category: "Stress Management",
      icon: "🧠",
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: "Building Positive Self-Talk",
      description: "Exercises to challenge negative thoughts and develop confidence.",
      category: "Emotional Wellbeing",
      icon: "💪",
      color: "bg-purple-50 border-purple-200"
    }
  ];

  const filteredResources = activeFilter === "All Resources" 
    ? resources 
    : resources.filter(resource => resource.category === activeFilter);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? "default" : "outline"}
            onClick={() => setActiveFilter(filter)}
            className={`${
              activeFilter === filter 
                ? "bg-teal-500 text-white hover:bg-teal-600" 
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {filter}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource, index) => (
          <Card key={index} className={`${resource.color} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <div className="text-3xl">{resource.icon}</div>
                <Badge variant="secondary" className="text-xs">
                  {resource.category}
                </Badge>
              </div>
              <CardTitle className="text-lg font-semibold text-gray-900">
                {resource.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 mb-4">
                {resource.description}
              </CardDescription>
              <Button 
                variant="outline" 
                className="w-full hover:bg-white hover:shadow-md transition-all duration-200"
              >
                View Resource →
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ResourceGrid;
