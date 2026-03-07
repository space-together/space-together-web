Backup & Restore UI (STRICT SPACE-TOGETHER STYLE)

Before generating code:

1. Study:

   * `s-t/students/page.tsx`
   * student dialog & form pattern
   * components/common/*
2. Use:

   * TanStack Table
   * SWR
   * shadcn Dialog
   * Card, Badge, Button
   * Toast system
3. Do NOT introduce new design system.
4. Follow role-based route grouping.
5. try to connect pages add new page in #app-side-content.tsx 
6. read how backend is build and how it work on that task BACKUP_RESTORE_SYSTEM_IMPLEMENTATION.md

---

# 📁 ROUTES

Admin:

```
/a/backups/page.tsx
/a/recycle-bin/page.tsx
```

School Staff:

```
/s-t/backups/page.tsx (read-only)
```

---

# 1️⃣ BACKUPS PAGE

Location:
`/a/backups/page.tsx`

Table columns:

* Backup Name
* Type (Automated/Manual)
* Size
* Status Badge
* Created At
* Actions:

  * Restore
  * Download (optional)

Fetch:

GET `/backups?limit=&skip=`

Add:

Manual Backup Button

POST `/backups`

Show:

* Loading state
* In-progress badge
* Empty state

---

# 2️⃣ RESTORE CONFIRMATION DIALOG

Component:

```
components/backup/restore-dialog.tsx
```

Show warning:

"This will replace current school data with selected backup. This action cannot be undone."

Require confirmation input:
User must type:
RESTORE

On confirm:
POST `/backups/{id}/restore`

After success:

* Show success toast
* Refresh page

---

# 3️⃣ RECYCLE BIN PAGE

Location:
`/a/recycle-bin/page.tsx`

Columns:

* Entity Type
* Entity ID
* Deleted By (avatar)
* Deleted At
* Restore button

Fetch:
GET `/recycle-bin`

Restore:

POST `/{entity_type}/{id}/restore`

Use dynamic routing logic.

---

# 4️⃣ BADGE RULES

Backup Status:

* COMPLETED → green
* IN_PROGRESS → blue
* FAILED → red

---

# 5️⃣ PERMISSION CHECK

Use `usePermission()` hook.

Only allow:

ADMIN → full
SCHOOLSTAFF → read-only backups
No teacher/student/parent access

If no permission:
Render AccessDenied component.

---

# 6️⃣ UX REQUIREMENTS

* Show loading skeleton
* Disable restore if IN_PROGRESS
* Show confirmation modal
* Paginated table
* Mobile responsive

---

# 🎯 FINAL FRONTEND RESULT

After implementation:

* Admin sees backup history
* Can trigger manual backup
* Can restore safely
* Can recover soft-deleted data
* Fully tenant-isolated
* UI matches Space-Together style
* Enterprise-grade reliability UI
