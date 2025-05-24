import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, Download, Upload, ListChecks, BarChart3, HandCoins, LayoutGrid, Star, 
  Eye, FilePenLine, PlusCircle, ChevronDown, FileText as PageIcon, FileUp,
  CalendarDays, Banknote, Landmark, CreditCard, Info, // Added for Earnings Tab
  TrendingUp, LineChart, CalendarClock, Users // Added Users for Analytics Tab
} from 'lucide-react'; 
import { getUserName } from '@/lib/authUtils';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form'; // Added Controller
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; // Added for Earnings Tab
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

// Mock data for Earnings Tab
const earningsSummaryData = {
  totalEarnings: "$3,250.75",
  lastPayoutAmount: "$550.00",
  lastPayoutDate: "October 15, 2023",
  nextPayoutAmount: "$620.50",
  nextPayoutDate: "November 15, 2023 (Est.)",
};

const payoutHistoryData = [
  { id: "POUT001", date: "October 15, 2023", amount: "$550.00", status: "Paid", method: "PayPal (user@example.com)" },
  { id: "POUT002", date: "September 15, 2023", amount: "$480.25", status: "Paid", method: "PayPal (user@example.com)" },
  { id: "POUT003", date: "August 15, 2023", amount: "$610.50", status: "Paid", method: "Bank Transfer (**** 1234)" },
  { id: "POUT004", date: "July 15, 2023", amount: "$505.00", status: "Paid", method: "PayPal (user@example.com)" },
];

// Mock data for Analytics Tab
const overallPerformanceData = {
  totalViews: "15,200",
  totalDownloads: "1,850",
  conversionRate: "12.17%",
  totalUniqueVisitors: "8,300",
};

const topTemplatesData = [
  { id: "creator-resume-001", name: "My Best Performing Resume", views: 5200, downloads: 750, conversionRate: "14.42%", earnings: "$375.00" },
  { id: "creator-invoice-002", name: "Freelancer Invoice Pro", views: 3800, downloads: 430, conversionRate: "11.32%", earnings: "$215.00" },
  { id: "some-other-template-004", name: "Modern Presentation Slides", views: 2500, downloads: 210, conversionRate: "8.40%", earnings: "$150.00" },
  { id: "another-one-005", name: "Minimalist Business Card", views: 1800, downloads: 150, conversionRate: "8.33%", earnings: "$75.00" },
];


// Zod schema for the upload form
const templateUploadSchema = z.object({
  templateName: z.string().min(5, { message: "Template name must be at least 5 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  category: z.enum(["Resume", "Invoice", "Letter", "Proposal", "Contract", "Other"]),
  previewImage: z.any().refine((files) => files?.length >= 1, "Preview image is required."), // Basic check for file presence
  tags: z.string().min(3, { message: "Please add at least one tag." }),
});

type TemplateUploadFormValues = z.infer<typeof templateUploadSchema>;

const CreatorDashboard = () => {
  const [userName, setUserName] = useState<string | null>(null);

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset,
    control // for Select component
  } = useForm<TemplateUploadFormValues>({
    resolver: zodResolver(templateUploadSchema),
    defaultValues: {
      templateName: "",
      description: "",
      category: "Other",
      tags: "",
      previewImage: undefined,
    }
  });

  const onUploadSubmit: SubmitHandler<TemplateUploadFormValues> = (data) => {
    console.log("Template Upload Data:", data);
    // Log file details if present
    if (data.previewImage && data.previewImage.length > 0) {
      console.log("File Name:", data.previewImage[0].name);
      console.log("File Type:", data.previewImage[0].type);
      console.log("File Size:", data.previewImage[0].size);
    }
    toast({
      title: "Template Submitted!",
      description: `"${data.templateName}" has been submitted for review.`,
      variant: "default", 
    });
    reset(); // Reset form after submission
  };

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
                <CardDescription>Fill in the details below to submit your template for review.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit(onUploadSubmit)} className="space-y-8">
                  
                  <div className="space-y-2">
                    <Label htmlFor="templateName" className={errors.templateName ? 'text-destructive' : ''}>Template Name</Label>
                    <Input 
                      id="templateName" 
                      placeholder="e.g., Modern Minimalist Resume" 
                      {...register("templateName")}
                      className={errors.templateName ? 'border-destructive focus-visible:ring-destructive' : ''}
                    />
                    {errors.templateName && <p className="text-sm font-medium text-destructive">{errors.templateName.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className={errors.description ? 'text-destructive' : ''}>Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Describe your template, its features, and best use cases." 
                      {...register("description")}
                      className={`min-h-[100px] ${errors.description ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    />
                    {errors.description && <p className="text-sm font-medium text-destructive">{errors.description.message}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="category" className={errors.category ? 'text-destructive' : ''}>Category</Label>
                      <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value} // Use value from field
                            defaultValue={field.value} // Default value from react-hook-form
                          >
                            <SelectTrigger id="category" className={errors.category ? 'border-destructive focus-visible:ring-destructive' : ''}>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Resume">Resume</SelectItem>
                              <SelectItem value="Invoice">Invoice</SelectItem>
                              <SelectItem value="Letter">Letter</SelectItem>
                              <SelectItem value="Proposal">Proposal</SelectItem>
                              <SelectItem value="Contract">Contract</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.category && <p className="text-sm font-medium text-destructive">{errors.category.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tags" className={errors.tags ? 'text-destructive' : ''}>Tags (comma-separated)</Label>
                      <Input 
                        id="tags" 
                        placeholder="e.g., modern, minimalist, business" 
                        {...register("tags")}
                        className={errors.tags ? 'border-destructive focus-visible:ring-destructive' : ''}
                      />
                      {errors.tags && <p className="text-sm font-medium text-destructive">{errors.tags.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="previewImage" className={errors.previewImage ? 'text-destructive' : ''}>Preview Image (PNG, JPG)</Label>
                    <Input 
                      id="previewImage" 
                      type="file" 
                      accept=".png,.jpg,.jpeg"
                      {...register("previewImage")}
                      className={`pt-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground hover:file:bg-primary/90 ${errors.previewImage ? 'border-destructive focus-visible:ring-destructive placeholder:text-destructive' : 'border-input'}`}
                    />
                    {/* Comment: Actual file upload logic (e.g., to a server or cloud storage) will be implemented in a future task. */}
                    {errors.previewImage && <p className="text-sm font-medium text-destructive">{errors.previewImage.message as string}</p>}
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" size="lg" className="bg-docai-blue hover:bg-docai-blue-dark text-white">
                      <FileUp className="mr-2 h-5 w-5" /> Upload Template
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings">
            <Card className="shadow-md border-border bg-card">
              <CardHeader>
                <CardTitle>Earnings Overview</CardTitle>
                <CardDescription>Track your earnings, view payout history, and manage settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Earnings Summary Section */}
                <section>
                  <h3 className="text-xl font-semibold mb-4 flex items-center"><DollarSign className="mr-2 h-5 w-5 text-primary" />Earnings Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card className="bg-muted/30">
                      <CardHeader className="pb-2">
                        <CardDescription className="flex items-center"><Banknote className="mr-2 h-4 w-4 text-muted-foreground" />Total Earnings to Date</CardDescription>
                        <CardTitle className="text-2xl">{earningsSummaryData.totalEarnings}</CardTitle>
                      </CardHeader>
                    </Card>
                    <Card className="bg-muted/30">
                      <CardHeader className="pb-2">
                        <CardDescription className="flex items-center"><CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />Last Payout</CardDescription>
                        <CardTitle className="text-2xl">{earningsSummaryData.lastPayoutAmount}</CardTitle>
                        <p className="text-xs text-muted-foreground">{earningsSummaryData.lastPayoutDate}</p>
                      </CardHeader>
                    </Card>
                    <Card className="bg-muted/30">
                      <CardHeader className="pb-2">
                        <CardDescription className="flex items-center"><CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />Next Estimated Payout</CardDescription>
                        <CardTitle className="text-2xl">{earningsSummaryData.nextPayoutAmount}</CardTitle>
                         <p className="text-xs text-muted-foreground">{earningsSummaryData.nextPayoutDate}</p>
                      </CardHeader>
                    </Card>
                  </div>
                </section>

                {/* Payout History Section */}
                <section>
                  <h3 className="text-xl font-semibold mb-4 flex items-center"><ListChecks className="mr-2 h-5 w-5 text-primary" />Payout History</h3>
                  {payoutHistoryData.length > 0 ? (
                    <Card className="border shadow-sm">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Method</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {payoutHistoryData.map((payout) => (
                            <TableRow key={payout.id}>
                              <TableCell>{payout.date}</TableCell>
                              <TableCell className="font-medium">{payout.amount}</TableCell>
                              <TableCell>
                                <Badge variant={payout.status === "Paid" ? "default" : "outline"} 
                                       className={`${payout.status === "Paid" ? "bg-green-100 text-green-700 border-green-300 dark:bg-green-900/50 dark:text-green-300 dark:border-green-600" : "bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-600"}`}>
                                  {payout.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-muted-foreground text-sm">{payout.method}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Card>
                  ) : (
                     <p className="text-muted-foreground text-center py-4">No payout history available yet.</p>
                  )}
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Payout Settings Section */}
                  <section>
                    <h3 className="text-xl font-semibold mb-4 flex items-center"><Landmark className="mr-2 h-5 w-5 text-primary" />Payout Settings</h3>
                    <Card className="bg-muted/30">
                      <CardContent className="pt-6 space-y-3">
                        <p className="text-muted-foreground text-sm">
                          Manage your payout methods. Connect your PayPal or bank account to receive earnings.
                        </p>
                        <div className="flex items-center text-sm">
                           <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" /> 
                           <span>Current Method: PayPal (user@example.com)</span>
                        </div>
                        <Button 
                          onClick={() => toast({ title: "Mock Action", description: "Payout settings modal would open here."})}
                          className="w-full md:w-auto bg-docai-blue hover:bg-docai-blue-dark text-white"
                        >
                          Update Payout Settings
                        </Button>
                      </CardContent>
                    </Card>
                  </section>

                  {/* Revenue Share Information Section */}
                  <section>
                    <h3 className="text-xl font-semibold mb-4 flex items-center"><Info className="mr-2 h-5 w-5 text-primary" />Revenue Share</h3>
                    <Card className="bg-muted/30">
                       <CardContent className="pt-6">
                        <p className="text-lg font-semibold text-foreground">You earn <span className="text-docai-green font-bold">70%</span> of each template sale.</p>
                        <p className="text-muted-foreground text-sm mt-1">
                          This includes platform fees and transaction costs. Payouts are processed monthly.
                        </p>
                        <Button variant="link" size="sm" className="px-0 mt-2" asChild>
                          <Link to="/creator-terms">Learn more about Creator Terms</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </section>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card className="shadow-md border-border bg-card">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div>
                  <CardTitle>Performance Analytics</CardTitle>
                  <CardDescription>Gain insights into how your templates are performing.</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="ml-auto flex items-center gap-x-1.5">
                  <CalendarClock className="h-4 w-4" />
                  Date Range: Last 30 Days
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Overall Performance Summary */}
                <section>
                  <h3 className="text-xl font-semibold mb-4 flex items-center"><BarChart3 className="mr-2 h-5 w-5 text-primary" />Overall Performance</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="bg-muted/30">
                      <CardHeader className="pb-2">
                        <CardDescription className="flex items-center"><Eye className="mr-2 h-4 w-4 text-muted-foreground" />Total Views</CardDescription>
                        <CardTitle className="text-2xl">{overallPerformanceData.totalViews}</CardTitle>
                      </CardHeader>
                    </Card>
                    <Card className="bg-muted/30">
                      <CardHeader className="pb-2">
                        <CardDescription className="flex items-center"><Download className="mr-2 h-4 w-4 text-muted-foreground" />Total Downloads</CardDescription>
                        <CardTitle className="text-2xl">{overallPerformanceData.totalDownloads}</CardTitle>
                      </CardHeader>
                    </Card>
                    <Card className="bg-muted/30">
                      <CardHeader className="pb-2">
                        <CardDescription className="flex items-center"><TrendingUp className="mr-2 h-4 w-4 text-muted-foreground" />Conversion Rate</CardDescription>
                        <CardTitle className="text-2xl">{overallPerformanceData.conversionRate}</CardTitle>
                      </CardHeader>
                    </Card>
                     <Card className="bg-muted/30">
                      <CardHeader className="pb-2">
                        <CardDescription className="flex items-center"><Users className="mr-2 h-4 w-4 text-muted-foreground" />Unique Visitors</CardDescription> {/* Assuming Users icon is available or add it*/}
                        <CardTitle className="text-2xl">{overallPerformanceData.totalUniqueVisitors}</CardTitle>
                      </CardHeader>
                    </Card>
                  </div>
                </section>

                {/* Performance Charts Placeholders */}
                <section>
                  <h3 className="text-xl font-semibold mb-4 flex items-center"><LineChart className="mr-2 h-5 w-5 text-primary" />Performance Charts</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="min-h-[300px] flex flex-col items-center justify-center bg-muted/30 p-6">
                       <LineChart className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground font-medium">Earnings Over Time Chart</p>
                      <p className="text-xs text-muted-foreground">(Placeholder - Chart library integration needed)</p>
                    </Card>
                    <Card className="min-h-[300px] flex flex-col items-center justify-center bg-muted/30 p-6">
                      <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground font-medium">Views vs. Downloads by Template</p>
                      <p className="text-xs text-muted-foreground">(Placeholder - Chart library integration needed)</p>
                    </Card>
                  </div>
                </section>

                {/* Top Performing Templates Section */}
                <section>
                  <h3 className="text-xl font-semibold mb-4 flex items-center"><Star className="mr-2 h-5 w-5 text-primary" />Top Performing Templates</h3>
                  <Card className="border shadow-sm">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[300px]">Template Name</TableHead>
                          <TableHead>Views</TableHead>
                          <TableHead>Downloads</TableHead>
                          <TableHead>Conversion</TableHead>
                          <TableHead>Earnings</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {topTemplatesData.map((template) => (
                          <TableRow key={template.id}>
                            <TableCell className="font-medium truncate" title={template.name}>{template.name}</TableCell>
                            <TableCell>{template.views.toLocaleString()}</TableCell>
                            <TableCell>{template.downloads.toLocaleString()}</TableCell>
                            <TableCell>{template.conversionRate}</TableCell>
                            <TableCell className="text-green-600 dark:text-green-500">{template.earnings}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm" asChild>
                                <Link to={`#view-template-analytics-${template.id}`}> {/* Mock link */}
                                  View Details
                                </Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Card>
                </section>

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
