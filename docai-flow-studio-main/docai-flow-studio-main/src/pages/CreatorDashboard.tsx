import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, Download, Upload, ListChecks, BarChart3, HandCoins, LayoutGrid, Star, 
  Eye, FilePenLine, PlusCircle, ChevronDown, FileText as PageIcon // Using PageIcon alias for general FileText
} from 'lucide-react'; 
import { getUserName } from '@/lib/authUtils';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Template } from '@/types/template'; // Import Template type
import { Badge } from '@/components/ui/badge'; // Import Badge for status
import { toast } from '@/components/ui/use-toast'; // Import toast
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Define CreatorTemplate (extends Template and adds earnings and specific status)
interface CreatorTemplate extends Template {
  earnings: string; 
  status: 'Published' | 'Draft' | 'In Review'; 
}

const CreatorDashboard = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    setUserName(getUserName());
  }, []);

  const creatorKpis = [
    { label: "Total Active Templates", value: "8", icon: <LayoutGrid className="w-6 h-6" /> },
    { label: "Total Downloads (All Templates)", value: "1,850", icon: <Download className="w-6 h-6" /> },
    { label: "Total Earnings", value: "$2,750.00", icon: <DollarSign className="w-6 h-6" /> },
    { label: "Average Rating (All Templates)", value: "4.5 / 5", icon: <Star className="w-6 h-6" /> },
  ];

  const myCreatorTemplates: CreatorTemplate[] = [
    {
      id: 'creator-resume-001',
      name: 'My Best Performing Resume',
      description: 'A top-tier resume template I designed for senior executives.',
      category: 'Resume',
      previewImage: 'https://via.placeholder.com/300x200?text=My+Resume+1',
      creatorId: 'creator123', 
      creatorName: userName || 'MySelf', // Use dynamic userName or fallback
      averageRating: 4.8,
      numberOfRatings: 120,
      downloads: 750,
      tags: ['executive', 'professional', 'modern'],
      earnings: "$375.00",
      status: 'Published',
    },
    {
      id: 'creator-invoice-002',
      name: 'Freelancer Invoice Pro',
      description: 'Invoice template with automated calculations, perfect for freelancers.',
      category: 'Invoice',
      previewImage: 'https://via.placeholder.com/300x200?text=My+Invoice+Pro',
      creatorId: 'creator123',
      creatorName: userName || 'MySelf',
      averageRating: 4.5,
      numberOfRatings: 85,
      downloads: 430,
      tags: ['freelance', 'invoice', 'billing', 'automated'],
      earnings: "$215.00",
      status: 'Published',
    },
    {
      id: 'creator-letter-003',
      name: 'Draft: New Cover Letter Design',
      description: 'A new cover letter design, currently in draft mode.',
      category: 'Letter',
      previewImage: 'https://via.placeholder.com/300x200?text=Draft+Letter',
      creatorId: 'creator123',
      creatorName: userName || 'MySelf',
      averageRating: 0, 
      numberOfRatings: 0,
      downloads: 0,
      tags: ['cover letter', 'new', 'minimalist'],
      earnings: "$0.00",
      status: 'Draft',
    },
  ];
  // const myCreatorTemplates: CreatorTemplate[] = []; // For testing no templates case

  const renderCreatorStars = (rating: number, starSize: string = "w-4 h-4") => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.4 && rating % 1 < 0.9; // Consistent half-star logic
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    const stars = [];
    for (let i = 0; i < fullStars; i++) stars.push(<Star key={`full-${i}`} className={`${starSize} text-yellow-400 fill-yellow-400`} />);
    // Using StarHalf if available, or fallback to full star for simplicity if StarHalf icon causes issues
    // For now, assuming StarHalf is not used to simplify, just like the previous attempt.
    // If StarHalf is desired, ensure it's imported and used:
    // if (halfStar) stars.push(<StarHalf key="half" className={`${starSize} text-yellow-400 fill-yellow-400`} />);
    if (halfStar) stars.push(<Star key="half" className={`${starSize} text-yellow-400 fill-yellow-400`} />); // Simplified: show full for half
    for (let i = 0; i < emptyStars; i++) stars.push(<Star key={`empty-${i}`} className={`${starSize} text-yellow-400`} />); // Outline only
    return stars;
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
            Creator Dashboard
          </h1>
          <p className="text-base text-muted-foreground">
            Welcome back, {userName || 'Creator'}! Manage your templates and performance.
          </p>
        </div>

        {/* KPIs / Stats Summary */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground tracking-tight">Key Performance Indicators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {creatorKpis.map((kpi, index) => (
              <Card key={index} className="shadow-md border-border bg-card hover-lift">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.label}</CardTitle>
                  <div className="text-primary">{kpi.icon}</div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">{kpi.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Main Content Area with Tabs */}
        <Tabs defaultValue="my-templates" className="space-y-6">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            <TabsTrigger value="my-templates" className="py-2.5"><ListChecks className="mr-2 h-4 w-4" />Your Templates</TabsTrigger>
            <TabsTrigger value="upload-template" className="py-2.5"><Upload className="mr-2 h-4 w-4" />Upload New</TabsTrigger>
            <TabsTrigger value="earnings" className="py-2.5"><HandCoins className="mr-2 h-4 w-4" />Earnings</TabsTrigger>
            <TabsTrigger value="analytics" className="py-2.5"><BarChart3 className="mr-2 h-4 w-4" />Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="my-templates">
            <Card className="shadow-md border-border bg-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle>Your Templates</CardTitle>
                  <CardDescription>Manage and view performance of your uploaded templates.</CardDescription>
                </div>
                <Button asChild size="sm" onClick={() => document.querySelector('[data-radix-collection-item][value="upload-template"]')?.dispatchEvent(new MouseEvent('click', {bubbles: true}))}>
                   <Link to="#upload-template"> {/* Changed to allow JS tab switch */}
                    <PlusCircle className="mr-2 h-4 w-4" /> Upload New
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                {myCreatorTemplates.length > 0 ? (
                  <div className="space-y-4">
                    {myCreatorTemplates.map((template) => (
                      <Card key={template.id} className="p-4 border bg-muted/10 hover:shadow-lg transition-shadow duration-200 ease-in-out">
                        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                          <div className="md:col-span-2">
                            <Link to={`/templates/${template.id}`} className="hover:underline" target="_blank" rel="noopener noreferrer">
                                <h3 className="font-semibold text-foreground text-md lg:text-lg truncate" title={template.name}>{template.name}</h3>
                            </Link>
                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                              {renderCreatorStars(template.averageRating)}
                              <span className="ml-1.5">({template.averageRating.toFixed(1)} from {template.numberOfRatings} ratings)</span>
                            </div>
                          </div>
                          <div className="text-sm text-center md:text-left">
                            <p className="text-xs text-muted-foreground">Downloads</p>
                            <p className="font-medium text-foreground">{template.downloads.toLocaleString()}</p>
                          </div>
                          <div className="text-sm text-center md:text-left">
                            <p className="text-xs text-muted-foreground">Earnings</p>
                            <p className="font-medium text-green-600 dark:text-green-500">{template.earnings}</p>
                          </div>
                           <div className="text-sm text-center md:text-left">
                             <p className="text-xs text-muted-foreground mb-1">Status</p>
                             <Badge 
                                className={`text-xs py-1 px-2.5 font-medium
                                  ${template.status === 'Published' ? 'bg-green-100 text-green-800 border border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700' : ''}
                                  ${template.status === 'In Review' ? 'bg-blue-100 text-blue-800 border border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700' : ''}
                                  ${template.status === 'Draft' ? 'bg-yellow-100 text-yellow-800 border border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700' : ''}
                                `}
                              >
                                {template.status}
                              </Badge>
                          </div>
                          <div className="md:col-span-1 flex justify-center md:justify-end">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline" size="sm" className="w-full sm:w-auto">Actions <ChevronDown className="ml-2 h-4 w-4" /></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem asChild>
                                    <Link to={`/templates/${template.id}`} target="_blank" rel="noopener noreferrer" className="cursor-pointer flex items-center">
                                      <Eye className="mr-2 h-4 w-4" /> Preview Template
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => { console.log('Editing template:', template.name); toast({title: "Edit Action (Mock)", description: `This would open an editor for ${template.name}`})}} className="cursor-pointer flex items-center">
                                    <FilePenLine className="mr-2 h-4 w-4" /> Edit Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => { console.log('Viewing analytics for:', template.name); toast({title: "Analytics Action (Mock)", description: `This would navigate to detailed analytics for ${template.name}`})}} className="cursor-pointer flex items-center">
                                    <BarChart3 className="mr-2 h-4 w-4" /> View Analytics
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <PageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-2 text-lg font-medium text-foreground">No templates uploaded yet.</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Start by uploading your first template to see its performance here.
                    </p>
                     <Button className="mt-4" asChild onClick={() => document.querySelector('[data-radix-collection-item][value="upload-template"]')?.dispatchEvent(new MouseEvent('click', {bubbles: true}))}>
                       <Link to="#upload-template">
                        <Upload className="mr-2 h-4 w-4" /> Upload Template
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upload-template">
            <Card className="shadow-md border-border bg-card">
              <CardHeader>
                <CardTitle>Upload New Template</CardTitle>
                <CardDescription>Share your new template with the community.</CardDescription>
              </CardHeader>
              <CardContent className="min-h-[200px] flex items-center justify-center">
                <p className="text-muted-foreground">Template upload form and tools will be here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings">
            <Card className="shadow-md border-border bg-card">
              <CardHeader>
                <CardTitle>Earnings Overview</CardTitle>
                <CardDescription>Track your earnings and manage payouts.</CardDescription>
              </CardHeader>
              <CardContent className="min-h-[200px] flex items-center justify-center">
                <p className="text-muted-foreground">Earnings details and payout management will be here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card className="shadow-md border-border bg-card">
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>Detailed analytics for your templates.</CardDescription>
              </CardHeader>
              <CardContent className="min-h-[200px] flex items-center justify-center">
                <p className="text-muted-foreground">Detailed charts and data will be here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 text-center">
            <Button variant="link" asChild>
                <Link to="/templates">Explore Public Templates</Link>
            </Button>
        </div>

      </div>
    </div>
  );
};

export default CreatorDashboard;
