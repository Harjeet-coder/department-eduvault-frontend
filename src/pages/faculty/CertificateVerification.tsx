import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Upload, 
  Link as LinkIcon, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Clock,
  Download,
  Eye,
  AlertTriangle,
  Cpu,
  ShieldCheck
} from 'lucide-react';

interface CertificateEntry {
  id: string;
  driveLink: string;
  registerNumber: string;
  section: string;
}

interface Certificate {
  id: string;
  studentName: string;
  registerNumber: string;
  section: string;
  driveLink: string;
  mlStatus: 'pending' | 'verified' | 'duplicate';
  facultyStatus: 'pending' | 'legit' | 'not_legit';
  mlScore?: number;
  uploadedAt: string;
}

// Mock certificates data
const mockCertificates: Certificate[] = [
  { id: '1', studentName: 'John Doe', registerNumber: 'RA2211003010', section: 'A', driveLink: 'https://drive.google.com/file/1', mlStatus: 'verified', facultyStatus: 'pending', mlScore: 95, uploadedAt: '2024-01-15' },
  { id: '2', studentName: 'Jane Smith', registerNumber: 'RA2211003015', section: 'A', driveLink: 'https://drive.google.com/file/2', mlStatus: 'verified', facultyStatus: 'legit', mlScore: 98, uploadedAt: '2024-01-14' },
  { id: '3', studentName: 'Mike Wilson', registerNumber: 'RA2211003022', section: 'B', driveLink: 'https://drive.google.com/file/3', mlStatus: 'duplicate', facultyStatus: 'not_legit', mlScore: 45, uploadedAt: '2024-01-13' },
  { id: '4', studentName: 'Sarah Brown', registerNumber: 'RA2211003008', section: 'A', driveLink: 'https://drive.google.com/file/4', mlStatus: 'pending', facultyStatus: 'pending', uploadedAt: '2024-01-12' },
  { id: '5', studentName: 'Tom Davis', registerNumber: 'RA2211003030', section: 'B', driveLink: 'https://drive.google.com/file/5', mlStatus: 'verified', facultyStatus: 'legit', mlScore: 92, uploadedAt: '2024-01-11' },
];

export default function CertificateVerification() {
  const [entries, setEntries] = useState<CertificateEntry[]>([
    { id: '1', driveLink: '', registerNumber: '', section: '' }
  ]);
  const [certificates, setCertificates] = useState<Certificate[]>(mockCertificates);
  const { toast } = useToast();

  const addEntry = () => {
    if (entries.length >= 10) {
      toast({
        title: 'Maximum Limit Reached',
        description: 'You can upload a maximum of 10 certificates at once.',
        variant: 'destructive',
      });
      return;
    }
    setEntries([...entries, { id: Date.now().toString(), driveLink: '', registerNumber: '', section: '' }]);
  };

  const removeEntry = (id: string) => {
    if (entries.length === 1) return;
    setEntries(entries.filter(e => e.id !== id));
  };

  const updateEntry = (id: string, field: keyof CertificateEntry, value: string) => {
    setEntries(entries.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const handleUpload = () => {
    const validEntries = entries.filter(e => e.driveLink && e.registerNumber && e.section);
    if (validEntries.length === 0) {
      toast({
        title: 'No Valid Entries',
        description: 'Please fill in all fields for at least one certificate.',
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: 'Certificates Uploaded',
      description: `${validEntries.length} certificate(s) sent for ML verification.`,
    });
    setEntries([{ id: '1', driveLink: '', registerNumber: '', section: '' }]);
  };

  const handleVerify = (certId: string, isLegit: boolean) => {
    setCertificates(certificates.map(c => 
      c.id === certId ? { ...c, facultyStatus: isLegit ? 'legit' : 'not_legit' } : c
    ));
    toast({
      title: isLegit ? 'Certificate Verified' : 'Certificate Rejected',
      description: `Certificate marked as ${isLegit ? 'legitimate' : 'not legitimate'}.`,
    });
  };

  const handleExport = () => {
    toast({
      title: 'Export Started',
      description: 'Excel file will be downloaded shortly.',
    });
  };

  const pendingVerification = certificates.filter(c => c.mlStatus === 'verified' && c.facultyStatus === 'pending');
  const legitCertificates = certificates.filter(c => c.facultyStatus === 'legit');
  const notLegitCertificates = certificates.filter(c => c.facultyStatus === 'not_legit');

  return (
    <DashboardLayout requiredRole="faculty">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Certificate Verification</h1>
            <p className="text-muted-foreground mt-1">Upload and verify student certificates</p>
          </div>
          <Button onClick={handleExport} variant="outline" className="border-2 gap-2">
            <Download className="w-4 h-4" />
            Export to Excel
          </Button>
        </div>

        {/* Upload Section */}
        <Card className="p-6 border-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 flex items-center justify-center">
              <Upload className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Upload Certificates</h2>
              <p className="text-sm text-muted-foreground">Add up to 10 Google Drive links per batch</p>
            </div>
          </div>

          <div className="space-y-4">
            {entries.map((entry, index) => (
              <div key={entry.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-secondary/50 border-2 border-border">
                <div className="md:col-span-1 flex items-center justify-center">
                  <span className="w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center font-mono font-bold text-sm">
                    {index + 1}
                  </span>
                </div>
                <div className="md:col-span-5">
                  <Label className="text-xs text-muted-foreground mb-1 block">Google Drive Link</Label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="https://drive.google.com/..."
                      value={entry.driveLink}
                      onChange={(e) => updateEntry(entry.id, 'driveLink', e.target.value)}
                      className="pl-10 border-2"
                    />
                  </div>
                </div>
                <div className="md:col-span-3">
                  <Label className="text-xs text-muted-foreground mb-1 block">Register Number</Label>
                  <Input
                    placeholder="RA2211003XXX"
                    value={entry.registerNumber}
                    onChange={(e) => updateEntry(entry.id, 'registerNumber', e.target.value)}
                    className="font-mono border-2"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-xs text-muted-foreground mb-1 block">Section</Label>
                  <Select value={entry.section} onValueChange={(value) => updateEntry(entry.id, 'section', value)}>
                    <SelectTrigger className="border-2">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">Section A</SelectItem>
                      <SelectItem value="B">Section B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-1 flex items-end justify-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeEntry(entry.id)}
                    disabled={entries.length === 1}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4 mt-6">
            <Button variant="outline" onClick={addEntry} className="border-2 gap-2" disabled={entries.length >= 10}>
              <Plus className="w-4 h-4" />
              Add More ({entries.length}/10)
            </Button>
            <Button onClick={handleUpload} className="gap-2 border-2 border-primary shadow-sm">
              <Upload className="w-4 h-4" />
              Upload & Verify
            </Button>
          </div>
        </Card>

        {/* Verification Tabs */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-secondary border-2 border-border">
            <TabsTrigger value="pending" className="py-3 data-[state=active]:bg-warning data-[state=active]:text-warning-foreground">
              <Clock className="w-4 h-4 mr-2" />
              Pending ({pendingVerification.length})
            </TabsTrigger>
            <TabsTrigger value="legit" className="py-3 data-[state=active]:bg-success data-[state=active]:text-success-foreground">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Legitimate ({legitCertificates.length})
            </TabsTrigger>
            <TabsTrigger value="not_legit" className="py-3 data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground">
              <XCircle className="w-4 h-4 mr-2" />
              Not Legitimate ({notLegitCertificates.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingVerification.length === 0 ? (
              <Card className="p-12 border-2 text-center">
                <ShieldCheck className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No certificates pending verification</p>
              </Card>
            ) : (
              pendingVerification.map((cert) => (
                <CertificateCard key={cert.id} certificate={cert} onVerify={handleVerify} showActions />
              ))
            )}
          </TabsContent>

          <TabsContent value="legit" className="space-y-4">
            {legitCertificates.length === 0 ? (
              <Card className="p-12 border-2 text-center">
                <CheckCircle2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No legitimate certificates yet</p>
              </Card>
            ) : (
              legitCertificates.map((cert) => (
                <CertificateCard key={cert.id} certificate={cert} onVerify={handleVerify} />
              ))
            )}
          </TabsContent>

          <TabsContent value="not_legit" className="space-y-4">
            {notLegitCertificates.length === 0 ? (
              <Card className="p-12 border-2 text-center">
                <XCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No certificates marked as not legitimate</p>
              </Card>
            ) : (
              notLegitCertificates.map((cert) => (
                <CertificateCard key={cert.id} certificate={cert} onVerify={handleVerify} />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

interface CertificateCardProps {
  certificate: Certificate;
  onVerify: (id: string, isLegit: boolean) => void;
  showActions?: boolean;
}

function CertificateCard({ certificate, onVerify, showActions }: CertificateCardProps) {
  return (
    <Card className="p-6 border-2 hover:border-primary/30 transition-colors">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Cpu className="w-6 h-6 text-primary" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-foreground">{certificate.studentName}</h3>
            <p className="text-sm font-mono text-muted-foreground">{certificate.registerNumber}</p>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="border-2">Section {certificate.section}</Badge>
              {certificate.mlScore && (
                <Badge 
                  variant="outline" 
                  className={`border-2 ${
                    certificate.mlScore >= 80 ? 'border-success text-success' : 
                    certificate.mlScore >= 50 ? 'border-warning text-warning' : 
                    'border-destructive text-destructive'
                  }`}
                >
                  ML Score: {certificate.mlScore}%
                </Badge>
              )}
              {certificate.mlStatus === 'duplicate' && (
                <Badge variant="destructive" className="gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Potential Duplicate
                </Badge>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="border-2 gap-1" asChild>
            <a href={certificate.driveLink} target="_blank" rel="noopener noreferrer">
              <Eye className="w-4 h-4" />
              View
            </a>
          </Button>
          {showActions && (
            <>
              <Button 
                size="sm" 
                variant="outline"
                className="border-2 border-success text-success hover:bg-success hover:text-success-foreground gap-1"
                onClick={() => onVerify(certificate.id, true)}
              >
                <CheckCircle2 className="w-4 h-4" />
                Legitimate
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground gap-1"
                onClick={() => onVerify(certificate.id, false)}
              >
                <XCircle className="w-4 h-4" />
                Not Legit
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
