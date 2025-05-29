
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock } from 'lucide-react';

const ConsultantAvailability = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('calendar');

  // Mock data for consultant availability
  const availabilityData = {
    weeklySchedule: [
      { day: 'Monday', available: true, start: '09:00', end: '17:00' },
      { day: 'Tuesday', available: true, start: '09:00', end: '17:00' },
      { day: 'Wednesday', available: true, start: '09:00', end: '17:00' },
      { day: 'Thursday', available: true, start: '09:00', end: '17:00' },
      { day: 'Friday', available: true, start: '09:00', end: '17:00' },
      { day: 'Saturday', available: false, start: '', end: '' },
      { day: 'Sunday', available: false, start: '', end: '' },
    ],
    blockedDates: [
      { date: '2025-06-15', reason: 'Vacation' },
      { date: '2025-06-16', reason: 'Vacation' },
      { date: '2025-06-17', reason: 'Vacation' },
    ],
  };

  const handleSaveAvailability = () => {
    toast({
      title: "Availability Updated",
      description: "Your availability has been saved successfully.",
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
              <h2 className="text-2xl font-bold mb-2">Availability Management</h2>
              <p className="text-gray-600">
                Set your work hours and manage when you're available for projects.
              </p>
            </div>
            
            <Tabs defaultValue="calendar" className="space-y-6" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="calendar">Calendar View</TabsTrigger>
                <TabsTrigger value="weekly">Weekly Schedule</TabsTrigger>
                <TabsTrigger value="blocked">Blocked Dates</TabsTrigger>
              </TabsList>
              
              <TabsContent value="calendar" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Calendar View</CardTitle>
                    <CardDescription>
                      View and manage your availability in calendar format.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <div className="bg-gray-100 border rounded-md p-8 text-center min-h-[400px] flex flex-col items-center justify-center">
                      <Calendar className="h-12 w-12 text-gray-400 mb-3" />
                      <h3 className="text-lg font-medium">Calendar View</h3>
                      <p className="text-gray-500 max-w-xs mx-auto mt-2">
                        A full calendar component would be displayed here, showing available and booked time slots.
                      </p>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <Button onClick={handleSaveAvailability}>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="weekly" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Schedule</CardTitle>
                    <CardDescription>
                      Set your regular working hours for each day of the week.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {availabilityData.weeklySchedule.map((day) => (
                        <div key={day.day} className="flex items-center justify-between p-4 border rounded-md">
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 text-brand-blue mr-3" />
                            <span className="font-medium w-24">{day.day}</span>
                          </div>
                          
                          <div className="flex items-center">
                            {day.available ? (
                              <>
                                <span className="text-gray-600">{day.start} - {day.end}</span>
                                <span className="ml-4 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-md">
                                  Available
                                </span>
                              </>
                            ) : (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                                Unavailable
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <Button onClick={handleSaveAvailability}>Save Schedule</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="blocked" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Blocked Dates</CardTitle>
                    <CardDescription>
                      Mark dates when you're not available for work.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {availabilityData.blockedDates.length > 0 ? (
                        availabilityData.blockedDates.map((blockedDate, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border rounded-md">
                            <div className="flex items-center">
                              <Calendar className="h-5 w-5 text-brand-blue mr-3" />
                              <span>{blockedDate.date}</span>
                            </div>
                            
                            <div className="flex items-center">
                              <span className="text-gray-600 mr-4">{blockedDate.reason}</span>
                              <Button variant="outline" size="sm">Remove</Button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          No blocked dates. Click "Add Blocked Date" to add one.
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-6 flex justify-between">
                      <Button variant="outline">Add Blocked Date</Button>
                      <Button onClick={handleSaveAvailability}>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ConsultantAvailability;
