
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User, Lock } from "lucide-react";

const ProfileSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    state: "",
    city: "",
    pincode: "",
    class: "",
    gender: "",
    rollno: "",
    schoolName: "",
    branch: "",
    parentName: "",
    parentPhone: ""
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    if (user) {
      loadProfileData();
    }
  }, [user]);

  const loadProfileData = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('demographics')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfileData({
          name: user.user_metadata?.name || "",
          email: user.email || "",
          state: (data as any).state || "",
          city: (data as any).city || "",
          pincode: (data as any).pincode || "",
          class: data.grade || "",
          gender: data.gender || "",
          rollno: (data as any).roll_no || "",
          schoolName: data.school || "",
          branch: (data as any).branch || "",
          parentName: (data as any).parent_name || "",
          parentPhone: (data as any).parent_phone || ""
        });
      }
    } catch (error) {
      console.error('Error loading profile data:', error);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Update user metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: { name: profileData.name }
      });

      if (updateError) throw updateError;

      // Update demographics
      const { error: demoError } = await supabase
        .from('demographics')
        .upsert({
          user_id: user?.id,
          state: profileData.state,
          city: profileData.city,
          pincode: profileData.pincode,
          grade: profileData.class,
          gender: profileData.gender,
          roll_no: profileData.rollno,
          school: profileData.schoolName,
          branch: profileData.branch,
          parent_name: profileData.parentName,
          parent_phone: profileData.parentPhone,
        });

      if (demoError) throw demoError;

      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Update Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });

      if (error) throw error;

      toast({
        title: "Password Updated",
        description: "Your password has been updated successfully.",
      });

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } catch (error: any) {
      toast({
        title: "Password Update Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
            <p className="text-lg text-gray-600">
              Manage your personal information and account security
            </p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Personal Information
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Security
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                          disabled={loading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          disabled
                          className="bg-gray-100"
                        />
                        <p className="text-xs text-gray-500">Email cannot be changed</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={profileData.state}
                          onChange={(e) => setProfileData({...profileData, state: e.target.value})}
                          disabled={loading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={profileData.city}
                          onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input
                          id="pincode"
                          value={profileData.pincode}
                          onChange={(e) => setProfileData({...profileData, pincode: e.target.value})}
                          disabled={loading}
                        />
                      </div>
                      {user?.role === 'student' && (
                        <div className="space-y-2">
                          <Label htmlFor="class">Class</Label>
                          <Select 
                            value={profileData.class} 
                            onValueChange={(value) => setProfileData({...profileData, class: value})}
                            disabled={loading}
                          >
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select 
                          value={profileData.gender} 
                          onValueChange={(value) => setProfileData({...profileData, gender: value})}
                          disabled={loading}
                        >
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
                      {user?.role === 'student' && (
                        <div className="space-y-2">
                          <Label htmlFor="rollno">Roll Number</Label>
                          <Input
                            id="rollno"
                            value={profileData.rollno}
                            onChange={(e) => setProfileData({...profileData, rollno: e.target.value})}
                            disabled={loading}
                          />
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="schoolName">School Name</Label>
                        <Input
                          id="schoolName"
                          value={profileData.schoolName}
                          onChange={(e) => setProfileData({...profileData, schoolName: e.target.value})}
                          disabled={loading}
                        />
                      </div>
                      {user?.role === 'student' && (
                        <div className="space-y-2">
                          <Label htmlFor="branch">Branch/Stream</Label>
                          <Input
                            id="branch"
                            value={profileData.branch}
                            onChange={(e) => setProfileData({...profileData, branch: e.target.value})}
                            disabled={loading}
                          />
                        </div>
                      )}
                    </div>

                    {user?.role === 'student' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="parentName">Parent/Guardian Name</Label>
                          <Input
                            id="parentName"
                            value={profileData.parentName}
                            onChange={(e) => setProfileData({...profileData, parentName: e.target.value})}
                            disabled={loading}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="parentPhone">Parent/Guardian Phone</Label>
                          <Input
                            id="parentPhone"
                            value={profileData.parentPhone}
                            onChange={(e) => setProfileData({...profileData, parentPhone: e.target.value})}
                            disabled={loading}
                          />
                        </div>
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      className="bg-teal-500 hover:bg-teal-600"
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "Update Profile"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>
                    Update your password to keep your account secure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordUpdate} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        disabled={loading}
                        minLength={6}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                        disabled={loading}
                        minLength={6}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="bg-teal-500 hover:bg-teal-600"
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "Update Password"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileSettings;
