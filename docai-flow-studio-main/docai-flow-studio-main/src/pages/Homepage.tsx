
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import InteractiveBackground from '@/components/InteractiveBackground';
import FeatureCard from '@/components/FeatureCard'; // Import FeatureCard
import { FileText, Zap, Users, Star, ArrowDown, Sparkles, MousePointer2, TrendingUp, BarChart2, FileCheck, LayoutGrid, Smile, Clock, Award, DollarSign, Settings2 } from 'lucide-react'; // Import new icons for benefits

const Homepage = () => {
  const oldFeatures = [ // Renamed to avoid conflict
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Smart Templates",
      description: "AI-powered templates that adapt to your needs",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Generate documents in seconds, not hours",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Creator Economy",
      description: "Monetize your templates and earn from your creativity",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Premium Quality",
      description: "Professional-grade documents every time",
      color: "from-violet-500 to-violet-600"
    }
  ];

  const newFeatures = [
    {
      icon: <Zap size={48} className="text-blue-500" />,
      title: "AI-Powered Generation",
      description: "Leverage cutting-edge AI to generate document drafts and content suggestions in seconds."
    },
    {
      icon: <FileText size={48} className="text-green-500" />,
      title: "Professional Templates",
      description: "Access a vast library of professionally designed templates for resumes, invoices, letters, and more."
    },
    {
      icon: <Users size={48} className="text-purple-500" />,
      title: "Creator Marketplace",
      description: "Explore unique templates from talented creators or monetize your own designs. Ready to share your work and earn?",
      cta: { // Adding CTA to this specific feature card
        text: "Start Creating", // Text can remain, or be "Apply Now"
        link: "/become-creator-application", // Updated link
        className: "bg-orange-500 hover:bg-orange-600 text-white" // Custom orange style for this button
      }
    },
    {
      icon: <BarChart2 size={48} className="text-red-500" />,
      title: "Insightful Analytics",
      description: "Track your document usage, template performance, and creator earnings with our detailed analytics."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      content: "DocAi saved me hours of work. The AI suggestions are incredibly smart.",
      avatar: "SC",
      rating: 5
    },
    {
      name: "Mike Rodriguez",
      role: "Freelance Designer",
      content: "I've earned over $2,000 selling my templates on DocAi. Amazing platform!",
      avatar: "MR",
      rating: 5
    },
    {
      name: "Emily Johnson",
      role: "HR Director",
      content: "The resume builder is a game-changer. Our hiring process is now 50% faster.",
      avatar: "EJ",
      rating: 5
    }
  ];

  const oldStats = [ // Renamed to avoid conflict
    { value: "50K+", label: "Documents Created", icon: <FileText className="w-6 h-6" /> },
    { value: "2K+", label: "Active Creators", icon: <Users className="w-6 h-6" /> },
    { value: "$100K+", label: "Creator Earnings", icon: <TrendingUp className="w-6 h-6" /> }
  ];

  const newPageStats = [
    {
      icon: <FileCheck size={32} className="text-green-500 mb-2" />,
      value: "10K+",
      label: "Documents Created"
    },
    {
      icon: <LayoutGrid size={32} className="text-blue-500 mb-2" />,
      value: "500+",
      label: "Templates Available"
    },
    {
      icon: <Users size={32} className="text-purple-500 mb-2" />,
      value: "1K+",
      label: "Active Creators"
    },
    {
      icon: <Smile size={32} className="text-yellow-500 mb-2" />,
      value: "99%",
      label: "User Satisfaction"
    }
  ];

  const benefits = [
    {
      icon: <Clock className="w-7 h-7 text-blue-500" />,
      title: "Save Time & Effort",
      description: "Streamline your workflow with AI assistance and ready-to-use templates, significantly reducing document creation time."
    },
    {
      icon: <Award className="w-7 h-7 text-green-500" />,
      title: "Professional & Polished Results",
      description: "Ensure your documents are always professional and error-free with high-quality templates and smart editing tools."
    },
    {
      icon: <DollarSign className="w-7 h-7 text-purple-500" />,
      title: "Monetize Your Expertise",
      description: "For creators, our platform offers a unique opportunity to showcase your template designs and earn revenue."
    },
    {
      icon: <Settings2 className="w-7 h-7 text-red-500" />,
      title: "Flexible & Customizable",
      description: "Tailor documents to your exact needs with versatile templates and intuitive customization options."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800"></div>
        <InteractiveBackground />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 animate-fade-in leading-tight">
            Unlock Your Document Potential
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in leading-relaxed" style={{animationDelay: '0.2s'}}>
            Create, customize, and share professional documents with ease. Leverage AI-powered tools and a vast library of templates.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in mb-12 flex-wrap" style={{animationDelay: '0.4s'}}>
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 h-auto hover-lift group">
              <Link to="/login" className="flex items-center">
                Get Started Now
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 h-auto hover-lift group">
              <Link to="/become-creator-application" className="flex items-center">
                Become a Creator
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-white text-white bg-black/25 hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 h-auto hover-lift backdrop-blur-sm">
              <Link to="/templates">Explore Templates</Link>
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-white/70" />
        </div>
      </section>

      {/* New Feature Cards Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-foreground mb-4">
              Discover Our Key Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore the core functionalities that make DocAI the ultimate document solution.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {newFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                cta={feature.cta} // Pass cta prop
              />
            ))}
          </div>
        </div>
      </section>

      {/* Existing Features Section (Consider removing or refactoring if redundant) */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-100 text-blue-600 rounded-full px-4 py-2 text-sm font-medium mb-4">
              <Star className="w-4 h-4 mr-2" />
              Why Choose DocAi?
            </div>
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Experience the Next Generation
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful AI tools and creator marketplace designed for modern document creation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {oldFeatures.map((feature, index) => ( // Changed to oldFeatures
              <Card key={index} className="hover-lift glass border-0 shadow-lg group cursor-pointer transition-all duration-300 hover:shadow-2xl">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* New Statistics Display Section */}
      <section className="py-20 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-foreground mb-4">
              Join Our Growing Community
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Numbers that speak for our vibrant platform and satisfied users.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newPageStats.map((stat, index) => (
              <div key={index} className="bg-card p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center items-center">
                 {stat.icon}
                </div>
                <h3 className="text-4xl font-bold text-primary mt-2 mb-1">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-foreground mb-4">
              Unlock Your Productivity
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover how DocAI empowers you to create better documents, faster.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Placeholder for image/graphic - Column 1 */}
            <div className="hidden md:flex justify-center items-center p-8 bg-muted/30 rounded-lg min-h-[300px]">
              {/* Replace this div with an <img /> tag or a more complex graphic component later */}
              <Sparkles size={64} className="text-primary opacity-50" />
              <p className="ml-4 text-muted-foreground">Illustrative Graphic/Image Here</p>
            </div>
            {/* Benefits List - Column 2 */}
            <div className="space-y-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/20 transition-colors">
                  <div className="flex-shrink-0 mt-1">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-foreground mb-1">{benefit.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section - This is the old one, I've renamed its data source to oldStats */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Trusted by thousands of creators</h2>
            <p className="text-white/80 text-lg">Join our growing community of document creators</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            {oldStats.map((stat, index) => ( // Changed to oldStats
              <div key={index} className="group">
                <div className="flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold mb-2 group-hover:text-yellow-400 transition-colors">{stat.value}</div>
                <div className="text-xl text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-purple-100 text-purple-600 rounded-full px-4 py-2 text-sm font-medium mb-4">
              <Star className="w-4 h-4 mr-2" />
              Customer Stories
            </div>
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">Real feedback from real creators and users</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover-lift group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold mr-4 group-hover:scale-110 transition-transform duration-300">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dedicated Creator CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-100 via-amber-100 to-yellow-100">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Sparkles className="w-12 h-12 text-orange-500 mx-auto mb-6 animate-pulse" />
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6 leading-tight">
            Ready to Share Your Creativity?
          </h2>
          <p className="text-xl text-gray-700 mb-10 leading-relaxed max-w-2xl mx-auto">
            Join our platform as a creator and start monetizing your unique template designs today. Reach a wide audience and build your brand with DocAI.
          </p>
          <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 py-5 h-auto hover-lift text-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Link to="/become-creator-application">
              Become a Creator Now
            </Link>
          </Button>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 text-white text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
            Ready to get started?
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
            Transform Your Document Creation Today
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Join thousands of users who are already creating smarter documents with DocAi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 h-auto hover-lift">
              <Link to="/login" className="flex items-center">
                Get Started Free
                <ArrowDown className="w-5 h-5 ml-2 rotate-[-90deg]" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-white text-white bg-black/25 hover:bg-white hover:text-gray-900 font-semibold px-8 py-4 h-auto hover-lift backdrop-blur-sm">
              <Link to="/templates">Browse Templates</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
