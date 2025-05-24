import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input'; // For read-only display, styled as plain text
import { getUserName, getUserRole, getUserEmail } from '@/lib/authUtils';
import { UserCircle, Mail, ShieldCheck } from 'lucide-react'; // Icons for profile items

const UserProfile = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    setUserName(getUserName());
    setUserRole(getUserRole());
    setUserEmail(getUserEmail());
  }, []);

  const ProfileItem: React.FC<{ icon: React.ReactNode; label: string; value: string | null }> = ({ icon, label, value }) => (
    <div className="flex items-center space-x-3 mb-4 p-3 bg-muted/30 rounded-lg">
      <div className="text-primary">{icon}</div>
      <div>
        <Label className="text-sm text-muted-foreground">{label}</Label>
        <p className="text-md font-medium text-foreground">
          {value || 'Not available'}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl border-border">
          <CardHeader className="text-center bg-card">
            <UserCircle className="w-20 h-20 mx-auto text-primary mb-3" />
            <CardTitle className="text-3xl font-bold text-foreground">My Profile</CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              View your account details below.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 sm:p-8 space-y-6">
            <ProfileItem icon={<UserCircle size={20} />} label="Username" value={userName} />
            <ProfileItem icon={<Mail size={20} />} label="Email Address" value={userEmail} />
            <ProfileItem icon={<ShieldCheck size={20} />} label="Current Role" value={userRole ? userRole.charAt(0).toUpperCase() + userRole.slice(1) : null} />
            
            <div className="text-center pt-4 mt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                More profile settings and options coming soon!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
