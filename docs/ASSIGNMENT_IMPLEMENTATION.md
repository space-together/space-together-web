# Assignment & Homework System Implementation

## Overview

Complete implementation of the Assignment & Homework System for Space-Together platform, following existing architectural patterns and connected to the backend API.

## Architecture

### Components Structure

```
src/components/assignments/
├── assignment-dialog.tsx          # Create/Edit assignment dialog
├── assignment-form.tsx            # Assignment form with validation
├── assignment-card.tsx            # Assignment display card
├── grade-dialog.tsx               # Grade submission dialog
├── student-submission-form.tsx    # Student submission form
└── submission-table.tsx           # Teacher submissions table
```

### Pages Structure

```
src/app/[lang]/(application)/
├── t/                             # Teacher routes
│   ├── assignments/
│   │   └── [assignmentId]/page.tsx
│   └── classes/[classId]/subjects/[subjectId]/assignments/page.tsx
├── s/                             # Student routes
│   └── assignments/
│       ├── page.tsx
│       └── [assignmentId]/page.tsx
├── s-t/                           # School Staff routes
│   └── assignments/page.tsx
└── a/                             # Admin routes
    └── assignments/page.tsx
```

### Schema Structure

```
src/lib/schema/assignment/
└── assignment-schema.ts
    ├── AssignmentSchema
    ├── AssignmentBaseSchema
    ├── SubmissionSchema
    ├── SubmissionBaseSchema
    └── GradeSubmissionSchema
```

## Features Implemented

### Teacher Features

1. **Assignment List**
   - View all assignments for a class/subject
   - Filter by status (Published, Draft, Archived)
   - See submission counts
   - Create new assignments

2. **Create/Edit Assignment**
   - Title, description, instructions
   - Due date with datetime picker
   - Max score configuration
   - Allow late submission toggle
   - File attachment upload
   - Status management (Draft/Published/Archived)

3. **Assignment Detail Page**
   - Full assignment information
   - Due date countdown
   - Submission statistics
   - List of all student submissions
   - Grade submissions inline

4. **Grade Submission**
   - Score input with validation (≤ max_score)
   - Feedback text
   - Feedback file upload
   - Real-time updates

### Student Features

1. **Assignment List**
   - View all class assignments
   - Separated into "Upcoming" and "Past Due"
   - Submission status badges
   - Grade display (if graded)
   - Deadline highlights

2. **Assignment Detail**
   - View instructions and attachments
   - Submit assignment
   - View submission status
   - View grade and feedback
   - Late submission warnings

3. **Submit Assignment**
   - File upload
   - Comment field
   - Late submission indicator
   - Update submission (before grading)

### School Staff & Admin Features

1. **Read-Only Overview**
   - System-wide assignment statistics
   - Total assignments count
   - Status breakdown (Published/Draft/Archived)
   - Submission rate analytics
   - Assignment cards view

## API Integration

### Endpoints Used

```typescript
// Assignments
GET    /assignments                          // List assignments
GET    /assignments/:id                      // Get assignment details
POST   /assignments                          // Create assignment
PUT    /assignments/:id                      // Update assignment
DELETE /assignments/:id                      // Delete assignment
GET    /assignments/count                    // Count assignments

// Submissions
POST   /assignments/:id/submit               // Submit assignment
GET    /assignments/:id/submissions          // Get all submissions
GET    /submissions/:id                      // Get submission details
PUT    /submissions/:id                      // Update submission
PUT    /assignments/:assignment_id/grade/:submission_id  // Grade submission
```

### Authentication

All requests include:
- `Authorization: Bearer <token>` header
- `X-School-ID: <school_id>` header (via schoolToken)

## Patterns Followed

### 1. Form Pattern
- Uses `useZodFormSubmit` hook
- Zod schema validation
- React Hook Form integration
- CommonFormField components
- Dialog + Form structure

### 2. Data Fetching
- Server-side data fetching in pages
- `apiRequest` utility with auth injection
- SWR for real-time updates
- RealtimeProvider for live data

### 3. UI Components
- shadcn/ui components (Dialog, Card, Badge, etc.)
- MyAvatar for user avatars
- Consistent spacing and styling
- Dark/light mode compatible

### 4. Role-Based Access
- Teacher: Full CRUD on assignments
- Student: View and submit only
- Staff: Read-only overview
- Admin: System-wide view

### 5. Real-time Updates
- RealtimeProvider integration
- Optimistic updates
- Automatic revalidation
- Live submission updates

## File Upload

Uses existing Cloudinary pattern:
- Base64 data URI or URL
- Automatic upload handling
- File preview support
- Attachment downloads

## Validation Rules

### Assignment Creation
- Title required
- Max score > 0
- Valid due date (ISO 8601)
- Teacher must be assigned to subject

### Submission
- Student must be enrolled in class
- Assignment must be published
- Deadline enforcement (unless late allowed)
- One submission per student

### Grading
- Score ≤ max_score
- Only assigned teacher or admin can grade
- Audit log created

## Internationalization

Ready for i18n with keys:
- Assignment
- Submit
- Grade
- Feedback
- Due date
- Late
- Graded
- Max score
- Instructions

## Performance Optimizations

- Server-side rendering
- Lazy loading for charts
- Memoized tables
- Debounced filters
- Dynamic imports for heavy components

## Mobile Responsive

- Mobile-first design
- Responsive grid layouts
- Touch-friendly interactions
- Optimized for small screens

## Error Handling

- Form validation errors
- API error messages
- Toast notifications
- Graceful fallbacks
- Loading states

## Security

- JWT authentication
- Role-based access control
- School context isolation
- Input sanitization
- XSS prevention

## Testing Checklist

### Teacher Flow
- [ ] Create assignment
- [ ] Edit assignment
- [ ] View submissions
- [ ] Grade submission
- [ ] Update grade
- [ ] Delete assignment

### Student Flow
- [ ] View assignments
- [ ] Submit assignment
- [ ] Update submission
- [ ] View grade
- [ ] View feedback
- [ ] Late submission

### Staff/Admin Flow
- [ ] View statistics
- [ ] View all assignments
- [ ] Read-only access

## Future Enhancements

1. Auto-grading support
2. Bulk grading
3. Assignment templates
4. Rubric-based grading
5. Peer review
6. Assignment analytics
7. Export grades
8. Assignment scheduling
9. Recurring assignments
10. Group assignments

## Dependencies

All dependencies already exist in the project:
- React Hook Form
- Zod
- date-fns
- shadcn/ui components
- Existing API client
- Existing auth context

## Notes

- Follows Space-Together naming conventions
- Reuses existing components
- Consistent with student module patterns
- No new UI system introduced
- Native feel to the platform
