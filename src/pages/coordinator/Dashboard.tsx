
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, BarChart4, Briefcase, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { mockUsers, mockReports, mockOrganizations } from "@/lib/mock-data";

const CoordinatorDashboard = () => {
  const students = mockUsers.filter(user => user.role === 'student');
  const supervisors = mockUsers.filter(user => user.role === 'supervisor');
  const verifiedPayments = students.filter(student => student.paymentStatus === 'verified').length;
  const pendingPayments = students.filter(student => student.paymentStatus === 'pending').length;
  
  // Group students by organization
  const studentsByOrg = students.reduce((acc, student) => {
    const orgId = student.organizationId || '';
    if (!acc[orgId]) {
      acc[orgId] = [];
    }
    acc[orgId].push(student);
    return acc;
  }, {} as Record<string, typeof students>);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Coordinator Dashboard</h1>
          <Button>
            <Send className="mr-2 h-4 w-4" /> Send Broadcast
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Students
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students.length}</div>
              <p className="text-xs text-muted-foreground">
                Registered in SIWES
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Organizations
              </CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockOrganizations.length}</div>
              <p className="text-xs text-muted-foreground">
                Hosting students
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Supervisors
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{supervisors.length}</div>
              <p className="text-xs text-muted-foreground">
                Managing students
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Weekly Reports
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockReports.length}</div>
              <p className="text-xs text-muted-foreground">
                Submitted by students
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Payment Status */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Status</CardTitle>
            <CardDescription>
              Overview of student SIWES letter payment status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Payment Overview</p>
                  <div className="text-2xl font-bold">
                    {verifiedPayments} / {students.length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Students have paid for SIWES letter
                  </p>
                </div>
                <div className="text-right">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200 mb-2">
                    {verifiedPayments} Verified
                  </Badge>
                  <div>
                    <Badge variant="outline" className="border-orange-200 text-orange-800 bg-orange-50">
                      {pendingPayments} Pending
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="h-2 w-full bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-primary rounded-full" 
                  style={{ width: `${(verifiedPayments / students.length) * 100}%` }}
                ></div>
              </div>
              
              <div className="flex justify-end">
                <Link to="/coordinator/students">
                  <Button variant="outline">Manage Payments</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reports Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Report Statistics</CardTitle>
            <CardDescription>
              Weekly report submission overview
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Week 1 Submissions</p>
                  <p className="text-sm text-muted-foreground">
                    {mockReports.filter(r => r.week === 1).length} / {students.length}
                  </p>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full">
                  <div 
                    className="h-full bg-primary rounded-full" 
                    style={{ width: `${(mockReports.filter(r => r.week === 1).length / students.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Week 2 Submissions</p>
                  <p className="text-sm text-muted-foreground">
                    {mockReports.filter(r => r.week === 2).length} / {students.length}
                  </p>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full">
                  <div 
                    className="h-full bg-primary rounded-full" 
                    style={{ width: `${(mockReports.filter(r => r.week === 2).length / students.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Link to="/coordinator/statistics">
                  <Button variant="outline">
                    <BarChart4 className="mr-2 h-4 w-4" /> View Detailed Statistics
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Organizations Overview */}
        <Card>
          <CardHeader className="flex justify-between">
            <div>
              <CardTitle>Organizations</CardTitle>
              <CardDescription>
                Student placements by organization
              </CardDescription>
            </div>
            <Link to="/coordinator/organizations">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockOrganizations.slice(0, 3).map((org) => {
                const orgStudents = studentsByOrg[org.id] || [];
                
                return (
                  <div key={org.id} className="flex items-start justify-between border-b pb-4 last:border-0">
                    <div>
                      <p className="font-medium">{org.name}</p>
                      <p className="text-sm text-gray-500">
                        {org.address}, {org.lga}, {org.state}
                      </p>
                      <p className="text-sm mt-1">Contact: {org.contactPerson}</p>
                    </div>
                    <div>
                      <Badge className="mb-2">
                        {orgStudents.length} Students
                      </Badge>
                      <div className="text-right">
                        <Link to={`/coordinator/organizations/${org.id}`}>
                          <Button variant="outline" size="sm">Details</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CoordinatorDashboard;
