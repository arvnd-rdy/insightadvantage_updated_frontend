import React, { useState, useRef } from 'react';
import OrganizationNavBar from '@/components/OrganizationNavBar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Search, MapPin, Star, Heart, Filter, Paperclip, Users, Award, Clock, CheckCircle, MessageCircle, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';

const FindConsultants = () => {
  const { toast } = useToast();
  const [selectedConsultant, setSelectedConsultant] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [rating, setRating] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const fileInputRef = useRef(null);
  const [isAllFiltersOpen, setIsAllFiltersOpen] = useState(false);

  // Extended mock consultant data - 20 consultants
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
    {
      id: "7",
      name: "Michael Rodriguez",
      title: "I will design stunning UI/UX for your mobile applications",
      username: "mikero",
      location: "Los Angeles, CA",
      startingPrice: "95",
      rating: 4.8,
      reviewCount: 156,
      avatar: "",
      expertise: ["UI/UX Design", "Mobile Apps"],
      level: "Level 2",
      isOnline: true,
      responseTime: "2 hours",
      completedOrders: 289,
      gallery: ["/placeholder.svg", "/placeholder.svg"]
    },
    {
      id: "8",
      name: "Jennifer Park",
      title: "I will create comprehensive digital marketing strategies",
      username: "jenpark",
      location: "Denver, CO",
      startingPrice: "110",
      rating: 4.9,
      reviewCount: 198,
      avatar: "",
      expertise: ["Digital Marketing", "Social Media"],
      level: "Top Rated",
      isOnline: false,
      responseTime: "4 hours",
      completedOrders: 567,
      gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
    },
    {
      id: "9",
      name: "Robert Taylor",
      title: "I will develop custom software solutions for your business",
      username: "robtaylor",
      location: "Portland, OR",
      startingPrice: "180",
      rating: 5.0,
      reviewCount: 87,
      avatar: "",
      expertise: ["Software Development", "Custom Solutions"],
      level: "Top Rated",
      isOnline: true,
      responseTime: "1 hour",
      completedOrders: 234,
      gallery: ["/placeholder.svg", "/placeholder.svg"]
    },
    {
      id: "10",
      name: "Amanda Foster",
      title: "I will optimize your e-commerce conversion rates",
      username: "amandaf",
      location: "Miami, FL",
      startingPrice: "75",
      rating: 4.7,
      reviewCount: 245,
      avatar: "",
      expertise: ["E-commerce", "Conversion Optimization"],
      level: "Level 1",
      isOnline: true,
      responseTime: "3 hours",
      completedOrders: 398,
      gallery: ["/placeholder.svg"]
    },
    {
      id: "11",
      name: "Daniel Wright",
      title: "I will provide expert cybersecurity consulting",
      username: "danwright",
      location: "Washington, DC",
      startingPrice: "220",
      rating: 4.9,
      reviewCount: 134,
      avatar: "",
      expertise: ["Cybersecurity", "Risk Assessment"],
      level: "Top Rated",
      isOnline: false,
      responseTime: "6 hours",
      completedOrders: 167,
      gallery: ["/placeholder.svg", "/placeholder.svg"]
    },
    {
      id: "12",
      name: "Laura Martinez",
      title: "I will create engaging content marketing campaigns",
      username: "lauram",
      location: "Phoenix, AZ",
      startingPrice: "85",
      rating: 4.8,
      reviewCount: 167,
      avatar: "",
      expertise: ["Content Marketing", "SEO"],
      level: "Level 2",
      isOnline: true,
      responseTime: "2 hours",
      completedOrders: 445,
      gallery: ["/placeholder.svg", "/placeholder.svg"]
    },
    {
      id: "13",
      name: "Kevin Anderson",
      title: "I will streamline your supply chain operations",
      username: "kevina",
      location: "Atlanta, GA",
      startingPrice: "150",
      rating: 4.6,
      reviewCount: 98,
      avatar: "",
      expertise: ["Supply Chain", "Operations"],
      level: "Level 1",
      isOnline: true,
      responseTime: "4 hours",
      completedOrders: 213,
      gallery: ["/placeholder.svg"]
    },
    {
      id: "14",
      name: "Sophie Collins",
      title: "I will design professional brand identities",
      username: "sophiec",
      location: "San Diego, CA",
      startingPrice: "120",
      rating: 4.9,
      reviewCount: 189,
      avatar: "",
      expertise: ["Brand Design", "Logo Design"],
      level: "Level 2",
      isOnline: false,
      responseTime: "5 hours",
      completedOrders: 356,
      gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
    },
    {
      id: "15",
      name: "James Wilson",
      title: "I will analyze your data and provide actionable insights",
      username: "jameswilson",
      location: "Minneapolis, MN",
      startingPrice: "130",
      rating: 4.7,
      reviewCount: 123,
      avatar: "",
      expertise: ["Data Analysis", "Business Intelligence"],
      level: "Level 1",
      isOnline: true,
      responseTime: "3 hours",
      completedOrders: 278,
      gallery: ["/placeholder.svg", "/placeholder.svg"]
    },
    {
      id: "16",
      name: "Maria Garcia",
      title: "I will manage your social media presence professionally",
      username: "mariag",
      location: "Houston, TX",
      startingPrice: "65",
      rating: 4.8,
      reviewCount: 267,
      avatar: "",
      expertise: ["Social Media", "Content Creation"],
      level: "Level 2",
      isOnline: true,
      responseTime: "1 hour",
      completedOrders: 523,
      gallery: ["/placeholder.svg"]
    },
    {
      id: "17",
      name: "Thomas Lee",
      title: "I will provide comprehensive project management",
      username: "thomasl",
      location: "Philadelphia, PA",
      startingPrice: "145",
      rating: 4.9,
      reviewCount: 145,
      avatar: "",
      expertise: ["Project Management", "Agile"],
      level: "Top Rated",
      isOnline: false,
      responseTime: "4 hours",
      completedOrders: 289,
      gallery: ["/placeholder.svg", "/placeholder.svg"]
    },
    {
      id: "18",
      name: "Emma Thompson",
      title: "I will create compelling copywriting for your brand",
      username: "emmat",
      location: "Nashville, TN",
      startingPrice: "80",
      rating: 4.8,
      reviewCount: 234,
      avatar: "",
      expertise: ["Copywriting", "Brand Messaging"],
      level: "Level 1",
      isOnline: true,
      responseTime: "2 hours",
      completedOrders: 445,
      gallery: ["/placeholder.svg", "/placeholder.svg"]
    },
    {
      id: "19",
      name: "Christopher Davis",
      title: "I will optimize your cloud infrastructure",
      username: "chrisd",
      location: "San Jose, CA",
      startingPrice: "190",
      rating: 4.9,
      reviewCount: 76,
      avatar: "",
      expertise: ["Cloud Computing", "DevOps"],
      level: "Top Rated",
      isOnline: true,
      responseTime: "2 hours",
      completedOrders: 156,
      gallery: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
    },
    {
      id: "20",
      name: "Isabella Rodriguez",
      title: "I will create stunning video content for your business",
      username: "isabellar",
      location: "Las Vegas, NV",
      startingPrice: "100",
      rating: 4.7,
      reviewCount: 178,
      avatar: "",
      expertise: ["Video Production", "Content Creation"],
      level: "Level 2",
      isOnline: false,
      responseTime: "6 hours",
      completedOrders: 234,
      gallery: ["/placeholder.svg", "/placeholder.svg"]
    }
  ]);

  // Dynamically extract unique filter values from consultant data
  const categories = Array.from(new Set(consultants.flatMap(c => c.expertise)));
  const locations = Array.from(new Set(consultants.map(c => c.location)));
  const ratings = [5, 4, 3];
  const budgets = [
    { label: '$0 - $50', value: '0-50' },
    { label: '$50 - $100', value: '50-100' },
    { label: '$100 - $200', value: '100-200' },
    { label: '$200+', value: '200+' },
  ];

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
    <div className="h-[calc(100vh-4rem)] flex flex-col overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Modern Header Section */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          {/* Professional Filter Bar */}
          <form onSubmit={handleSearch} className="flex flex-wrap items-center gap-3 w-full mb-4">
            <div className="relative flex-1 min-w-[200px] max-w-[320px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input 
                type="text"
                placeholder="Search by expertise, location, or name..."
                className="pl-9 h-9 text-base border border-gray-200 focus:border-blue-500 rounded-lg shadow-sm bg-gray-50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2 px-3 py-1 h-7 text-sm">Search</Button>
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-36 h-9 border-gray-200 text-sm bg-gray-50">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-32 h-9 border-gray-200 text-sm bg-gray-50">
                <SelectValue placeholder="Budget" />
              </SelectTrigger>
              <SelectContent>
                {budgets.map(b => (
                  <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={rating} onValueChange={setRating}>
              <SelectTrigger className="w-28 h-9 border-gray-200 text-sm bg-gray-50">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                {ratings.map(r => (
                  <SelectItem key={r} value={String(r)}>{r}+ Stars</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm" onClick={() => {
              setSelectedCategory('');
              setPriceRange('');
              setDeliveryTime('');
              setRating('');
            }} className="border-gray-200 h-9 px-3 text-sm bg-gray-50">
              Clear All
            </Button>

            <Button type="button" variant="default" size="sm" className="h-9 px-4 text-sm ml-auto" onClick={() => setIsAllFiltersOpen(true)}>
              All Filters
            </Button>
          </form>

          {/* All Filters Modal */}
          <Dialog open={isAllFiltersOpen} onOpenChange={setIsAllFiltersOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>All Filters</DialogTitle>
              </DialogHeader>
              {/* Example: show all filter options dynamically */}
              <div className="space-y-4">
                <div>
                  <div className="font-semibold mb-1">Category</div>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                      <Button key={cat} variant={selectedCategory === cat ? 'default' : 'outline'} size="sm" onClick={() => setSelectedCategory(cat)}>{cat}</Button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="font-semibold mb-1">Location</div>
                  <div className="flex flex-wrap gap-2">
                    {locations.map(loc => (
                      <Button key={loc} variant={/* add selection logic if needed */'outline'} size="sm">{loc}</Button>
                    ))}
                  </div>
                </div>
                {/* Add more filter sections as needed, e.g. skills, certifications, etc. */}
              </div>
              <DialogClose asChild>
                <Button variant="default" className="mt-4 w-full">Apply Filters</Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 container mx-auto px-6 py-6">
        {/* Stats Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="h-4 w-4" />
              <span>{consultants.length} consultants available</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <TrendingUp className="h-4 w-4" />
              <span>Avg. response time: 2 hours</span>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Updated 2 minutes ago
          </div>
        </div>

        {/* Consultant Cards */}
        <ScrollArea>
          <div className={cn(
            "gap-6 pb-6",
            viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "space-y-4"
          )}>
            {consultants.map((consultant) => (
              <Link key={consultant.id} to={`/organization/consultant/${consultant.id}`}>
                <Card className="card-modern hover-scale group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="relative">
                    {/* Enhanced Service Image */}
                    <div className="h-48 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-t-2xl relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/10 transition-all duration-300" />
                      <div className="absolute top-4 right-4 flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/90 hover:bg-white shadow-sm">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/90 hover:bg-white shadow-sm">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </div>
                      {consultant.level === "Top Rated" && (
                        <Badge className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium">
                          <Award className="h-3 w-3 mr-1" />
                          {consultant.level}
                        </Badge>
                      )}
                      {consultant.isOnline && (
                        <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          Online Now
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    {/* Consultant Info */}
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={consultant.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-medium">
                          {consultant.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{consultant.name}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-3 w-3 mr-1" />
                          {consultant.location}
                        </div>
                      </div>
                    </div>

                    {/* Service Title */}
                    <h3 className="font-semibold text-sm mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors leading-5">
                      {consultant.title}
                    </h3>

                    {/* Rating & Reviews */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        {renderStars(Math.floor(consultant.rating))}
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{consultant.rating}</span>
                      <span className="text-xs text-gray-500">({consultant.reviewCount} reviews)</span>
                    </div>

                    {/* Expertise Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {consultant.expertise.slice(0, 2).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        <span>{consultant.completedOrders} completed</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{consultant.responseTime} response</span>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="text-xs text-gray-500">
                        Starting at
                      </div>
                      <div className="font-bold text-xl text-gray-900">
                        ${consultant.startingPrice}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

const PageWithNav = () => (
  <>
    <OrganizationNavBar />
    <FindConsultants />
  </>
);

export default PageWithNav;
