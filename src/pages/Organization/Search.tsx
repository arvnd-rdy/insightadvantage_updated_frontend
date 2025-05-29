
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Search, MapPin, Star, Heart, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const ConsultantSearch = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [rating, setRating] = useState('');

  // Mock consultant data with more detailed information
  const [consultants] = useState([
    {
      id: "1",
      name: "John Mitchell",
      title: "I will create strategic business plans that drive growth",
      username: "johnmitchell",
      location: "Boston, MA",
      startingPrice: "137",
      rating: 5.0,
      reviewCount: 119,
      avatar: "",
      expertise: ["Strategy", "Business Development"],
      level: "Top Rated",
      isOnline: true,
      responseTime: "1 hour",
      completedOrders: 450,
      gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
    },
    {
      id: "2",
      name: "Lisa Chen",
      title: "I will design modern marketing campaigns for your business",
      username: "lisachen",
      location: "San Francisco, CA",
      startingPrice: "85",
      rating: 4.9,
      reviewCount: 203,
      avatar: "",
      expertise: ["Digital Marketing", "SEO"],
      level: "Level 2",
      isOnline: false,
      responseTime: "2 hours",
      completedOrders: 320,
      gallery: ["/placeholder.svg", "/placeholder.svg"]
    },
    {
      id: "3",
      name: "Marcus Johnson",
      title: "I will provide comprehensive financial analysis and forecasting",
      username: "marcusj",
      location: "New York, NY",
      startingPrice: "200",
      rating: 4.8,
      reviewCount: 89,
      avatar: "",
      expertise: ["Financial Analysis", "Forecasting"],
      level: "Top Rated",
      isOnline: true,
      responseTime: "30 minutes",
      completedOrders: 180,
      gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
    },
    {
      id: "4",
      name: "Sarah Williams",
      title: "I will optimize your HR processes and recruitment strategies",
      username: "sarahw",
      location: "Chicago, IL",
      startingPrice: "120",
      rating: 4.7,
      reviewCount: 156,
      avatar: "",
      expertise: ["HR Consulting", "Recruitment"],
      level: "Level 2",
      isOnline: true,
      responseTime: "1 hour",
      completedOrders: 275,
      gallery: ["/placeholder.svg", "/placeholder.svg"]
    },
    {
      id: "5",
      name: "David Kim",
      title: "I will architect scalable technology solutions for your business",
      username: "davidk",
      location: "Austin, TX",
      startingPrice: "165",
      rating: 5.0,
      reviewCount: 67,
      avatar: "",
      expertise: ["Technology Consulting", "System Architecture"],
      level: "Top Rated",
      isOnline: false,
      responseTime: "3 hours",
      completedOrders: 95,
      gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
    },
    {
      id: "6",
      name: "Rachel Thompson",
      title: "I will streamline your operations with lean methodologies",
      username: "rachelt",
      location: "Seattle, WA",
      startingPrice: "140",
      rating: 4.9,
      reviewCount: 234,
      avatar: "",
      expertise: ["Operations", "Process Improvement"],
      level: "Level 2",
      isOnline: true,
      responseTime: "45 minutes",
      completedOrders: 410,
      gallery: ["/placeholder.svg", "/placeholder.svg"]
    },
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search Results",
      description: `Found ${consultants.length} consultants matching your criteria.`,
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar role="organization" />
        
        <div className="flex-1">
          <DashboardHeader 
            userName="Emma Rodriguez"
            userRole="organization"
          />
          
          <main className="p-6">
            {/* Search Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Find the perfect consultant for your project</h1>
              <p className="text-gray-600">Browse thousands of consultants ready to help you succeed</p>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input 
                    type="text"
                    placeholder="What service are you looking for today?"
                    className="pl-12 h-12"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button type="submit" className="h-12 px-8">Search</Button>
              </form>
            </div>

            {/* Filters Bar */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Filter by:</span>
                </div>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="strategy">Strategy & Planning</SelectItem>
                    <SelectItem value="marketing">Marketing & Growth</SelectItem>
                    <SelectItem value="technology">Technology & IT</SelectItem>
                    <SelectItem value="finance">Finance & Accounting</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-50">$0 - $50</SelectItem>
                    <SelectItem value="50-100">$50 - $100</SelectItem>
                    <SelectItem value="100-200">$100 - $200</SelectItem>
                    <SelectItem value="200+">$200+</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={deliveryTime} onValueChange={setDeliveryTime}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Delivery Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">Express 24H</SelectItem>
                    <SelectItem value="3days">Up to 3 days</SelectItem>
                    <SelectItem value="7days">Up to 7 days</SelectItem>
                    <SelectItem value="anytime">Anytime</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={rating} onValueChange={setRating}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 Stars</SelectItem>
                    <SelectItem value="4+">4+ Stars</SelectItem>
                    <SelectItem value="3+">3+ Stars</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" onClick={() => {
                  setSelectedCategory('');
                  setPriceRange('');
                  setDeliveryTime('');
                  setRating('');
                }}>
                  Clear All
                </Button>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">{consultants.length} services available</p>
            </div>

            {/* Consultant Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {consultants.map((consultant) => (
                <Link key={consultant.id} to={`/organization/consultant/${consultant.id}`}>
                  <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                    <div className="relative">
                      {/* Main Service Image */}
                      <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300" />
                        <div className="absolute top-3 right-3">
                          <Button variant="ghost" size="icon" className="h-8 w-8 bg-white hover:bg-gray-100">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                        {consultant.level === "Top Rated" && (
                          <Badge className="absolute top-3 left-3 bg-orange-500 hover:bg-orange-500">
                            {consultant.level}
                          </Badge>
                        )}
                        {consultant.isOnline && (
                          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            Online
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      {/* Consultant Info */}
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={consultant.avatar} />
                          <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                            {consultant.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{consultant.name}</p>
                          <div className="flex items-center text-xs text-gray-500">
                            <MapPin className="h-3 w-3 mr-1" />
                            {consultant.location}
                          </div>
                        </div>
                      </div>

                      {/* Service Title */}
                      <h3 className="font-medium text-sm mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {consultant.title}
                      </h3>

                      {/* Rating & Reviews */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          {renderStars(Math.floor(consultant.rating))}
                        </div>
                        <span className="text-sm font-medium">{consultant.rating}</span>
                        <span className="text-xs text-gray-500">({consultant.reviewCount})</span>
                      </div>

                      {/* Expertise Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {consultant.expertise.slice(0, 2).map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">{skill}</Badge>
                        ))}
                      </div>

                      {/* Pricing */}
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          Starting at
                        </div>
                        <div className="font-bold text-lg">
                          CA${consultant.startingPrice}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <Button variant="outline" className="px-8">
                Load More Services
              </Button>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ConsultantSearch;
