'use client';

import LeadForm from '@/components/LeadForm';
import { FileIcon } from 'lucide-react';

export default function LeadFormPage() {
  return (
    <main className="min-h-screen bg-[#F4F6E8]">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-12">
          <img 
            src="/logo.svg" 
            alt="Alma" 
            className="h-8 mb-8"
          />
          <h1 className="text-4xl font-bold mb-4">
            Get An Assessment<br />
            Of Your Immigration Case
          </h1>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <FileIcon className="h-8 w-8 text-blue-600" />
            <div>
              <h2 className="font-semibold text-lg">Want to understand your visa options?</h2>
              <p className="text-gray-600">
                Submit the form below and our team of experienced attorneys will review your information 
                and send a preliminary assessment of your case based on your goals.
              </p>
            </div>
          </div>

          <LeadForm />
        </div>
      </div>
    </main>
  );
}