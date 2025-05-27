import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { getUserName, getUserEmail, isCreator } from '@/lib/authUtils';
import { Sparkles, UserCheck, ListChecks, Users, TrendingUp, Send, DollarSign } from 'lucide-react'; // Added DollarSign

// Zod schema for validation
const becomeCreatorSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  portfolioLink: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  experienceYears: z.preprocess(
    (val) => Number(String(val).trim() === "" ? undefined : val), // Ensure empty string becomes undefined for zod number coercion
    z.number({ required_error: "Years of experience is required." }).positive({ message: "Years must be a positive number." })
  ),
  primarySpecialization: z.string().min(3, { message: "Specialization must be at least 3 characters." }),
  preferredTools: z.string().min(3, { message: "Tools description must be at least 3 characters." }),
  reason: z.string()
    .min(50, { message: "Reason must be at least 50 characters." })
    .max(500, { message: "Reason cannot exceed 500 characters." }),
});

type BecomeCreatorFormValues = z.infer<typeof becomeCreatorSchema>;

const BecomeCreatorPage: React.FC = () => {
  const navigate = useNavigate();
  const [isAlreadyCreator, setIsAlreadyCreator] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<BecomeCreatorFormValues>({
    resolver: zodResolver(becomeCreatorSchema),
    defaultValues: {
      fullName: '',
      email: '',
      portfolioLink: '',
      experienceYears: undefined, // Or 0, but undefined might be better for placeholder visibility
      primarySpecialization: '',
      preferredTools: '',
      reason: '',
    }
  });

  useEffect(() => {
    if (isCreator()) {
      setIsAlreadyCreator(true);
    } else {
      const savedStatus = localStorage.getItem('creatorApplicationStatus');
      if (savedStatus === 'pending') {
        setApplicationSubmitted(true);
      } else {
        const name = getUserName();
        const email = getUserEmail();
        if (name) setValue('fullName', name, { shouldValidate: true });
        if (email) setValue('email', email, { shouldValidate: true });
      }
    }
  }, [setValue]);

  const onSubmit = (data: BecomeCreatorFormValues) => {
    console.log("Creator Application Data:", data);
    toast({
      title: "Application Submitted!",
      description: "We will review it and get back to you within 3-5 business days.",
      duration: 5000,
    });
    setApplicationSubmitted(true);
    localStorage.setItem('creatorApplicationStatus', 'pending');
    // Optionally, redirect after a delay:
    // setTimeout(() => navigate('/dashboard'), 5000);
  };

  const benefits = [
    { icon: <DollarSign className="w-5 h-5 text-green-500" />, text: "Monetize your unique template designs." },
    { icon: <Users className="w-5 h-5 text-blue-500" />, text: "Reach a wide audience on the DocAI platform." },
    { icon: <TrendingUp className="w-5 h-5 text-purple-500" />, text: "Grow your brand and reputation." },
    { icon: <Sparkles className="w-5 h-5 text-yellow-500" />, text: "Join a vibrant community of creators." },
    { icon: <span className="font-bold text-lg text-primary">70%</span>, text: "Earn a competitive 70% revenue share on sales."}
  ];

  if (isAlreadyCreator) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center py-20">
        <UserCheck className="w-16 h-16 text-green-500 mb-6" />
        <h1 className="text-3xl font-bold text-foreground mb-4">You're Already a Creator!</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          Great news! You are already part of our creator community. You can manage your templates and view your earnings on your Creator Dashboard.
        </p>
        <Button asChild size="lg">
          <Link to="/creator-dashboard">
            <ListChecks className="mr-2 h-5 w-5" /> Go to Creator Dashboard
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 text-foreground py-12 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <Sparkles className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            Become a DocAI Creator
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Share your unique templates with thousands of users and earn rewards for your creativity.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Informational Section */}
          <div className="bg-card p-6 sm:p-8 rounded-xl shadow-xl border border-border">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Why Become a Creator?</h2>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">{benefit.icon}</div>
                  <span className="text-muted-foreground">{benefit.text}</span>
                </li>
              ))}
            </ul>
             <p className="mt-6 text-sm text-muted-foreground/80">
              We provide the platform, you provide the creativity. Let's build the future of documents together!
            </p>
          </div>

          {/* Application Form Section */}
          <Card className="shadow-xl border-border bg-card">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-foreground">Application Form</CardTitle>
              <CardDescription>Tell us a bit about yourself and why you'd be a great creator.</CardDescription>
            </CardHeader>
            <CardContent>
              {applicationSubmitted ? (
                <div className="text-center py-10">
                  <UserCheck className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Application Sent!</h3>
                  <p className="text-muted-foreground">
                    Thank you for applying. We'll review your information and get back to you soon.
                  </p>
                  <Button variant="outline" className="mt-6" asChild>
                    <Link to="/dashboard">Back to Dashboard</Link>
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <Label htmlFor="fullName" className="font-medium">Full Name</Label>
                    <Input id="fullName" {...register("fullName")} className="mt-1 bg-background/50" readOnly={!!getUserName()} />
                    {errors.fullName && <p className="text-sm text-destructive mt-1">{errors.fullName.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email" className="font-medium">Email Address</Label>
                    <Input id="email" type="email" {...register("email")} className="mt-1 bg-background/50" readOnly={!!getUserEmail()} />
                    {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="portfolioLink" className="font-medium">Portfolio/Website Link (Optional)</Label>
                    <Input id="portfolioLink" placeholder="https://yourportfolio.com" {...register("portfolioLink")} className="mt-1 bg-background/50" />
                    {errors.portfolioLink && <p className="text-sm text-destructive mt-1">{errors.portfolioLink.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="experienceYears" className="font-medium">Years of Relevant Experience</Label>
                    <Input id="experienceYears" type="number" {...register("experienceYears")} className="mt-1 bg-background/50" placeholder="e.g., 3" />
                    {errors.experienceYears && <p className="text-sm text-destructive mt-1">{errors.experienceYears.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="primarySpecialization" className="font-medium">Primary Template Specialization(s)</Label>
                    <Input id="primarySpecialization" type="text" placeholder="e.g., Resumes, Business Proposals, Educational Materials" {...register("primarySpecialization")} className="mt-1 bg-background/50" />
                    {errors.primarySpecialization && <p className="text-sm text-destructive mt-1">{errors.primarySpecialization.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="preferredTools" className="font-medium">Preferred Design/Content Creation Tools</Label>
                    <Input id="preferredTools" type="text" placeholder="e.g., Figma, Canva, Google Docs, MS Word" {...register("preferredTools")} className="mt-1 bg-background/50" />
                    {errors.preferredTools && <p className="text-sm text-destructive mt-1">{errors.preferredTools.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="reason" className="font-medium">Tell Us About Yourself & Your Templates</Label>
                    <Textarea
                      id="reason"
                      placeholder="Describe your experience, the types of templates you create, and why you want to join..."
                      {...register("reason")}
                      className="mt-1 h-32 bg-background/50"
                    />
                    {errors.reason && <p className="text-sm text-destructive mt-1">{errors.reason.message}</p>}
                  </div>
                  <Button type="submit" className="w-full text-lg py-3 bg-primary hover:bg-primary/90">
                    <Send className="mr-2 h-5 w-5" /> Submit Application
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BecomeCreatorPage;
