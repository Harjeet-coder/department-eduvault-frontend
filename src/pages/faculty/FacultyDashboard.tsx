import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Users, FileCheck, Clock, CheckCircle2, XCircle, TrendingUp } from 'lucide-react';

const mockClassData = {
  totalStudents: 60,
  sections: [
    { name: 'Section A', total: 30, certificates: 45, verified: 40, pending: 3, rejected: 2 },
    { name: 'Section B', total: 30, certificates: 38, verified: 32, pending: 4, rejected: 2 },
  ],
  certificates: { total: 145, pending: 23, verified: 112, rejected: 10 },
  recentActivity: [
    { type: 'verified', student: 'John Doe (RA2211003010)', action: 'Certificate verified', time: '2 min ago' },
    { type: 'uploaded', student: 'Jane Smith (RA2211003015)', action: 'New certificate uploaded', time: '15 min ago' },
    { type: 'rejected', student: 'Mike Johnson (RA2211003020)', action: 'Certificate rejected', time: '30 min ago' },
    { type: 'verified', student: 'Emily Brown (RA2211003025)', action: 'Certificate verified', time: '1 hour ago' },
  ],
};

export default function FacultyDashboard() {
  const { user } = useAuth();
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
          <div className="stat-card stat-card-primary">
            <div className="stat-card-content">
              <div className="stat-card-info">
                <p className="stat-card-title">Total Students</p>
                <p className="stat-card-value">{mockClassData.totalStudents}</p>
                <p className="stat-card-subtitle">Across all sections</p>
              </div>
              <div className="stat-card-icon"><Users /></div>
            </div>
          </div>
          <div className="stat-card stat-card-warning">
            <div className="stat-card-content">
              <div className="stat-card-info">
                <p className="stat-card-title">Total Certificates</p>
                <p className="stat-card-value">{mockClassData.certificates.total}</p>
                <p className="stat-card-subtitle">{mockClassData.certificates.pending} pending review</p>
              </div>
              <div className="stat-card-icon"><FileCheck /></div>
            </div>
          </div>
          <div className="stat-card stat-card-success">
            <div className="stat-card-content">
              <div className="stat-card-info">
                <p className="stat-card-title">Verified</p>
                <p className="stat-card-value">{mockClassData.certificates.verified}</p>
                <p className="stat-card-subtitle">{verificationPercentage}% verification rate</p>
              </div>
              <div className="stat-card-icon"><CheckCircle2 /></div>
            </div>
          </div>
          <div className="stat-card stat-card-destructive">
            <div className="stat-card-content">
              <div className="stat-card-info">
                <p className="stat-card-title">Rejected</p>
                <p className="stat-card-value">{mockClassData.certificates.rejected}</p>
                <p className="stat-card-subtitle">Requires resubmission</p>
              </div>
              <div className="stat-card-icon"><XCircle /></div>
            </div>
          </div>
        </div>

        <div className="content-grid">
          <div className="section-card">
            <div className="section-card-header">
              <h2 className="section-card-title">Section-wise Certificates</h2>
              <span className="section-card-subtitle">Overview</span>
            </div>
            <div className="section-progress">
              {mockClassData.sections.map((section) => (
                <div key={section.name} className="section-progress-item">
                  <div className="section-progress-header">
                    <span className="section-progress-name">{section.name}</span>
                    <span className="section-progress-count">{section.verified}/{section.certificates} verified</span>
                  </div>
                  <div className="section-progress-bar-wrapper">
                    <div className="progress">
                      <div className="progress-bar" style={{ width: `${(section.verified / section.certificates) * 100}%` }} />
                    </div>
                    <span className="section-progress-percent">{Math.round((section.verified / section.certificates) * 100)}%</span>
                  </div>
                  <div className="section-progress-stats">
                    <span className="section-progress-stat success"><CheckCircle2 /> {section.verified} Verified</span>
                    <span className="section-progress-stat warning"><Clock /> {section.pending} Pending</span>
                    <span className="section-progress-stat destructive"><XCircle /> {section.rejected} Rejected</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="section-card">
            <div className="section-card-header">
              <h2 className="section-card-title">Certificate Status</h2>
              <TrendingUp />
            </div>
            <div className="certificate-status">
              <div className="certificate-status-main">
                <p className="certificate-status-value">{verificationPercentage}%</p>
                <p className="certificate-status-label">Verification Rate</p>
              </div>
              <div className="certificate-status-items">
                <div className="certificate-status-item warning">
                  <div className="certificate-status-item-label warning"><Clock /> Pending</div>
                  <span className="certificate-status-item-value">{mockClassData.certificates.pending}</span>
                </div>
                <div className="certificate-status-item success">
                  <div className="certificate-status-item-label success"><CheckCircle2 /> Verified</div>
                  <span className="certificate-status-item-value">{mockClassData.certificates.verified}</span>
                </div>
                <div className="certificate-status-item destructive">
                  <div className="certificate-status-item-label destructive"><XCircle /> Rejected</div>
                  <span className="certificate-status-item-value">{mockClassData.certificates.rejected}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section-card">
          <h2 className="section-card-title mb-6">Recent Activity</h2>
          <div className="activity-list">
            {mockClassData.recentActivity.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className={`activity-item-icon ${activity.type}`}>
                  {activity.type === 'verified' && <CheckCircle2 />}
                  {activity.type === 'uploaded' && <FileCheck />}
                  {activity.type === 'rejected' && <XCircle />}
                </div>
                <div className="activity-item-content">
                  <p className="activity-item-action">{activity.action}</p>
                  <p className="activity-item-student">{activity.student}</p>
                </div>
                <span className="activity-item-time">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
