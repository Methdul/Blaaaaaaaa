
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Users, Target, Zap, Star, TrendingUp, Globe } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      avatar: "SC",
      bio: "Former VP of Product at Adobe. Passionate about democratizing design and document creation."
    },
    {
      name: "Michael Rodriguez",
      role: "CTO & Co-Founder", 
      avatar: "MR",
      bio: "Ex-Google engineer with 10+ years in AI and machine learning. Leads our technical vision."
    },
    {
      name: "Emily Johnson",
      role: "Head of Design",
      avatar: "EJ",
      bio: "Design leader from Figma. Focuses on creating intuitive, beautiful user experiences."
    },
    {
      name: "David Park",
      role: "VP of Engineering",
      avatar: "DP",
      bio: "Former Microsoft senior engineer. Specializes in scalable systems and AI infrastructure."
    }
  ];

  const milestones = [
    {
      year: "2023",
      title: "DocAi Founded",
      description: "Started with a vision to revolutionize document creation using AI"
    },
    {
      year: "2023",
      title: "First Templates",
      description: "Launched with 50 professional templates for resumes and invoices"
    },
    {
      year: "2024", 
      title: "AI Writer Launch",
      description: "Introduced AI-powered document generation capabilities"
    },
    {
      year: "2024",
      title: "Creator Marketplace",
      description: "Opened platform for creators to monetize their templates"
    },
    {
      year: "2024",
      title: "50K+ Users",
      description: "Reached milestone of 50,000+ active users worldwide"
    }
  ];

  const values = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Innovation",
      description: "We constantly push the boundaries of what's possible with AI and document creation.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community",
      description: "We believe in empowering creators and building a supportive community ecosystem.",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Quality",
      description: "Every template and feature is crafted with attention to detail and professional standards.",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Accessibility",
      description: "We make professional document creation accessible to everyone, everywhere.",
      color: "bg-orange-100 text-orange-600"
    }
  ];

  const stats = [
    { label: "Active Users", value: "50K+", icon: <Users className="w-6 h-6" /> },
    { label: "Templates Created", value: "2K+", icon: <Star className="w-6 h-6" /> },
    { label: "Documents Generated", value: "500K+", icon: <TrendingUp className="w-6 h-6" /> },
    { label: "Creator Earnings", value: "$100K+", icon: <Zap className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-display font-bold text-gray-900 mb-6">
            About DocAi
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to revolutionize document creation through the power of artificial intelligence. 
            Our platform empowers individuals and businesses to create professional documents with unprecedented ease and speed.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center space-x-3">
                <div className="w-10 h-10 bg-docai-blue/10 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-docai-blue" />
                </div>
                <span>Our Mission</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                To democratize professional document creation by combining cutting-edge AI technology with 
                human creativity. We believe everyone should have access to tools that help them communicate 
                effectively and present themselves professionally.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center space-x-3">
                <div className="w-10 h-10 bg-docai-purple/10 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-docai-purple" />
                </div>
                <span>Our Vision</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                To become the global standard for AI-powered document creation, where millions of users 
                and creators collaborate to build the future of professional communication. We envision 
                a world where creating stunning documents is as simple as having a conversation.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="mb-16">
          <h2 className="text-3xl font-display font-bold text-center text-gray-900 mb-8">
            DocAi by the Numbers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover-lift">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-docai-blue/10 rounded-lg flex items-center justify-center mx-auto mb-4 text-docai-blue">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-display font-bold text-center text-gray-900 mb-8">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover-lift">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${value.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    {value.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-display font-bold text-center text-gray-900 mb-8">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover-lift">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-docai-blue to-docai-purple rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    {member.avatar}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-docai-blue font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-display font-bold text-center text-gray-900 mb-8">
            Our Journey
          </h2>
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Badge variant="outline" className="bg-docai-blue text-white border-docai-blue font-semibold">
                    {milestone.year}
                  </Badge>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-display font-bold text-center text-gray-900 mb-8">
            What People Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "DocAi transformed how I create documents. The AI suggestions are incredibly smart and save me hours of work.",
                author: "Jennifer Martinez",
                role: "Marketing Manager"
              },
              {
                quote: "As a creator, I've earned over $5,000 selling my templates on DocAi. The platform really supports creators.",
                author: "Robert Kim",
                role: "Graphic Designer"
              },
              {
                quote: "The resume builder helped me land my dream job. The templates are professional and the AI writing is amazing.",
                author: "Alex Thompson",
                role: "Software Engineer"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-docai-blue rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.author}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-docai-blue to-docai-purple text-white border-0">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Join the DocAi Community</h2>
            <p className="text-xl mb-8 text-white/90">
              Whether you're a user looking to create amazing documents or a creator wanting to monetize your templates, 
              there's a place for you in our growing community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="font-semibold">
                <Link to="/login">Get Started Free</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-docai-blue font-semibold">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
