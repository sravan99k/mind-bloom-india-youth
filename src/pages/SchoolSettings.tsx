import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import Footer from "@/components/Footer";
import { Save, School, Users, Lock, Bell, Shield, Mail, Calendar, BookOpen, Key, User, Check, X, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Form schema for school information
const schoolFormSchema = z.object({
  schoolName: z.string().min(2, "School name must be at least 2 characters"),
  address: z.string().min(5, "Please enter a valid address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email"),
  website: z.string().url("Please enter a valid URL").or(z.literal("")),
  academicYear: z.string(),
  timezone: z.string(),
  about: z.string().max(500, "About section cannot exceed 500 characters").optional(),
  currentPassword: z.string().min(8, "Password must be at least 8 characters").optional(),
  newPassword: z.string().min(8, "New password must be at least 8 characters").optional(),
  confirmPassword: z.string().min(8, "Please confirm your password").optional(),
}).refine((data) => {
  if (data.newPassword || data.confirmPassword) {
    return data.newPassword === data.confirmPassword;
  }
  return true;
}, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SchoolFormValues = z.infer<typeof schoolFormSchema>;

// Default form values
const defaultValues: Partial<SchoolFormValues> = {
  schoolName: "Example High School",
  address: "123 Education St, Learning City",
  phone: "+1 (555) 123-4567",
  email: "info@examplehigh.edu",
  website: "https://examplehigh.edu",
  academicYear: "2024-2025",
  timezone: "America/New_York",
  about: "A leading educational institution committed to excellence in learning and student development.",
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function SchoolSettings() {
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    weeklyReports: true,
    systemUpdates: true,
  });
  const [security, setSecurity] = useState({
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordPolicy: "medium",
  });

  const form = useForm<SchoolFormValues>({
    resolver: zodResolver(schoolFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: SchoolFormValues) => {
    try {
      setIsSaving(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Settings saved successfully",
        description: "Your school settings have been updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleNotificationChange = (key: keyof typeof notifications, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSecurityChange = (key: keyof typeof security, value: any) => {
    setSecurity(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  // Password validation states
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const validatePassword = (password: string) => {
    setPasswordValidation({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    });
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    form.setValue("newPassword", newPassword, { shouldValidate: true });
    validatePassword(newPassword);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
            <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">School Settings</h1>
                <p className="text-muted-foreground">
                  Manage your school's profile, notifications, and security settings
                </p>
              </div>
              <Button className="bg-teal-600 hover:bg-teal-700">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>

            <Tabs 
              defaultValue="general" 
              className="space-y-6"
              onValueChange={setActiveTab}
              value={activeTab}
            >
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="general" className="flex items-center justify-center gap-2">
                  <School className="w-4 h-4" />
                  <span>General</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center justify-center gap-2">
                  <Bell className="w-4 h-4" />
                  <span>Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>Security</span>
                </TabsTrigger>
                <TabsTrigger value="academics" className="flex items-center justify-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Academics</span>
                </TabsTrigger>
              </TabsList>

              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <TabsContent value="general" className="space-y-6">
                  {/* School Information Card */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg font-semibold">School Information</CardTitle>
                          <CardDescription>
                            Update your school's basic information and contact details
                          </CardDescription>
                        </div>
                        <Button variant="outline" size="sm" className="h-8">
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="schoolName">School Name</Label>
                            <Input 
                              id="schoolName" 
                              placeholder="Enter school name"
                              {...form.register("schoolName")}
                              className="bg-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                              id="email" 
                              type="email" 
                              placeholder="school@example.com"
                              {...form.register("email")}
                              className="bg-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input 
                              id="phone" 
                              type="tel" 
                              placeholder="+1 (555) 123-4567"
                              {...form.register("phone")}
                              className="bg-white"
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Textarea
                              id="address"
                              placeholder="123 Education St, Learning City"
                              className="min-h-[100px] bg-white"
                              {...form.register("address")}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="website">Website</Label>
                            <Input 
                              id="website" 
                              type="url" 
                              placeholder="https://example.com"
                              {...form.register("website")}
                              className="bg-white"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Admin Information Card */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg font-semibold">Admin Information</CardTitle>
                          <CardDescription>
                            Update administrator contact details
                          </CardDescription>
                        </div>
                        <Button variant="outline" size="sm" className="h-8">
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="adminName">Admin Name</Label>
                            <Input 
                              id="adminName" 
                              placeholder="John Doe"
                              className="bg-white"
                              value="John Doe"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="adminEmail">Admin Email</Label>
                            <Input 
                              id="adminEmail" 
                              type="email" 
                              placeholder="admin@example.com"
                              className="bg-white"
                              value="admin@examplehigh.edu"
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="adminPhone">Admin Phone</Label>
                            <Input 
                              id="adminPhone" 
                              type="tel" 
                              placeholder="+1 (555) 987-6543"
                              className="bg-white"
                              value="+1 (555) 987-6543"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="adminRole">Admin Role</Label>
                            <Input 
                              id="adminRole" 
                              value="School Administrator"
                              className="bg-white"
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>
                        Configure how you receive notifications
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between space-x-4">
                        <div className="space-y-1">
                          <Label htmlFor="email-alerts">Email Alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive important alerts via email
                          </p>
                        </div>
                        <Switch
                          id="email-alerts"
                          checked={notifications.emailAlerts}
                          onCheckedChange={(checked) =>
                            handleNotificationChange("emailAlerts", checked)
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between space-x-4">
                        <div className="space-y-1">
                          <Label htmlFor="sms-alerts">SMS Alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive important alerts via text message
                          </p>
                        </div>
                        <Switch
                          id="sms-alerts"
                          checked={notifications.smsAlerts}
                          onCheckedChange={(checked) =>
                            handleNotificationChange("smsAlerts", checked)
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between space-x-4">
                        <div className="space-y-1">
                          <Label htmlFor="weekly-reports">Weekly Reports</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive a weekly summary of activities
                          </p>
                        </div>
                        <Switch
                          id="weekly-reports"
                          checked={notifications.weeklyReports}
                          onCheckedChange={(checked) =>
                            handleNotificationChange("weeklyReports", checked)
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between space-x-4">
                        <div className="space-y-1">
                          <Label htmlFor="system-updates">System Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications about system updates
                          </p>
                        </div>
                        <Switch
                          id="system-updates"
                          checked={notifications.systemUpdates}
                          onCheckedChange={(checked) =>
                            handleNotificationChange("systemUpdates", checked)
                          }
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                      <Button type="submit" disabled={isSaving}>
                        <Save className="w-4 h-4 mr-2" />
                        {isSaving ? "Saving..." : "Save Preferences"}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                  {/* Change Password Card */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle>Change Password</CardTitle>
                      <CardDescription>
                        Update your account password
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input 
                          id="currentPassword" 
                          type="password" 
                          placeholder="Enter current password"
                          {...form.register("currentPassword")}
                          className="bg-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input 
                          id="newPassword" 
                          type="password" 
                          placeholder="Enter new password"
                          onChange={handleNewPasswordChange}
                          className="bg-white"
                        />
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center">
                            {passwordValidation.length ? (
                              <Check className="w-4 h-4 text-green-500 mr-2" />
                            ) : (
                              <X className="w-4 h-4 text-gray-400 mr-2" />
                            )}
                            <span className={`text-sm ${passwordValidation.length ? 'text-gray-600' : 'text-gray-400'}`}>
                              At least 8 characters
                            </span>
                          </div>
                          <div className="flex items-center">
                            {passwordValidation.uppercase ? (
                              <Check className="w-4 h-4 text-green-500 mr-2" />
                            ) : (
                              <X className="w-4 h-4 text-gray-400 mr-2" />
                            )}
                            <span className={`text-sm ${passwordValidation.uppercase ? 'text-gray-600' : 'text-gray-400'}`}>
                              At least one uppercase letter
                            </span>
                          </div>
                          <div className="flex items-center">
                            {passwordValidation.lowercase ? (
                              <Check className="w-4 h-4 text-green-500 mr-2" />
                            ) : (
                              <X className="w-4 h-4 text-gray-400 mr-2" />
                            )}
                            <span className={`text-sm ${passwordValidation.lowercase ? 'text-gray-600' : 'text-gray-400'}`}>
                              At least one lowercase letter
                            </span>
                          </div>
                          <div className="flex items-center">
                            {passwordValidation.number ? (
                              <Check className="w-4 h-4 text-green-500 mr-2" />
                            ) : (
                              <X className="w-4 h-4 text-gray-400 mr-2" />
                            )}
                            <span className={`text-sm ${passwordValidation.number ? 'text-gray-600' : 'text-gray-400'}`}>
                              At least one number
                            </span>
                          </div>
                          <div className="flex items-center">
                            {passwordValidation.special ? (
                              <Check className="w-4 h-4 text-green-500 mr-2" />
                            ) : (
                              <X className="w-4 h-4 text-gray-400 mr-2" />
                            )}
                            <span className={`text-sm ${passwordValidation.special ? 'text-gray-600' : 'text-gray-400'}`}>
                              At least one special character
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input 
                          id="confirmPassword" 
                          type="password" 
                          placeholder="Confirm new password"
                          {...form.register("confirmPassword")}
                          className="bg-white"
                        />
                        {form.formState.errors.confirmPassword && (
                          <p className="text-sm text-red-500 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {form.formState.errors.confirmPassword.message}
                          </p>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                      <Button type="submit" disabled={isSaving}>
                        <Save className="w-4 h-4 mr-2" />
                        {isSaving ? "Saving..." : "Update Password"}
                      </Button>
                    </CardFooter>
                  </Card>

                  {/* Security Settings Card */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                      <CardDescription>
                        Manage your account security preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between space-x-4">
                        <div className="space-y-1">
                          <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Switch
                          id="two-factor"
                          checked={security.twoFactorAuth}
                          onCheckedChange={(checked) =>
                            handleSecurityChange("twoFactorAuth", checked)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="session-timeout">Session Timeout</Label>
                        <Select
                          value={security.sessionTimeout.toString()}
                          onValueChange={(value) =>
                            handleSecurityChange("sessionTimeout", parseInt(value))
                          }
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select timeout" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="120">2 hours</SelectItem>
                            <SelectItem value="0">Never</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-sm text-muted-foreground">
                          Time before automatic sign-out due to inactivity
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label>Password Policy</Label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="password-policy-low"
                              name="password-policy"
                              value="low"
                              checked={security.passwordPolicy === "low"}
                              onChange={() => handleSecurityChange("passwordPolicy", "low")}
                              className="h-4 w-4 text-primary focus:ring-primary"
                            />
                            <Label htmlFor="password-policy-low" className="font-normal">
                              Low (minimum 6 characters)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="password-policy-medium"
                              name="password-policy"
                              value="medium"
                              checked={security.passwordPolicy === "medium"}
                              onChange={() => handleSecurityChange("passwordPolicy", "medium")}
                              className="h-4 w-4 text-primary focus:ring-primary"
                            />
                            <Label htmlFor="password-policy-medium" className="font-normal">
                              Medium (8+ characters, letters & numbers)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="password-policy-high"
                              name="password-policy"
                              value="high"
                              checked={security.passwordPolicy === "high"}
                              onChange={() => handleSecurityChange("passwordPolicy", "high")}
                              className="h-4 w-4 text-primary focus:ring-primary"
                            />
                            <Label htmlFor="password-policy-high" className="font-normal">
                              High (12+ characters, mixed case, numbers & symbols)
                            </Label>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                      <Button type="submit" disabled={isSaving}>
                        <Save className="w-4 h-4 mr-2" />
                        {isSaving ? "Saving..." : "Update Security Settings"}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="academics" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Academic Settings</CardTitle>
                      <CardDescription>
                        Configure academic year and related settings
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="academicYear">Academic Year</Label>
                          <Select
                            {...form.register("academicYear")}
                            onValueChange={(value) =>
                              form.setValue("academicYear", value, { shouldValidate: true })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select academic year" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="2023-2024">2023-2024</SelectItem>
                              <SelectItem value="2024-2025">2024-2025</SelectItem>
                              <SelectItem value="2025-2026">2025-2026</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="timezone">Time Zone</Label>
                          <Select
                            {...form.register("timezone")}
                            onValueChange={(value) =>
                              form.setValue("timezone", value, { shouldValidate: true })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                              <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                              <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                              <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                      <Button type="submit" disabled={isSaving}>
                        <Save className="w-4 h-4 mr-2" />
                        {isSaving ? "Saving..." : "Save Academic Settings"}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </form>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
