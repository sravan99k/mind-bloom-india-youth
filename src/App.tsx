
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Assessment from "./pages/Assessment";
import Resources from "./pages/Resources";
import StudentDashboard from "./pages/StudentDashboard";
import SchoolDashboard from "./pages/SchoolDashboard";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import ProgressTracking from "./pages/ProgressTracking";
import MyAssessments from "./pages/MyAssessments";
import ProfileSettings from "./pages/ProfileSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/school-dashboard" element={<SchoolDashboard />} />
        <Route path="/progress-tracking" element={<ProgressTracking />} />
        <Route path="/my-assessments" element={<MyAssessments />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
