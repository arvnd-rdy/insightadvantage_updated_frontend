
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import { Filter } from 'lucide-react';

interface SearchFiltersProps {
  onFilterChange: (filters: any) => void;
  className?: string;
}

const SearchFilters = ({ onFilterChange, className = "" }: SearchFiltersProps) => {
  const isMobile = useIsMobile();
  const [expertise, setExpertise] = React.useState<string[]>([]);
  const [location, setLocation] = React.useState("");
  const [rateRange, setRateRange] = React.useState([50, 200]);
  const [availability, setAvailability] = React.useState("");
  
  // Available expertise options
  const expertiseOptions = [
    "Strategy", "Finance", "Marketing", "Operations", 
    "Technology", "Human Resources", "Supply Chain", "Sales"
  ];
  
  // Available expertise badges already selected
  const addExpertise = (value: string) => {
    if (!expertise.includes(value)) {
      setExpertise([...expertise, value]);
    }
  };
  
  const removeExpertise = (value: string) => {
    setExpertise(expertise.filter(e => e !== value));
  };
  
  const handleApplyFilters = () => {
    onFilterChange({
      expertise,
      location,
      rateRange,
      availability
    });
  };
  
  const clearFilters = () => {
    setExpertise([]);
    setLocation("");
    setRateRange([50, 200]);
    setAvailability("");
    
    onFilterChange({
      expertise: [],
      location: "",
      rateRange: [50, 200],
      availability: ""
    });
  };
  
  const FiltersContent = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-base">Expertise</Label>
        <div className="mt-3 flex flex-wrap gap-2">
          {expertiseOptions.map((option) => (
            <Badge 
              key={option}
              variant={expertise.includes(option) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => {
                expertise.includes(option) 
                  ? removeExpertise(option)
                  : addExpertise(option);
              }}
            >
              {option}
            </Badge>
          ))}
        </div>
      </div>
      
      <div>
        <Label htmlFor="location" className="text-base">Location</Label>
        <Input 
          id="location" 
          placeholder="City, State, or Country"
          className="mt-2"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      
      <div>
        <div className="flex justify-between mb-2">
          <Label className="text-base">Hourly Rate Range</Label>
          <span className="text-sm text-gray-500">
            ${rateRange[0]} - ${rateRange[1]}
          </span>
        </div>
        <Slider
          defaultValue={[50, 200]}
          min={10}
          max={500}
          step={5}
          value={rateRange}
          onValueChange={setRateRange}
        />
      </div>
      
      <div>
        <Label htmlFor="availability" className="text-base">Availability</Label>
        <Select 
          value={availability} 
          onValueChange={setAvailability}
        >
          <SelectTrigger id="availability" className="mt-2">
            <SelectValue placeholder="Select availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="full-time">Full Time</SelectItem>
              <SelectItem value="part-time">Part Time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="hourly">Hourly</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
  
  return isMobile ? (
    <div className={`flex justify-end ${className}`}>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Search Filters</SheetTitle>
          </SheetHeader>
          <div className="my-6">
            <FiltersContent />
          </div>
          <SheetFooter className="flex flex-col space-y-2 sm:space-y-0">
            <Button onClick={handleApplyFilters}>Apply Filters</Button>
            <Button variant="outline" onClick={clearFilters}>Clear</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  ) : (
    <div className={`border rounded-lg p-6 ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Filters</h3>
        <Button variant="link" onClick={clearFilters} className="h-auto p-0">
          Clear all
        </Button>
      </div>
      
      <FiltersContent />
      
      <div className="mt-8">
        <Button onClick={handleApplyFilters} className="w-full">
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default SearchFilters;
