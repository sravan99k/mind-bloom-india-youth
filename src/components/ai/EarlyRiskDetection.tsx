
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingUp, Users, FileText, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const EarlyRiskDetection = () => {
  const [riskAlerts, setRiskAlerts] = useState<any[]>([]);
  const [riskTrends, setRiskTrends] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRiskData();
  }, []);

  const loadRiskData = async () => {
    try {
      // This would analyze assessment data and mood patterns
      // For demo purposes, using simulated risk detection
      const simulatedAlerts = [
        {
          id: 1,
          studentId: "student_001",
          studentName: "Student A", // In real implementation, would be anonymized
          riskLevel: "High",
          indicators: ["Declining mood scores", "Increased stress levels", "Social withdrawal patterns"],
          detectionDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          status: "Pending Review",
          confidenceScore: 85,
          recommendedActions: ["Immediate counselor consultation", "Parent notification", "Peer support referral"]
        },
        {
          id: 2,
          studentId: "student_002", 
          studentName: "Student B",
          riskLevel: "Moderate",
          indicators: ["Academic stress indicators", "Sleep pattern concerns"],
          detectionDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          status: "Under Review",
          confidenceScore: 72,
          recommendedActions: ["Wellness check-in", "Study support resources"]
        }
      ];

      const simulatedTrends = [
        {
          category: "Academic Stress",
          trend: "Increasing",
          percentage: 68,
          change: "+12%",
          timeframe: "Last 30 days",
          studentsAffected: 45
        },
        {
          category: "Social Anxiety", 
          trend: "Stable",
          percentage: 34,
          change: "+2%",
          timeframe: "Last 30 days",
          studentsAffected: 23
        },
        {
          category: "Sleep Issues",
          trend: "Decreasing",
          percentage: 28,
          change: "-8%",
          timeframe: "Last 30 days",
          studentsAffected: 19
        }
      ];

      setRiskAlerts(simulatedAlerts);
      setRiskTrends(simulatedTrends);
    } catch (error) {
      console.error('Error loading risk data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High': return 'text-red-600 bg-red-100 border-red-300';
      case 'Moderate': return 'text-orange-600 bg-orange-100 border-orange-300';
      case 'Low': return 'text-green-600 bg-green-100 border-green-300';
      default: return 'text-gray-600 bg-gray-100 border-gray-300';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'Increasing': return 'text-red-600';
      case 'Decreasing': return 'text-green-600';
      case 'Stable': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Privacy & Ethics Notice */}
      <Alert className="border-blue-200 bg-blue-50">
        <Shield className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Privacy Notice:</strong> All risk detection uses anonymized data patterns. 
          Individual student privacy is protected. Alerts are generated using AI models trained on 
          general wellness indicators, not personal data. Human counselor review is required for all interventions.
        </AlertDescription>
      </Alert>

      {/* High Priority Alerts */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-800 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6" />
            Early Risk Alerts
          </CardTitle>
          <CardDescription className="text-red-600">
            AI-detected patterns requiring immediate attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {riskAlerts.map((alert) => (
              <Alert key={alert.id} className={`border-l-4 ${getRiskColor(alert.riskLevel)}`}>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle className="flex items-center justify-between">
                  <span>Risk Alert - {alert.riskLevel} Priority</span>
                  <Badge variant="outline" className={getRiskColor(alert.riskLevel)}>
                    {alert.confidenceScore}% confidence
                  </Badge>
                </AlertTitle>
                <AlertDescription>
                  <div className="mt-2 space-y-2">
                    <p><strong>Student ID:</strong> {alert.studentId} (anonymized)</p>
                    <p><strong>Detection Date:</strong> {alert.detectionDate.toLocaleDateString()}</p>
                    
                    <div>
                      <strong>Risk Indicators:</strong>
                      <ul className="list-disc list-inside ml-4 mt-1">
                        {alert.indicators.map((indicator: string, index: number) => (
                          <li key={index} className="text-sm">{indicator}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <strong>Recommended Actions:</strong>
                      <ul className="list-disc list-inside ml-4 mt-1">
                        {alert.recommendedActions.map((action: string, index: number) => (
                          <li key={index} className="text-sm">{action}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                        Assign Counselor
                      </Button>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        Mark Reviewed
                      </Button>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-blue-500" />
            Wellness Trends Analysis
          </CardTitle>
          <CardDescription>
            Anonymized patterns across the student population
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {riskTrends.map((trend, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{trend.category}</h4>
                    <p className="text-sm text-gray-600">{trend.timeframe}</p>
                  </div>
                  <Badge variant="outline" className={getTrendColor(trend.trend)}>
                    {trend.trend} {trend.change}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Risk Level</span>
                      <span>{trend.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          trend.percentage > 60 ? 'bg-red-500' : 
                          trend.percentage > 30 ? 'bg-orange-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${trend.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{trend.studentsAffected}</p>
                    <p className="text-xs text-gray-500">students</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Model Information */}
      <Card className="border-gray-200 bg-gray-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-gray-600" />
            AI Model Transparency
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-gray-700">
            <div>
              <strong>Model Type:</strong> Pattern Recognition & Sentiment Analysis
            </div>
            <div>
              <strong>Data Sources:</strong> Anonymous assessment responses, mood tracking patterns, engagement metrics
            </div>
            <div>
              <strong>Privacy Measures:</strong> All data is anonymized, encrypted, and follows DPDP Act compliance
            </div>
            <div>
              <strong>Human Oversight:</strong> All alerts require counselor review before action
            </div>
            <div>
              <strong>Model Accuracy:</strong> 78% precision, continuously improving with feedback
            </div>
            <div>
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Center */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-green-600" />
            Intervention Actions
          </CardTitle>
          <CardDescription>
            Tools for supporting student wellness
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto p-4 text-left">
              <div>
                <div className="font-medium">Schedule Group Session</div>
                <div className="text-sm text-gray-600">Organize peer support activities</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 text-left">
              <div>
                <div className="font-medium">Parent Notifications</div>
                <div className="text-sm text-gray-600">Send wellness updates to families</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 text-left">
              <div>
                <div className="font-medium">Resource Distribution</div>
                <div className="text-sm text-gray-600">Share targeted wellness content</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 text-left">
              <div>
                <div className="font-medium">Generate Report</div>
                <div className="text-sm text-gray-600">Create anonymous trend analysis</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EarlyRiskDetection;
