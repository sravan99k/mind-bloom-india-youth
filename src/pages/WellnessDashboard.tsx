
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PersonalizedDashboard } from "@/components/personalized/PersonalizedDashboard";
import { MoodTracker } from "@/components/mood/MoodTracker";
import { GuidedJournal } from "@/components/journal/GuidedJournal";
import { WellnessGoals } from "@/components/goals/WellnessGoals";
import { AchievementBadges } from "@/components/gamification/AchievementBadges";
import { AnonymousForum } from "@/components/forum/AnonymousForum";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { Heart, BookOpen, Target, Award, MessageCircle, Sparkles } from "lucide-react";

const WellnessDashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to Your Wellness Journey
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Please sign in to access your personalized wellness dashboard
            </p>
            <Button 
              onClick={() => window.location.href = '/auth'}
              className="bg-teal-500 hover:bg-teal-600"
            >
              Sign In
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your Wellness Journey
            </h1>
            <p className="text-lg text-gray-600">
              Track, reflect, and grow with personalized mental health tools
            </p>
          </div>

          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="mood" className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span className="hidden sm:inline">Mood</span>
              </TabsTrigger>
              <TabsTrigger value="journal" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Journal</span>
              </TabsTrigger>
              <TabsTrigger value="goals" className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span className="hidden sm:inline">Goals</span>
              </TabsTrigger>
              <TabsTrigger value="achievements" className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span className="hidden sm:inline">Badges</span>
              </TabsTrigger>
              <TabsTrigger value="forum" className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Forum</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <PersonalizedDashboard />
            </TabsContent>

            <TabsContent value="mood" className="space-y-6">
              <MoodTracker />
            </TabsContent>

            <TabsContent value="journal" className="space-y-6">
              <GuidedJournal />
            </TabsContent>

            <TabsContent value="goals" className="space-y-6">
              <WellnessGoals />
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <AchievementBadges />
            </TabsContent>

            <TabsContent value="forum" className="space-y-6">
              <AnonymousForum />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WellnessDashboard;
