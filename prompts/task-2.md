
# Parent / Guardian Portal

Before generating any code:

1. Carefully analyze how existing modules are structured:

   * `student-dialog.tsx`
   * `student-form.tsx`
   * `s-t/students/page.tsx`
   * Any other CRUD page under `/s`, `/t`, `/s-t`
2. Reuse existing UI conventions, folder structure, hooks, layout patterns, API client utilities, SWR usage, RBAC logic, and sidebar/navigation system.
3. Reuse shared UI components from `components/common/*` (e.g. use `my-avatar` instead of raw Avatar, reuse table wrappers, dialogs, buttons, badges, skeletons, etc.).
4. Follow same design system (shadcn UI + Tailwind + Radix primitives).
5. Follow how backend is structured (read Parent API endpoints carefully before building frontend integration) #PARENT_PORTAL_IMPLEMENTATION.md .


Now implement a complete Parent Portal frontend module connected to backend endpoints documented in the Parent/Guardian Portal backend implementation.

==================================================
ROUTING STRUCTURE
=================

Parent route prefix must be:

/pr

Just like:

* /s → student
* /t → teacher
* /s-t → school staff
* /a → admin

Create:

/app/[lang]/pr/layout.tsx
/app/[lang]/pr/page.tsx  → Parent Dashboard
/app/[lang]/pr/attendance/[studentId]/page.tsx
/app/[lang]/pr/results/[studentId]/page.tsx
/app/[lang]/pr/finance/[studentId]/page.tsx
/app/[lang]/pr/announcements/page.tsx

Integrate into global sidebar/navigation:

* Add Parent section when role === PARENT
* Show child switcher dropdown if parent has multiple children

==================================================
DASHBOARD (/pr)
===============

Connect to:

GET /api/v1/parents/dashboard

Display:

* Total children (card)
* Latest announcements (list with link)
* Per-child summary cards:

  * my-avatar (student profile)
  * student name
  * class name
  * attendance %
  * GPA
  * outstanding fees
  * quick links: Attendance | Results | Finance

Use:

* SWR for data fetching
* Skeleton loaders
* Error state handling
* Optimistic revalidation

==================================================
ATTENDANCE VIEW
===============

Route:
/pr/attendance/[studentId]

Connect to:
GET /api/v1/parents/{student_id}/attendance

Display:

* Attendance percentage (progress circle)
* Present / Absent / Late / Excused stats
* Recent records table (TanStack Table)
* Read-only UI

Validate:

* Redirect if backend returns 403

==================================================
RESULTS VIEW
============

Route:
/pr/results/[studentId]

Connect to:
GET /api/v1/parents/{student_id}/results

Display:

* GPA card
* Rank badge
* Grade summary
* Subject results table
* Teacher remarks section

Add:

* GPA trend chart (Recharts)
* Print-friendly layout for report

==================================================
FINANCE VIEW
============

Route:
/pr/finance/[studentId]

Connect to:
GET /api/v1/parents/{student_id}/finance

Display:

* Total required
* Amount paid
* Outstanding balance
* Payment history table
* Installments section
* Status badges (Paid / Pending)

==================================================
ANNOUNCEMENTS
=============

Route:
/pr/announcements

Connect to:
GET /api/v1/parents/announcements

Display:

* Paginated list
* Card layout
* Announcement details modal

==================================================
PROFILE PAGE INTEGRATION
========================

If school staff is viewing student profile:

Route:
/p/s/[id]/page.tsx

Enhance it to:

* Show linked parents section
* Display parent avatar (my-avatar)
* Parent name
* Phone
* Relationship
* Quick link to parent detail page

If parent is viewing:

Show linked student list with navigation shortcuts.

==================================================
COMPONENT STRUCTURE
===================

Create reusable components:

/components/parent/
parent-child-card.tsx
parent-attendance-summary.tsx
parent-results-summary.tsx
parent-finance-summary.tsx
parent-announcement-card.tsx

Follow pattern used in student module.

==================================================
DATA LAYER
==========

* Use centralized api client
* Inject JWT automatically
* Inject X-School-ID automatically
* Use SWR for GET
* Use mutation hooks for future extensibility
* Implement proper loading + error handling

==================================================
SECURITY & RBAC
===============

* Protect /pr routes using middleware
* Redirect if role !== PARENT
* Hide sidebar if unauthorized
* Handle 403 gracefully

==================================================
UI RULES
========

* Mobile-first responsive
* Dark/light theme compatible
* Use consistent spacing
* No raw HTML elements if shared component exists
* Use my-avatar instead of generic avatar
* Use existing table wrapper components
* Follow same dialog/modal pattern as student-dialog

==================================================
PERFORMANCE
===========

* Lazy load charts
* Memoize large tables
* Avoid unnecessary rerenders
* Use dynamic imports where needed

==================================================
INTERNATIONALIZATION
====================

Add translations for:

* Attendance
* Results
* Finance
* Announcements
* Children
* Outstanding balance
* GPA
* Rank

Follow existing i18n pattern.

==================================================

The implementation must feel native to Space-Together, not like a separate module.
Follow existing structure strictly.
Do not introduce a new design system.
Reuse patterns and conventions already in the codebase.
