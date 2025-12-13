import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Users, UserCheck, UserX, FileCheck, Clock, CheckCircle2, XCircle, TrendingUp } from 'lucide-react';

const mockClassData = {
  totalStudents: 60, presentToday: 54, absentToday: 6,
  sections: [{ name: 'Section A', total: 30, present: 28, absent: 2 }, { name: 'Section B', total: 30, present: 26, absent: 4 }],
  certificates: { total: 145, pending: 23, verified: 112, rejected: 10 },
  recentActivity: [
    { type: 'certificate', student: 'John Doe (RA2211003010)', action: 'Certificate uploaded', time: '2 min ago' },
    { type: 'attendance', student: 'Jane Smith (RA2211003015)', action: 'Marked present', time: '15 min ago' },
  ],
};

export default function FacultyDashboard() {
  const { user } = useAuth();
  const attendancePercentage = Math.round((mockClassData.presentToday / mockClassData.totalStudents) * 100);
  const verificationPercentage = Math.round((mockClassData.certificates.verified / mockClassData.certificates.total) * 100);

  return (
    <DashboardLayout requiredRole="faculty">
      <div className="space-y-8">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-subtitle">Welcome back, <span>{user?.name}</span></p>
          </div>
          <div className="dashboard-date">
            <Clock />
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card stat-card-primary"><div className="stat-card-content"><div className="stat-card-info"><p className="stat-card-title">Total Students</p><p className="stat-card-value">{mockClassData.totalStudents}</p><p className="stat-card-subtitle">Across all sections</p></div><div className="stat-card-icon"><Users /></div></div></div>
          <div className="stat-card stat-card-success"><div className="stat-card-content"><div className="stat-card-info"><p className="stat-card-title">Present Today</p><p className="stat-card-value">{mockClassData.presentToday}</p><p className="stat-card-subtitle">{attendancePercentage}% attendance</p></div><div className="stat-card-icon"><UserCheck /></div></div></div>
          <div className="stat-card stat-card-destructive"><div className="stat-card-content"><div className="stat-card-info"><p className="stat-card-title">Absent Today</p><p className="stat-card-value">{mockClassData.absentToday}</p><p className="stat-card-subtitle">Requires attention</p></div><div className="stat-card-icon"><UserX /></div></div></div>
          <div className="stat-card stat-card-warning"><div className="stat-card-content"><div className="stat-card-info"><p className="stat-card-title">Certificates</p><p className="stat-card-value">{mockClassData.certificates.total}</p><p className="stat-card-subtitle">{mockClassData.certificates.pending} pending</p></div><div className="stat-card-icon"><FileCheck /></div></div></div>
        </div>

        <div className="content-grid">
          <div className="section-card">
            <div className="section-card-header"><h2 className="section-card-title">Section-wise Attendance</h2><span className="section-card-subtitle">Today</span></div>
            <div className="section-progress">
              {mockClassData.sections.map((section) => (
                <div key={section.name} className="section-progress-item">
                  <div className="section-progress-header"><span className="section-progress-name">{section.name}</span><span className="section-progress-count">{section.present}/{section.total} present</span></div>
                  <div className="section-progress-bar-wrapper"><div className="progress"><div className="progress-bar" style={{ width: `${(section.present / section.total) * 100}%` }} /></div><span className="section-progress-percent">{Math.round((section.present / section.total) * 100)}%</span></div>
                  <div className="section-progress-stats"><span className="section-progress-stat success"><UserCheck /> {section.present} Present</span><span className="section-progress-stat destructive"><UserX /> {section.absent} Absent</span></div>
                </div>
              ))}
            </div>
          </div>

          <div className="section-card">
            <div className="section-card-header"><h2 className="section-card-title">Certificate Status</h2><TrendingUp /></div>
            <div className="certificate-status">
              <div className="certificate-status-main"><p className="certificate-status-value">{verificationPercentage}%</p><p className="certificate-status-label">Verification Rate</p></div>
              <div className="certificate-status-items">
                <div className="certificate-status-item warning"><div className="certificate-status-item-label warning"><Clock /> Pending</div><span className="certificate-status-item-value">{mockClassData.certificates.pending}</span></div>
                <div className="certificate-status-item success"><div className="certificate-status-item-label success"><CheckCircle2 /> Verified</div><span className="certificate-status-item-value">{mockClassData.certificates.verified}</span></div>
                <div className="certificate-status-item destructive"><div className="certificate-status-item-label destructive"><XCircle /> Rejected</div><span className="certificate-status-item-value">{mockClassData.certificates.rejected}</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="section-card">
          <h2 className="section-card-title mb-6">Recent Activity</h2>
          <div className="activity-list">
            {mockClassData.recentActivity.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className={`activity-item-icon ${activity.type}`}>{activity.type === 'certificate' ? <FileCheck /> : <UserCheck />}</div>
                <div className="activity-item-content"><p className="activity-item-action">{activity.action}</p><p className="activity-item-student">{activity.student}</p></div>
                <span className="activity-item-time">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
