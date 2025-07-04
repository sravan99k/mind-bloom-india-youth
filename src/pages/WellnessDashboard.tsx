import React, { useState, useEffect } from "react";
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
  
  // Ensure active tab text is always blue and bold
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .wellness-tab[data-state="active"],
      .wellness-tab[data-state="active"] * {
        color: rgb(37, 99, 235) !important;
        font-weight: 600 !important;
      }
    `;
    document.head.appendChild(styleElement);
    
    // Cleanup function - properly typed to return void
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Smooth scroll to "My Wellness Journey" section
  const scrollToJourney = () => {
    const el = document.getElementById('wellness-journey');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };


  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-teal-100 to-blue-100 rounded-xl shadow mb-10 p-8 flex flex-col md:flex-row items-center justify-between overflow-hidden">
        <div className="z-10 max-w-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mb-2">Welcome to Your Wellness Journey</h2>
          <p className="text-lg text-teal-700 mb-4 max-w-xl">
            Every step counts. Track your progress, set goals, and connect with a supportive community.
          </p>
          <div className="italic text-teal-600 mb-4">
            “Taking care of your mind is the first step to unlocking your true potential.”
          </div>
          <button
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-2 rounded-full shadow transition-all"
            onClick={scrollToJourney}
          >
            Get Started
          </button>
        </div>
        <img
          src="/wellness-illustration.svg"
          alt="Wellness Illustration"
          className="w-48 md:w-64 lg:w-80 mt-6 md:mt-0 z-0 drop-shadow-xl"
          style={{ minWidth: 180 }}
        />
        {/* Decorative blurred blob */}
        <div className="absolute right-0 bottom-0 w-64 h-64 rounded-full bg-blue-200 opacity-30 blur-3xl z-0" />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div id="wellness-journey" className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Wellness Journey</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your personalized space for mental health and well-being. Track your progress, 
            connect with others, and access resources tailored just for you.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-8 bg-transparent gap-1">
            {[
              { value: 'dashboard', label: 'Dashboard' },
              { value: 'mood', label: 'Mood' },
              { value: 'journal', label: 'Journal' },
              { value: 'goals', label: 'Goals' },
              { value: 'achievements', label: 'Badges' },
              { value: 'forum', label: 'Forum' },
              { value: 'counselor', label: 'Counselor' },
              { value: 'feedback', label: 'Feedback' }
            ].map((tab) => (
              <TabsTrigger 
                key={tab.value}
                value={tab.value}
                className={`
                  wellness-tab relative px-4 py-2 text-sm font-medium rounded-md mx-1
                  transition-colors duration-200
                  ${
                    activeTab === tab.value
                      ? 'text-blue-600 font-semibold'
                      : 'text-black hover:bg-gray-50'
                  }
                `}
              >
                <span className="relative">
                  {tab.label}
                  {activeTab === tab.value && (
                    <span className="absolute -top-1 -right-2 h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                  )}
                </span>
              </TabsTrigger>
            ))}
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
