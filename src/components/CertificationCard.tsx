import React, { useState } from 'react';

export interface CertificationCardProps {
  name: string;
  body: string;
  issueMonth: string;
  issueYear: string;
  expirationMonth?: string;
  expirationYear?: string;
  credentialId?: string;
  url?: string;
  description?: string;
  fileUrl?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const CertificationCard: React.FC<CertificationCardProps> = ({
  name,
  body,
  issueMonth,
  issueYear,
  expirationMonth,
  expirationYear,
  credentialId,
  url,
  description,
  fileUrl,
  onEdit,
  onDelete,
}) => {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const toggleDesc = () => setShowFullDesc((v) => !v);
  const descLimit = 120;

  return (
    <div className="flex w-full bg-white rounded-xl shadow-md p-6 mb-4 items-start border border-gray-100 hover:shadow-lg transition-shadow">
      {/* Logo/Avatar */}
      <div className="w-16 h-16 flex-shrink-0 mr-6">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-2xl">
          <span className="material-icons">verified</span>
        </div>
      </div>
      {/* Main Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold truncate">{name}</h3>
          <div className="flex gap-2">
            {onEdit && (
              <button
                onClick={e => { e.stopPropagation(); onEdit(); }}
                className="p-1 rounded-full hover:bg-blue-50 text-gray-400 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
                title="Edit"
                aria-label="Edit certification"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.828l-4.243 1.415 1.415-4.243a4 4 0 01.828-1.414z" /></svg>
              </button>
            )}
            {onDelete && (
              <button
                onClick={e => { e.stopPropagation(); onDelete(); }}
                className="p-1 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
                title="Delete"
                aria-label="Delete certification"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            )}
          </div>
        </div>
        <div className="text-gray-600 font-medium mt-1 truncate">{body}</div>
        <div className="text-sm text-gray-500 mt-1">
          Issued: {issueMonth} {issueYear}
          {expirationMonth && expirationYear && (
            <> | Expires: {expirationMonth} {expirationYear}</>
          )}
        </div>
        {credentialId && (
          <div className="text-sm text-gray-500 truncate">Credential ID: {credentialId}</div>
        )}
        {url && (
          <div className="text-sm text-blue-600 underline truncate">
            <a href={url} target="_blank" rel="noopener noreferrer">View Credential</a>
          </div>
        )}
        {description && (
          <div className="mt-2 text-gray-700">
            {showFullDesc || description.length <= descLimit
              ? description
              : description.slice(0, descLimit) + '...'}
            {description.length > descLimit && (
              <button className="ml-2 text-blue-500 text-xs underline" onClick={toggleDesc} type="button">
                {showFullDesc ? 'See less' : 'See more'}
              </button>
            )}
          </div>
        )}
        {fileUrl && (
          <div className="mt-2">
            <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 underline">
              Download/View Certificate
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificationCard; 