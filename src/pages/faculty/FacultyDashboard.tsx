import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { StatCard } from '@/components/ui/stat-card';
import { Card } from '@/components/ui/card';
import { 
  Users, 
  UserCheck, 
  UserX, 
  FileCheck,
  Clock,
  CheckCircle2,
  XCircle,
  TrendingUp
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Mock data
const mockClassData = {
  totalStudents: 60,
  presentToday: 54,
  absentToday: 6,
  sections: [
    { name: 'Section A', total: 30, present: 28, absent: 2 },
    { name: 'Section B', total: 30, present: 26, absent: 4 },
  ],
  certificates: {
    total: 145,
    pending: 23,
    verified: 112,
    rejected: 10,
  },
  recentActivity: [
    { type: 'certificate', student: 'John Doe (RA2211003010)', action: 'Certificate uploaded', time: '2 min ago' },
    { type: 'attendance', student: 'Jane Smith (RA2211003015)', action: 'Marked present', time: '15 min ago' },
    { type: 'certificate', student: 'Mike Wilson (RA2211003022)', action: 'Certificate verified', time: '1 hour ago' },
    { type: 'certificate', student: 'Sarah Brown (RA2211003008)', action: 'Certificate rejected', time: '2 hours ago' },
  ],
};

export default function FacultyDashboard() {
  const { user } = useAuth();
  const attendancePercentage = Math.round((mockClassData.presentToday / mockClassData.totalStudents) * 100);
  const verificationPercentage = Math.round((mockClassData.certificates.verified / mockClassData.certificates.total) * 100);

  return (
    <DashboardLayout requiredRole="faculty">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, <span className="text-primary font-medium">{user?.name}</span>
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-secondary border-2 border-border">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground font-mono">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Students"
            value={mockClassData.totalStudents}
            subtitle="Across all sections"
            icon={<Users className="w-6 h-6" />}
            variant="primary"
          />
          <StatCard
            title="Present Today"
            value={mockClassData.presentToday}
            subtitle={`${attendancePercentage}% attendance`}
            icon={<UserCheck className="w-6 h-6" />}
            variant="success"
          />
          <StatCard
            title="Absent Today"
            value={mockClassData.absentToday}
            subtitle="Requires attention"
            icon={<UserX className="w-6 h-6" />}
            variant="destructive"
          />
          <StatCard
            title="Certificates"
            value={mockClassData.certificates.total}
            subtitle={`${mockClassData.certificates.pending} pending`}
            icon={<FileCheck className="w-6 h-6" />}
            variant="warning"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Section-wise Attendance */}
          <Card className="lg:col-span-2 p-6 border-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Section-wise Attendance</h2>
              <span className="text-sm text-muted-foreground font-mono">Today</span>
            </div>
            <div className="space-y-6">
              {mockClassData.sections.map((section) => (
                <div key={section.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{section.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {section.present}/{section.total} present
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Progress 
                      value={(section.present / section.total) * 100} 
                      className="h-3 flex-1"
                    />
                    <span className="text-sm font-mono font-semibold text-primary w-12 text-right">
                      {Math.round((section.present / section.total) * 100)}%
                    </span>
                  </div>
                  <div className="flex gap-4 text-xs">
                    <span className="text-success flex items-center gap-1">
                      <UserCheck className="w-3 h-3" /> {section.present} Present
                    </span>
                    <span className="text-destructive flex items-center gap-1">
                      <UserX className="w-3 h-3" /> {section.absent} Absent
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Certificate Status */}
          <Card className="p-6 border-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Certificate Status</h2>
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-4">
              <div className="text-center py-4 border-2 border-border bg-secondary/50">
                <p className="text-4xl font-bold font-mono text-primary">{verificationPercentage}%</p>
                <p className="text-sm text-muted-foreground mt-1">Verification Rate</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-warning/10 border-2 border-warning/30">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-warning" />
                    <span className="text-sm">Pending</span>
                  </div>
                  <span className="font-mono font-bold">{mockClassData.certificates.pending}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-success/10 border-2 border-success/30">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span className="text-sm">Verified</span>
                  </div>
                  <span className="font-mono font-bold">{mockClassData.certificates.verified}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-destructive/10 border-2 border-destructive/30">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-destructive" />
                    <span className="text-sm">Rejected</span>
                  </div>
                  <span className="font-mono font-bold">{mockClassData.certificates.rejected}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="p-6 border-2">
          <h2 className="text-xl font-bold text-foreground mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {mockClassData.recentActivity.map((activity, index) => (
              <div 
                key={index} 
                className="flex items-center gap-4 p-4 bg-secondary/50 border-2 border-border hover:border-primary/30 transition-colors"
              >
                <div className={`w-10 h-10 flex items-center justify-center ${
                  activity.type === 'certificate' ? 'bg-primary/10' : 'bg-success/10'
                }`}>
                  {activity.type === 'certificate' ? (
                    <FileCheck className="w-5 h-5 text-primary" />
                  ) : (
                    <UserCheck className="w-5 h-5 text-success" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.student}</p>
                </div>
                <span className="text-xs text-muted-foreground font-mono">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
