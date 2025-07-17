
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/DashboardSidebar';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, Plus, Trash2, Edit, Globe, Settings, User, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import ConsultantLayout from '@/components/ConsultantLayout';

const ConsultantAvailability = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDay, setEditingDay] = useState(null);
  const [newBlockedDate, setNewBlockedDate] = useState({ date: '', reason: '' });
  
  // State for availability settings
  const [availabilitySettings, setAvailabilitySettings] = useState({
    isActive: true,
    timezone: 'America/New_York',
    bufferTime: 15,
    maxBookingsPerDay: 8,
    advanceBookingDays: 30,
    minimumNotice: 2,
  });

  // State for weekly schedule
  const [weeklySchedule, setWeeklySchedule] = useState([
    { day: 'Monday', available: true, start: '09:00', end: '17:00' },
    { day: 'Tuesday', available: true, start: '09:00', end: '17:00' },
    { day: 'Wednesday', available: true, start: '09:00', end: '17:00' },
    { day: 'Thursday', available: true, start: '09:00', end: '17:00' },
    { day: 'Friday', available: true, start: '09:00', end: '17:00' },
    { day: 'Saturday', available: false, start: '09:00', end: '17:00' },
    { day: 'Sunday', available: false, start: '09:00', end: '17:00' },
  ]);

  // State for blocked dates
  const [blockedDates, setBlockedDates] = useState([
    { id: 1, date: '2025-01-20', reason: 'Vacation', type: 'vacation' },
    { id: 2, date: '2025-01-21', reason: 'Vacation', type: 'vacation' },
    { id: 3, date: '2025-01-25', reason: 'Personal appointment', type: 'personal' },
  ]);

  // Mock upcoming bookings
  const upcomingBookings = [
    { id: 1, date: '2025-01-18', time: '10:00 AM', client: 'TechCorp Inc.', type: 'Consultation' },
    { id: 2, date: '2025-01-19', time: '2:00 PM', client: 'StartupXYZ', type: 'Project Review' },
    { id: 3, date: '2025-01-22', time: '11:00 AM', client: 'GlobalTech', type: 'Assessment' },
  ];

  // Calculate current month calendar
  const getCurrentMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    return { days, currentMonth: month, currentYear: year };
  };

  const { days, currentMonth, currentYear } = getCurrentMonth();

  // Helper functions
  const updateWeeklySchedule = (dayIndex, field, value) => {
    const updated = [...weeklySchedule];
    updated[dayIndex][field] = value;
    setWeeklySchedule(updated);
  };

  const addBlockedDate = () => {
    if (newBlockedDate.date && newBlockedDate.reason) {
      setBlockedDates([...blockedDates, {
        id: Date.now(),
        ...newBlockedDate,
        type: 'personal'
      }]);
      setNewBlockedDate({ date: '', reason: '' });
      setIsDialogOpen(false);
      toast({
        title: "Date Blocked",
        description: "The date has been marked as unavailable.",
      });
    }
  };

  const removeBlockedDate = (id) => {
    setBlockedDates(blockedDates.filter(date => date.id !== id));
    toast({
      title: "Date Unblocked",
      description: "The date has been removed from blocked dates.",
    });
  };

  const isDateBlocked = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return blockedDates.some(blocked => blocked.date === dateStr);
  };

  const isDateBooked = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return upcomingBookings.some(booking => booking.date === dateStr);
  };

  const getDayStatus = (date) => {
    if (isDateBlocked(date)) return 'blocked';
    if (isDateBooked(date)) return 'booked';
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const daySchedule = weeklySchedule.find(d => d.day === dayName);
    if (daySchedule && daySchedule.available) return 'available';
    return 'unavailable';
  };

  const handleSaveAvailability = () => {
    toast({
      title: "Availability Updated",
      description: "Your availability has been saved successfully.",
    });
  };

  const toggleAvailabilityStatus = () => {
    setAvailabilitySettings(prev => ({ ...prev, isActive: !prev.isActive }));
    toast({
      title: availabilitySettings.isActive ? "Availability Disabled" : "Availability Enabled",
      description: availabilitySettings.isActive ? "You are now marked as unavailable for new bookings." : "You are now available for new bookings.",
    });
  };

  return (
    <ConsultantLayout>
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
    </ConsultantLayout>
  );
};

export default ConsultantAvailability;
