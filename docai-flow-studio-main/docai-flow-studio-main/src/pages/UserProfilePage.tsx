import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getUserName, getUserEmail } from '@/lib/authUtils'; // Assuming these functions exist
import { User as UserIcon, Edit3, Lock, Settings } from 'lucide-react';

const UserProfilePage = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    setUserName(getUserName());
    setUserEmail(getUserEmail());
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-display font-bold flex items-center">
            <UserIcon className="mr-3 h-8 w-8 text-primary" />
            User Profile
          </h1>
          <p className="text-muted-foreground mt-1">Manage your profile and preferences.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Profile Information */}
          <div className="md:col-span-1 space-y-6">
            <Card className="shadow-md border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserIcon className="mr-2 h-5 w-5 text-primary" /> Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Name</p>
                  <p className="text-lg font-semibold">{userName || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="text-lg font-semibold">{userEmail || 'N/A'}</p>
                </div>
                 <p className="text-xs text-muted-foreground pt-2">
                    This information is retrieved from your account.
                 </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Forms and Settings */}
          <div className="md:col-span-2 space-y-8">
            <Card className="shadow-md border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Edit3 className="mr-2 h-5 w-5 text-primary" /> Edit Profile
                </CardTitle>
                <CardDescription>Update your personal details.</CardDescription>
              </CardHeader>
              <CardContent className="min-h-[100px] flex items-center justify-center">
                <p className="text-muted-foreground">Edit profile form will be here.</p>
              </CardContent>
            </Card>

            <Card className="shadow-md border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="mr-2 h-5 w-5 text-primary" /> Change Password
                </CardTitle>
                <CardDescription>Update your account security.</CardDescription>
              </CardHeader>
              <CardContent className="min-h-[100px] flex items-center justify-center">
                <p className="text-muted-foreground">Change password form will be here.</p>
              </CardContent>
            </Card>

            <Card className="shadow-md border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 h-5 w-5 text-primary" /> Preferences
                </CardTitle>
                <CardDescription>Manage your notification and theme settings.</CardDescription>
              </CardHeader>
              <CardContent className="min-h-[100px] flex items-center justify-center">
                <p className="text-muted-foreground">Notification and theme preference settings will be here.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
