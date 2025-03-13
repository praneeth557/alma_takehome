export type VisaType = 'O-1' | 'EB-1A' | 'EB-2 NIW' | "I don't know";

export type LeadStatus = 'PENDING' | 'REACHED_OUT';

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  linkedinProfile: string;
  visasOfInterest: VisaType[];
  resumeUrl?: string;
  additionalInfo?: string;
  status: LeadStatus;
  submittedAt: string;
  country: string;
}

export interface LeadFormData extends Omit<Lead, 'id' | 'status' | 'submittedAt'> {
  resume: File | null;
}