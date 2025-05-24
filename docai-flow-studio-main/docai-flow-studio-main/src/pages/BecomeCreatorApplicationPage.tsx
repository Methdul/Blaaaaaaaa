import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, FileText, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const BecomeCreatorApplicationPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground pt-20 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4 tracking-tight">
            Become a DocAi Creator
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join our community of talented creators and share your unique templates with thousands of users. 
            Monetize your skills and help shape the future of document creation.
          </p>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Benefits & Process */}
          <div className="lg:col-span-1 space-y-8">
            <Card className="shadow-lg border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <CheckCircle className="mr-2 h-6 w-6 text-green-500" />
                  Why Become a Creator?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p><strong className="text-foreground">Monetize Your Skills:</strong> Earn competitive revenue share on every template sale.</p>
                <p><strong className="text-foreground">Reach a Wide Audience:</strong> Showcase your work to a global community of users.</p>
                <p><strong className="text-foreground">Flexible Schedule:</strong> Work at your own pace and on your own terms.</p>
                <p><strong className="text-foreground">Be Part of a Community:</strong> Collaborate and grow with fellow creators.</p>
                <p><strong className="text-foreground">Shape the Future:</strong> Contribute to the next generation of document tools.</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <FileText className="mr-2 h-6 w-6 text-blue-500" />
                  Application Process
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p className="flex items-start"><strong className="mr-2 text-primary">1. Submit Application:</strong> Fill out the form with your details, portfolio, and experience.</p>
                <p className="flex items-start"><strong className="mr-2 text-primary">2. Review by DocAi Team:</strong> Our team will carefully review your application (typically within 5-7 business days).</p>
                <p className="flex items-start"><strong className="mr-2 text-primary">3. Approval & Onboarding:</strong> If approved, you'll receive an invitation to complete onboarding and start uploading templates!</p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Call to Action to Apply */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-primary/20 bg-card p-6 sm:p-8">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl md:text-3xl font-semibold">Ready to Apply?</CardTitle>
                <CardDescription className="mt-2 text-lg">
                  If you're passionate about creating high-quality templates and want to join our platform, take the next step!
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-6 text-center">
                <Users className="w-16 h-16 text-primary mx-auto mb-6" />
                <p className="text-muted-foreground mb-6">
                  The application form will collect details about your experience, portfolio, and the types of templates you specialize in. 
                  Please ensure you have this information ready.
                </p>
                <Button size="xl" className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-10 py-7 group" asChild>
                  <Link to="/become-creator"> {/* This links to BecomeCreatorPage.tsx which has the actual form */}
                    Proceed to Application Form <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <p className="text-xs text-muted-foreground mt-4">
                  By proceeding, you agree to our Creator Terms and Conditions (placeholder link).
                </p>
              </CardContent>
            </Card>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Already have a creator account? <Link to="/login" className="text-primary hover:underline">Sign In</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeCreatorApplicationPage;
