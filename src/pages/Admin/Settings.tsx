
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const AdminSettings = () => {
  const { toast } = useToast();
  
  const handleSaveSettings = () => {
    toast({
      title: 'Settings Saved',
      description: 'Your changes have been applied successfully.',
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar role="admin" />
        
        <div className="flex-1">
          <DashboardHeader 
            userName="Admin"
            userRole="admin"
          />
          
          <main className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Platform Settings</h2>
              <p className="text-gray-600">
                Configure global platform settings and controls.
              </p>
            </div>
            
            <Tabs defaultValue="general" className="space-y-6">
              <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general">
                <Card>
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="platform-name">Platform Name</Label>
                      <Input id="platform-name" defaultValue="InsightAdvantage" />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="support-email">Support Email</Label>
                      <Input id="support-email" defaultValue="support@insightadvantage.com" type="email" />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="contact-phone">Contact Phone</Label>
                      <Input id="contact-phone" defaultValue="(555) 123-4567" />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="footer-text">Footer Text</Label>
                      <Textarea id="footer-text" defaultValue="© 2024 InsightAdvantage. All rights reserved." />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                        <p className="text-sm text-gray-500">Temporarily disable user access to the platform</p>
                      </div>
                      <Switch id="maintenance-mode" />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-gray-500">Require 2FA for all admin accounts</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Login Restrictions</Label>
                        <p className="text-sm text-gray-500">Limit login attempts to prevent brute force attacks</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="max-login-attempts">Maximum Login Attempts</Label>
                      <Input id="max-login-attempts" defaultValue="5" type="number" min="1" max="10" />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                      <Input id="session-timeout" defaultValue="30" type="number" min="5" max="120" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Document Encryption</Label>
                        <p className="text-sm text-gray-500">Enable encryption for all uploaded documents</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>System Alerts</Label>
                        <p className="text-sm text-gray-500">Send critical system alerts to admin emails</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>User Signups</Label>
                        <p className="text-sm text-gray-500">Send notifications for new user registrations</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Subscription Changes</Label>
                        <p className="text-sm text-gray-500">Send notifications for subscription upgrades/downgrades</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Payment Failures</Label>
                        <p className="text-sm text-gray-500">Send notifications for failed payment attempts</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="admin-emails">Admin Email Recipients</Label>
                      <Input id="admin-emails" defaultValue="admin@insightadvantage.com, support@insightadvantage.com" />
                      <p className="text-xs text-gray-500">Separate multiple emails with commas</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="integrations">
                <Card>
                  <CardHeader>
                    <CardTitle>Integration Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Stripe Payment Gateway</Label>
                        <p className="text-sm text-gray-500">Enable Stripe for processing payments</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="stripe-key">Stripe API Key</Label>
                      <Input id="stripe-key" type="password" defaultValue="sk_test_********************************" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Google SSO</Label>
                        <p className="text-sm text-gray-500">Enable Google single sign-on</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="google-client-id">Google Client ID</Label>
                      <Input id="google-client-id" defaultValue="123456789-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Microsoft SSO</Label>
                        <p className="text-sm text-gray-500">Enable Microsoft single sign-on</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="microsoft-client-id">Microsoft Client ID</Label>
                      <Input id="microsoft-client-id" defaultValue="12345678-abcd-efgh-ijkl-mnopqrstuvwxyz" />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-end mt-6 space-x-4">
              <Button variant="outline">Reset to Defaults</Button>
              <Button onClick={handleSaveSettings}>Save Settings</Button>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminSettings;
