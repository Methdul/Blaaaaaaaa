
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText, FileImage, Mail, Star, Clock, Download } from 'lucide-react';

const Dashboard = () => {
  const recentDocuments = [
    { name: "Software Engineer Resume", type: "Resume", date: "2 hours ago", status: "completed" },
    { name: "Freelance Invoice #003", type: "Invoice", date: "1 day ago", status: "completed" },
    { name: "Cover Letter - Microsoft", type: "Letter", date: "3 days ago", status: "draft" },
  ];

  const quickActions = [
    {
      title: "Create Resume",
      description: "Build a professional resume with AI assistance",
      icon: <FileText className="w-8 h-8" />,
      link: "/resume-builder",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Generate Invoice",
      description: "Create invoices for your business",
      icon: <FileImage className="w-8 h-8" />,
      link: "/invoice-builder",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Write Cover Letter",
      description: "AI-powered cover letter generation",
      icon: <Mail className="w-8 h-8" />,
      link: "/letter-builder",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Browse Templates",
      description: "Explore our template marketplace",
      icon: <Star className="w-8 h-8" />,
      link: "/templates",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const stats = [
    { label: "Documents Created", value: "12", icon: <FileText className="w-5 h-5" /> },
    { label: "Templates Used", value: "8", icon: <Star className="w-5 h-5" /> },
    { label: "Hours Saved", value: "24", icon: <Clock className="w-5 h-5" /> },
    { label: "Downloads", value: "18", icon: <Download className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Welcome back, John! 👋
          </h1>
          <p className="text-gray-600">Ready to create something amazing today?</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover-lift">
              <CardContent className="p-6 flex items-center space-x-4">
                <div className="p-3 bg-docai-blue/10 rounded-lg text-docai-blue">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Choose what you'd like to create</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <Link key={index} to={action.link}>
                      <Card className="hover-lift cursor-pointer group">
                        <CardContent className="p-6">
                          <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                            {action.icon}
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                          <p className="text-sm text-gray-600">{action.description}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Documents */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Documents</CardTitle>
                <CardDescription>Your latest creations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-docai-blue/10 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-docai-blue" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{doc.name}</div>
                        <div className="text-xs text-gray-500">{doc.type} • {doc.date}</div>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      doc.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {doc.status}
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link to="/documents">View All Documents</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Writer CTA */}
        <Card className="mt-8 bg-gradient-to-r from-docai-blue to-docai-purple text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Try Our AI Writer</h2>
            <p className="text-white/90 mb-6">Let AI help you write professional documents in seconds</p>
            <Button variant="secondary" size="lg" asChild>
              <Link to="/ai-writer">Start Writing with AI</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
