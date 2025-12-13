import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Users, GraduationCap, FileCheck, TrendingUp, Download, UserCheck, UserX, ChevronRight } from 'lucide-react';

const mockSections = [
  { id: '1', name: 'A', totalStudents: 30, presentStudents: 28, absentStudents: 2, totalCertificates: 85, legitCertificates: 78 },
  { id: '2', name: 'B', totalStudents: 30, presentStudents: 26, absentStudents: 4, totalCertificates: 72, legitCertificates: 65 },
];

export default function HodDashboard() {
  const { user } = useAuth();
  const totalStudents = mockSections.reduce((sum, s) => sum + s.totalStudents, 0);
  const totalPresent = mockSections.reduce((sum, s) => sum + s.presentStudents, 0);
  const totalCertificates = mockSections.reduce((sum, s) => sum + s.totalCertificates, 0);
  const totalLegit = mockSections.reduce((sum, s) => sum + s.legitCertificates, 0);
  const overallAttendance = Math.round((totalPresent / totalStudents) * 100);
  const overallLegitRate = Math.round((totalLegit / totalCertificates) * 100);

  return (
    <DashboardLayout requiredRole="hod">
      <div className="space-y-8">
        <div className="dashboard-header">
          <div><h1 className="dashboard-title">HOD Dashboard</h1><p className="dashboard-subtitle">Welcome, <span>{user?.name}</span> - CSE Department Overview</p></div>
          <button className="btn btn-outline"><Download /> Export All Data</button>
        </div>

        <div className="stats-grid">
          <div className="stat-card stat-card-primary"><div className="stat-card-content"><div className="stat-card-info"><p className="stat-card-title">Total Students</p><p className="stat-card-value">{totalStudents}</p><p className="stat-card-subtitle">{mockSections.length} sections</p></div><div className="stat-card-icon"><Users /></div></div></div>
          <div className="stat-card stat-card-success"><div className="stat-card-content"><div className="stat-card-info"><p className="stat-card-title">Today's Attendance</p><p className="stat-card-value">{overallAttendance}%</p><p className="stat-card-subtitle">{totalPresent} present</p></div><div className="stat-card-icon"><GraduationCap /></div></div></div>
          <div className="stat-card stat-card-warning"><div className="stat-card-content"><div className="stat-card-info"><p className="stat-card-title">Total Certificates</p><p className="stat-card-value">{totalCertificates}</p><p className="stat-card-subtitle">Uploaded this semester</p></div><div className="stat-card-icon"><FileCheck /></div></div></div>
          <div className="stat-card stat-card-primary"><div className="stat-card-content"><div className="stat-card-info"><p className="stat-card-title">Legitimacy Rate</p><p className="stat-card-value">{overallLegitRate}%</p><p className="stat-card-subtitle">{totalLegit} verified</p></div><div className="stat-card-icon"><TrendingUp /></div></div></div>
        </div>

        <div><h2 className="section-card-title mb-4">All Sections</h2>
          <div className="sections-grid">
            {mockSections.map((section) => {
              const attendancePercent = Math.round((section.presentStudents / section.totalStudents) * 100);
              const legitPercent = Math.round((section.legitCertificates / section.totalCertificates) * 100);
              return (
                <div key={section.id} className="section-detail-card">
                  <div className="section-detail-header"><div className="section-detail-header-left"><div className="section-letter">{section.name}</div><div><div className="section-detail-title">Section {section.name}</div><div className="section-detail-count">{section.totalStudents} students</div></div></div><ChevronRight className="section-detail-chevron" /></div>
                  <div className="space-y-2"><div className="flex justify-between" style={{fontSize:'0.875rem'}}><span style={{color:'var(--muted-foreground)'}}>Attendance Today</span><span className="font-mono">{attendancePercent}%</span></div><div className="progress"><div className="progress-bar" style={{width:`${attendancePercent}%`}} /></div><div className="flex justify-between" style={{fontSize:'0.75rem'}}><span className="section-progress-stat success"><UserCheck /> {section.presentStudents} Present</span><span className="section-progress-stat destructive"><UserX /> {section.absentStudents} Absent</span></div></div>
                  <div className="section-detail-stats"><div className="section-detail-stat total"><div className="section-detail-stat-value">{section.totalCertificates}</div><div className="section-detail-stat-label">Total</div></div><div className="section-detail-stat legit"><div className="section-detail-stat-value">{section.legitCertificates}</div><div className="section-detail-stat-label">Legit</div></div><div className="section-detail-stat not-legit"><div className="section-detail-stat-value">{section.totalCertificates - section.legitCertificates}</div><div className="section-detail-stat-label">Not Legit</div></div></div>
                  <div className="section-detail-rate"><span className="section-detail-rate-label">Legitimacy Rate</span><span className="section-detail-rate-value">{legitPercent}%</span></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
