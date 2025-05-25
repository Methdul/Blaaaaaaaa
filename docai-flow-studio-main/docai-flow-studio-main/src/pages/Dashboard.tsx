
import React from 'react'; // Added React import
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText, Clock, Sparkles, FilePlus2, LayoutGrid, UserCircle, Edit3, FileEdit, ExternalLink } from 'lucide-react'; // Added FileEdit, ExternalLink
import { getUserName, isCreator } from '@/lib/authUtils'; // Import auth utils
import { useEffect, useState } from 'react'; // Import hooks
import { Badge } from '@/components/ui/badge'; // Import Badge
import { toast } from '@/components/ui/use-toast'; // Import toast

// Define UserDocument Interface
interface UserDocument {
  id: string;
  name: string;
  type: 'Resume' | 'Invoice' | 'Letter' | 'Proposal' | 'Contract' | 'General';
  lastModified: string;
  status: 'Draft' | 'Completed' | 'In Review';
}

const Dashboard = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [showCreatorPromo, setShowCreatorPromo] = useState(false);

  useEffect(() => {
    setUserName(getUserName());
    setShowCreatorPromo(!isCreator()); // Show promo if not already a creator
  }, []);

  // Updated mock recentDocuments data
  const updatedRecentDocuments: UserDocument[] = [
    { id: 'doc1', name: 'My Q3 Resume Update', type: 'Resume', lastModified: 'May 20, 2024', status: 'Draft' },
    { id: 'doc2', name: 'Invoice #1024 - Client X', type: 'Invoice', lastModified: 'May 18, 2024', status: 'Completed' },
    { id: 'doc3', name: 'Cover Letter - Acme Corp', type: 'Letter', lastModified: 'May 15, 2024', status: 'In Review' },
    { id: 'doc4', name: 'Project Proposal - New App', type: 'Proposal', lastModified: 'May 22, 2024', status: 'Draft'},
    { id: 'doc5', name: 'Service Agreement V2', type: 'Contract', lastModified: 'May 10, 2024', status: 'Completed'},
  ];
  
  // const recentDocuments = []; // To test "No recent documents" message

  const newQuickActions = [
    {
      title: "Create New Document",
      icon: <FilePlus2 className="mr-2 h-5 w-5" />,
      link: "/ai-writer", // Linking to AI writer as a generic creation start point
      variant: "default" as "default", // Explicitly type for Button variant
      description: "Start fresh with a new document using our AI tools."
    },
    {
      title: "Browse Templates",
      icon: <LayoutGrid className="mr-2 h-5 w-5" />,
      link: "/templates",
      variant: "outline" as "outline",
      description: "Explore professionally designed templates."
    },
    {
      title: "View My Profile",
      icon: <UserCircle className="mr-2 h-5 w-5" />,
      link: "/profile",
      variant: "outline" as "outline",
      description: "Manage your account settings and details."
    }
  ];

  const userStats = [
    { label: "Documents Created", value: "5", icon: <FilePlus2 className="w-5 h-5" /> },
    { label: "Templates Used", value: "3", icon: <LayoutGrid className="w-5 h-5" /> },
    { label: "Active Projects/Drafts", value: "2", icon: <Edit3 className="w-5 h-5" /> },
    { label: "Hours Saved", value: "12h", icon: <Clock className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pt-20"> {/* Updated background and text color */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-10"> {/* Increased bottom margin */}
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
            Welcome back, {userName || 'User'}! 👋
          </h1>
          <p className="text-base text-muted-foreground mb-3"> 
            {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <p className="text-sm italic text-muted-foreground/80">
            "The best way to predict the future is to create it." - Peter Drucker
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {userStats.map((stat, index) => ( // Changed stats to userStats
            <Card key={index} className="hover-lift shadow-md border-border bg-card">
              <CardContent className="p-6 flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg text-primary"> {/* Updated colors */}
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div> {/* Updated text color */}
                  <div className="text-sm text-muted-foreground">{stat.label}</div> {/* Updated text color */}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card className="shadow-md border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Quick Actions</CardTitle>
                <CardDescription className="text-muted-foreground">Get started quickly with these common actions.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4"> {/* Changed from grid to space-y for button layout */}
                {newQuickActions.map((action) => (
                  <Button key={action.title} asChild variant={action.variant} className="w-full justify-start py-6 text-base group">
                    <Link to={action.link}>
                      <div className="flex items-center">
                        {action.icon}
                        <div className="ml-3 flex flex-col items-start">
                           <span className="font-semibold group-hover:text-primary transition-colors">{action.title}</span>
                           <span className="text-xs text-muted-foreground group-hover:text-primary/80 transition-colors">{action.description}</span>
                        </div>
                      </div>
                    </Link>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Documents */}
          <div className="space-y-8">
            <Card className="shadow-md border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Recent Documents</CardTitle>
                <CardDescription className="text-muted-foreground">Your latest creations and drafts.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {updatedRecentDocuments.length > 0 ? (
                  updatedRecentDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors border border-transparent hover:border-primary/20">
                      <div className="flex items-center space-x-3 flex-grow min-w-0"> {/* Added min-w-0 for truncation */}
                        <FileText className="w-6 h-6 text-primary flex-shrink-0" />
                        <div className="flex-grow min-w-0"> {/* Added min-w-0 for truncation */}
                          <p className="font-medium text-foreground text-sm truncate" title={doc.name}>{doc.name}</p>
                          <div className="text-xs text-muted-foreground flex items-center space-x-2">
                            <Badge variant="outline" className="px-1.5 py-0.5 text-xs">{doc.type}</Badge>
                            <span>Last modified: {doc.lastModified}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                        <Badge 
                          variant={
                            doc.status === 'Completed' ? 'default' : 
                            doc.status === 'In Review' ? 'secondary' : // Using secondary for In Review
                            'outline' // Using outline for Draft
                          }
                          className={`px-2 py-1 text-xs whitespace-nowrap
                            ${doc.status === 'Completed' ? 'bg-green-600/80 text-white dark:bg-green-700/70 dark:text-green-100' : ''}
                            ${doc.status === 'In Review' ? 'bg-blue-600/80 text-white dark:bg-blue-700/70 dark:text-blue-100' : ''}
                            ${doc.status === 'Draft' ? 'bg-yellow-500/80 text-white dark:bg-yellow-600/70 dark:text-yellow-100' : ''}
                          `}
                        >
                          {doc.status}
                        </Badge>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => {
                            console.log('Opening document:', doc.name);
                            toast({ title: "Opening Document", description: `Attempting to open ${doc.name}.` });
                          }}
                        >
                          Open
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">No recent documents found.</p>
                )}
                {updatedRecentDocuments.length > 0 && (
                   <Button variant="outline" className="w-full mt-4 border-border hover:bg-muted/50" asChild>
                    <Link to="/documents">View All Documents</Link> {/* Placeholder link */}
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Creator Promotion (Conditional) */}
            {showCreatorPromo && (
              <Card className="shadow-md border-border bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sparkles className="w-6 h-6 mr-2 animate-pulse" />
                    Become a Creator!
                  </CardTitle>
                  <CardDescription className="text-purple-100">Share your templates and earn.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm">
                    Unlock new possibilities by becoming a template creator. Share your designs with the community and earn revenue.
                  </p>
                  <Button variant="secondary" className="w-full bg-white text-purple-600 hover:bg-gray-100" asChild>
                    <Link to="/become-creator">Learn More & Sign Up</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
