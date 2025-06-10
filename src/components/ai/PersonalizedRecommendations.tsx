
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, BookOpen, Heart, Target, TrendingUp, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const PersonalizedRecommendations = () => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPersonalizedContent();
  }, []);

  const loadPersonalizedContent = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // In a real implementation, this would analyze:
        // - Past assessment results
        // - Mood tracking patterns
        // - Resource engagement history
        // - Stated preferences and goals
        
        const simulatedProfile = {
          primaryConcerns: ["Academic Stress", "Social Anxiety"],
          engagementHistory: ["breathing exercises", "study tips", "mindfulness"],
          preferredContentTypes: ["articles", "videos", "interactive"],
          riskLevel: "Low",
          lastAssessment: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        };

        const simulatedRecommendations = [
          {
            id: 1,
            type: "article",
            title: "5 Quick Study Breaks That Actually Work",
            description: "Evidence-based techniques to reduce academic stress and improve focus during study sessions.",
            matchReason: "Based on your recent academic stress indicators",
            estimatedTime: "3 min read",
            category: "Academic Wellness",
            priority: "High",
            aiConfidence: 92,
            tags: ["study tips", "stress relief", "time management"],
            content: {
              summary: "Research-backed strategies for effective study breaks that enhance learning and reduce burnout.",
              actionItems: [
                "Try the 5-minute walk technique",
                "Practice desk stretches between subjects", 
                "Use breathing exercises during transitions"
              ]
            }
          },
          {
            id: 2,
            type: "interactive",
            title: "Social Confidence Builder",
            description: "Interactive exercises to build social skills and reduce anxiety in group settings.",
            matchReason: "Personalized for social anxiety support",
            estimatedTime: "10 min activity",
            category: "Social Wellness",
            priority: "Medium",
            aiConfidence: 87,
            tags: ["social skills", "confidence", "peer interaction"],
            content: {
              summary: "Step-by-step practice scenarios for common social situations.",
              actionItems: [
                "Practice conversation starters",
                "Role-play scenarios with virtual coach",
                "Track social interaction goals"
              ]
            }
          },
          {
            id: 3,
            type: "video",
            title: "Mindful Morning Routine for Students",
            description: "A 5-minute guided routine to start your day with calm focus and positive energy.",
            matchReason: "Recommended for overall wellness improvement",
            estimatedTime: "5 min video",
            category: "Mindfulness",
            priority: "Medium",
            aiConfidence: 79,
            tags: ["morning routine", "mindfulness", "daily habits"],
            content: {
              summary: "Simple mindfulness practices designed specifically for busy students.",
              actionItems: [
                "Follow the guided breathing sequence",
                "Set daily intention practice",
                "Track mood improvements"
              ]
            }
          }
        ];

        setUserProfile(simulatedProfile);
        setRecommendations(simulatedRecommendations);
      }
    } catch (error) {
      console.error('Error loading personalized content:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-300';
      case 'Medium': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return BookOpen;
      case 'video': return TrendingUp;
      case 'interactive': return Target;
      default: return Heart;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* AI Personalization Header */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-600" />
            My Daily Dose of Positivity
          </CardTitle>
          <CardDescription className="text-purple-800">
            AI-curated content based on your wellness journey, preferences, and goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          {userProfile && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg border border-purple-200">
                <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-medium text-purple-900">Focus Areas</h4>
                <p className="text-sm text-purple-700">
                  {userProfile.primaryConcerns.join(", ")}
                </p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-purple-200">
                <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-medium text-purple-900">Progress Level</h4>
                <p className="text-sm text-purple-700">{userProfile.riskLevel} Risk</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-purple-200">
                <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-medium text-purple-900">Last Check-in</h4>
                <p className="text-sm text-purple-700">
                  {Math.floor((Date.now() - userProfile.lastAssessment.getTime()) / (24 * 60 * 60 * 1000))} days ago
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Personalized Recommendations */}
      <div className="space-y-4">
        {recommendations.map((rec) => {
          const IconComponent = getTypeIcon(rec.type);
          return (
            <Card key={rec.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <IconComponent className="h-6 w-6 text-blue-500" />
                    <div>
                      <CardTitle className="text-lg">{rec.title}</CardTitle>
                      <CardDescription>{rec.description}</CardDescription>
                    </div>
                  </div>
                  <Badge className={getPriorityColor(rec.priority)}>
                    {rec.priority} Priority
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Match Reason & Confidence */}
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-blue-900">Why this is recommended for you:</p>
                    <p className="text-sm text-blue-800">{rec.matchReason}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 bg-blue-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${rec.aiConfidence}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-blue-600">{rec.aiConfidence}% match</span>
                    </div>
                  </div>

                  {/* Content Preview */}
                  <div>
                    <p className="text-sm text-gray-700 mb-2">{rec.content.summary}</p>
                    <div className="space-y-1">
                      {rec.content.actionItems.map((item: string, index: number) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags & Metadata */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {rec.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      {rec.estimatedTime}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-blue-500 hover:bg-blue-600">
                      Start Activity
                    </Button>
                    <Button variant="outline">
                      Save for Later
                    </Button>
                    <Button variant="outline" size="sm">
                      👍
                    </Button>
                    <Button variant="outline" size="sm">
                      👎
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Feedback & Learning */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-800">Help Us Learn</CardTitle>
          <CardDescription className="text-green-600">
            Your feedback helps improve recommendations for you and other students
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto p-4 text-left border-green-300">
              <div>
                <div className="font-medium text-green-800">Rate Recommendations</div>
                <div className="text-sm text-green-600">Help us understand what works for you</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 text-left border-green-300">
              <div>
                <div className="font-medium text-green-800">Suggest Topics</div>
                <div className="text-sm text-green-600">Tell us what you'd like to learn about</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalizedRecommendations;
