
import React, { useState } from "react";
import { supabase } from "@/utils/supabaseClient";
// Fallback types for custom UI components in case they're not typed
// Remove these if your UI library provides proper types
// @ts-ignore
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// @ts-ignore
import { Button } from "@/components/ui/button";
// @ts-ignore
import { ProfanityFilteredInput } from "@/components/ui/profanity-filtered-input";
// @ts-ignore
import { ProfanityFilteredTextarea } from "@/components/ui/profanity-filtered-textarea";
// @ts-ignore
import { Label } from "@/components/ui/label";
// @ts-ignore
import { Badge } from "@/components/ui/badge";
// @ts-ignore
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Heart, MessageCircle, Upload, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  isAnonymous: boolean;
  name: string;
  email: string;
  incident: string;
  location: string;
  peopleInvolved: string;
  additionalInfo: string;
}

interface Feeling {
  emoji: string;
  label: string;
  color: string;
}

const BuddySafeReport: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>({
    isAnonymous: true,
    name: "",
    email: "",
    incident: "",
    location: "",
    peopleInvolved: "",
    additionalInfo: ""
  });
  const { toast } = useToast();

  const feelings: Feeling[] = [
    { emoji: "😢", label: "Sad", color: "bg-blue-100 text-blue-800" },
    { emoji: "😰", label: "Scared", color: "bg-red-100 text-red-800" },
    { emoji: "😡", label: "Angry", color: "bg-orange-100 text-orange-800" },
    { emoji: "😟", label: "Worried", color: "bg-yellow-100 text-yellow-800" },
    { emoji: "😔", label: "Hurt", color: "bg-purple-100 text-purple-800" },
    { emoji: "😤", label: "Frustrated", color: "bg-pink-100 text-pink-800" }
  ];

  const handleFeelingToggle = (feeling: string): void => {
    setSelectedFeelings(prev => 
      prev.includes(feeling) 
        ? prev.filter(f => f !== feeling)
        : [...prev, feeling]
    );
  };

  // If your linter complains about the async void, you can safely ignore it for event handlers
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!formData.incident.trim()) {
      toast({
        title: "Please tell us what happened",
        description: "We need to know about the incident to help you.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase.from('buddysafe_reports').insert([
        {
          is_anonymous: formData.isAnonymous,
          name: formData.isAnonymous ? null : formData.name,
          email: formData.isAnonymous ? null : formData.email,
          incident: formData.incident,
          location: formData.location,
          people_involved: formData.peopleInvolved,
          additional_info: formData.additionalInfo,
          feelings: selectedFeelings,
          created_at: new Date().toISOString(),
        }
      ]);
      if (error) throw error;
      setIsSubmitted(true);
      toast({
        title: "Report submitted safely",
        description: "Thank you for speaking up. We've received your report and will take action.",
      });
    } catch (err: any) {
      toast({
        title: "Submission failed",
        description: err.message || "Could not submit your report. Please try again later.",
        variant: "destructive"
      });
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              Your report has been received safely
            </h3>
            <p className="text-green-700 mb-4">
              Thank you for being brave and speaking up. Your report ID is: <strong>{`BS-${Date.now().toString().slice(-6)}`}</strong>
            </p>
            <p className="text-sm text-green-600">
              Keep this ID safe if you want to check on your report later.
            </p>
            <Button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  isAnonymous: true,
                  name: "",
                  email: "",
                  incident: "",
                  location: "",
                  peopleInvolved: "",
                  additionalInfo: ""
                });
                setSelectedFeelings([]);
              }}
              className="mt-4 bg-green-600 hover:bg-green-700"
            >
              Submit Another Report
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Shield className="w-12 h-12 text-teal-600 mr-3" />
          <Heart className="w-8 h-8 text-pink-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          BuddySafe: Your Voice Matters
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          This is a safe space just for you. We're here to listen and help. 
          Everything you share is private and confidential.
        </p>
      </div>

      <Alert className="mb-6 border-teal-200 bg-teal-50">
        <MessageCircle className="h-4 w-4 text-teal-600" />
        <AlertDescription className="text-teal-800">
          <strong>Your privacy is protected:</strong> Your identity won't be shared without your permission. 
          Every report is taken seriously and handled with care by trained professionals.
        </AlertDescription>
      </Alert>

      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-teal-50 to-blue-50">
          <CardTitle className="text-2xl text-gray-900">Report a Concern</CardTitle>
          <CardDescription className="text-gray-600">
            Help us create a safer environment for everyone. You're not alone in this.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Anonymous Option */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={formData.isAnonymous}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, isAnonymous: e.target.checked})}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="anonymous" className="text-sm font-medium">
                  Keep my report anonymous (recommended)
                </Label>
              </div>
              
              {!formData.isAnonymous && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label htmlFor="name">Your Name (Optional)</Label>
                    <ProfanityFilteredInput
                      id="name"
                      value={formData.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Your Email (Optional)</Label>
                    <ProfanityFilteredInput
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, email: e.target.value})}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Main Incident Report */}
            <div>
              <Label htmlFor="incident" className="text-base font-medium">
                What happened? Tell us your story *
              </Label>
              <ProfanityFilteredTextarea
                id="incident"
                value={formData.incident}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, incident: e.target.value})}
                placeholder="Describe what happened in as much detail as you're comfortable sharing..."
                className="min-h-32 mt-2"
                required
              />
            </div>

            {/* Location */}
            <div>
              <Label htmlFor="location">Where did this happen?</Label>
              <ProfanityFilteredInput
                id="location"
                value={formData.location}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, location: e.target.value})}
                placeholder="e.g., School hallway, classroom, online, etc."
                className="mt-2"
              />
            </div>

            {/* People Involved */}
            <div>
              <Label htmlFor="peopleInvolved">Who was involved? (Optional)</Label>
              <ProfanityFilteredInput
                id="peopleInvolved"
                value={formData.peopleInvolved}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, peopleInvolved: e.target.value})}
                placeholder="You can use initials or descriptions if you don't want to use names"
                className="mt-2"
              />
            </div>

            {/* Feelings */}
            <div>
              <Label className="text-base font-medium">How are you feeling? (Select all that apply)</Label>
              <div className="flex flex-wrap gap-2 mt-3">
                {feelings.map((feeling) => (
                  <Badge
                    key={feeling.label + feeling.emoji} // Added unique key
                    variant={selectedFeelings.includes(feeling.label) ? "default" : "outline"} // Removed ts-ignore
                    className={`cursor-pointer px-3 py-2 text-sm ${
                      selectedFeelings.includes(feeling.label) 
                        ? feeling.color 
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => handleFeelingToggle(feeling.label)}
                  >
                    <span className="mr-2">{feeling.emoji}</span>
                    {feeling.label}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <Label htmlFor="additionalInfo">Anything else you'd like to add?</Label>
              <ProfanityFilteredTextarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, additionalInfo: e.target.value})}
                placeholder="Any additional details, concerns, or requests for help..."
                className="mt-2"
              />
            </div>

            {/* File Upload Placeholder */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                <strong>File Upload Coming Soon:</strong> Screenshots, photos, or documents can be attached here.
              </p>
            </div>

            {/* Emergency Resources */}
            <Alert className="border-orange-200 bg-orange-50">
              <AlertDescription className="text-orange-800">
                <strong>Need immediate help?</strong> If you're in immediate danger, please contact:
                <br />
                • Emergency: 112 | Childline India: 1098 | POCSO: 1098
                <br />
                • School Counselor: Available during school hours
              </AlertDescription>
            </Alert>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <Button 
                type="submit"
                size="lg"
                className="bg-teal-600 hover:bg-teal-700 px-8 py-3 text-white font-medium"
              >
                <Shield className="w-4 h-4 mr-2" />
                Submit Report Safely
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Support Information */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Your report goes directly to trained staff</li>
              <li>• We'll investigate carefully and confidentially</li>
              <li>• You may be contacted for more information</li>
              <li>• Action will be taken to address the situation</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <h3 className="font-semibold text-green-900 mb-2">You're being brave</h3>
            <p className="text-sm text-green-800">
              Speaking up about bullying or concerns takes courage. 
              You're helping make your school safer for everyone. 
              Remember, this is not your fault, and you deserve support.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BuddySafeReport;
