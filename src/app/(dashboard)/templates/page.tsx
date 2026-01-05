'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, FileText, CheckCircle, Smartphone, AlertCircle, XCircle } from "lucide-react";
import { dummyTemplates } from "@/data/dummyWabaData";
import CreateTemplateModal from "@/components/Templates/CreateTemplateModal";

export default function Templates() {
  const [searchTerm, setSearchTerm] = useState("");
  const [templates, setTemplates] = useState(dummyTemplates);

  const filteredTemplates = templates.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'APPROVED': return 'text-green-600 bg-green-100';
          case 'PENDING': return 'text-yellow-600 bg-yellow-100';
          case 'REJECTED': return 'text-red-600 bg-red-100';
          default: return 'text-gray-600 bg-gray-100';
      }
  };

  const getStatusIcon = (status: string) => {
      switch(status) {
          case 'APPROVED': return <CheckCircle className="h-3 w-3 mr-1" />;
          case 'PENDING': return <AlertCircle className="h-3 w-3 mr-1" />;
          case 'REJECTED': return <XCircle className="h-3 w-3 mr-1" />;
          default: return null;
      }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Message Templates</h1>
          <p className="text-slate-500 mt-2">Manage your WhatsApp message templates.</p>
        </div>
        <CreateTemplateModal />
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input 
                placeholder="Search templates..." 
                className="pl-9" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
               <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <FileText className="h-5 w-5" />
               </div>
               <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase ${getStatusColor(template.status)}`}>
                    {getStatusIcon(template.status)}
                    {template.status}
                </span>
            </CardHeader>
            <CardContent className="pt-4">
              <CardTitle className="text-lg font-semibold truncate">{template.name}</CardTitle>
              <div className="flex items-center text-xs text-slate-500 mt-1 space-x-2">
                <span>{template.language}</span>
                <span>•</span>
                <span>{template.category}</span>
              </div>
            </CardContent>
            <CardFooter>
                 <Button variant="outline" className="w-full text-xs">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
