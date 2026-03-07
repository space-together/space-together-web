# Audit Logs UI (STRICT SPACE-TOGETHER STYLE)

Before writing code:

1. Study:

   * `s-t/students/page.tsx`
   * student table implementation
   * dialog patterns
   * components/common/*
2. Reuse:

   * TanStack Table
   * SWR
   * Skeleton loaders
   * Pagination pattern
   * Card + Badge components
3. Do NOT introduce new design system.
4. Keep role-based layout separation.
5. Read carefull #AUDIT_LOG_FRONTEND_GUIDE.md file how backend is build

---

# 📁 ROUTE

Admin:

```
/a/audit-logs/page.tsx
```

School staff:

```
/s-t/audit-logs/page.tsx
```

---

# 1️⃣ AUDIT LOG TABLE

Columns:

* Date
* User (my-avatar + name)
* Role badge
* Action
* Entity Type
* Entity ID
* Severity
* View Details button

Fetch:

GET `/audit-logs`

Use:

* Server pagination
* Filters:

  * Date range
  * Action
  * Entity Type
  * User

---

# 2️⃣ AUDIT DETAIL DIALOG

Create:

```
components/audit/audit-detail-dialog.tsx
```

Show:

* Full metadata (before/after)
* IP address
* User agent
* Timestamp

Format JSON nicely using:

* Collapsible JSON viewer (lightweight)

---

# 3️⃣ FILTER PANEL

Reusable component:

```
audit-filter.tsx
```

Includes:

* Date picker range
* Select entity type
* Select action
* Search user

Debounce inputs.

---

# 4️⃣ BADGE COLOR RULES

INFO → default
WARNING → yellow
CRITICAL → red

---

# 5️⃣ PERMISSION CHECK

Use `usePermission()` hook.

Only render page if:

```
has("audit.view")
OR user.role === "ADMIN"
OR user.role === "SCHOOLSTAFF"
```

Otherwise:
Render AccessDenied component.

---

# 6️⃣ UX REQUIREMENTS

* Show loading skeleton
* Show empty state
* Mobile responsive
* Lazy load heavy metadata
* Paginate efficiently

---

# 🎯 FINAL OUTCOME

After frontend implementation:

* Admin can search audit history
* Filter by date/user/action
* View change history for grades, finance, attendance
* Fully enterprise-grade traceability
* UI matches Space-Together style
* No architecture break
