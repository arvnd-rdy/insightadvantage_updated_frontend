import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, Mail, Star, StarOff, Download } from 'lucide-react';
import { mockRequests, mockApplicants } from '@/mock-data/jobs';
import { Applicant } from '@/types/applicant';

const initialStatuses = ['New', 'Shortlisted', 'Rejected'] as const;
type Status = typeof initialStatuses[number];

interface ApplicantRow extends Applicant {
  status: Status;
  shortlisted: boolean;
}

const getInitialApplicants = (jobId: string | undefined): ApplicantRow[] => {
  // For demo, all mockApplicants applied to this job
  return mockApplicants.map((a, i) => ({
    ...a,
    status: i % 3 === 0 ? 'Shortlisted' : i % 3 === 1 ? 'Rejected' : 'New',
    shortlisted: i % 3 === 0,
  }));
};

const ApplicantsList = () => {
  const { id } = useParams<{ id: string }>();
  const job = mockRequests.find(j => j.id === id);
  const [applicants, setApplicants] = useState<ApplicantRow[]>(getInitialApplicants(id));
  const [showShortlists, setShowShortlists] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [messageModal, setMessageModal] = useState<{ open: boolean; applicant?: ApplicantRow }>({ open: false });

  if (!job) {
    return (
      <main className="p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <Link to="/organization/manage-requests">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>
        <h1 className="text-2xl font-bold">Job Not Found</h1>
        <p>The job you are looking for does not exist.</p>
      </main>
    );
  }

  const filteredApplicants = showShortlists ? applicants.filter(a => a.shortlisted) : applicants;

  const toggleShortlist = (id: string) => {
    setApplicants(applicants => applicants.map(a => a.id === id ? { ...a, shortlisted: !a.shortlisted, status: !a.shortlisted ? 'Shortlisted' : 'New' } : a));
  };

  const handleSelect = (id: string) => {
    setSelected(sel => sel.includes(id) ? sel.filter(s => s !== id) : [...sel, id]);
  };

  const bulkAction = (action: Status) => {
    setApplicants(applicants => applicants.map(a => selected.includes(a.id) ? { ...a, status: action, shortlisted: action === 'Shortlisted' } : a));
    setSelected([]);
  };

  return (
    <main className="container mx-auto py-10 px-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link to="/organization/manage-requests">
            <Button variant="ghost" size="sm" className="text-gray-700 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Applications for "{job.title}"</h1>
        </div>
        <label className="flex items-center gap-2 text-base text-gray-600 cursor-pointer font-medium">
          <input type="checkbox" checked={showShortlists} onChange={e => setShowShortlists(e.target.checked)} className="form-checkbox h-5 w-5 text-blue-600 rounded-md focus:ring-blue-500" />
          Show only shortlists
        </label>
      </div>
      <Card className="shadow-xl rounded-xl overflow-hidden border border-gray-200">
        <CardHeader className="px-6 py-5 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <CardTitle className="text-2xl font-semibold text-gray-800">Applicants ({filteredApplicants.length})</CardTitle>
          {selected.length > 0 && (
            <div className="flex gap-3">
              <Button size="sm" onClick={() => bulkAction('Shortlisted')} className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md shadow-sm">
                Shortlist Selected
              </Button>
              <Button size="sm" onClick={() => bulkAction('Rejected')} className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md shadow-sm">
                Reject Selected
              </Button>
              <Button size="sm" onClick={() => setMessageModal({ open: true })} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-sm">
                Send Message
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500" checked={selected.length === filteredApplicants.length && filteredApplicants.length > 0} onChange={e => setSelected(e.target.checked ? filteredApplicants.map(a => a.id) : [])} />
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Applied On</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Resume</th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Cover Letter</th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Shortlist</th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Message</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplicants.length === 0 ? (
                  <tr><td colSpan={8} className="px-6 py-5 text-center text-gray-500">No applicants found.</td></tr>
                ) : filteredApplicants.map(applicant => (
                  <tr key={applicant.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500" checked={selected.includes(applicant.id)} onChange={() => handleSelect(applicant.id)} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/organization/consultants/${applicant.id}?jobId=${id}`} className="text-sm font-medium text-blue-600 hover:underline hover:text-blue-700">{applicant.name}</Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{applicant.appliedDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${applicant.status === 'Shortlisted' ? 'bg-green-100 text-green-800' : applicant.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>{applicant.status}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      {applicant.resumeUrl && (
                        <a href={applicant.resumeUrl} download className="text-gray-500 hover:text-gray-700 transition-colors duration-200" title="Download Resume"><Download className="h-5 w-5" /></a>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      {applicant.coverLetterUrl && (
                        <a href={applicant.coverLetterUrl} download className="text-gray-500 hover:text-gray-700 transition-colors duration-200" title="Download Cover Letter"><FileText className="h-5 w-5" /></a>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <button onClick={() => toggleShortlist(applicant.id)} title={applicant.shortlisted ? "Remove from Shortlist" : "Shortlist Applicant"} className="focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 rounded-full">
                        {applicant.shortlisted ? <Star className="h-5 w-5 text-yellow-500" /> : <StarOff className="h-5 w-5 text-gray-400" />}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <Button size="icon" variant="ghost" onClick={() => setMessageModal({ open: true, applicant })} title="Message Applicant" className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                        <Mail className="h-5 w-5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      {/* Messaging Modal (mock) */}
      {messageModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-lg transform transition-all duration-300 ease-out sm:my-8 sm:w-full sm:max-w-lg">
            <h2 className="text-2xl font-bold mb-5 text-gray-800">Message {messageModal.applicant ? messageModal.applicant.name : 'Selected Applicants'}</h2>
            <div className="border border-gray-200 rounded-md p-4 h-36 mb-5 overflow-y-auto text-sm text-gray-600 bg-gray-50 font-mono">
              (Mock) Previous messages for this job will appear here.
            </div>
            <textarea className="w-full border border-gray-300 rounded-md p-3 mb-5 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 resize-y" rows={4} placeholder="Type your message..."></textarea>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setMessageModal({ open: false })} className="text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-gray-800 font-medium">
                Cancel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                Send Message
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ApplicantsList;
