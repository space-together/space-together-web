## Space-Together: Educational Management Platform

This is a comprehensive school management system built with Next.js that helps students study anywhere, facilitates communication and collaboration, and enables teachers and schools to manage classes and students effectively.

## Core Features

### 1. Multi-Role System
The platform supports different user roles with specific capabilities:
- **Admin** - Full system management
- **Teacher** - Lesson management and student oversight
- **Student** - Learning and collaboration
- **School Staff** - Administrative support
- **Parents** - Monitor children's progress

### 2. Admin Dashboard (`/a`)
Complete administrative control with:

- **Database Management**: Real-time database statistics, collection monitoring, and health checks
- **User Management**: Manage all users (students, teachers, parents, staff) with role-based access control
- **School Management**: Multi-school support with individual school profiles, departments, and staff assignments
- **Academic Structure**:
  - Sectors (educational sectors/streams)
  - Trades (vocational programs)
  - Main Classes (class management with capacity and schedules)
  - Template Subjects (curriculum management)

### 3. Subject Management System
Comprehensive subject configuration including:
- Learning outcomes with drag-and-drop reordering
- Nested topic trees with subtopics
- Material uploads (PDFs, videos, links)
- Grading schemas and weight configuration
- Progress tracking milestones
- Contributor management

### 4. Finance & Enrollment
- Fee structure definition and management
- Payment tracking and receipt generation
- Enrollment request approval workflows
- Financial reporting and analytics

### 5. Attendance System
- Daily attendance tracking
- Class-level and school-level comparisons
- Attendance analytics and reporting

### 6. Teacher Portal (`/t`)
- Lesson planning and management
- Student progress monitoring
- Class materials distribution

### 7. Student Portal (`/s`)
- Access to learning materials
- Progress tracking
- Collaboration features

## Technical Architecture

### Frontend Stack
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + DaisyUI
- **UI Components**: Radix UI primitives
- **Forms**: React Hook Form + Zod validation
- **Data Fetching**: SWR for real-time updates
- **Tables**: TanStack Table with server-side pagination
- **Charts**: Recharts for analytics visualization

### Key Features
- **Internationalization**: Supports English and Kinyarwanda (Rwanda)
- **Real-time Updates**: WebSocket/NATS integration for live data
- **Authentication**: JWT-based with role-based access control (RBAC)
- **File Management**: Image optimization with Cloudinary/CDN support
- **Responsive Design**: Mobile-first approach
- **Dark/Light Theme**: User preference support

### Data Collections
The system manages these main entities:
- Users (all roles)
- Schools and departments
- Classes and subjects
- Learning outcomes and topics
- Materials and resources
- Grades and assessments
- Attendance records
- Enrollments and payments
- Academic years and terms
- Activity logs and notifications

## How It Works

1. **Authentication Flow**: Users register with role selection, complete onboarding with profile setup (image, location, bio), then access role-specific dashboards

2. **Admin Workflow**: Admins set up schools → create departments → define subjects → assign teachers → manage classes → monitor system-wide analytics

3. **Academic Management**: Template subjects are created with learning outcomes, topics, and materials, then assigned to specific classes with teachers

4. **Student Learning**: Students enroll in classes → access materials → track progress → submit assignments → receive grades

5. **Real-time Collaboration**: The platform uses real-time data synchronization for live updates across attendance, grades, and communications

6. **Reporting**: Comprehensive reporting system for academic performance, attendance, and financial data with export capabilities

## Deployment
- Runs on port 4747 (dev) and 4748 (production)
- Docker support with docker-compose configuration
- Optimized for Vercel deployment
- Environment-based configuration for different stages

This is a full-featured educational management system designed specifically for Rwandan schools, with localization support and comprehensive tools for managing every aspect of school operations from academics to finance.