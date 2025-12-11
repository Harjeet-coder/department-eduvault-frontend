import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, GraduationCap, Users, Loader2, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/types';

export default function Login() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn, isAuthenticated, user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      navigate(`/${user.role}/dashboard`);
    }
  }, [isAuthenticated, user, isLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRole) {
      toast({
        title: 'Select Role',
        description: 'Please select your role to continue.',
        variant: 'destructive',
      });
      return;
    }

    if (!email.endsWith('@citchennai.net')) {
      toast({
        title: 'Invalid Email',
        description: 'Only @citchennai.net email addresses are allowed.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    
    const { error } = signIn(email, selectedRole);
    
    if (error) {
      toast({
        title: 'Sign In Failed',
        description: error.message,
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-sidebar p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 border-2 border-sidebar-primary rotate-45" />
          <div className="absolute bottom-20 right-10 w-48 h-48 border-2 border-sidebar-primary" />
          <div className="absolute top-1/2 left-1/3 w-32 h-32 border-2 border-sidebar-primary rotate-12" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-sidebar-primary flex items-center justify-center">
              <Shield className="w-8 h-8 text-sidebar-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-sidebar-foreground">EduVault</h1>
              <p className="text-sidebar-foreground/60 font-mono text-sm">Certificate Verification System</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-sidebar-foreground leading-tight">
              Secure Academic<br />
              <span className="text-sidebar-primary">Certificate Management</span>
            </h2>
            <p className="text-sidebar-foreground/70 text-lg max-w-md">
              Streamlined verification workflow with ML-powered duplicate detection for the CSE Department.
            </p>
          </div>
          
          <div className="flex gap-4 pt-4">
            <div className="px-4 py-2 border-2 border-sidebar-border bg-sidebar-accent">
              <p className="text-xs text-sidebar-foreground/60 uppercase tracking-wider">Department</p>
              <p className="text-sidebar-foreground font-semibold">CSE</p>
            </div>
            <div className="px-4 py-2 border-2 border-sidebar-border bg-sidebar-accent">
              <p className="text-xs text-sidebar-foreground/60 uppercase tracking-wider">Institution</p>
              <p className="text-sidebar-foreground font-semibold">CIT Chennai</p>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-sidebar-foreground/40 text-sm font-mono">
            © 2024 EduVault. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:hidden mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary flex items-center justify-center">
                <Shield className="w-7 h-7 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold">EduVault</h1>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
            <p className="text-muted-foreground">Sign in to access the certificate verification portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Select Your Role</Label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedRole('faculty')}
                  className={`p-4 border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
                    selectedRole === 'faculty'
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <GraduationCap className={`w-8 h-8 ${selectedRole === 'faculty' ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className={`font-medium ${selectedRole === 'faculty' ? 'text-primary' : 'text-foreground'}`}>Faculty</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('hod')}
                  className={`p-4 border-2 transition-all duration-200 flex flex-col items-center gap-2 ${
                    selectedRole === 'hod'
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Users className={`w-8 h-8 ${selectedRole === 'hod' ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className={`font-medium ${selectedRole === 'hod' ? 'text-primary' : 'text-foreground'}`}>HOD</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@citchennai.net"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 text-base font-semibold"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : null}
              Sign In
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Only @citchennai.net emails are allowed
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
