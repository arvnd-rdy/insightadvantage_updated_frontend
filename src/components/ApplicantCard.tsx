
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Download, MessageSquare, Check } from 'lucide-react';
import { Applicant } from '@/types/applicant';

interface ApplicantCardProps {
  applicant: Applicant;
  requestId: string;
}

const ApplicantCard: React.FC<ApplicantCardProps> = ({ applicant, requestId }) => {
  return (
    <div className="border rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
      <div className="flex-grow">
        <Link to={`/organization/consultant/${applicant.id}?requestId=${requestId}`} className="text-lg font-semibold text-blue-600 hover:underline">
          {applicant.name}
        </Link>
        <p className="text-sm text-gray-600">Applied on: {applicant.appliedDate}</p>
      </div>
      <div className="mt-3 md:mt-0 flex flex-wrap gap-2">
        <Button variant="outline" size="sm">
          <Check className="h-4 w-4 mr-2" /> Shortlist
        </Button>
        <Button variant="outline" size="sm">
          <MessageSquare className="h-4 w-4 mr-2" /> Send Message
        </Button>
        <Button variant="outline" size="sm" asChild>
          <a href={applicant.resumeUrl} download>
            <Download className="h-4 w-4 mr-2" /> Resume
          </a>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <a href={applicant.coverLetterUrl} download>
            <Download className="h-4 w-4 mr-2" /> Cover Letter
          </a>
        </Button>
      </div>
    </div>
  );
};

export default ApplicantCard;
