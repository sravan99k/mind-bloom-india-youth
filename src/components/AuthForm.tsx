import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProfanityFilteredInput } from "@/components/ui/profanity-filtered-input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    // Management specific fields
    parentName: "",
    parentPhone: ""
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

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
          duration: 2000,
        });
        return;
      }

      if (data.user) {
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
          duration: 2000,
        });
        onAuthComplete();
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
        duration: 2000,
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
        duration: 2000,
      });
      return;
    }

    if (signupData.password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
        duration: 2000,
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
      // First, create the user account
      const { data, error } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
        options: {
          data: {
            full_name: signupData.name,
            role: signupData.role,
          }
        }
      });

      if (error) {
        toast({
          title: "Signup Error",
          description: error.message,
          variant: "destructive",
          duration: 2000,
        });
        return;
      }

      if (data.user) {
        // Prepare date of birth
        let dateOfBirth = null;
        if (signupData.dobYear && signupData.dobMonth && signupData.dobDay) {
          dateOfBirth = `${signupData.dobYear}-${signupData.dobMonth.padStart(2, '0')}-${signupData.dobDay.padStart(2, '0')}`;
        }

        // Save to user_demographics table (correct table name)
        const { error: demoError } = await supabase
          .from('user_demographics')
          .insert({
            user_id: data.user.id,
            full_name: signupData.name,
            email: signupData.email,
            role: signupData.role,
            state: signupData.state,
            city: signupData.city,
            pincode: signupData.pincode,
            class: signupData.class,
            gender: signupData.gender,
            rollno: signupData.rollno,
            school_name: signupData.schoolName,
            school_branch: signupData.branch,
            date_of_birth: dateOfBirth,
            parent_name: signupData.parentName,
            parent_phone: signupData.parentPhone,
          });

        if (demoError) {
          console.error('Error saving user demographics:', demoError);
          toast({
            title: "Profile Setup Error",
            description: "Account created but there was an issue saving your profile. You can update it later.",
            variant: "default",
            duration: 3000,
          });
        }

        toast({
          title: "Account Created!",
          description: "Your account has been created successfully. You can now access the platform.",
          duration: 2000,
        });
        onAuthComplete();
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "Signup Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
        duration: 2000,
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
                  <ProfanityFilteredInput
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    disabled={loading}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <ProfanityFilteredInput
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    disabled={loading}
                    required
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
                    <ProfanityFilteredInput
                      id="name"
                      placeholder="John Doe"
                      value={signupData.name}
                      onChange={(e) =>
                        setSignupData({ ...signupData, name: e.target.value })
                      }
                      disabled={loading}
                      required
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
                    <ProfanityFilteredInput
                      id="signup-email"
                      type="email"
                      placeholder="name@example.com"
                      value={signupData.email}
                      onChange={(e) =>
                        setSignupData({ ...signupData, email: e.target.value })
                      }
                      disabled={loading}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <ProfanityFilteredInput
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={signupData.password}
                      onChange={(e) =>
                        setSignupData({ ...signupData, password: e.target.value })
                      }
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-confirm">Confirm Password</Label>
                  <ProfanityFilteredInput
                    id="signup-confirm"
                    type="password"
                    placeholder="••••••••"
                    value={signupData.confirmPassword}
                    onChange={(e) =>
                      setSignupData({ ...signupData, confirmPassword: e.target.value })
                    }
                    disabled={loading}
                    required
                  />
                </div>

                {/* Personal Information Section */}
                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium mb-4">Personal Information</h3>

                  {/* Date of Birth Dropdowns - Only show for students */}
                  {signupData.role !== 'management' && (
                    <div className="mb-4">
                      <Label>Date of Birth</Label>
                      <div className="flex gap-2 mt-1">
                        <select
                          className="border rounded px-2 py-1 text-sm"
                          value={signupData.dobDay}
                          onChange={e => setSignupData({ ...signupData, dobDay: e.target.value })}
                          required={signupData.role === 'student'}
                          disabled={loading}
                        >
                          <option value="">Day</option>
                          {[...Array(31)].map((_, i) => (
                            <option key={i+1} value={String(i+1).padStart(2, '0')}>{i+1}</option>
                          ))}
                        </select>
                        <select
                          className="border rounded px-2 py-1 text-sm"
                          value={signupData.dobMonth}
                          onChange={e => setSignupData({ ...signupData, dobMonth: e.target.value })}
                          required={signupData.role === 'student'}
                          disabled={loading}
                        >
                          <option value="">Month</option>
                          {[
                            { value: "01", label: "Jan" },
                            { value: "02", label: "Feb" },
                            { value: "03", label: "Mar" },
                            { value: "04", label: "Apr" },
                            { value: "05", label: "May" },
                            { value: "06", label: "Jun" },
                            { value: "07", label: "Jul" },
                            { value: "08", label: "Aug" },
                            { value: "09", label: "Sep" },
                            { value: "10", label: "Oct" },
                            { value: "11", label: "Nov" },
                            { value: "12", label: "Dec" },
                          ].map(m => (
                            <option key={m.value} value={m.value}>{m.label}</option>
                          ))}
                        </select>
                        <select
                          className="border rounded px-2 py-1 text-sm"
                          value={signupData.dobYear}
                          onChange={e => setSignupData({ ...signupData, dobYear: e.target.value })}
                          required={signupData.role === 'student'}
                          disabled={loading}
                        >
                          <option value="">Year</option>
                          {Array.from({ length: 30 }, (_, i) => 2025 - i - 5).map(y => (
                            <option key={y} value={y}>{y}</option>
                          ))}
                        </select>
                      </div>
                      {signupData.role === 'student' && (!signupData.dobDay || !signupData.dobMonth || !signupData.dobYear) && (
                        <div className="text-xs text-red-500 mt-1">Date of birth is required for students</div>
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <ProfanityFilteredInput
                        id="state"
                        placeholder="State"
                        value={signupData.state}
                        onChange={(e) =>
                          setSignupData({ ...signupData, state: e.target.value })
                        }
                        disabled={loading}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <ProfanityFilteredInput
                        id="city"
                        placeholder="City"
                        value={signupData.city}
                        onChange={(e) =>
                          setSignupData({ ...signupData, city: e.target.value })
                        }
                        disabled={loading}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode</Label>
                      <ProfanityFilteredInput
                        id="pincode"
                        placeholder="Pincode"
                        type="number"
                        value={signupData.pincode}
                        onChange={(e) =>
                          setSignupData({ ...signupData, pincode: e.target.value })
                        }
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
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {signupData.role !== 'management' && (
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
                    )}
                    {signupData.role === 'student' && (
                      <div className="space-y-2">
                        <Label htmlFor="rollno">Roll Number</Label>
                        <ProfanityFilteredInput
                          id="rollno"
                          placeholder="Roll Number"
                          value={signupData.rollno}
                          onChange={(e) =>
                            setSignupData({ ...signupData, rollno: e.target.value })
                          }
                          disabled={loading}
                        />
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="schoolName">School Name</Label>
                      <ProfanityFilteredInput
                        id="schoolName"
                        placeholder="School Name"
                        value={signupData.schoolName}
                        onChange={(e) =>
                          setSignupData({ ...signupData, schoolName: e.target.value })
                        }
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="branch">School Branch</Label>
                      <ProfanityFilteredInput
                        id="branch"
                        placeholder="School Branch"
                        value={signupData.branch}
                        onChange={(e) =>
                          setSignupData({ ...signupData, branch: e.target.value })
                        }
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {signupData.role === 'student' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="parentName">Parent/Guardian Name</Label>
                        <ProfanityFilteredInput
                          id="parentName"
                          placeholder="Parent/Guardian Name"
                          value={signupData.parentName}
                          onChange={(e) =>
                            setSignupData({ ...signupData, parentName: e.target.value })
                          }
                          disabled={loading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="parentPhone">Parent/Guardian Phone</Label>
                        <ProfanityFilteredInput
                          id="parentPhone"
                          placeholder="Parent/Guardian Phone"
                          type="tel"
                          value={signupData.parentPhone}
                          onChange={(e) =>
                            setSignupData({ ...signupData, parentPhone: e.target.value })
                          }
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
