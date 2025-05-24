import { useState, useEffect } from 'react'; // Import useEffect
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Settings, LogIn } from 'lucide-react'; // Added LogIn icon
import { toast } from '@/components/ui/use-toast';

// Define Zod schema for login validation
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// Mock user credentials
const MOCK_USER_EMAIL = "user@example.com";
const MOCK_USER_PASSWORD = "password123";
const MOCK_CREATOR_EMAIL = "creator@example.com";
const MOCK_CREATOR_PASSWORD = "password123";


const Login = () => {
  const navigate = useNavigate();
  // Keep userType state for tab switching
  const [userType, setUserType] = useState<'user' | 'creator'>('user');

  const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Login data:", data);
    let isAuthenticated = false;
    let redirectPath = '/dashboard'; // Default redirect for user
    let userName = "User";

    if (userType === 'user') {
      if (data.email === MOCK_USER_EMAIL && data.password === MOCK_USER_PASSWORD) {
        isAuthenticated = true;
        userName = "Mock User";
      }
    } else if (userType === 'creator') {
      if (data.email === MOCK_CREATOR_EMAIL && data.password === MOCK_CREATOR_PASSWORD) {
        isAuthenticated = true;
        redirectPath = '/creator-dashboard'; // Redirect for creator
        userName = "Mock Creator";
      }
    }

    if (isAuthenticated) {
      const mockToken = `mock-jwt-token-for-${userType}-${Date.now()}`;
      localStorage.setItem('authToken', mockToken);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userType', userType);
      localStorage.setItem('userName', userName);
      localStorage.setItem('userEmail', data.email); // Store user email


      toast({
        title: "Login Successful!",
        description: `Welcome back, ${userName}!`,
      });
      navigate(redirectPath);
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Reset form when userType changes
  useEffect(() => {
    reset({ email: '', password: '' });
  }, [userType, reset]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-docai-blue via-docai-purple to-docai-blue-dark p-4">
      <div className="w-full max-w-md">
        <Card className="glass border-0 shadow-2xl">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-docai-blue to-docai-purple rounded-lg flex items-center justify-center shadow-md">
                <LogIn className="w-6 h-6 text-white" />
              </div>
              <span className="font-display font-bold text-3xl gradient-text">DocAi Login</span>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Welcome Back!
            </CardTitle>
            <CardDescription className="text-gray-600">
              Sign in to access your {userType === 'user' ? 'documents and tools' : 'creator dashboard'}.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <Tabs defaultValue="user" onValueChange={(value) => setUserType(value as 'user' | 'creator')}>
              <TabsList className="grid w-full grid-cols-2 glass">
                <TabsTrigger value="user" className="flex items-center space-x-2 data-[state=active]:bg-docai-blue data-[state=active]:text-white">
                  <User className="w-4 h-4" />
                  <span>User</span>
                </TabsTrigger>
                <TabsTrigger value="creator" className="flex items-center space-x-2 data-[state=active]:bg-docai-purple data-[state=active]:text-white">
                  <Settings className="w-4 h-4" />
                  <span>Creator</span>
                </TabsTrigger>
              </TabsList>
              {/* Conditional descriptive text based on selected tab */}
              {userType === 'user' && (
                <div className="text-center text-sm text-gray-600 mt-4 mb-2"> {/* Adjusted margins */}
                  Access templates, AI writer, and document builders.
                </div>
              )}
              {userType === 'creator' && (
                <div className="text-center text-sm text-gray-600 mt-4 mb-2"> {/* Adjusted margins */}
                  Upload templates, earn money, and access analytics.
                </div>
              )}
            </Tabs>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-1"> {/* Form now only wraps inputs + button */}
              {/* Common Input Fields */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="glass border-white/20"
                  {...register("email")}
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && <p className="text-sm font-medium text-destructive mt-1">{errors.email.message}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="glass border-white/20"
                  {...register("password")}
                  aria-invalid={errors.password ? "true" : "false"}
                />
                {errors.password && <p className="text-sm font-medium text-destructive mt-1">{errors.password.message}</p>}
              </div>
              
              <Button 
                type="submit" 
                className={`w-full text-white font-semibold ${userType === 'user' ? 'bg-docai-blue hover:bg-docai-blue-dark' : 'bg-docai-purple hover:bg-docai-purple-light'}`}
              >
                Sign In {userType === 'creator' ? 'as Creator' : ''}
              </Button>
            </form>
            
            <div className="text-center">
              <Link
                to="/register"
                className="text-sm text-docai-blue hover:text-docai-blue-dark font-medium"
              >
                Don't have an account? Sign Up
              </Link>
            </div>
            
            <div className="text-center text-xs text-gray-500">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
