
import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalizedDashboard from "@/components/personalized/PersonalizedDashboard";
import MoodTracker from "@/components/mood/MoodTracker";
import GuidedJournal from "@/components/journal/GuidedJournal";
import WellnessGoals from "@/components/goals/WellnessGoals";
import AchievementBadges from "@/components/gamification/AchievementBadges";
import AnonymousForum from "@/components/forum/AnonymousForum";
import CounselorConnect from "@/components/counselor/CounselorConnect";
import PlatformFeedback from "@/components/feedback/PlatformFeedback";

const WellnessDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Wellness Journey</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your personalized space for mental health and well-being. Track your progress, 
            connect with others, and access resources tailored just for you.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="mood">Mood</TabsTrigger>
            <TabsTrigger value="journal">Journal</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="achievements">Badges</TabsTrigger>
            <TabsTrigger value="forum">Forum</TabsTrigger>
            <TabsTrigger value="counselor">Counselor</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
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

          <TabsContent value="counselor" className="space-y-6">
            <CounselorConnect />
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <PlatformFeedback />
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default WellnessDashboard;
