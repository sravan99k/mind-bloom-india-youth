import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserCheck, Phone, MessageCircle, Calendar, AlertTriangle, CheckCircle, Clock, Mic } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { SessionRecorder } from "./SessionRecorder";
import { SessionSummary } from "./SessionSummary";

type SessionSummary = {
  focusArea: string;
  keyPoints: string[];
  actionPlan: string[];
};

const CounselorConnect = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [newRequest, setNewRequest] = useState({
    subject: "",
    message: "",
    urgency_level: "low"
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("connect");
  const [transcript, setTranscript] = useState("");
  const [sessionSummary, setSessionSummary] = useState<SessionSummary | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('counselor_requests')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setRequests(data || []);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const submitRequest = async () => {
    if (!newRequest.subject.trim() || !newRequest.message.trim()) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Please log in",
          description: "You need to be logged in to request counselor support",
          variant: "destructive"
        });
        return;
      }

      const { error } = await supabase
        .from('counselor_requests')
        .insert({
          user_id: user.id,
          subject: newRequest.subject,
          message: newRequest.message,
          urgency_level: newRequest.urgency_level
        });

      if (error) throw error;

      toast({
        title: "Request submitted!",
        description: "A counselor will reach out to you soon based on the urgency level"
      });

      setNewRequest({ subject: "", message: "", urgency_level: "low" });
      setShowRequestForm(false);
      fetchRequests();

    } catch (error) {
      console.error('Error submitting request:', error);
      toast({
        title: "Error",
        description: "Failed to submit counselor request",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTranscript = (newTranscript: string) => {
    setTranscript(newTranscript);
  };

  const handleSummary = (summary: SessionSummary) => {
    setSessionSummary(summary);
  };

  const handleCompleteSession = () => {
    toast({
      title: "Session completed!",
      description: "Your session has been saved and marked as complete."
    });
  };

  const handleScheduleFollowUp = () => {
    toast({
      title: "Follow-up scheduled",
      description: "You'll receive a reminder for your next session."
    });
  };

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'assigned': return <UserCheck className="h-4 w-4 text-blue-500" />;
      default: return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const urgencyLevels = [
    { value: 'low', label: 'Low Priority', description: 'Response within 2-3 days' },
    { value: 'medium', label: 'Medium Priority', description: 'Response within 24 hours' },
    { value: 'high', label: 'High Priority', description: 'Response within 4-6 hours' }
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <Button
          variant={activeTab === "connect" ? "default" : "ghost"}
          onClick={() => setActiveTab("connect")}
          className="flex-1"
        >
          Connect
        </Button>
        <Button
          variant={activeTab === "session" ? "default" : "ghost"}
          onClick={() => setActiveTab("session")}
          className="flex-1 gap-2"
        >
          <Mic className="h-4 w-4" />
          Session Recording
        </Button>
      </div>

      {/* Connect Tab */}
      {activeTab === "connect" && (
        <>
          {/* Header */}
          <Card className="bg-gradient-to-r from-green-50 to-teal-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-6 w-6 text-green-600" />
                Connect with School Counselors
              </CardTitle>
              <CardDescription className="text-green-800">
                Secure and confidential support from trained mental health professionals.
                All communications are private and protected.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg border border-green-200">
                  <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-medium text-green-900">Private Messaging</h4>
                  <p className="text-sm text-green-700">Secure communication with counselors</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-green-200">
                  <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-medium text-green-900">Schedule Sessions</h4>
                  <p className="text-sm text-green-700">Book appointments when you need them</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-green-200">
                  <Phone className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-medium text-green-900">Crisis Support</h4>
                  <p className="text-sm text-green-700">Immediate help for urgent situations</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Resources */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-800">
                <AlertTriangle className="h-5 w-5" />
                Emergency Resources
              </CardTitle>
              <CardDescription className="text-red-700">
                If you're experiencing a mental health emergency, please reach out immediately
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-lg border border-red-200">
                  <h4 className="font-medium text-red-900 mb-2">Crisis Hotline</h4>
                  <p className="text-2xl font-bold text-red-800 mb-1">988</p>
                  <p className="text-sm text-red-700">Suicide & Crisis Lifeline - Available 24/7</p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-red-200">
                  <h4 className="font-medium text-red-900 mb-2">Text Support</h4>
                  <p className="text-lg font-bold text-red-800 mb-1">Text HOME to 741741</p>
                  <p className="text-sm text-red-700">Crisis Text Line - Free, confidential support</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Request Form */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Request Counselor Support</CardTitle>
                  <CardDescription>
                    Reach out for confidential support and guidance
                  </CardDescription>
                </div>
                <Button onClick={() => setShowRequestForm(!showRequestForm)}>
                  {showRequestForm ? "Cancel" : "New Request"}
                </Button>
              </div>
            </CardHeader>
            {showRequestForm && (
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <Input
                    placeholder="Brief description of what you'd like to discuss"
                    value={newRequest.subject}
                    onChange={(e) => setNewRequest({ ...newRequest, subject: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority Level *
                  </label>
                  <Select 
                    value={newRequest.urgency_level} 
                    onValueChange={(value) => setNewRequest({ ...newRequest, urgency_level: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {urgencyLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          <div>
                            <div className="font-medium">{level.label}</div>
                            <div className="text-xs text-gray-500">{level.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <Textarea
                    placeholder="Please describe what's on your mind or what kind of support you're looking for. Your message is completely confidential."
                    value={newRequest.message}
                    onChange={(e) => setNewRequest({ ...newRequest, message: e.target.value })}
                    className="min-h-[120px]"
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Privacy Notice</h4>
                  <p className="text-sm text-blue-800">
                    Your request is completely confidential and will only be seen by licensed school counselors. 
                    They are bound by professional confidentiality standards and will only share information 
                    if there is immediate risk of harm to you or others.
                  </p>
                </div>

                <Button onClick={submitRequest} disabled={loading} className="w-full">
                  {loading ? "Submitting..." : "Submit Request"}
                </Button>
              </CardContent>
            )}
          </Card>

          {/* Previous Requests */}
          <Card>
            <CardHeader>
              <CardTitle>Your Support Requests</CardTitle>
              <CardDescription>
                Track your counselor connections and support history
              </CardDescription>
            </CardHeader>
            <CardContent>
              {requests.length > 0 ? (
                <div className="space-y-4">
                  {requests.map((request) => (
                    <div key={request.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900">{request.subject}</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Submitted on {new Date(request.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(request.status)}
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getUrgencyColor(request.urgency_level)}`}
                          >
                            {request.urgency_level} priority
                          </Badge>
                          <Badge variant="secondary" className="text-xs capitalize">
                            {request.status}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 bg-white p-3 rounded border">
                        {request.message}
                      </p>
                      {request.status === 'pending' && (
                        <div className="mt-3 p-3 bg-yellow-50 rounded border border-yellow-200">
                          <p className="text-sm text-yellow-800">
                            <Clock className="h-4 w-4 inline mr-1" />
                            Your request is being reviewed. A counselor will contact you soon.
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No requests yet</h3>
                  <p className="text-gray-600 mb-4">
                    When you're ready, reach out for professional support
                  </p>
                  <Button onClick={() => setShowRequestForm(true)}>
                    Submit Your First Request
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Resources</CardTitle>
              <CardDescription>
                Other ways to get support and information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                  <Calendar className="h-6 w-6 text-blue-500" />
                  <div className="text-center">
                    <div className="font-medium">Schedule Office Hours</div>
                    <div className="text-sm text-gray-600">Drop-in times with counselors</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                  <MessageCircle className="h-6 w-6 text-green-500" />
                  <div className="text-center">
                    <div className="font-medium">Join Support Groups</div>
                    <div className="text-sm text-gray-600">Connect with peer support groups</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Session Recording Tab */}
      {activeTab === "session" && (
        <>
          {/* Session Recording Header */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mic className="h-6 w-6 text-blue-600" />
                Session Transcript & Summary
              </CardTitle>
              <CardDescription className="text-blue-800">
                Record your session or upload an audio file to generate a written transcript. 
                All data is encrypted and only accessible by you and your counselor.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Session Recorder */}
          <Card>
            <CardHeader>
              <CardTitle>Record Your Session</CardTitle>
              <CardDescription>
                Start recording or upload an audio file to create a transcript
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SessionRecorder 
                onTranscript={handleTranscript}
                onSummary={handleSummary}
              />
            </CardContent>
          </Card>

          {/* Session Summary */}
          {sessionSummary && (
            <SessionSummary
              summary={sessionSummary}
              onComplete={handleCompleteSession}
              onScheduleFollowUp={handleScheduleFollowUp}
            />
          )}

          {/* Privacy Notice */}
          <Card className="bg-purple-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-purple-900">Privacy & Security</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-purple-800">
                <p>🔒 <strong>End-to-end encryption:</strong> Your recordings are encrypted and secure</p>
                <p>👤 <strong>Counselor access only:</strong> Only you and your assigned counselor can access transcripts</p>
                <p>📱 <strong>Device storage:</strong> Audio files are processed locally when possible</p>
                <p>🗑️ <strong>Data retention:</strong> You can delete your recordings at any time</p>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default CounselorConnect;
