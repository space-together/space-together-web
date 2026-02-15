# Assignment & Homework System

Before generating any code:

1. Carefully read the Assignment API Reference documentation.
2. Analyze how existing modules are built:

   * `student-dialog.tsx`
   * `student-form.tsx`
   * `s-t/students/page.tsx`
   * Teacher and student dashboard pages
3. Reuse existing patterns:

   * Centralized `api.ts`
   * SWR hooks
   * Role-based layouts
   * Sidebar structure
   * Table wrapper components
   * `my-avatar` from `components/common/*`
   * Dialog + Form pattern from student module
4. Do NOT introduce a new UI system.
5. Follow Next.js App Router structure and i18n pattern.

Now implement a complete Assignment & Homework frontend module connected strictly to the existing backend API.

==================================================
ROUTING STRUCTURE
=================

Teacher routes:
/t/classes/[classId]/subjects/[subjectId]/assignments/page.tsx
/t/assignments/[assignmentId]/page.tsx

Student routes:
/s/assignments/page.tsx
/s/assignments/[assignmentId]/page.tsx

School staff:
/s-t/assignments/page.tsx (read-only overview)

Admin:
/a/assignments/page.tsx (system-wide view)

==================================================
TEACHER FEATURES
================

1️⃣ Assignment List (Teacher)

Connect to:
GET /assignments

Display:

* Title
* Class
* Subject
* Due date
* Submission count
* Status badge
* Actions (Edit, View, Delete)

Use:

* TanStack Table (server-side pagination)
* Filtering (status, class, subject)
* Skeleton loaders
* SWR

2️⃣ Create Assignment Dialog

Component:
assignment-dialog.tsx
assignment-form.tsx

Connect to:
POST /assignments

Form fields:

* title
* description
* instructions
* due_date (datetime picker)
* max_score
* allow_late_submission (switch)
* attachment upload

Use:

* React Hook Form + Zod
* shadcn Dialog
* File uploader (reuse Cloudinary pattern)
* Validation matching backend rules

3️⃣ Assignment Detail Page (Teacher)

Route:
/t/assignments/[assignmentId]

Connect to:
GET /assignments/:id
GET /assignments/:id/submissions

Display:

* Assignment details card
* Due date countdown
* Total submissions / total students
* Submissions table:

  * my-avatar (student)
  * student name
  * submission status
  * is_late badge
  * score
  * action: Grade

4️⃣ Grade Submission Dialog

Connect to:
PUT /assignments/:assignment_id/grade/:submission_id

Fields:

* score
* feedback
* feedback file upload

Validation:

* score ≤ max_score

After grading:

* Revalidate SWR
* Show toast notification

==================================================
STUDENT FEATURES
================

1️⃣ Student Assignment List

Route:
/s/assignments

Connect to:
GET /assignments?filter=class_id

Display:

* Title
* Subject
* Due date
* Submission status:

  * Not Submitted
  * Submitted
  * Graded
* Grade badge (if graded)

Add:

* Upcoming deadline highlight
* Late indicator

2️⃣ Assignment Detail (Student)

Route:
/s/assignments/[assignmentId]

Connect to:
GET /assignments/:id
GET /submissions/:id (if exists)

Display:

* Instructions
* Attachment download
* Submission form (if not graded)
* View feedback section
* View grade

3️⃣ Submit Assignment Dialog

Connect to:
POST /assignments/:id/submit

Fields:

* File upload
* Comment

Rules:

* Disable if graded
* Show deadline warning
* Show late badge if late

==================================================
SCHOOL STAFF & ADMIN VIEW
=========================

Read-only system overview:

* Total assignments
* Published vs Draft
* Submission analytics
* Late submission rate

Use Recharts:

* Bar chart (submissions per class)
* Pie chart (graded vs ungraded)

==================================================
COMPONENT STRUCTURE
===================

Create:

/components/assignments/
assignment-dialog.tsx
assignment-form.tsx
assignment-card.tsx
submission-table.tsx
grade-dialog.tsx
student-submission-form.tsx

Follow student module naming conventions.

==================================================
DATA LAYER
==========

* Use centralized API client
* Inject JWT automatically
* Inject X-School-ID automatically
* Use SWR for GET
* Use mutation hooks for POST/PUT/DELETE
* Handle 401/403 globally
* Optimistic updates where safe

==================================================
UI RULES
========

* Use my-avatar for students
* Use existing badge components
* Use consistent spacing
* Mobile-first responsive
* Dark/light compatible
* Show loading skeletons
* Show empty states

==================================================
RBAC RULES
==========

* Only teacher can see create/edit
* Only assigned teacher can grade
* Student can only submit own assignment
* Admin can view all
* Staff read-only

Protect routes using middleware.

==================================================
PERFORMANCE
===========

* Lazy load charts
* Memoize large tables
* Debounce filters
* Dynamic import heavy components

==================================================
INTERNATIONALIZATION
====================

Add translations:

* Assignment
* Submit
* Grade
* Feedback
* Due date
* Late
* Graded
* Max score
* Instructions

==================================================

The implementation must feel native to Space-Together.
Reuse patterns.
Follow architecture strictly.
Do not invent a new structure.
