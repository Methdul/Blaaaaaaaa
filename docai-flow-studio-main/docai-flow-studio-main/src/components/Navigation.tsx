import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
// Removed Sun, Moon from this import as they are no longer used
import { Menu, User, Settings, LogOut, UserCircle, LayoutDashboard, FileText, Info, MessageSquare, Home } from 'lucide-react'; 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet'; // For mobile nav
import { isAuthenticated, logout, getUserName, isCreator } from '@/lib/authUtils';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate(); // For logout navigation
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // State to hold user data, helps in re-rendering when auth state changes after login/logout
  const [authStatus, setAuthStatus] = useState(isAuthenticated());
  const [userName, setUserName] = useState<string | null>(null);
  const [userIsCreator, setUserIsCreator] = useState(false);
  // Removed theme state variable

  // useEffect to set theme to light mode permanently
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }, []); // Empty dependency array, so it runs once on mount.

  useEffect(() => {
    setAuthStatus(isAuthenticated());
    setUserName(getUserName());
    setUserIsCreator(isCreator());
  }, [location.pathname]); // Re-check on route change

  // Removed toggleTheme function

  const handleLogout = () => {
    logout(); // Clears localStorage and redirects via window.location
    // No need for navigate('/login') here as logout() handles redirection
    // However, to ensure state updates if component is still mounted:
    setAuthStatus(false);
    setUserName(null);
    setUserIsCreator(false);
  };

  // Updated isActive function
  const isActive = (path: string, basePath?: string) => {
    if (basePath) {
      return location.pathname.startsWith(basePath);
    }
    return location.pathname === path;
  };

  interface NavLinkDefinition {
    name: string;
    path: string;
    icon: React.ReactNode;
    basePath?: string; // For matching parent routes
  }

  const commonNavLinks: NavLinkDefinition[] = [
    { name: 'Home', path: '/', icon: <Home className="w-4 h-4 mr-2" /> },
    { name: 'Templates', path: '/templates', basePath: '/templates', icon: <FileText className="w-4 h-4 mr-2" /> },
    { name: 'About', path: '/about', icon: <Info className="w-4 h-4 mr-2" /> },
    { name: 'Contact', path: '/contact', icon: <MessageSquare className="w-4 h-4 mr-2" /> },
  ];

  const authenticatedNavLinks: NavLinkDefinition[] = [
    { name: 'AI Writer', path: '/ai-writer', icon: <Settings className="w-4 h-4 mr-2" /> },
    // Dashboard link is handled in User Dropdown / Mobile specific section
  ];


  const NavLinkItem: React.FC<{ linkDef: NavLinkDefinition; isMobile?: boolean; onClick?: () => void }> = ({ linkDef, isMobile, onClick }) => (
    <Link
      to={linkDef.path}
      className={`text-sm font-medium transition-colors hover:text-primary ${
        isActive(linkDef.path, linkDef.basePath) ? 'text-primary font-semibold' : 'text-muted-foreground'
      } ${isMobile ? 'block px-3 py-2 text-base' : ''}`}
      onClick={onClick}
    >
      {linkDef.name}
    </Link>
  );
  
  const MobileNavLinkItem: React.FC<{ linkDef: NavLinkDefinition; onClick?: () => void; closeSheet: () => void }> = ({ linkDef, onClick, closeSheet }) => (
    <SheetClose asChild>
      <Link
        to={linkDef.path}
        onClick={() => { onClick?.(); closeSheet(); }}
        className={`flex items-center px-3 py-3 text-base font-medium transition-colors rounded-md hover:bg-muted ${
          isActive(linkDef.path, linkDef.basePath) ? 'text-primary bg-muted font-semibold' : 'text-muted-foreground'
        }`}
      >
        {linkDef.icon} {linkDef.name}
      </Link>
    </SheetClose>
  );


  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-display font-bold text-3xl bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-300 tracking-tight">
              DocAi
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {commonNavLinks.map((link) => (
              <NavLinkItem key={`desktop-common-${link.name}`} linkDef={link} />
            ))}
            {authStatus && authenticatedNavLinks.map((link) => (
                <NavLinkItem key={`desktop-auth-${link.name}`} linkDef={link} />
            ))}
          </div>

          {/* Theme Toggle & Auth Actions & User Menu (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {authStatus ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-muted">
                    <UserCircle className="w-6 h-6 text-primary" />
                    <span className="text-sm font-medium text-foreground">{userName || 'Account'}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-2 shadow-lg border-border bg-card">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-foreground">Hi, {userName || 'User'}!</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {userIsCreator ? 'Creator Account' : 'Standard Account'}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={userIsCreator ? "/creator-dashboard" : "/dashboard"} className="flex items-center cursor-pointer">
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" asChild size="sm">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/register">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm p-6 bg-card border-l">
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                     <Link to="/" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
                        <span className="font-display font-bold text-2xl bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                          DocAi
                        </span>
                      </Link>
                  </div>
                  <div className="space-y-2 flex-grow">
                    {commonNavLinks.map((link) => (
                      <MobileNavLinkItem key={`mobile-common-${link.name}`} linkDef={link} closeSheet={() => setIsMobileMenuOpen(false)} />
                    ))}
                    {authStatus && authenticatedNavLinks.map((link) => (
                       <MobileNavLinkItem key={`mobile-auth-${link.name}`} linkDef={link} closeSheet={() => setIsMobileMenuOpen(false)} />
                    ))}
                    {authStatus && (
                      <>
                        <div className="pt-2 pb-1"> <DropdownMenuSeparator/> </div>
                        <MobileNavLinkItem 
                          linkDef={{ path: userIsCreator ? "/creator-dashboard" : "/dashboard", name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5 mr-2" /> }}
                          closeSheet={() => setIsMobileMenuOpen(false)}
                        />
                        <MobileNavLinkItem 
                          linkDef={{ path: "/profile", name: "Profile", icon: <UserCircle className="w-5 h-5 mr-2" /> }}
                          closeSheet={() => setIsMobileMenuOpen(false)}
                        />
                      </>
                    )}
                  </div>
                  
                  <div className="mt-auto border-t pt-6">
                    {authStatus ? (
                       <Button
                        variant="outline"
                        className="w-full flex items-center justify-center text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                      >
                        <LogOut className="w-4 h-4 mr-2" /> Logout
                      </Button>
                    ) : (
                      <div className="space-y-3">
                        <SheetClose asChild>
                          <Button variant="outline" className="w-full" asChild>
                            <Link to="/login">Login</Link>
                          </Button>
                        </SheetClose>
                        <SheetClose asChild>
                          <Button className="w-full" asChild>
                            <Link to="/register">Sign Up</Link>
                          </Button>
                        </SheetClose>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
