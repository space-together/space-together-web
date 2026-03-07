# Roles & Permission System

Before generating any code:

1. Carefully read `FRONTEND_ROLE_PERMISSION_GUIDE.md`.
2. Analyze how these are implemented:

   * `s-t/students/page.tsx`
   * `student-form.tsx`
   * `student-dialog.tsx`
   * `components/common/*`
3. Reuse:

   * Existing `api.ts` client
   * SWR pattern
   * TanStack Table
   * shadcn dialog/form pattern
   * Existing badge, button, table, input components
   * Existing toast system
4. Do NOT introduce new UI libraries.
5. Follow current folder structure exactly.
6. Respect role-based route grouping.

Now implement full frontend integration for:

* Role management
* Permission checks
* Feature toggles
* Parent access handling

---

# 📁 ROUTE STRUCTURE (FOLLOW EXISTING PATTERN)

Admin:

```
/a/roles/page.tsx
/a/roles/[roleId]/page.tsx
```

School Staff (read-only):

```
/s-t/roles/page.tsx
```

Parent:

```
/p/children/page.tsx
/p/children/[studentId]/page.tsx
```

Do NOT create random new routes.

---

# 1️⃣ ROLES LIST PAGE

Location:
`app/[lang]/a/roles/page.tsx`

Follow pattern from:
`s-t/students/page.tsx`

Requirements:

* TanStack table
* Server-side pagination
* Filter input
* Count badge
* Skeleton loader
* Empty state
* Delete confirmation dialog

Columns:

* Role Name
* Description
* Role Type (System / Custom)
* Permissions Count
* Active Badge
* Actions (View, Edit, Delete)

Fetch from:
GET `/roles?limit=&skip=&filter=&school_id=`

Use SWR.

---

# 2️⃣ CREATE / EDIT ROLE DIALOG

Create:

```
components/roles/role-form.tsx
components/roles/role-dialog.tsx
```

Follow exactly how:
`student-form.tsx` and `student-dialog.tsx` are built.

Form Fields:

* name
* description
* permissions (multi-select checkbox list)
* is_active

Load permissions from:
GET `/roles/permissions`

Permission UI:

Group by domain:

* Assignment
* Submission
* Attendance
* Finance
* Role
* Feature
* Parent

Show permission name + scope badge (Own / Class / School).

Validation:

* name required
* at least 1 permission

On submit:
POST `/roles`
PUT `/roles/{id}`

Use:

* React Hook Form
* Zod
* Toast notification
* SWR mutate after success

---

# 3️⃣ ROLE DETAIL PAGE

Route:
`/a/roles/[roleId]/page.tsx`

Show:

* Role info card
* Permission list grouped by domain
* Assigned users list
* Assign user dialog

Fetch:
GET `/roles/{id}`

---

# 4️⃣ ASSIGN ROLE TO USER

Create:

`assign-role-dialog.tsx`

Form:

* user search (reuse your user selector pattern)
* role dropdown
* school_id (auto from context)

POST:
`/roles/assign`

After success:

* show toast
* revalidate role detail page

---

# 5️⃣ PERMISSION CHECK HOOK

Create:

```
hooks/use-permission.ts
```

Implementation:

* Fetch permissions once per session:
  GET `/users/{user_id}/permissions?school_id=`
* Cache in context
* Return:

```
has(permission: string): boolean
loading: boolean
```

Admin bypass:
if user.role === "ADMIN" → always true

Usage example:

```
const { has } = usePermission()
if (has("assignment.create")) {
   show button
}
```

Do NOT call API on every render.
Cache properly.

---

# 6️⃣ FEATURE TOGGLE HOOK

Create:

```
hooks/use-feature.ts
```

Fetch:
GET `/schools/{school_id}/features`

Return:

```
isEnabled(featureKey)
loading
```

Usage:

```
const { isEnabled } = useFeature()
if (!isEnabled("assignments.enabled")) {
   show disabled message
}
```

Default:
enabled if not explicitly false.

---

# 7️⃣ PARENT SECTION

Create:

```
/p/children/page.tsx
```

Fetch:
GET `/parents/me`

Display children cards:

Use:

* my-avatar
* student name
* class
* quick actions:

  * View Attendance
  * View Assignments
  * View Results

Route:
`/p/children/[studentId]/page.tsx`

Before rendering:
validate studentId in parent.student_ids

If not:
show Access Denied component.

---

# 8️⃣ ACCESS DENIED COMPONENT

Create reusable:

```
components/common/access-denied.tsx
```

Design:

* Icon
* Title
* Message
* Back button

Use whenever:
403 returned
or permission missing.

---

# 9️⃣ UI RULES

* Use consistent spacing (same as students page)
* Use Badge for:

  * System role
  * Custom role
  * Scope
* Use my-avatar where users displayed
* Use Dialog for forms
* Use existing Card component
* Use existing Table wrapper
* Mobile responsive

---

# 🔟 STATE MANAGEMENT

* Use SWR for GET
* Use mutation for POST/PUT/DELETE
* Optimistic updates only for safe operations
* Revalidate after mutations

---

# 11️⃣ ERROR HANDLING

If response.status === 403:
show toast:
"You don't have permission to perform this action."

If 401:
redirect to login

---

# 12️⃣ RBAC UI RULES

Admin:

* Full access

SchoolStaff:

* View roles only
* No create/edit/delete

Teacher:

* No role management access

Parent:

* Only parent routes

Protect routes using middleware pattern already used in your project.

---

# 🎯 FINAL GOAL

After implementation:

* Admin can manage roles visually
* Permissions dynamically control UI visibility
* Features can be toggled per school
* Parent access is safe and isolated
* Architecture matches student module
* Code looks native to Space-Together
* No new architectural pattern introduced

Do not invent new layout or structure.
Reuse existing patterns exactly.
