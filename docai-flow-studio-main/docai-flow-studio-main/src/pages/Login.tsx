
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Settings } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'user' | 'creator'>('user');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-docai-blue via-docai-purple to-docai-blue-dark p-4">
      <div className="w-full max-w-md">
        <Card className="glass border-0 shadow-2xl">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-docai-blue to-docai-purple rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">D</span>
              </div>
              <span className="font-display font-bold text-2xl gradient-text">DocAi</span>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {isLogin ? 'Sign in to your account' : 'Join the DocAi community'}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* User Type Selector */}
            <Tabs defaultValue="user" onValueChange={(value) => setUserType(value as 'user' | 'creator')}>
              <TabsList className="grid w-full grid-cols-2 glass">
                <TabsTrigger value="user" className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>User</span>
                </TabsTrigger>
                <TabsTrigger value="creator" className="flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Creator</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="user" className="mt-6 space-y-4">
                <div className="text-center text-sm text-gray-600 mb-4">
                  Access templates, AI writer, and document builders
                </div>
                
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="glass border-white/20"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      className="glass border-white/20"
                    />
                  </div>
                  
                  {!isLogin && (
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        className="glass border-white/20"
                      />
                    </div>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-docai-blue hover:bg-docai-blue-dark text-white font-semibold"
                    asChild
                  >
                    <Link to="/dashboard">
                      {isLogin ? 'Sign In' : 'Create Account'}
                    </Link>
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="creator" className="mt-6 space-y-4">
                <div className="text-center text-sm text-gray-600 mb-4">
                  Upload templates, earn money, and access analytics
                </div>
                
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="creatorEmail">Email</Label>
                    <Input
                      id="creatorEmail"
                      type="email"
                      placeholder="Enter your email"
                      className="glass border-white/20"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="creatorPassword">Password</Label>
                    <Input
                      id="creatorPassword"
                      type="password"
                      placeholder="Enter your password"
                      className="glass border-white/20"
                    />
                  </div>
                  
                  {!isLogin && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="creatorName">Creator Name</Label>
                        <Input
                          id="creatorName"
                          type="text"
                          placeholder="Your display name"
                          className="glass border-white/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="creatorConfirmPassword">Confirm Password</Label>
                        <Input
                          id="creatorConfirmPassword"
                          type="password"
                          placeholder="Confirm your password"
                          className="glass border-white/20"
                        />
                      </div>
                    </>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-docai-purple hover:bg-docai-purple-light text-white font-semibold"
                    asChild
                  >
                    <Link to="/creator-dashboard">
                      {isLogin ? 'Sign In as Creator' : 'Become a Creator'}
                    </Link>
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            
            <div className="text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-docai-blue hover:text-docai-blue-dark font-medium"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
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
