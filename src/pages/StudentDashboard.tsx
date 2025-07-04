
import React from "react";
import Footer from "@/components/Footer";
import DashboardStats from "@/components/DashboardStats";
import RecentActivity from "@/components/RecentActivity";
import { useAuth } from "@/hooks/useAuth";

const StudentDashboard = () => {
  const { user } = useAuth();

  const getUserName = () => {
    return user?.user_metadata?.name || user?.demographics?.name || "Student";
  };

  return (
    <div className="min-h-screen bg-gray-50">
            <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {getUserName()}!
            </h1>
            <p className="text-lg text-gray-600">
              Track your mental health journey and access personalized resources.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <DashboardStats />
            </div>
            <div>
              <RecentActivity />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StudentDashboard;
