import { useNavigate } from 'react-router-dom';
import { NavLink } from '@/components/NavLink';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  FileCheck, 
  User, 
  LogOut,
  Shield,
  GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const facultyLinks = [
    { to: '/faculty/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/faculty/certificates', icon: FileCheck, label: 'Certificate Verification' },
    { to: '/faculty/profile', icon: User, label: 'Profile' },
  ];

  const hodLinks = [
    { to: '/hod/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  ];

  const links = user?.role === 'hod' ? hodLinks : facultyLinks;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r-2 border-sidebar-border flex flex-col">
      <div className="p-6 border-b-2 border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sidebar-primary flex items-center justify-center">
            <Shield className="w-6 h-6 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground tracking-tight">EduVault</h1>
            <p className="text-xs text-sidebar-foreground/60 font-mono">CSE Department</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className="flex items-center gap-3 px-4 py-3 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200 border-2 border-transparent"
            activeClassName="bg-sidebar-accent text-sidebar-primary border-sidebar-primary font-medium"
          >
            <link.icon className="w-5 h-5" />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t-2 border-sidebar-border">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-10 h-10 bg-sidebar-accent flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-sidebar-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.name}</p>
            <p className="text-xs text-sidebar-foreground/60 capitalize">{user?.role}</p>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full justify-start gap-2 border-2 border-sidebar-border text-sidebar-foreground hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
}
