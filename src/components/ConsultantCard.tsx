
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ConsultantCardProps {
  id: string;
  name: string;
  title: string;
  avatarUrl?: string;
  location: string;
  hourlyRate: string;
  availability: string;
  expertise: string[];
}

const ConsultantCard = ({
  id,
  name,
  title,
  avatarUrl,
  location,
  hourlyRate,
  availability,
  expertise
}: ConsultantCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-12 w-12">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback className="bg-brand-blue text-white">
            {name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-medium">{name}</h3>
          <p className="text-sm text-gray-500">{title}</p>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="grid grid-cols-1 gap-2 text-sm mb-4">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-gray-600">{location}</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-gray-600">{hourlyRate}/hr</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-gray-600">{availability}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {expertise.map((skill, index) => (
            <Badge key={index} variant="secondary">{skill}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Link to={`/organization/consultant/${id}`} className="w-full">
          <Button variant="outline" className="w-full">View Profile</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ConsultantCard;
