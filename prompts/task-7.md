# LMS Layer UI

Before writing code:

1. Study:

   * `s-t/students/page.tsx`
   * student dialog pattern
   * student form
   * components/common/*
2. Use:

   * SWR
   * TanStack Table
   * shadcn Dialog
   * Existing Card, Badge, Button
3. Follow role-based route grouping.
4. Do NOT invent new layout system.

---

# 📁 ROUTES

Teacher:

```
/t/classes/[classId]/subjects/[subjectId]/materials/page.tsx
```

Student:

```
/s/subjects/[subjectId]/materials/page.tsx
```

Parent:

```
/p/subjects/[subjectId]/materials/page.tsx
```

---

# 1️⃣ MATERIAL LIST PAGE

Display:

* Tabs:

  * Lesson Notes
  * Resources
  * Videos
  * Files

Table or card view:

* Title
* Description
* Type badge
* Uploaded by (avatar)
* Created date
* Actions (Edit/Delete for teacher)

Fetch:

GET `/learning-materials?subject_id=`

---

# 2️⃣ UPLOAD DIALOG

Create:

```
components/materials/material-form.tsx
components/materials/material-dialog.tsx
```

Follow student-form pattern exactly.

Fields:

* Title
* Description
* Type select
* File upload (if file type)
* Video URL (if video type)
* Publish toggle

Use:

* React Hook Form
* Zod validation
* Cloudinary direct upload OR backend upload endpoint

After submit:

* SWR mutate
* Show toast

---

# 3️⃣ MATERIAL CARD

Create:

```
material-card.tsx
```

For student view:

* Show download button
* Show video embed if YouTube/Vimeo
* Show file icon based on type
* Show published badge

---

# 4️⃣ PERMISSION CHECK

Use:

`usePermission()`

Teacher:

* show Create button only if has learning_material.create.class

Student:

* read-only

Parent:

* read-only

If no permission:
Render AccessDenied component.

---

# 5️⃣ FILE DOWNLOAD

Use:

* Direct Cloudinary secure URL
* Or proxy endpoint

Open in new tab.

---

# 6️⃣ VIDEO EMBED LOGIC

If video_url contains:

* youtube → embed iframe
* vimeo → embed
* otherwise open link

---

# 7️⃣ UX RULES

* Skeleton loading
* Empty state illustration
* Mobile responsive
* Clean academic UI
* Reuse subject header layout
* Show file size

---

# 🎓 FINAL RESULT

After frontend implementation:

* Each subject has LMS layer
* Teachers upload lesson notes
* Students access resources
* Cloudinary stores all files
* System is lightweight but powerful
* Architecture remains consistent
* Feels native to Space-Together
