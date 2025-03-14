'use client';

import { useState } from 'react';
import { Lead, LeadStatus } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileIcon, SearchIcon } from 'lucide-react';

// Mock data for demonstration
const mockLeads: Lead[] = [
  {
    id: '1',
    firstName: 'Jorge',
    lastName: 'Ruiz',
    email: 'jorge@example.com',
    country: 'Mexico',
    linkedinProfile: 'https://linkedin.com/in/jorge',
    visasOfInterest: ['O-1'],
    status: 'PENDING',
    submittedAt: '2024-02-02T14:45:00Z'
  },
  {
    id: '2',
    firstName: 'Bahar',
    lastName: 'Zamir',
    email: 'bahar@example.com',
    country: 'Mexico',
    linkedinProfile: 'https://linkedin.com/in/bahar',
    visasOfInterest: ['O-1'],
    status: 'PENDING',
    submittedAt: '2024-03-05T10:45:00Z'
  },
  {
    id: '3',
    firstName: 'Mary',
    lastName: 'Lopez',
    email: 'mary@example.com',
    country: 'Brazil',
    linkedinProfile: 'https://linkedin.com/in/mary',
    visasOfInterest: ['O-1'],
    status: 'PENDING',
    submittedAt: '2024-02-02T14:45:00Z'
  },
  {
    id: '4',
    firstName: 'Li',
    lastName: 'Zijin',
    email: 'li@example.com',
    country: 'South Korea',
    linkedinProfile: 'https://linkedin.com/in/li',
    visasOfInterest: ['O-1'],
    status: 'PENDING',
    submittedAt: '2024-02-02T14:45:00Z'
  },
  {
    id: '5',
    firstName: 'Mark',
    lastName: 'Antonov',
    email: 'mark@example.com',
    country: 'Russia',
    linkedinProfile: 'https://linkedin.com/in/mark',
    visasOfInterest: ['O-1'],
    status: 'PENDING',
    submittedAt: '2024-02-02T14:45:00Z'
  },
  {
    id: '6',
    firstName: 'Jane',
    lastName: 'Ma',
    email: 'jane@example.com',
    country: 'Mexico',
    linkedinProfile: 'https://linkedin.com/in/jane',
    visasOfInterest: ['O-1'],
    status: 'PENDING',
    submittedAt: '2024-02-02T14:45:00Z'
  },
  {
    id: '7',
    firstName: 'Anand',
    lastName: 'Jain',
    email: 'anand@example.com',
    country: 'India',
    linkedinProfile: 'https://linkedin.com/in/anand',
    visasOfInterest: ['O-1'],
    status: 'PENDING',
    submittedAt: '2024-02-02T14:45:00Z'
  },
  {
    id: '8',
    firstName: 'Anna',
    lastName: 'Voronova',
    email: 'jorge@example.com',
    country: 'France',
    linkedinProfile: 'https://linkedin.com/in/anna',
    visasOfInterest: ['O-1'],
    status: 'PENDING',
    submittedAt: '2024-02-02T14:45:00Z'
  },
];

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'ALL'>('ALL');

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      `${lead.firstName} ${lead.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.country.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (leadId: string) => {
    setLeads(prevLeads =>
      prevLeads.map(lead =>
        lead.id === leadId
          ? { ...lead, status: lead.status === 'PENDING' ? 'REACHED_OUT' : 'PENDING' }
          : lead
      )
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <FileIcon className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Leads</h1>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={(value: LeadStatus | 'ALL') => setStatusFilter(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Status</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="REACHED_OUT">Reached Out</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-card rounded-lg shadow">
          <div className="grid grid-cols-5 gap-4 p-4 border-b text-sm font-medium text-muted-foreground">
            <div>Name</div>
            <div>Submitted</div>
            <div>Status</div>
            <div>Country</div>
            <div>Actions</div>
          </div>
          
          {filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className="grid grid-cols-5 gap-4 p-4 border-b last:border-0 items-center hover:bg-muted/50"
            >
              <div>
                <div className="font-medium">{`${lead.firstName} ${lead.lastName}`}</div>
                <div className="text-sm text-muted-foreground">{lead.email}</div>
              </div>
              <div className="text-muted-foreground">
                {new Date(lead.submittedAt).toLocaleDateString()}
              </div>
              <div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  lead.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                }`}>
                  {lead.status === 'PENDING' ? 'Pending' : 'Reached Out'}
                </span>
              </div>
              <div className="text-muted-foreground">{lead.country}</div>
              <div>
                <Button
                  variant={lead.status === 'PENDING' ? 'default' : 'secondary'}
                  size="sm"
                  onClick={() => handleStatusChange(lead.id)}
                >
                  {lead.status === 'PENDING' ? 'Mark as Reached Out' : 'Mark as Pending'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}