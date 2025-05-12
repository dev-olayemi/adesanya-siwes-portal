
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Edit, FileText, BarChart4, MessageSquare } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { mockOrganizations, mockReports } from "@/lib/mock-data";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  const { user } = useAuthStore();
  const organization = mockOrganizations.find(org => org.id === user?.organizationId);
  const studentReports = mockReports.filter(report => report.studentId === user?.id);
  const pendingReports = studentReports.filter(report => report.status === 'pending');
  const reviewedReports = studentReports.filter(report => report.status === 'reviewed');
  
  const paymentStatus = user?.paymentStatus || 'pending';

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
          <Badge variant={paymentStatus === 'verified' ? 'default' : 'outline'} 
                className={paymentStatus === 'verified' ? 'bg-green-600' : 
                          (paymentStatus === 'rejected' ? 'bg-red-600' : 'border-gray-500 text-gray-700')}>
            Payment: {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
          </Badge>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Weekly Reports
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentReports.length}</div>
              <p className="text-xs text-muted-foreground">
                {pendingReports.length} pending review
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Feedback Received
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reviewedReports.length}</div>
              <p className="text-xs text-muted-foreground">
                From your supervisor
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completion Progress
              </CardTitle>
              <BarChart4 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.min(Math.round((studentReports.length / 24) * 100), 100)}%
              </div>
              <p className="text-xs text-muted-foreground">
                Of required weekly reports
              </p>
              <div className="mt-2 h-2 w-full bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-primary rounded-full" 
                  style={{ width: `${Math.min(Math.round((studentReports.length / 24) * 100), 100)}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* SIWES Letter Section */}
          <Card className={paymentStatus !== 'verified' ? 'border-dashed border-gray-300' : ''}>
            <CardHeader>
              <CardTitle>SIWES Letter</CardTitle>
              <CardDescription>
                {paymentStatus === 'verified' 
                  ? "Your payment has been verified. You can download your SIWES letter."
                  : "You need to make payment before accessing your SIWES letter."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {paymentStatus === 'verified' ? (
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" /> Download SIWES Letter
                </Button>
              ) : (
                <Link to="/student/payment">
                  <Button className="w-full" variant="outline">
                    Make Payment (₦7,000)
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>

          {/* Organization Information */}
          <Card>
            <CardHeader>
              <CardTitle>Organization Information</CardTitle>
              <CardDescription>
                Your SIWES placement details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {organization ? (
                <>
                  <div>
                    <p className="font-medium">{organization.name}</p>
                    <p className="text-sm text-gray-500">{organization.address}</p>
                    <p className="text-sm text-gray-500">
                      {organization.lga}, {organization.state}
                    </p>
                  </div>
                  <div className="pt-2">
                    <p className="text-sm"><span className="font-medium">Contact:</span> {organization.contactPerson}</p>
                    <p className="text-sm"><span className="font-medium">Phone:</span> {organization.contactPhone}</p>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground mb-4">No organization information added yet.</p>
                  <Link to="/student/organization">
                    <Button>
                      <Edit className="mr-2 h-4 w-4" /> Add Organization Details
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>
              Your latest submitted weekly reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            {studentReports.length > 0 ? (
              <div className="space-y-4">
                {studentReports.slice(0, 3).map((report) => (
                  <div key={report.id} className="flex items-start justify-between border-b pb-4 last:border-0">
                    <div>
                      <p className="font-medium">{report.title}</p>
                      <p className="text-sm text-gray-500">Week {report.week} - {new Date(report.date).toLocaleDateString()}</p>
                      <p className="text-sm mt-1 line-clamp-2">{report.description}</p>
                    </div>
                    <Badge variant={report.status === 'reviewed' ? 'default' : 'outline'}>
                      {report.status === 'reviewed' ? 'Reviewed' : 'Pending'}
                    </Badge>
                  </div>
                ))}
                
                <div className="pt-2 text-center">
                  <Link to="/student/reports">
                    <Button variant="outline">View All Reports</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No reports submitted yet</p>
                <Link to="/student/reports/new">
                  <Button>
                    <Edit className="mr-2 h-4 w-4" /> Submit Your First Report
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
