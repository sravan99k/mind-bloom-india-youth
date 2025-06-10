
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface AuthFormProps {
  onAuthComplete: () => void;
}

const AuthForm = ({ onAuthComplete }: AuthFormProps) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    confirmPassword: "",
    role: "",
    // Personal information fields
    state: "",
    city: "",
    pincode: "",
    class: "",
    gender: "",
    rollno: "",
    schoolName: "",
    branch: "",
    // Management specific fields
    parentName: "",
    parentPhone: "",
    totalStudents: "",
    schoolAddress: ""
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

      if (error) {
        toast({
          title: "Login Error",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data.user) {
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        
        // Get user role to redirect appropriately
        const role = data.user.user_metadata?.role;
        
        // Navigate based on role
        if (role === 'management') {
          navigate('/school-dashboard');
        } else {
          navigate('/student-dashboard');
        }
        
        onAuthComplete();
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please check and try again.",
        variant: "destructive",
      });
      return;
    }

    if (signupData.password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    if (!signupData.role) {
      toast({
        title: "Role Required",
        description: "Please select your role (Student or School Management).",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
        options: {
          data: {
            name: signupData.name,
            role: signupData.role,
          }
        }
      });

      if (error) {
        toast({
          title: "Signup Error",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data.user) {
        // Save demographics with all the fields
        const { error: demoError } = await supabase
          .from('demographics')
          .insert({
            user_id: data.user.id,
            age: parseInt(signupData.class) || null,
            gender: signupData.gender,
            grade: signupData.class,
            school: signupData.schoolName,
            state: signupData.state,
            city: signupData.city,
            pincode: signupData.pincode,
            roll_no: signupData.rollno,
            branch: signupData.branch,
            parent_name: signupData.parentName,
            parent_phone: signupData.parentPhone,
            total_students: signupData.totalStudents,
            school_address: signupData.schoolAddress,
          });

        if (demoError) {
          console.error('Error saving demographics:', demoError);
        }

        toast({
          title: "Account Created!",
          description: "Your account has been created successfully. You can now access the platform.",
        });

        // Navigate based on role
        if (signupData.role === 'management') {
          navigate('/school-dashboard');
        } else {
          navigate('/student-dashboard');
        }
        
        onAuthComplete();
      }
    } catch (error) {
      toast({
        title: "Signup Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to NovoHealth</CardTitle>
          <CardDescription>
            Please sign in or create an account to access the mental health platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    required
                    disabled={loading}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-teal-500 hover:bg-teal-600"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      value={signupData.name}
                      onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-role">Role</Label>
                    <Select onValueChange={(value) => setSignupData({...signupData, role: value})} disabled={loading}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="management">School Management</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={signupData.email}
                      onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={signupData.password}
                      onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                      required
                      disabled={loading}
                      minLength={6}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-confirm">Confirm Password</Label>
                  <Input
                    id="signup-confirm"
                    type="password"
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                    required
                    disabled={loading}
                    minLength={6}
                  />
                </div>

                {/* Personal Information Section */}
                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={signupData.state}
                        onChange={(e) => setSignupData({...signupData, state: e.target.value})}
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={signupData.city}
                        onChange={(e) => setSignupData({...signupData, city: e.target.value})}
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input
                        id="pincode"
                        value={signupData.pincode}
                        onChange={(e) => setSignupData({...signupData, pincode: e.target.value})}
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select onValueChange={(value) => setSignupData({...signupData, gender: value})} disabled={loading}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="schoolName">School Name</Label>
                      <Input
                        id="schoolName"
                        value={signupData.schoolName}
                        onChange={(e) => setSignupData({...signupData, schoolName: e.target.value})}
                        required
                        disabled={loading}
                      />
                    </div>
                    {signupData.role === 'student' && (
                      <div className="space-y-2">
                        <Label htmlFor="class">Class</Label>
                        <Select onValueChange={(value) => setSignupData({...signupData, class: value})} disabled={loading}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your class" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="6">Class 6</SelectItem>
                            <SelectItem value="7">Class 7</SelectItem>
                            <SelectItem value="8">Class 8</SelectItem>
                            <SelectItem value="9">Class 9</SelectItem>
                            <SelectItem value="10">Class 10</SelectItem>
                            <SelectItem value="11">Class 11</SelectItem>
                            <SelectItem value="12">Class 12</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  {signupData.role === 'student' && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="rollno">Roll Number</Label>
                          <Input
                            id="rollno"
                            value={signupData.rollno}
                            onChange={(e) => setSignupData({...signupData, rollno: e.target.value})}
                            required
                            disabled={loading}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="branch">Branch/Stream</Label>
                          <Input
                            id="branch"
                            value={signupData.branch}
                            onChange={(e) => setSignupData({...signupData, branch: e.target.value})}
                            placeholder="Enter branch/stream"
                            disabled={loading}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="parentName">Parent/Guardian Name</Label>
                          <Input
                            id="parentName"
                            value={signupData.parentName}
                            onChange={(e) => setSignupData({...signupData, parentName: e.target.value})}
                            required
                            disabled={loading}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="parentPhone">Parent/Guardian Phone</Label>
                          <Input
                            id="parentPhone"
                            value={signupData.parentPhone}
                            onChange={(e) => setSignupData({...signupData, parentPhone: e.target.value})}
                            required
                            disabled={loading}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {signupData.role === 'management' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="totalStudents">Total Students</Label>
                        <Input
                          id="totalStudents"
                          value={signupData.totalStudents}
                          onChange={(e) => setSignupData({...signupData, totalStudents: e.target.value})}
                          placeholder="Number of students"
                          disabled={loading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="schoolAddress">School Address</Label>
                        <Input
                          id="schoolAddress"
                          value={signupData.schoolAddress}
                          onChange={(e) => setSignupData({...signupData, schoolAddress: e.target.value})}
                          placeholder="Complete school address"
                          disabled={loading}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-teal-500 hover:bg-teal-600"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm;
