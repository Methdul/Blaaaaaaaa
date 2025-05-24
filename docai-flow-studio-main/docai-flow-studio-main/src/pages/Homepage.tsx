
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import InteractiveBackground from '@/components/InteractiveBackground';
import { FileText, Zap, Users, Star, ArrowDown, Sparkles, MousePointer2, TrendingUp } from 'lucide-react';

const Homepage = () => {
  const features = [
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

  const stats = [
    { value: "50K+", label: "Documents Created", icon: <FileText className="w-6 h-6" /> },
    { value: "2K+", label: "Active Creators", icon: <Users className="w-6 h-6" /> },
    { value: "$100K+", label: "Creator Earnings", icon: <TrendingUp className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800"></div>
        <InteractiveBackground />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-6 animate-fade-in">
            <Sparkles className="w-8 h-8 text-yellow-400 mr-3 animate-pulse" />
            <span className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-white text-sm font-medium">
              ✨ AI-Powered Document Creation
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 animate-fade-in leading-tight">
            Create Smart Documents
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              with AI
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in leading-relaxed" style={{animationDelay: '0.2s'}}>
            The future of document creation is here. Build resumes, invoices, letters, and more with intelligent AI assistance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in mb-12" style={{animationDelay: '0.4s'}}>
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 h-auto hover-lift group">
              <Link to="/templates" className="flex items-center">
                <MousePointer2 className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Try Templates
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 h-auto hover-lift backdrop-blur-sm">
              <Link to="/creator-dashboard">Become a Creator</Link>
            </Button>
          </div>

          {/* Interactive Stats Preview */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto animate-fade-in" style={{animationDelay: '0.6s'}}>
            {stats.map((stat, index) => (
              <div key={index} className="glass border border-white/20 rounded-xl p-4 hover-lift group cursor-pointer">
                <div className="text-white/70 group-hover:text-white transition-colors mb-1">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-white/70" />
        </div>
      </section>

      {/* Features Section */}
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
            {features.map((feature, index) => (
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

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Trusted by thousands of creators</h2>
            <p className="text-white/80 text-lg">Join our growing community of document creators</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            {stats.map((stat, index) => (
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
            <Button asChild variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-4 h-auto hover-lift backdrop-blur-sm">
              <Link to="/templates">Browse Templates</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
