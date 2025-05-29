
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import DocumentUploader from '@/components/DocumentUploader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, FileCheck, FileX, FileText, Download } from 'lucide-react';

const ConsultantDocuments = () => {
  // Mock documents data
  const documents = {
    required: [
      { 
        id: "1", 
        name: "Resume/CV", 
        status: "approved", 
        uploadDate: "2023-05-15", 
        reviewDate: "2023-05-17" 
      },
      { 
        id: "2", 
        name: "Professional License", 
        status: "pending", 
        uploadDate: "2023-05-18" 
      },
      { 
        id: "3", 
        name: "Professional Insurance", 
        status: "missing" 
      },
    ],
    additional: [
      { 
        id: "4", 
        name: "Sample Project", 
        status: "approved", 
        uploadDate: "2023-05-10", 
        reviewDate: "2023-05-12" 
      },
      { 
        id: "5", 
        name: "Client Recommendation", 
        status: "approved", 
        uploadDate: "2023-05-11", 
        reviewDate: "2023-05-13" 
      },
    ]
  };

  const handleFileUpload = (file: File) => {
    console.log('File uploaded:', file.name);
  };

  // Helper to render status badges
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending Review</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>;
      case 'missing':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Required</Badge>;
      default:
        return null;
    }
  };

  // Helper to render status icons
  const renderStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <FileCheck className="h-6 w-6 text-green-600" />;
      case 'pending':
        return <File className="h-6 w-6 text-yellow-500" />;
      case 'rejected':
        return <FileX className="h-6 w-6 text-red-600" />;
      case 'missing':
        return <FileText className="h-6 w-6 text-gray-400" />;
      default:
        return <File className="h-6 w-6 text-gray-500" />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar role="consultant" />
        
        <div className="flex-1">
          <DashboardHeader 
            userName="Alex Johnson"
            userRole="consultant"
          />
          
          <main className="p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Document Management</h2>
              <p className="text-gray-600">
                Upload and manage your professional documents securely.
              </p>
            </div>
            
            <Tabs defaultValue="documents" className="space-y-6">
              <TabsList>
                <TabsTrigger value="documents">Uploaded Documents</TabsTrigger>
                <TabsTrigger value="upload">Upload New</TabsTrigger>
              </TabsList>
              
              <TabsContent value="documents">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Required Documents</CardTitle>
                      <CardDescription>
                        These documents are required for your profile verification.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="divide-y">
                        {documents.required.map((doc) => (
                          <div key={doc.id} className="py-4 first:pt-0 last:pb-0">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                {renderStatusIcon(doc.status)}
                                <div className="ml-4">
                                  <p className="font-medium">{doc.name}</p>
                                  {doc.uploadDate && (
                                    <p className="text-sm text-gray-500">
                                      Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                {renderStatusBadge(doc.status)}
                                {doc.status !== 'missing' && (
                                  <Button variant="ghost" size="sm">
                                    <Download className="h-4 w-4 mr-1" />
                                    Download
                                  </Button>
                                )}
                                {doc.status === 'missing' && (
                                  <Button size="sm">Upload</Button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Additional Documents</CardTitle>
                      <CardDescription>
                        Optional documents that may strengthen your profile.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="divide-y">
                        {documents.additional.map((doc) => (
                          <div key={doc.id} className="py-4 first:pt-0 last:pb-0">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                {renderStatusIcon(doc.status)}
                                <div className="ml-4">
                                  <p className="font-medium">{doc.name}</p>
                                  {doc.uploadDate && (
                                    <p className="text-sm text-gray-500">
                                      Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                {renderStatusBadge(doc.status)}
                                <Button variant="ghost" size="sm">
                                  <Download className="h-4 w-4 mr-1" />
                                  Download
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        <div className="py-4">
                          <Button variant="outline" className="w-full">
                            Upload Additional Document
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="upload" className="space-y-6">
                <DocumentUploader 
                  documentType="Resume/CV"
                  acceptedFormats=".pdf,.doc,.docx"
                  maxSizeMB={5}
                  onUploadComplete={handleFileUpload}
                />
                
                <DocumentUploader 
                  documentType="Professional License"
                  acceptedFormats=".pdf,.jpg,.png"
                  maxSizeMB={3}
                  onUploadComplete={handleFileUpload}
                />
                
                <DocumentUploader 
                  documentType="Professional Insurance"
                  acceptedFormats=".pdf"
                  maxSizeMB={10}
                  onUploadComplete={handleFileUpload}
                />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ConsultantDocuments;
