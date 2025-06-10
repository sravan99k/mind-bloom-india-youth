
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare, ThumbsUp, Lightbulb, Bug, Heart, BookOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const PlatformFeedback = () => {
  const [feedback, setFeedback] = useState<any[]>([]);
  const [newFeedback, setNewFeedback] = useState({
    category: "",
    rating: null as number | null,
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const feedbackCategories = [
    { value: "general", label: "General Feedback", icon: MessageSquare },
    { value: "feature_request", label: "Feature Request", icon: Lightbulb },
    { value: "bug_report", label: "Bug Report", icon: Bug },
    { value: "user_experience", label: "User Experience", icon: Heart },
    { value: "content", label: "Content & Resources", icon: BookOpen },
    { value: "support", label: "Support & Help", icon: ThumbsUp }
  ];

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('platform_feedback')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setFeedback(data || []);
      }
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  const submitFeedback = async () => {
    if (!newFeedback.category || !newFeedback.message.trim()) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Please log in",
          description: "You need to be logged in to submit feedback",
          variant: "destructive"
        });
        return;
      }

      const { error } = await supabase
        .from('platform_feedback')
        .insert({
          user_id: user.id,
          category: newFeedback.category,
          rating: newFeedback.rating,
          message: newFeedback.message
        });

      if (error) throw error;

      toast({
        title: "Feedback submitted!",
        description: "Thank you for helping us improve the platform"
      });

      setNewFeedback({ category: "", rating: null, message: "" });
      fetchFeedback();

    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Error",
        description: "Failed to submit feedback",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const StarRating = ({ rating, onRatingChange }: { rating: number | null, onRatingChange: (rating: number) => void }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className={`p-1 transition-colors ${
              rating && star <= rating 
                ? 'text-yellow-400' 
                : 'text-gray-300 hover:text-yellow-200'
            }`}
          >
            <Star className="h-6 w-6 fill-current" />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-purple-600" />
            Platform Feedback
          </CardTitle>
          <CardDescription className="text-purple-800">
            Help us improve NovoHealth by sharing your thoughts, suggestions, and experiences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border border-purple-200">
              <Lightbulb className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-medium text-purple-900">Share Ideas</h4>
              <p className="text-sm text-purple-700">Suggest new features or improvements</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-purple-200">
              <Bug className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-medium text-purple-900">Report Issues</h4>
              <p className="text-sm text-purple-700">Help us fix bugs and problems</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border border-purple-200">
              <Heart className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-medium text-purple-900">Rate Experience</h4>
              <p className="text-sm text-purple-700">Tell us what's working well</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feedback Form */}
      <Card>
        <CardHeader>
          <CardTitle>Submit Feedback</CardTitle>
          <CardDescription>
            Your input helps us create a better experience for all students
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <Select 
              value={newFeedback.category} 
              onValueChange={(value) => setNewFeedback({ ...newFeedback, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select feedback category" />
              </SelectTrigger>
              <SelectContent>
                {feedbackCategories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <SelectItem key={category.value} value={category.value}>
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-4 w-4" />
                        {category.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Overall Rating (optional)
            </label>
            <div className="flex items-center gap-4">
              <StarRating 
                rating={newFeedback.rating} 
                onRatingChange={(rating) => setNewFeedback({ ...newFeedback, rating })}
              />
              {newFeedback.rating && (
                <span className="text-sm text-gray-600">
                  {newFeedback.rating} out of 5 stars
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Feedback *
            </label>
            <Textarea
              placeholder="Please share your thoughts, suggestions, or report any issues you've encountered. Be as specific as possible to help us understand and address your feedback."
              value={newFeedback.message}
              onChange={(e) => setNewFeedback({ ...newFeedback, message: e.target.value })}
              className="min-h-[120px]"
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Feedback Guidelines</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Be specific about features, pages, or functionality</li>
              <li>• Describe what you expected vs. what happened</li>
              <li>• Include suggestions for improvement when possible</li>
              <li>• Be constructive and respectful in your feedback</li>
            </ul>
          </div>

          <Button onClick={submitFeedback} disabled={loading} className="w-full">
            {loading ? "Submitting..." : "Submit Feedback"}
          </Button>
        </CardContent>
      </Card>

      {/* Previous Feedback */}
      <Card>
        <CardHeader>
          <CardTitle>Your Previous Feedback</CardTitle>
          <CardDescription>
            Track your submitted feedback and suggestions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {feedback.length > 0 ? (
            <div className="space-y-4">
              {feedback.map((item) => {
                const category = feedbackCategories.find(c => c.value === item.category);
                const IconComponent = category?.icon || MessageSquare;
                
                return (
                  <div key={item.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-5 w-5 text-gray-600" />
                        <Badge variant="outline">
                          {category?.label || item.category}
                        </Badge>
                        {item.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600">{item.rating}/5</span>
                          </div>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(item.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700">{item.message}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No feedback submitted yet</h3>
              <p className="text-gray-600">
                Share your thoughts to help us improve the platform
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Feedback Options */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Feedback</CardTitle>
          <CardDescription>
            Common areas where we'd love to hear from you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Assessment Experience", desc: "How was taking the mental health assessments?" },
              { title: "Resource Quality", desc: "Are the articles and resources helpful?" },
              { title: "Navigation & Design", desc: "Is the platform easy to use and navigate?" },
              { title: "Mood Tracking", desc: "How do you find the mood tracking feature?" }
            ].map((item, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 flex-col gap-2 text-left"
                onClick={() => {
                  setNewFeedback({
                    category: "user_experience",
                    rating: null,
                    message: `Feedback about ${item.title}: `
                  });
                }}
              >
                <div className="font-medium">{item.title}</div>
                <div className="text-sm text-gray-600">{item.desc}</div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlatformFeedback;
