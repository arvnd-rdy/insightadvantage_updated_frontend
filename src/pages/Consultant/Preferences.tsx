
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';

const ConsultantPreferences = () => {
  const { toast } = useToast();

  const handleSavePreferences = () => {
    toast({
      title: 'Preferences Saved',
      description: 'Your preferences have been updated successfully.',
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar role="consultant" />
        
        <div className="flex-1">
          <DashboardHeader 
            userName="Alex Johnson"
            userRole="consultant"
          />
          
          <main className="p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Preferences</h2>
              <p className="text-gray-600">
                Manage your account settings and notification preferences.
              </p>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Email Notifications</CardTitle>
                  <CardDescription>
                    Control what types of email notifications you receive.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-messages" className="flex-grow">
                      <div className="font-medium">New messages</div>
                      <div className="text-sm text-gray-500">
                        Receive emails when an organization sends you a message.
                      </div>
                    </Label>
                    <Switch id="email-messages" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-invitations" className="flex-grow">
                      <div className="font-medium">Connection invitations</div>
                      <div className="text-sm text-gray-500">
                        Receive emails when an organization invites you to connect.
                      </div>
                    </Label>
                    <Switch id="email-invitations" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-matches" className="flex-grow">
                      <div className="font-medium">New organization matches</div>
                      <div className="text-sm text-gray-500">
                        Receive emails when a new organization matches your expertise.
                      </div>
                    </Label>
                    <Switch id="email-matches" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-updates" className="flex-grow">
                      <div className="font-medium">Platform updates</div>
                      <div className="text-sm text-gray-500">
                        Receive emails about new features and platform updates.
                      </div>
                    </Label>
                    <Switch id="email-updates" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-newsletter" className="flex-grow">
                      <div className="font-medium">Marketing newsletter</div>
                      <div className="text-sm text-gray-500">
                        Receive our monthly newsletter with industry insights.
                      </div>
                    </Label>
                    <Switch id="email-newsletter" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Application Preferences</CardTitle>
                  <CardDescription>
                    Customize how the platform works for you.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="project-visibility">Project Visibility</Label>
                    <RadioGroup defaultValue="recommended" id="project-visibility">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="all" />
                        <Label htmlFor="all">Show all available organizations</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="recommended" id="recommended" />
                        <Label htmlFor="recommended">Show only recommended organizations matching my expertise</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="remote-preference">Remote Work Preference</Label>
                    <RadioGroup defaultValue="hybrid" id="remote-preference">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="remote" id="remote" />
                        <Label htmlFor="remote">Remote only</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="onsite" id="onsite" />
                        <Label htmlFor="onsite">On-site only</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="hybrid" id="hybrid" />
                        <Label htmlFor="hybrid">Hybrid (both remote and on-site)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Maximum Commute Distance (if on-site)</Label>
                    <div className="pt-4 pb-2">
                      <Slider defaultValue={[25]} max={100} step={5} />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>0 miles</span>
                      <span>25 miles</span>
                      <span>50 miles</span>
                      <span>100+ miles</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="profile-visibility" className="flex-grow">
                      <div className="font-medium">Profile Visibility</div>
                      <div className="text-sm text-gray-500">
                        Make your profile visible to organizations searching for consultants.
                      </div>
                    </Label>
                    <Switch id="profile-visibility" defaultChecked />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Account Security</CardTitle>
                  <CardDescription>
                    Manage your password and security settings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  
                  <div>
                    <Button variant="outline" className="w-full sm:w-auto">Change Password</Button>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4">
                    <Label htmlFor="two-factor" className="flex-grow">
                      <div className="font-medium">Two-factor Authentication</div>
                      <div className="text-sm text-gray-500">
                        Add an extra layer of security to your account.
                      </div>
                    </Label>
                    <Switch id="two-factor" />
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-end">
                <Button onClick={handleSavePreferences}>Save Preferences</Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ConsultantPreferences;
