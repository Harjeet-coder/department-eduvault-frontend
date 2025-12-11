import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  Mail, 
  BadgeCheck, 
  Building2, 
  Users,
  Plus,
  Pencil,
  Trash2,
  Search
} from 'lucide-react';
import { Student } from '@/types';

// Mock student data
const initialStudents: Student[] = [
  { id: '1', registerNumber: 'RA2211003010', name: 'John Doe', email: 'john@ctchennai.net', section: 'A', semester: 5, isPresent: true },
  { id: '2', registerNumber: 'RA2211003015', name: 'Jane Smith', email: 'jane@ctchennai.net', section: 'A', semester: 5, isPresent: true },
  { id: '3', registerNumber: 'RA2211003022', name: 'Mike Wilson', email: 'mike@ctchennai.net', section: 'B', semester: 5, isPresent: false },
  { id: '4', registerNumber: 'RA2211003008', name: 'Sarah Brown', email: 'sarah@ctchennai.net', section: 'A', semester: 5, isPresent: true },
  { id: '5', registerNumber: 'RA2211003030', name: 'Tom Davis', email: 'tom@ctchennai.net', section: 'B', semester: 5, isPresent: true },
  { id: '6', registerNumber: 'RA2211003045', name: 'Emily Johnson', email: 'emily@ctchennai.net', section: 'A', semester: 5, isPresent: true },
  { id: '7', registerNumber: 'RA2211003052', name: 'David Lee', email: 'david@ctchennai.net', section: 'B', semester: 5, isPresent: false },
  { id: '8', registerNumber: 'RA2211003067', name: 'Lisa Wang', email: 'lisa@ctchennai.net', section: 'A', semester: 5, isPresent: true },
];

export default function FacultyProfile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [sectionFilter, setSectionFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [newStudent, setNewStudent] = useState({
    registerNumber: '',
    name: '',
    email: '',
    section: '',
    semester: 5,
  });

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.registerNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSection = sectionFilter === 'all' || student.section === sectionFilter;
    return matchesSearch && matchesSection;
  });

  const handleAddStudent = () => {
    if (!newStudent.registerNumber || !newStudent.name || !newStudent.email || !newStudent.section) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }
    const student: Student = {
      id: Date.now().toString(),
      ...newStudent,
      isPresent: true,
    };
    setStudents([...students, student]);
    setNewStudent({ registerNumber: '', name: '', email: '', section: '', semester: 5 });
    setIsAddDialogOpen(false);
    toast({
      title: 'Student Added',
      description: `${student.name} has been added to the list.`,
    });
  };

  const handleEditStudent = () => {
    if (!editingStudent) return;
    setStudents(students.map(s => s.id === editingStudent.id ? editingStudent : s));
    setEditingStudent(null);
    toast({
      title: 'Student Updated',
      description: 'Student information has been updated.',
    });
  };

  const handleDeleteStudent = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    setStudents(students.filter(s => s.id !== studentId));
    toast({
      title: 'Student Removed',
      description: `${student?.name} has been removed from the list.`,
    });
  };

  return (
    <DashboardLayout requiredRole="faculty">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your profile and student list</p>
        </div>

        {/* Profile Card */}
        <Card className="p-6 border-2">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-primary/10 border-2 border-primary flex items-center justify-center">
                <User className="w-16 h-16 text-primary" />
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{user?.name}</h2>
                <p className="text-primary font-medium">{user?.position}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-secondary border-2 border-border">
                  <BadgeCheck className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Staff ID</p>
                    <p className="font-mono font-medium">{user?.staffId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-secondary border-2 border-border">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Email</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-secondary border-2 border-border">
                  <Building2 className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Department</p>
                    <p className="font-medium">{user?.department}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-secondary border-2 border-border">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Assigned Sections</p>
                    <div className="flex gap-2 mt-1">
                      {user?.assignedSections?.map(section => (
                        <Badge key={section} className="border-2">Section {section}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Student List */}
        <Card className="p-6 border-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Assigned Students</h2>
                <p className="text-sm text-muted-foreground">{students.length} students total</p>
              </div>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 border-2 border-primary shadow-sm">
                  <Plus className="w-4 h-4" />
                  Add Student
                </Button>
              </DialogTrigger>
              <DialogContent className="border-2">
                <DialogHeader>
                  <DialogTitle>Add New Student</DialogTitle>
                  <DialogDescription>Enter the student details below.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Register Number</Label>
                    <Input
                      placeholder="RA2211003XXX"
                      value={newStudent.registerNumber}
                      onChange={(e) => setNewStudent({ ...newStudent, registerNumber: e.target.value })}
                      className="font-mono border-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input
                      placeholder="Student name"
                      value={newStudent.name}
                      onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                      className="border-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      placeholder="student@ctchennai.net"
                      value={newStudent.email}
                      onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                      className="border-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Section</Label>
                    <Select value={newStudent.section} onValueChange={(value) => setNewStudent({ ...newStudent, section: value })}>
                      <SelectTrigger className="border-2">
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">Section A</SelectItem>
                        <SelectItem value="B">Section B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="border-2">Cancel</Button>
                  <Button onClick={handleAddStudent} className="border-2 border-primary">Add Student</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or register number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-2"
              />
            </div>
            <Select value={sectionFilter} onValueChange={setSectionFilter}>
              <SelectTrigger className="w-full md:w-40 border-2">
                <SelectValue placeholder="Filter section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sections</SelectItem>
                <SelectItem value="A">Section A</SelectItem>
                <SelectItem value="B">Section B</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="border-2 border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary hover:bg-secondary">
                  <TableHead className="font-bold">Register No.</TableHead>
                  <TableHead className="font-bold">Name</TableHead>
                  <TableHead className="font-bold">Email</TableHead>
                  <TableHead className="font-bold">Section</TableHead>
                  <TableHead className="font-bold">Status</TableHead>
                  <TableHead className="font-bold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id} className="hover:bg-secondary/50">
                    <TableCell className="font-mono font-medium">{student.registerNumber}</TableCell>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell className="text-muted-foreground">{student.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-2">Section {student.section}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={`border-2 ${student.isPresent ? 'border-success text-success' : 'border-destructive text-destructive'}`}
                      >
                        {student.isPresent ? 'Present' : 'Absent'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => setEditingStudent(student)}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="border-2">
                            <DialogHeader>
                              <DialogTitle>Edit Student</DialogTitle>
                              <DialogDescription>Update student information.</DialogDescription>
                            </DialogHeader>
                            {editingStudent && (
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label>Register Number</Label>
                                  <Input
                                    value={editingStudent.registerNumber}
                                    onChange={(e) => setEditingStudent({ ...editingStudent, registerNumber: e.target.value })}
                                    className="font-mono border-2"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Full Name</Label>
                                  <Input
                                    value={editingStudent.name}
                                    onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                                    className="border-2"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Email</Label>
                                  <Input
                                    type="email"
                                    value={editingStudent.email}
                                    onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })}
                                    className="border-2"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Section</Label>
                                  <Select 
                                    value={editingStudent.section} 
                                    onValueChange={(value) => setEditingStudent({ ...editingStudent, section: value })}
                                  >
                                    <SelectTrigger className="border-2">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="A">Section A</SelectItem>
                                      <SelectItem value="B">Section B</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            )}
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setEditingStudent(null)} className="border-2">Cancel</Button>
                              <Button onClick={handleEditStudent} className="border-2 border-primary">Save Changes</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive hover:bg-destructive/10"
                          onClick={() => handleDeleteStudent(student.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No students found matching your criteria</p>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}
