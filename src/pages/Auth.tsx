
import { useState } from "react";
import { Navigate } from "react-router-dom";
import AuthForm from "@/components/AuthForm";
import { useAuth } from "@/hooks/useAuth";

const Auth = () => {
  const { user, loading } = useAuth();
  const [authComplete, setAuthComplete] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (user && !loading) {
    // Redirect based on user role
    if (user.role === 'management') {
      return <Navigate to="/school-dashboard" replace />;
    } else {
      return <Navigate to="/student-dashboard" replace />;
    }
  }

  return <AuthForm onAuthComplete={() => setAuthComplete(true)} />;
};

export default Auth;
