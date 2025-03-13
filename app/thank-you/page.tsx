import { FileIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ThankYou() {
  return (
    <main className="min-h-screen bg-[#F4F6E8] flex items-center justify-center">
      <div className="max-w-lg mx-auto px-4 py-12 text-center">
        <FileIcon className="h-12 w-12 mx-auto mb-6 text-blue-600" />
        <h1 className="text-2xl font-bold mb-4">Thank You</h1>
        <p className="text-gray-600 mb-8">
          Your information was submitted to our team of immigration attorneys. 
          Expect an email from hello@tryalma.ai.
        </p>
        <Link href="/">
          <Button variant="outline" className="w-full">
            Go Back to Homepage
          </Button>
        </Link>
      </div>
    </main>
  );
}