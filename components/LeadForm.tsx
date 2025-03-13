'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { LeadFormData, VisaType } from '@/types';
import { useRouter } from 'next/navigation';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name cannot exceed 50 characters')
    .regex(/^[a-zA-Z\s-]+$/, 'First name can only contain letters, spaces, and hyphens'),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name cannot exceed 50 characters')
    .regex(/^[a-zA-Z\s-]+$/, 'Last name can only contain letters, spaces, and hyphens'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(5, 'Email is too short')
    .max(100, 'Email cannot exceed 100 characters'),
  country: z
    .string()
    .min(2, 'Country name must be at least 2 characters')
    .max(100, 'Country name cannot exceed 100 characters')
    .regex(/^[a-zA-Z\s-]+$/, 'Country name can only contain letters, spaces, and hyphens'),
  linkedinProfile: z
    .string()
    .url('Please enter a valid LinkedIn URL')
    .refine((url) => url.includes('linkedin.com'), {
      message: 'Please enter a valid LinkedIn profile URL',
    }),
  visasOfInterest: z
    .array(z.string())
    .min(1, 'Please select at least one visa type')
    .max(4, 'You cannot select more than 4 visa types'),
  resume: z
    .custom<File>()
    .refine((file) => file instanceof File, 'Please upload your resume')
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      'File size must be less than 5MB'
    )
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      'Only PDF, DOC, and DOCX files are accepted'
    ),
  additionalInfo: z
    .string()
    .max(1000, 'Additional information cannot exceed 1000 characters')
    .optional(),
});

const visaOptions: { label: string; value: VisaType }[] = [
  { label: 'O-1 Visa', value: 'O-1' },
  { label: 'EB-1A Visa', value: 'EB-1A' },
  { label: 'EB-2 NIW', value: 'EB-2 NIW' },
  { label: "I don't know", value: "I don't know" },
];

export default function LeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<LeadFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      country: '',
      linkedinProfile: '',
      visasOfInterest: [],
      additionalInfo: '',
      resume: null,
    },
    mode: 'onBlur', // Validate on blur for better UX
  });

  async function onSubmit(data: LeadFormData) {
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Here we would normally upload the file and submit the form data
      // For now, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      
      // Reset form
      form.reset();
      
      // Redirect to success page after a brief delay
      setTimeout(() => {
        router.push('/thank-you');
      }, 1000);
    } catch (err) {
      setError('An error occurred while submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <h3 className="text-2xl font-semibold mb-4">Thank you for your submission!</h3>
        <p className="text-gray-600">We'll review your information and get back to you soon.</p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-md">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="John" 
                    {...field} 
                    aria-required="true"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Doe" 
                    {...field} 
                    aria-required="true"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input 
                  type="email" 
                  placeholder="john@example.com" 
                  {...field} 
                  aria-required="true"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country of Citizenship *</FormLabel>
              <FormControl>
                <Input 
                  placeholder="United States" 
                  {...field} 
                  aria-required="true"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="linkedinProfile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn Profile *</FormLabel>
              <FormControl>
                <Input 
                  placeholder="https://linkedin.com/in/johndoe" 
                  {...field} 
                  aria-required="true"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="visasOfInterest"
          render={() => (
            <FormItem>
              <FormLabel>Visa categories of interest? *</FormLabel>
              <div className="space-y-2">
                {visaOptions.map((option) => (
                  <FormField
                    key={option.value}
                    control={form.control}
                    name="visasOfInterest"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(option.value)}
                            onCheckedChange={(checked) => {
                              const value = option.value;
                              const currentValues = field.value || [];
                              const newValues = checked
                                ? [...currentValues, value]
                                : currentValues.filter((val) => val !== value);
                              field.onChange(newValues);
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          {option.label}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="resume"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel>Resume/CV *</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      onChange(file);
                    }
                  }}
                  aria-required="true"
                  {...field}
                />
              </FormControl>
              <p className="text-sm text-muted-foreground">
                Accepted formats: PDF, DOC, DOCX (Max 5MB)
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="additionalInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How can we help you?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your current status and what kind of help you need..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <p className="text-sm text-muted-foreground">
                Maximum 1000 characters
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}