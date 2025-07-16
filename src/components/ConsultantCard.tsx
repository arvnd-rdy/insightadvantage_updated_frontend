
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Clock, DollarSign, Star, MessageSquare } from 'lucide-react';
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
  description: string;
}

const ConsultantCard = ({
  id,
  name,
  title,
  avatarUrl,
  location,
  hourlyRate,
  availability,
  expertise,
  description
}: ConsultantCardProps) => {
  const truncatedDescription = description.length > 100
    ? `${description.substring(0, 100)}...`
    : description;

  return (
    <Card className="border-gray-200/80 hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden flex flex-col bg-white">
      <CardHeader className="p-5">
        <Link to={`/organization/consultant/${id}`} className="flex items-center gap-4 group">
          <Avatar className="h-16 w-16 border-3 border-white shadow-md group-hover:scale-105 transition-transform">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-lg">
              {name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{name}</h3>
            <p className="text-sm text-gray-600 leading-tight">{title}</p>
            <div className="flex items-center gap-1.5 mt-2">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-bold text-gray-700">4.9</span>
              <span className="text-xs text-gray-500">(12 reviews)</span>
            </div>
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-5 flex-grow">
        <p className="text-sm text-gray-600 mb-4 text-justify">
          {truncatedDescription}
          {description.length > 100 && (
            <Link to={`/organization/consultant/${id}`} className="text-blue-600 hover:underline ml-1 font-semibold">
              Read more
            </Link>
          )}
        </p>
        <div className="space-y-3 text-sm">
          <div className="flex items-center text-gray-700">
            <MapPin className="h-4 w-4 mr-3 text-gray-400 flex-shrink-0" />
            <span>{location}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <DollarSign className="h-4 w-4 mr-3 text-gray-400 flex-shrink-0" />
            <span className="font-semibold text-gray-800">${hourlyRate}</span>
            <span className="text-gray-500 ml-1">/ hour</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Clock className="h-4 w-4 mr-3 text-gray-400 flex-shrink-0" />
            <span>{availability}</span>
          </div>
        </div>
        <div className="mt-5 pt-4 border-t border-gray-200/80 flex flex-wrap gap-2">
          {expertise.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-800 border border-blue-200/90 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {skill}
            </Badge>
          ))}
          {expertise.length > 3 && (
            <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-gray-200/90 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              +{expertise.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-gray-50/70">
        <div className="w-full flex gap-3">
          <Button variant="outline" className="w-full h-10 rounded-lg text-gray-700 font-semibold hover:bg-gray-200/70 transition-all border-gray-300">
            <MessageSquare className="h-4 w-4 mr-2" />
            Message
          </Button>
          <Link to={`/organization/consultants/${id}`} className="w-full">
            <Button className="w-full h-10 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-sm hover:shadow-md">
              View Profile
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ConsultantCard;
