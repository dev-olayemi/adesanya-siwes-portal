
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, BarChart4, MessageSquare } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { mockUsers, mockReports, mockOrganizations } from "@/lib/mock-data";
import { Link } from "react-router-dom";

const SupervisorDashboard = () => {
  const { user } = useAuthStore();
  
  // Find students assigned to this supervisor (for demo purposes, we'll just take the first two students)
  const assignedStudents = mockUsers.filter(u => u.role === 'student').slice(0, 2);
  
  // Get all reports from assigned students
  const studentReports = mockReports.filter(report => 
    assignedStudents.some(student => student.id === report.studentId)
  );
  const pendingReports = studentReports.filter(report => report.status === 'pending');
  const reviewedReports = studentReports.filter(report => report.status === 'reviewed');
  
  // Group students by organization
  const studentsByOrg = assignedStudents.reduce((acc, student) => {
    const orgId = student.organizationId || '';
    if (!acc[orgId]) {
      acc[orgId] = [];
    }
    acc[orgId].push(student);
    return acc;
  }, {} as Record<string, typeof assignedStudents>);

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Supervisor Dashboard</h1>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Assigned Students
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assignedStudents.length}</div>
              <p className="text-xs text-muted-foreground">
                {Object.keys(studentsByOrg).length} organizations
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Reports
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingReports.length}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting your review
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Reviewed Reports
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reviewedReports.length}</div>
              <p className="text-xs text-muted-foreground">
                Feedback provided
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Review Rate
              </CardTitle>
              <BarChart4 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {studentReports.length > 0 
                  ? Math.round((reviewedReports.length / studentReports.length) * 100) 
                  : 0}%
              </div>
              <p className="text-xs text-muted-foreground">
                Of reports reviewed
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Students by Organization */}
        <Card>
          <CardHeader>
            <CardTitle>Students by Organization</CardTitle>
            <CardDescription>
              Your assigned students grouped by their SIWES placements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(studentsByOrg).map(([orgId, students]) => {
                const organization = mockOrganizations.find(org => org.id === orgId);
                
                return (
                  <div key={orgId} className="border rounded-md p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium text-lg">{organization?.name || "Unassigned"}</h3>
                        <p className="text-sm text-muted-foreground">
                          {organization?.address}, {organization?.lga}, {organization?.state}
                        </p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">
                        {students.length} Students
                      </Badge>
                    </div>
                    
                    <div className="grid gap-3">
                      {students.map(student => (
                        <div key={student.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-gray-500">{student.studentId || "No ID"}</p>
                          </div>
                          <Link to={`/supervisor/students/${student.id}`}>
                            <Button variant="outline" size="sm">View Details</Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card>
          <CardHeader className="flex justify-between">
            <div>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>
                Latest reports submitted by your assigned students
              </CardDescription>
            </div>
            <Link to="/supervisor/reports">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingReports.slice(0, 3).map((report) => {
                const student = assignedStudents.find(s => s.id === report.studentId);
                
                return (
                  <div key={report.id} className="flex items-start justify-between border-b pb-4 last:border-0">
                    <div>
                      <p className="font-medium">{report.title}</p>
                      <p className="text-sm text-gray-500">
                        {student?.name} - Week {report.week} - {new Date(report.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm mt-1 line-clamp-2">{report.description}</p>
                    </div>
                    <div>
                      <Badge variant={report.status === 'pending' ? 'outline' : 'default'}>
                        {report.status === 'pending' ? 'Pending' : 'Reviewed'}
                      </Badge>
                      <div className="mt-2 text-right">
                        <Link to={`/supervisor/reports/${report.id}`}>
                          <Button variant="outline" size="sm">Review</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {pendingReports.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No pending reports to review</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SupervisorDashboard;
