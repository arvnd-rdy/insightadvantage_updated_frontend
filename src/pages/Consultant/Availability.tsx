import React, { useState } from 'react';
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
import { Calendar, Clock, Plus, Trash2, Edit, Globe, Settings, User, CheckCircle, XCircle, AlertCircle, MapPin, Phone, Mail } from 'lucide-react';
import ConsultantLayout from '@/components/ConsultantLayout';

const ConsultantAvailability = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDay, setEditingDay] = useState(null);
  const [newBlockedDate, setNewBlockedDate] = useState({ date: '', reason: '' });
  const [currentDate, setCurrentDate] = useState(new Date());
  
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
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
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

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

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

  const handleDayClick = (date) => {
    // Don't allow clicking on past dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) {
      toast({
        title: "Cannot modify past dates",
        description: "You cannot block or unblock past dates.",
        variant: "destructive",
      });
      return;
    }

    // Don't allow clicking on booked dates
    if (isDateBooked(date)) {
      toast({
        title: "Cannot modify booked dates",
        description: "This date has existing bookings and cannot be blocked.",
        variant: "destructive",
      });
      return;
    }

    const dateStr = date.toISOString().split('T')[0];
    const status = getDayStatus(date);
    
    if (status === 'blocked') {
      // Remove from blocked dates
      setBlockedDates(blockedDates.filter(blocked => blocked.date !== dateStr));
      toast({
        title: "Date Unblocked",
        description: `${date.toLocaleDateString()} is now available for bookings.`,
      });
    } else if (status === 'available') {
      // Add to blocked dates
      setBlockedDates([...blockedDates, {
        id: Date.now(),
        date: dateStr,
        reason: 'Blocked via calendar',
        type: 'personal'
      }]);
      toast({
        title: "Date Blocked",
        description: `${date.toLocaleDateString()} has been blocked for bookings.`,
      });
    }
  };

  return (
    <ConsultantLayout>
      <main className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Availability Management</h2>
            <p className="text-gray-600 mt-1">
              Manage your schedule, set working hours, and control when you're available for consultations.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Switch
              checked={availabilitySettings.isActive}
              onCheckedChange={toggleAvailabilityStatus}
            />
            <div className="text-right">
              <p className="text-sm font-medium">
                {availabilitySettings.isActive ? 'Available' : 'Unavailable'}
              </p>
              <p className="text-xs text-gray-500">
                {availabilitySettings.isActive ? 'Accepting bookings' : 'Not accepting bookings'}
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="schedule">Weekly Schedule</TabsTrigger>
            <TabsTrigger value="blocked">Blocked Dates</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Availability Status Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Availability Status</CardTitle>
                  {availabilitySettings.isActive ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {availabilitySettings.isActive ? 'Active' : 'Inactive'}
                  </div>
                  <p className="text-xs text-gray-600">
                    {availabilitySettings.isActive ? 'Open for new bookings' : 'Not accepting bookings'}
                  </p>
                </CardContent>
              </Card>

              {/* This Week's Bookings */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">This Week's Bookings</CardTitle>
                  <Calendar className="h-5 w-5 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{upcomingBookings.length}</div>
                  <p className="text-xs text-gray-600">
                    {upcomingBookings.length > 0 ? 'Active consultations' : 'No bookings this week'}
                  </p>
                </CardContent>
              </Card>

              {/* Working Hours */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Working Hours</CardTitle>
                  <Clock className="h-5 w-5 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {weeklySchedule.filter(d => d.available).length} days
                  </div>
                  <p className="text-xs text-gray-600">
                    Available workdays per week
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Bookings</CardTitle>
                <CardDescription>Your scheduled consultations for the next few days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingBookings.length > 0 ? (
                    upcomingBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <Calendar className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{booking.client}</p>
                            <p className="text-sm text-gray-600">{booking.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{booking.date}</p>
                          <p className="text-sm text-gray-600">{booking.time}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No upcoming bookings. Your calendar is clear!
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common availability management tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" onClick={() => setActiveTab('blocked')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Block a Date
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab('schedule')}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Schedule
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab('settings')}>
                    <Settings className="h-4 w-4 mr-2" />
                    Availability Settings
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab('calendar')}>
                    <Calendar className="h-4 w-4 mr-2" />
                    View Calendar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Calendar View</CardTitle>
                <CardDescription>
                  Visual overview of your availability and bookings
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Calendar Grid */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">
                      {new Date(currentYear, currentMonth).toLocaleDateString('en-US', { 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </h3>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={goToPreviousMonth}>Previous</Button>
                      <Button variant="outline" size="sm" onClick={goToToday}>Today</Button>
                      <Button variant="outline" size="sm" onClick={goToNextMonth}>Next</Button>
                    </div>
                  </div>

                  {/* Calendar Header */}
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="p-2 text-sm font-medium text-gray-500">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-1">
                    {days.map((date, index) => {
                      const status = getDayStatus(date);
                      const isCurrentMonth = date.getMonth() === currentMonth;
                      const isToday = date.toDateString() === new Date().toDateString();

                      return (
                        <div
                          key={index}
                          className={`
                            aspect-square p-1 border rounded-lg flex flex-col items-center justify-center text-sm
                            ${!isCurrentMonth ? 'bg-gray-50 text-gray-400' : ''}
                            ${isToday ? 'ring-2 ring-blue-500' : ''}
                            ${status === 'available' ? 'bg-green-50 border-green-200' : ''}
                            ${status === 'booked' ? 'bg-blue-50 border-blue-200' : ''}
                            ${status === 'blocked' ? 'bg-red-50 border-red-200' : ''}
                            ${status === 'unavailable' ? 'bg-gray-50 border-gray-200' : ''}
                            hover:bg-gray-100 cursor-pointer transition-colors
                          `}
                          onClick={() => handleDayClick(date)}
                        >
                          <span className={`${isToday ? 'font-bold' : ''}`}>
                            {date.getDate()}
                          </span>
                          {status === 'booked' && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                          )}
                          {status === 'blocked' && (
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-1"></div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Legend */}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-green-50 border border-green-200 rounded"></div>
                      <span>Available</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded"></div>
                      <span>Booked</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-red-50 border border-red-200 rounded"></div>
                      <span>Blocked</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gray-50 border border-gray-200 rounded"></div>
                      <span>Unavailable</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Weekly Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Schedule</CardTitle>
                <CardDescription>
                  Set your regular working hours for each day of the week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklySchedule.map((day, index) => (
                    <div key={day.day} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Switch
                          checked={day.available}
                          onCheckedChange={(checked) => updateWeeklySchedule(index, 'available', checked)}
                        />
                        <div className="w-20">
                          <span className="font-medium">{day.day}</span>
                        </div>
                      </div>

                      {day.available ? (
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Input
                              type="time"
                              value={day.start}
                              onChange={(e) => updateWeeklySchedule(index, 'start', e.target.value)}
                              className="w-32"
                            />
                            <span className="text-gray-500">to</span>
                            <Input
                              type="time"
                              value={day.end}
                              onChange={(e) => updateWeeklySchedule(index, 'end', e.target.value)}
                              className="w-32"
                            />
                          </div>
                          <Badge className="bg-green-100 text-green-800">
                            Available
                          </Badge>
                        </div>
                      ) : (
                        <Badge variant="secondary">
                          Unavailable
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-end">
                  <Button onClick={handleSaveAvailability}>
                    Save Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Blocked Dates Tab */}
          <TabsContent value="blocked" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Blocked Dates</CardTitle>
                <CardDescription>
                  Mark specific dates when you're not available for consultations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {blockedDates.length > 0 ? (
                    blockedDates.map((blockedDate) => (
                      <div key={blockedDate.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-5 w-5 text-red-500" />
                          <div>
                            <p className="font-medium">{blockedDate.date}</p>
                            <p className="text-sm text-gray-600">{blockedDate.reason}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={blockedDate.type === 'vacation' ? 'default' : 'secondary'}>
                            {blockedDate.type}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeBlockedDate(blockedDate.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
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
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Blocked Date
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Block a Date</DialogTitle>
                        <DialogDescription>
                          Mark a date as unavailable for new bookings
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="date">Date</Label>
                          <Input
                            id="date"
                            type="date"
                            value={newBlockedDate.date}
                            onChange={(e) => setNewBlockedDate(prev => ({ ...prev, date: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reason">Reason</Label>
                          <Textarea
                            id="reason"
                            placeholder="e.g., Vacation, Personal appointment, Conference"
                            value={newBlockedDate.reason}
                            onChange={(e) => setNewBlockedDate(prev => ({ ...prev, reason: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={addBlockedDate}>
                          Block Date
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button onClick={handleSaveAvailability}>
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Availability Settings</CardTitle>
                <CardDescription>
                  Configure your availability preferences and booking rules
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* General Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">General Settings</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Time Zone</Label>
                      <Select
                        value={availabilitySettings.timezone}
                        onValueChange={(value) => setAvailabilitySettings(prev => ({ ...prev, timezone: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                          <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                          <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                          <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                          <SelectItem value="UTC">UTC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="buffer">Buffer Time (minutes)</Label>
                      <Select
                        value={availabilitySettings.bufferTime.toString()}
                        onValueChange={(value) => setAvailabilitySettings(prev => ({ ...prev, bufferTime: parseInt(value) }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">No buffer</SelectItem>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="45">45 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Booking Limits */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Booking Limits</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="maxBookings">Max Bookings Per Day</Label>
                      <Select
                        value={availabilitySettings.maxBookingsPerDay.toString()}
                        onValueChange={(value) => setAvailabilitySettings(prev => ({ ...prev, maxBookingsPerDay: parseInt(value) }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 booking</SelectItem>
                          <SelectItem value="2">2 bookings</SelectItem>
                          <SelectItem value="4">4 bookings</SelectItem>
                          <SelectItem value="6">6 bookings</SelectItem>
                          <SelectItem value="8">8 bookings</SelectItem>
                          <SelectItem value="12">12 bookings</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="advanceBooking">Advance Booking (days)</Label>
                      <Select
                        value={availabilitySettings.advanceBookingDays.toString()}
                        onValueChange={(value) => setAvailabilitySettings(prev => ({ ...prev, advanceBookingDays: parseInt(value) }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">1 week</SelectItem>
                          <SelectItem value="14">2 weeks</SelectItem>
                          <SelectItem value="30">1 month</SelectItem>
                          <SelectItem value="60">2 months</SelectItem>
                          <SelectItem value="90">3 months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Minimum Notice */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Minimum Notice</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="minimumNotice">Minimum Notice Required (hours)</Label>
                    <Select
                      value={availabilitySettings.minimumNotice.toString()}
                      onValueChange={(value) => setAvailabilitySettings(prev => ({ ...prev, minimumNotice: parseInt(value) }))}
                    >
                      <SelectTrigger className="md:w-1/2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">No minimum</SelectItem>
                        <SelectItem value="1">1 hour</SelectItem>
                        <SelectItem value="2">2 hours</SelectItem>
                        <SelectItem value="4">4 hours</SelectItem>
                        <SelectItem value="8">8 hours</SelectItem>
                        <SelectItem value="24">24 hours</SelectItem>
                        <SelectItem value="48">48 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveAvailability}>
                    Save Settings
                  </Button>
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
