import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

// Define Zod schema for validation
const registerSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string().min(8, { message: "Please confirm your password." })
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], // Path to field to display the error
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormValues) => {
    console.log("Registration data:", data);

    // Simulate successful registration and set auth state
    const mockToken = `mock-jwt-token-for-registration-${Date.now()}`;
    localStorage.setItem('authToken', mockToken);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userType', 'user'); // Default role for new registrations
    localStorage.setItem('userName', data.username); // Store username
    localStorage.setItem('userEmail', data.email); // Store user email

    toast({
      title: "Registration Successful!",
      description: `Welcome, ${data.username}! Your account has been created.`,
    });
    
    // Redirect to login page after a short delay to allow toast to be seen
    setTimeout(() => {
      navigate('/login'); 
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create Your Account</CardTitle>
          <CardDescription>Enter your details below to register.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                placeholder="YourUsername" 
                {...register("username")}
                aria-invalid={errors.username ? "true" : "false"}
              />
              {errors.username && <p className="text-sm font-medium text-destructive mt-1">{errors.username.message}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                type="email" 
                id="email" 
                placeholder="you@example.com" 
                {...register("email")} 
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && <p className="text-sm font-medium text-destructive mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input 
                type="password" 
                id="password" 
                placeholder="••••••••" 
                {...register("password")} 
                aria-invalid={errors.password ? "true" : "false"}
              />
              {errors.password && <p className="text-sm font-medium text-destructive mt-1">{errors.password.message}</p>}
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                type="password" 
                id="confirmPassword" 
                placeholder="••••••••" 
                {...register("confirmPassword")}
                aria-invalid={errors.confirmPassword ? "true" : "false"}
              />
              {errors.confirmPassword && <p className="text-sm font-medium text-destructive mt-1">{errors.confirmPassword.message}</p>}
            </div>
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
