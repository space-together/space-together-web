# Academic Records & Assessment System - Design Document

Design and implement a complete Academic Records & Assessment frontend module for Space-Together using Next.js 16 (App Router), TypeScript, Tailwind CSS, DaisyUI, Radix UI, React Hook Form + Zod, SWR for data fetching, TanStack Table for server-side tables, and Recharts for analytics, strictly integrating with the already implemented backend APIs (Rust + Actix-web + MongoDB multi-tenant system).

Follow existing frontend architecture patterns, folder structure, RBAC logic, layout segmentation (/a, /t, /s, /p), i18n (English + Kinyarwanda), and JWT authentication flow.

The implementation must include:

1. Admin Academic Management Interface (`/a/academics`)

* Exam management UI (CRUD with modal forms)
* Assessment category configuration per subject with weight validation (must not exceed 100%)
* Grading scale configuration (Letter, Percentage, Competency-based)
* Academic year grading strategy selection
* Publish/Archive exam workflow with confirmation dialog
* Promotion workflow dashboard (preview eligible students before confirmation)
* All forms must use React Hook Form + Zod validation
* Tables must use TanStack Table with server-side pagination, filtering, sorting

2. Teacher Assessment Interface (`/t/classes/[classId]/subjects/[subjectId]/assessments`)

* Score entry grid (editable table with inline validation)
* Bulk score input with optimistic UI updates
* Prevent editing if exam is archived
* Real-time updates via WebSocket/NATS
* Show calculated averages per student row
* Trigger recalculation after submission
* Role guard enforcement (only assigned teacher can access)

3. Student Results Portal (`/s/results`)

* Term performance overview cards (GPA, Rank, Attendance %)
* Subject-level breakdown with grade badges
* Progress comparison chart (Recharts line chart across terms)
* Downloadable report preview (structured layout matching backend response)
* Transcript viewer (cumulative yearly performance)

4. Parent Portal (`/p/child/[studentId]/performance`)

* Read-only version of student results
* Attendance summary
* GPA trend visualization
* Teacher remarks section
* Notification integration when new results are published

5. Analytics Dashboard Widgets (Admin + Director View)

* Class ranking distribution chart
* Pass/fail pie chart per subject
* GPA histogram
* Top 10 students table
* At-risk students alert list (below GPA threshold)
* All charts must use Recharts
* Each widget must fetch via SWR with revalidation strategy

6. State & Data Handling

* Use SWR for all GET requests
* Use mutation pattern for POST/PUT/DELETE
* Implement centralized API client with JWT header injection
* Handle X-School-ID header automatically
* Implement global error boundary and toast notifications
* Support loading skeletons and optimistic updates

7. UI/UX Standards

* Mobile-first responsive design
* Accessible modals and forms (Radix primitives)
* Dark/Light theme compatibility
* Consistent spacing and typography
* Confirmation dialogs for destructive actions
* Audit log indicator badge when grade edited

8. Performance Optimization

* Lazy load heavy analytics components
* Memoize tables
* Debounce search inputs
* Use dynamic imports for charts
* Avoid unnecessary re-renders

9. File & Report Handling

* Render backend-generated report JSON into printable layout
* Add “Export as PDF” button (frontend-only print for now)
* Use clean academic transcript layout

10. Folder Structure Convention

/app
/a/academics
/t/classes/[id]/subjects/[id]/assessments
/s/results
/p/child/[id]/performance
/components
/academics
/grades
/reports
/analytics
/lib
api.ts
auth.ts
hooks/
/schemas
grading.schema.ts
exam.schema.ts

All components must be modular and reusable.

11. Security & RBAC

* Protect routes using middleware
* Redirect unauthorized roles
* Hide UI elements based on permissions
* Disable editing if user lacks permission

12. Internationalization

* Add translations for:

  * GPA
  * Rank
  * Promotion
  * Exam
  * Assessment
  * Transcript
  * Pass / Fail
* Use existing i18n setup

The implementation must feel production-ready, scalable, cleanly typed, and consistent with existing Space-Together design system.
