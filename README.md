# Alma Immigration Case Assessment Platform

A Next.js application for managing immigration case assessments, featuring a public lead submission form and an admin dashboard for lead management.

## Features

### Public Features
- Lead submission form with comprehensive validation
- File upload support for resumes/CVs
- Multi-step form with progress tracking
- Immediate feedback on submission
- Support for multiple visa types

### Admin Features
- Secure authentication system
- Lead management dashboard
- Status tracking for each lead
- Search and filter capabilities
- Role-based access control

## Tech Stack

- **Framework**: Next.js 13 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Form Management**: React Hook Form
- **Validation**: Zod
- **Authentication**: Cookie-based with middleware protection
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd alma-immigration
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Usage

### Authentication

The application includes two types of users:

1. **Admin User**
   - Email: admin@tryalma.ai
   - Password: admin123
   - Access to: Admin dashboard and lead management

2. **Regular User**
   - Email: user@tryalma.ai
   - Password: user123
   - Access to: Lead submission form

### Routes

- `/` - Login page
- `/admin` - Admin dashboard (protected)
- `/lead-form` - Lead submission form (protected)
- `/thank-you` - Submission confirmation page

### Lead Form Fields

The lead submission form includes:
- First Name (required)
- Last Name (required)
- Email (required)
- Country of Citizenship (required)
- LinkedIn Profile (required)
- Visa Categories of Interest (required)
  - O-1 Visa
  - EB-1A Visa
  - EB-2 NIW
  - "I don't know" option
- Resume/CV Upload (required)
  - Supports PDF, DOC, DOCX formats
  - Max file size: 5MB
- Additional Information (optional)

### Admin Dashboard Features

- View all submitted leads
- Search leads by name, email, or country
- Filter leads by status
- Update lead status (Pending → Reached Out)
- Sort leads by various fields
- Responsive table layout

## Security Features

- Protected routes with middleware
- Role-based access control
- Form validation
- File upload restrictions
- Secure cookie handling
- XSS protection through React
- CSRF protection

## Development

### Project Structure

```
├── app/
│   ├── admin/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── lead-form/
│   │   └── page.tsx
│   ├── thank-you/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── AdminNav.tsx
│   ├── LeadForm.tsx
│   └── ui/
├── lib/
│   ├── auth.ts
│   └── utils.ts
├── public/
│   └── logo.svg
└── types/
    └── index.ts
```

### Key Components

- `AdminNav`: Navigation component for admin dashboard
- `LeadForm`: Main form component for lead submission
- `auth.ts`: Authentication utilities and mock user data
- `types/index.ts`: TypeScript type definitions

## Building for Production

1. Create a production build:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Best Practices

- TypeScript for type safety
- Component-based architecture
- Responsive design
- Progressive enhancement
- Accessibility compliance
- Error handling
- Loading states
- Form validation
- Secure authentication

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
