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

## Building for Production

1. Create a production build:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```
