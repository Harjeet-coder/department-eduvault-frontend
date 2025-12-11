import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { StatCard } from '@/components/ui/stat-card';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Users, 
  GraduationCap, 
  FileCheck,
  TrendingUp,
  Download,
  Eye,
  UserCheck,
  UserX,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronRight
} from 'lucide-react';
import { Section, Student } from '@/types';

// Mock section data
const mockSections: Section[] = [
  { id: '1', name: 'A', totalStudents: 30, presentStudents: 28, absentStudents: 2, totalCertificates: 85, legitCertificates: 78 },
  { id: '2', name: 'B', totalStudents: 30, presentStudents: 26, absentStudents: 4, totalCertificates: 72, legitCertificates: 65 },
  { id: '3', name: 'C', totalStudents: 32, presentStudents: 30, absentStudents: 2, totalCertificates: 90, legitCertificates: 82 },
  { id: '4', name: 'D', totalStudents: 28, presentStudents: 25, absentStudents: 3, totalCertificates: 68, legitCertificates: 60 },
];

// Mock student data for dialog
const mockStudents: Record<string, Student[]> = {
  'A': [
    { id: '1', registerNumber: 'RA2211003010', name: 'John Doe', email: 'john@ctchennai.net', section: 'A', semester: 5, isPresent: true },
    { id: '2', registerNumber: 'RA2211003015', name: 'Jane Smith', email: 'jane@ctchennai.net', section: 'A', semester: 5, isPresent: true },
    { id: '3', registerNumber: 'RA2211003008', name: 'Sarah Brown', email: 'sarah@ctchennai.net', section: 'A', semester: 5, isPresent: false },
    { id: '4', registerNumber: 'RA2211003045', name: 'Emily Johnson', email: 'emily@ctchennai.net', section: 'A', semester: 5, isPresent: true },
  ],
  'B': [
    { id: '5', registerNumber: 'RA2211003022', name: 'Mike Wilson', email: 'mike@ctchennai.net', section: 'B', semester: 5, isPresent: false },
    { id: '6', registerNumber: 'RA2211003030', name: 'Tom Davis', email: 'tom@ctchennai.net', section: 'B', semester: 5, isPresent: true },
    { id: '7', registerNumber: 'RA2211003052', name: 'David Lee', email: 'david@ctchennai.net', section: 'B', semester: 5, isPresent: true },
  ],
  'C': [
    { id: '8', registerNumber: 'RA2211003067', name: 'Lisa Wang', email: 'lisa@ctchennai.net', section: 'C', semester: 5, isPresent: true },
    { id: '9', registerNumber: 'RA2211003072', name: 'Chris Evans', email: 'chris@ctchennai.net', section: 'C', semester: 5, isPresent: true },
  ],
  'D': [
    { id: '10', registerNumber: 'RA2211003085', name: 'Anna Taylor', email: 'anna@ctchennai.net', section: 'D', semester: 5, isPresent: false },
    { id: '11', registerNumber: 'RA2211003090', name: 'Ryan Moore', email: 'ryan@ctchennai.net', section: 'D', semester: 5, isPresent: true },
  ],
};

export default function HodDashboard() {
  const { user } = useAuth();
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const totalStudents = mockSections.reduce((sum, s) => sum + s.totalStudents, 0);
  const totalPresent = mockSections.reduce((sum, s) => sum + s.presentStudents, 0);
  const totalCertificates = mockSections.reduce((sum, s) => sum + s.totalCertificates, 0);
  const totalLegit = mockSections.reduce((sum, s) => sum + s.legitCertificates, 0);
  const overallAttendance = Math.round((totalPresent / totalStudents) * 100);
  const overallLegitRate = Math.round((totalLegit / totalCertificates) * 100);

  const handleSectionClick = (section: Section) => {
    setSelectedSection(section);
    setIsDialogOpen(true);
  };

  const handleExport = () => {
    // Export functionality
  };

  return (
    <DashboardLayout requiredRole="hod">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">HOD Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome, <span className="text-primary font-medium">{user?.name}</span> - CSE Department Overview
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-2 gap-2" onClick={handleExport}>
              <Download className="w-4 h-4" />
              Export All Data
            </Button>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Students"
            value={totalStudents}
            subtitle={`${mockSections.length} sections`}
            icon={<Users className="w-6 h-6" />}
            variant="primary"
          />
          <StatCard
            title="Today's Attendance"
            value={`${overallAttendance}%`}
            subtitle={`${totalPresent} present`}
            icon={<GraduationCap className="w-6 h-6" />}
            variant="success"
          />
          <StatCard
            title="Total Certificates"
            value={totalCertificates}
            subtitle="Uploaded this semester"
            icon={<FileCheck className="w-6 h-6" />}
            variant="warning"
          />
          <StatCard
            title="Legitimacy Rate"
            value={`${overallLegitRate}%`}
            subtitle={`${totalLegit} verified`}
            icon={<TrendingUp className="w-6 h-6" />}
            variant="primary"
          />
        </div>

        {/* Section Cards */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">All Sections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockSections.map((section) => {
              const attendancePercent = Math.round((section.presentStudents / section.totalStudents) * 100);
              const legitPercent = Math.round((section.legitCertificates / section.totalCertificates) * 100);
              
              return (
                <Card 
                  key={section.id} 
                  className="p-6 border-2 cursor-pointer hover:border-primary transition-colors group"
                  onClick={() => handleSectionClick(section)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                        {section.name}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">Section {section.name}</h3>
                        <p className="text-sm text-muted-foreground">{section.totalStudents} students</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>

                  <div className="space-y-4">
                    {/* Attendance */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Attendance Today</span>
                        <span className="font-mono font-semibold">{attendancePercent}%</span>
                      </div>
                      <Progress value={attendancePercent} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1 text-success">
                          <UserCheck className="w-3 h-3" /> {section.presentStudents} Present
                        </span>
                        <span className="flex items-center gap-1 text-destructive">
                          <UserX className="w-3 h-3" /> {section.absentStudents} Absent
                        </span>
                      </div>
                    </div>

                    {/* Certificates */}
                    <div className="pt-4 border-t border-border">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 bg-secondary">
                          <p className="text-lg font-bold font-mono text-foreground">{section.totalCertificates}</p>
                          <p className="text-xs text-muted-foreground">Total</p>
                        </div>
                        <div className="p-2 bg-success/10">
                          <p className="text-lg font-bold font-mono text-success">{section.legitCertificates}</p>
                          <p className="text-xs text-muted-foreground">Legit</p>
                        </div>
                        <div className="p-2 bg-destructive/10">
                          <p className="text-lg font-bold font-mono text-destructive">{section.totalCertificates - section.legitCertificates}</p>
                          <p className="text-xs text-muted-foreground">Not Legit</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3 p-2 bg-primary/5 border border-primary/20">
                        <span className="text-sm text-muted-foreground">Legitimacy Rate</span>
                        <span className="font-mono font-bold text-primary">{legitPercent}%</span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Summary Table */}
        <Card className="p-6 border-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">Certificate Summary</h2>
            <Button variant="outline" className="border-2 gap-2" onClick={handleExport}>
              <Download className="w-4 h-4" />
              Export Excel
            </Button>
          </div>
          <div className="border-2 border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary hover:bg-secondary">
                  <TableHead className="font-bold">Section</TableHead>
                  <TableHead className="font-bold">Students</TableHead>
                  <TableHead className="font-bold">Attendance</TableHead>
                  <TableHead className="font-bold">Total Certificates</TableHead>
                  <TableHead className="font-bold">Legitimate</TableHead>
                  <TableHead className="font-bold">Not Legitimate</TableHead>
                  <TableHead className="font-bold">Legit Rate</TableHead>
                  <TableHead className="font-bold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockSections.map((section) => {
                  const legitPercent = Math.round((section.legitCertificates / section.totalCertificates) * 100);
                  const attendancePercent = Math.round((section.presentStudents / section.totalStudents) * 100);
                  
                  return (
                    <TableRow key={section.id} className="hover:bg-secondary/50">
                      <TableCell>
                        <Badge className="border-2">Section {section.name}</Badge>
                      </TableCell>
                      <TableCell className="font-mono">{section.totalStudents}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={attendancePercent} className="h-2 w-16" />
                          <span className="font-mono text-sm">{attendancePercent}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono">{section.totalCertificates}</TableCell>
                      <TableCell>
                        <span className="font-mono text-success">{section.legitCertificates}</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-destructive">{section.totalCertificates - section.legitCertificates}</span>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={`border-2 ${legitPercent >= 80 ? 'border-success text-success' : legitPercent >= 60 ? 'border-warning text-warning' : 'border-destructive text-destructive'}`}
                        >
                          {legitPercent}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="gap-1"
                          onClick={() => handleSectionClick(section)}
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Section Details Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl border-2">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  {selectedSection?.name}
                </div>
                Section {selectedSection?.name} Details
              </DialogTitle>
            </DialogHeader>
            
            {selectedSection && (
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="p-4 bg-secondary border-2 border-border text-center">
                    <p className="text-2xl font-bold font-mono">{selectedSection.totalStudents}</p>
                    <p className="text-sm text-muted-foreground">Total Students</p>
                  </div>
                  <div className="p-4 bg-success/10 border-2 border-success/30 text-center">
                    <p className="text-2xl font-bold font-mono text-success">{selectedSection.presentStudents}</p>
                    <p className="text-sm text-muted-foreground">Present</p>
                  </div>
                  <div className="p-4 bg-destructive/10 border-2 border-destructive/30 text-center">
                    <p className="text-2xl font-bold font-mono text-destructive">{selectedSection.absentStudents}</p>
                    <p className="text-sm text-muted-foreground">Absent</p>
                  </div>
                  <div className="p-4 bg-primary/10 border-2 border-primary/30 text-center">
                    <p className="text-2xl font-bold font-mono text-primary">
                      {Math.round((selectedSection.legitCertificates / selectedSection.totalCertificates) * 100)}%
                    </p>
                    <p className="text-sm text-muted-foreground">Legit Rate</p>
                  </div>
                </div>

                {/* Student List */}
                <div>
                  <h3 className="font-bold text-foreground mb-3">Student List</h3>
                  <div className="border-2 border-border overflow-hidden max-h-64 overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-secondary hover:bg-secondary">
                          <TableHead className="font-bold">Register No.</TableHead>
                          <TableHead className="font-bold">Name</TableHead>
                          <TableHead className="font-bold">Email</TableHead>
                          <TableHead className="font-bold">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockStudents[selectedSection.name]?.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell className="font-mono">{student.registerNumber}</TableCell>
                            <TableCell className="font-medium">{student.name}</TableCell>
                            <TableCell className="text-muted-foreground">{student.email}</TableCell>
                            <TableCell>
                              <Badge 
                                variant="outline"
                                className={`border-2 ${student.isPresent ? 'border-success text-success' : 'border-destructive text-destructive'}`}
                              >
                                {student.isPresent ? 'Present' : 'Absent'}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {/* Certificate Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-secondary border-2 border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <FileCheck className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Total Certificates</span>
                    </div>
                    <p className="text-2xl font-bold font-mono">{selectedSection.totalCertificates}</p>
                  </div>
                  <div className="p-4 bg-success/10 border-2 border-success/30">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                      <span className="text-sm text-muted-foreground">Legitimate</span>
                    </div>
                    <p className="text-2xl font-bold font-mono text-success">{selectedSection.legitCertificates}</p>
                  </div>
                  <div className="p-4 bg-destructive/10 border-2 border-destructive/30">
                    <div className="flex items-center gap-2 mb-2">
                      <XCircle className="w-5 h-5 text-destructive" />
                      <span className="text-sm text-muted-foreground">Not Legitimate</span>
                    </div>
                    <p className="text-2xl font-bold font-mono text-destructive">
                      {selectedSection.totalCertificates - selectedSection.legitCertificates}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" className="border-2 gap-2">
                    <Download className="w-4 h-4" />
                    Export Section Data
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
