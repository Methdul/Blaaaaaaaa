
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Upload, DollarSign, Eye, Download, TrendingUp, FileText } from 'lucide-react';

const CreatorDashboard = () => {
  const myTemplates = [
    { name: "Modern Resume Template", type: "Resume", status: "Published", downloads: 234, earnings: "$468" },
    { name: "Clean Invoice Layout", type: "Invoice", status: "Published", downloads: 156, earnings: "$312" },
    { name: "Professional Cover Letter", type: "Letter", status: "Review", downloads: 89, earnings: "$178" },
  ];

  const stats = [
    { label: "Total Earnings", value: "$2,456", icon: <DollarSign className="w-5 h-5" />, color: "text-green-600" },
    { label: "Total Views", value: "12.3K", icon: <Eye className="w-5 h-5" />, color: "text-blue-600" },
    { label: "Downloads", value: "1,847", icon: <Download className="w-5 h-5" />, color: "text-purple-600" },
    { label: "Templates", value: "18", icon: <FileText className="w-5 h-5" />, color: "text-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Creator Dashboard 🎨
          </h1>
          <p className="text-gray-600">Manage your templates and track your earnings</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover-lift">
              <CardContent className="p-6 flex items-center space-x-4">
                <div className={`p-3 bg-gray-100 rounded-lg ${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload">Upload Template</TabsTrigger>
            <TabsTrigger value="templates">My Templates</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Upload Template */}
          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>Upload New Template</CardTitle>
                <CardDescription>Share your template with the DocAi community</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="templateName">Template Name</Label>
                      <Input id="templateName" placeholder="Enter template name" />
                    </div>
                    
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="resume">Resume</SelectItem>
                          <SelectItem value="invoice">Invoice</SelectItem>
                          <SelectItem value="letter">Cover Letter</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="proposal">Proposal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="pricing">Pricing</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select pricing" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="free">Free</SelectItem>
                          <SelectItem value="premium">Premium ($5)</SelectItem>
                          <SelectItem value="pro">Pro ($10)</SelectItem>
                          <SelectItem value="custom">Custom Price</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Describe your template..."
                        className="h-32"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="tags">Tags (comma separated)</Label>
                      <Input id="tags" placeholder="professional, modern, clean" />
                    </div>
                  </div>
                </div>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-docai-blue transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Template File</h3>
                  <p className="text-gray-600 mb-4">Support for PDF, DOCX, and AI formats</p>
                  <Button variant="outline">Choose File</Button>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <Button variant="outline">Save as Draft</Button>
                  <Button className="bg-docai-purple hover:bg-docai-purple-light">Publish Template</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Templates */}
          <TabsContent value="templates">
            <Card>
              <CardHeader>
                <CardTitle>My Templates</CardTitle>
                <CardDescription>Manage your uploaded templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myTemplates.map((template, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-docai-blue/10 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-docai-blue" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{template.name}</h3>
                          <p className="text-sm text-gray-600">{template.type}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <Badge variant={template.status === 'Published' ? 'default' : 'secondary'}>
                          {template.status}
                        </Badge>
                        <div className="text-center">
                          <div className="font-semibold text-gray-900">{template.downloads}</div>
                          <div className="text-xs text-gray-600">downloads</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-green-600">{template.earnings}</div>
                          <div className="text-xs text-gray-600">earned</div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Earnings Overview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">This Month</span>
                      <span className="font-semibold text-green-600">$456</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Last Month</span>
                      <span className="font-semibold">$389</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">All Time</span>
                      <span className="font-semibold">$2,456</span>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Pending Payout</span>
                        <span className="font-semibold text-docai-blue">$156</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Template Views</span>
                        <span className="text-sm font-medium">8.2K</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-docai-blue h-2 rounded-full" style={{width: '82%'}}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Conversion Rate</span>
                        <span className="text-sm font-medium">4.5%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{width: '45%'}}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Customer Rating</span>
                        <span className="text-sm font-medium">4.8/5</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{width: '96%'}}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Payout Information</CardTitle>
                <CardDescription>Manage your earnings and payout preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2">Available Balance</h3>
                    <p className="text-2xl font-bold text-green-600">$156.00</p>
                    <Button size="sm" className="mt-3 bg-green-600 hover:bg-green-700">
                      Request Payout
                    </Button>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">Pending Review</h3>
                    <p className="text-2xl font-bold text-blue-600">$89.00</p>
                    <p className="text-sm text-blue-600 mt-3">Processing time: 2-3 days</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">This Month</h3>
                    <p className="text-2xl font-bold text-gray-600">$456.00</p>
                    <p className="text-sm text-gray-600 mt-3">+17% from last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CreatorDashboard;
