
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Assessment from "./pages/Assessment";
import Resources from "./pages/Resources";
import WellnessDashboard from "./pages/WellnessDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import SchoolDashboard from "./pages/SchoolDashboard";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import ProgressTracking from "./pages/ProgressTracking";
import MyAssessments from "./pages/MyAssessments";
import ProfileSettings from "./pages/ProfileSettings";
import BuddySafe from "./pages/BuddySafe";
import CognitiveTasks from "./pages/CognitiveTasks";
import AlertsPage from "./pages/alerts";
import ReportsPage from "./pages/ReportsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SchoolSettings from "./pages/SchoolSettings";
import ChatPage from "./pages/ChatPage";

// BuddySafe Awareness Pages
import CyberbullyingAwareness from "./pages/CyberbullyingAwareness";
import PhysicalBullyingAwareness from "./pages/PhysicalBullyingAwareness";
import AcademicPressureAwareness from "./pages/AcademicPressureAwareness";
import SubstanceAbuseAwareness from "./pages/SubstanceAbuseAwareness";
import SubstanceAbuseViolenceAwareness from "./pages/SubstanceAbuseViolenceAwareness";
import SexualHarassmentAwareness from "./pages/SexualHarassmentAwareness";
import OnlineSafetyAwareness from "./pages/OnlineSafetyAwareness";
import RespectRelationshipsAwareness from "./pages/RespectRelationshipsAwareness";
import MentalHealthAwareness from "./pages/MentalHealthAwareness";

// Components
import { ProfanityFilterProvider } from "@/components/profanity-filter-provider";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AppLayout } from "@/components/AppLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <Sonner />
    <ProfanityFilterProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth route - no layout */}
          <Route path="/auth" element={<Auth />} />
          
          {/* All other routes with layout */}
          <Route element={<AppLayout />}>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/resources/*" element={<Resources />} />
            
            {/* BuddySafe awareness pages - accessible to all users */}
            <Route path="/cyberbullying-awareness" element={<CyberbullyingAwareness />} />
            <Route path="/physical-bullying-awareness" element={<PhysicalBullyingAwareness />} />
            <Route path="/academic-pressure-awareness" element={<AcademicPressureAwareness />} />
            <Route path="/substance-abuse-awareness" element={<SubstanceAbuseAwareness />} />
            <Route path="/substance-abuse-violence-awareness" element={<SubstanceAbuseViolenceAwareness />} />
            <Route path="/sexual-harassment-awareness" element={<SexualHarassmentAwareness />} />
            <Route path="/online-safety-awareness" element={<OnlineSafetyAwareness />} />
            <Route path="/respect-relationships-awareness" element={<RespectRelationshipsAwareness />} />
            <Route path="/mental-health-awareness" element={<MentalHealthAwareness />} />
            
            {/* Protected student routes */}
            <Route element={<ProtectedRoute allowedRoles={['student']} />}>
              <Route path="/assessment" element={<Assessment />} />
              <Route path="/wellness-dashboard" element={<WellnessDashboard />} />
              <Route path="/student-dashboard" element={<StudentDashboard />} />
              <Route path="/progress-tracking" element={<ProgressTracking />} />
              <Route path="/my-assessments" element={<MyAssessments />} />
              <Route path="/profile-settings" element={<ProfileSettings />} />
              <Route path="/buddysafe" element={<BuddySafe />} />
              <Route path="/cognitive-tasks" element={<CognitiveTasks />} />
              <Route path="/chat" element={<ChatPage />} />
            </Route>
            
            {/* Protected management routes */}
            <Route element={<ProtectedRoute allowedRoles={['management']} />}>
              <Route path="/school-dashboard" element={<SchoolDashboard />} />
              <Route path="/alerts" element={<AlertsPage />} />
              <Route path="/alerts/:category" element={<AlertsPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/school-settings" element={<SchoolSettings />} />
            </Route>
            
            {/* Redirects */}
            <Route path="/wellness" element={<Navigate to="/wellness-dashboard" replace />} />
            
            {/* Fallback routes */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProfanityFilterProvider>
  </QueryClientProvider>
);

export default App;
