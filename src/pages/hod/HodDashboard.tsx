import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Modal } from '@/components/ui/Modal';
import { Users, FileCheck, TrendingUp, Download, CheckCircle2, XCircle, Clock, ChevronRight } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  regNo: string;
  totalCertificates: number;
  verified: number;
  pending: number;
  rejected: number;
}

interface Section {
  id: string;
  name: string;
  totalStudents: number;
  totalCertificates: number;
  legitCertificates: number;
  pendingCertificates: number;
  students: Student[];
}

const mockSections: Section[] = [
  {
    id: '1',
    name: 'A',
    totalStudents: 30,
    totalCertificates: 85,
    legitCertificates: 78,
    pendingCertificates: 5,
    students: [
      { id: '1', name: 'John Doe', regNo: 'RA2211003010', totalCertificates: 5, verified: 4, pending: 1, rejected: 0 },
      { id: '2', name: 'Jane Smith', regNo: 'RA2211003011', totalCertificates: 3, verified: 3, pending: 0, rejected: 0 },
      { id: '3', name: 'Mike Johnson', regNo: 'RA2211003012', totalCertificates: 4, verified: 2, pending: 1, rejected: 1 },
      { id: '4', name: 'Emily Brown', regNo: 'RA2211003013', totalCertificates: 2, verified: 2, pending: 0, rejected: 0 },
      { id: '5', name: 'David Wilson', regNo: 'RA2211003014', totalCertificates: 6, verified: 5, pending: 1, rejected: 0 },
    ],
  },
  {
    id: '2',
    name: 'B',
    totalStudents: 30,
    totalCertificates: 72,
    legitCertificates: 65,
    pendingCertificates: 4,
    students: [
      { id: '6', name: 'Sarah Davis', regNo: 'RA2211003020', totalCertificates: 4, verified: 3, pending: 1, rejected: 0 },
      { id: '7', name: 'Chris Lee', regNo: 'RA2211003021', totalCertificates: 5, verified: 4, pending: 0, rejected: 1 },
      { id: '8', name: 'Anna Taylor', regNo: 'RA2211003022', totalCertificates: 3, verified: 3, pending: 0, rejected: 0 },
      { id: '9', name: 'Tom Anderson', regNo: 'RA2211003023', totalCertificates: 2, verified: 1, pending: 1, rejected: 0 },
      { id: '10', name: 'Lisa White', regNo: 'RA2211003024', totalCertificates: 4, verified: 4, pending: 0, rejected: 0 },
    ],
  },
];

export default function HodDashboard() {
  const { user } = useAuth();
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  
  const totalStudents = mockSections.reduce((sum, s) => sum + s.totalStudents, 0);
  const totalCertificates = mockSections.reduce((sum, s) => sum + s.totalCertificates, 0);
  const totalLegit = mockSections.reduce((sum, s) => sum + s.legitCertificates, 0);
  const totalPending = mockSections.reduce((sum, s) => sum + s.pendingCertificates, 0);
  const overallLegitRate = Math.round((totalLegit / totalCertificates) * 100);

  return (
    <DashboardLayout requiredRole="hod">
      <div className="space-y-8">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">HOD Dashboard</h1>
            <p className="dashboard-subtitle">Welcome, <span>{user?.name}</span> - CSE Department Overview</p>
          </div>
          <button className="btn btn-outline">
            <Download /> Export All Data
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card stat-card-primary">
            <div className="stat-card-content">
              <div className="stat-card-info">
                <p className="stat-card-title">Total Students</p>
                <p className="stat-card-value">{totalStudents}</p>
                <p className="stat-card-subtitle">{mockSections.length} sections</p>
              </div>
              <div className="stat-card-icon"><Users /></div>
            </div>
          </div>
          <div className="stat-card stat-card-warning">
            <div className="stat-card-content">
              <div className="stat-card-info">
                <p className="stat-card-title">Total Certificates</p>
                <p className="stat-card-value">{totalCertificates}</p>
                <p className="stat-card-subtitle">Uploaded this semester</p>
              </div>
              <div className="stat-card-icon"><FileCheck /></div>
            </div>
          </div>
          <div className="stat-card stat-card-success">
            <div className="stat-card-content">
              <div className="stat-card-info">
                <p className="stat-card-title">Verified Certificates</p>
                <p className="stat-card-value">{totalLegit}</p>
                <p className="stat-card-subtitle">{overallLegitRate}% verification rate</p>
              </div>
              <div className="stat-card-icon"><CheckCircle2 /></div>
            </div>
          </div>
          <div className="stat-card stat-card-primary">
            <div className="stat-card-content">
              <div className="stat-card-info">
                <p className="stat-card-title">Pending Review</p>
                <p className="stat-card-value">{totalPending}</p>
                <p className="stat-card-subtitle">Awaiting verification</p>
              </div>
              <div className="stat-card-icon"><Clock /></div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="section-card-title mb-4">All Sections</h2>
          <div className="sections-grid">
            {mockSections.map((section) => {
              const legitPercent = Math.round((section.legitCertificates / section.totalCertificates) * 100);
              const rejectedCount = section.totalCertificates - section.legitCertificates - section.pendingCertificates;
              
              return (
                <div 
                  key={section.id} 
                  className="section-detail-card"
                  onClick={() => setSelectedSection(section)}
                >
                  <div className="section-detail-header">
                    <div className="section-detail-header-left">
                      <div className="section-letter">{section.name}</div>
                      <div>
                        <div className="section-detail-title">Section {section.name}</div>
                        <div className="section-detail-count">{section.totalStudents} students</div>
                      </div>
                    </div>
                    <ChevronRight className="section-detail-chevron" />
                  </div>
                  
                  <div className="section-detail-stats">
                    <div className="section-detail-stat total">
                      <div className="section-detail-stat-value">{section.totalCertificates}</div>
                      <div className="section-detail-stat-label">Total</div>
                    </div>
                    <div className="section-detail-stat legit">
                      <div className="section-detail-stat-value">{section.legitCertificates}</div>
                      <div className="section-detail-stat-label">Verified</div>
                    </div>
                    <div className="section-detail-stat pending">
                      <div className="section-detail-stat-value">{section.pendingCertificates}</div>
                      <div className="section-detail-stat-label">Pending</div>
                    </div>
                    <div className="section-detail-stat not-legit">
                      <div className="section-detail-stat-value">{rejectedCount}</div>
                      <div className="section-detail-stat-label">Rejected</div>
                    </div>
                  </div>
                  
                  <div className="section-detail-rate">
                    <span className="section-detail-rate-label">Verification Rate</span>
                    <span className="section-detail-rate-value">{legitPercent}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Modal
        isOpen={!!selectedSection}
        onClose={() => setSelectedSection(null)}
        title={`Section ${selectedSection?.name} - Certificate Details`}
      >
        {selectedSection && (
          <div className="section-modal-content">
            <div className="section-modal-summary">
              <div className="section-modal-stat">
                <span className="section-modal-stat-value">{selectedSection.totalStudents}</span>
                <span className="section-modal-stat-label">Students</span>
              </div>
              <div className="section-modal-stat">
                <span className="section-modal-stat-value">{selectedSection.totalCertificates}</span>
                <span className="section-modal-stat-label">Total Certificates</span>
              </div>
              <div className="section-modal-stat success">
                <span className="section-modal-stat-value">{selectedSection.legitCertificates}</span>
                <span className="section-modal-stat-label">Verified</span>
              </div>
              <div className="section-modal-stat warning">
                <span className="section-modal-stat-value">{selectedSection.pendingCertificates}</span>
                <span className="section-modal-stat-label">Pending</span>
              </div>
            </div>

            <h3 className="section-modal-subtitle">Student Certificate Details</h3>
            
            <div className="student-list">
              {selectedSection.students.map((student) => (
                <div key={student.id} className="student-card">
                  <div className="student-info">
                    <p className="student-name">{student.name}</p>
                    <p className="student-regno">{student.regNo}</p>
                  </div>
                  <div className="student-stats">
                    <span className="student-stat total">
                      <FileCheck /> {student.totalCertificates}
                    </span>
                    <span className="student-stat success">
                      <CheckCircle2 /> {student.verified}
                    </span>
                    <span className="student-stat warning">
                      <Clock /> {student.pending}
                    </span>
                    <span className="student-stat destructive">
                      <XCircle /> {student.rejected}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}
