# Director Analytics Dashboard UI

Before writing code:

1. Study:

   * `s-t/students/page.tsx`
   * student-form.tsx
   * student-dialog.tsx
   * layout patterns
   * components/common/*
2. Use:

   * shadcn Card
   * TanStack charts or Recharts
   * SWR
   * Skeleton loaders
3. Respect route grouping.
4. Only director role can access.

---

# 📁 ROUTE

Director dashboard:

```
/s-t/dashboard/page.tsx
```

Or:

```
/s-t/analytics/page.tsx
```

Follow same layout wrapper as other school staff pages.

---

# 🖥 PAGE STRUCTURE

Create:

```
components/analytics/
   enrollment-chart.tsx
   attendance-card.tsx
   pass-fail-chart.tsx
   fee-summary-card.tsx
   teacher-workload-chart.tsx
```

---

# 1️⃣ Enrollment Trends Chart

* Line chart
* X-axis: Month
* Y-axis: Total students
* Fetch:
  GET `/analytics/enrollment-trends`
* Use Recharts
* Responsive container

---

# 2️⃣ Attendance Rate Card

Large number card:

```
87.3%
Attendance Rate
```

Green if >85
Yellow if 70–85
Red if <70

---

# 3️⃣ Pass / Fail Pie Chart

Pie chart:

* PASS (green)
* FAIL (red)

Show total count.

---

# 4️⃣ Fee Summary Cards

Display 4 KPI cards:

* Total Expected
* Total Collected
* Outstanding
* Collection Rate %

Format numbers in RWF (if Rwanda school context).

---

# 5️⃣ Teacher Workload Bar Chart

Bar chart:

X-axis: Teacher name
Y-axis: Number of classes

Optional tooltip:

* subjects
* total students

---

# 🔐 Permission Guard

Use:

```
usePermission("analytics.read.school")
```

If denied → render AccessDenied.

---

# 📦 DATA FETCHING

Use SWR:

```
useSWR("/analytics/enrollment-trends")
```

Parallel fetching.

Show:

* Skeleton loading
* Empty state
* Error fallback

---

# 📊 UX DESIGN

* Clean academic feel
* 2x2 grid layout on desktop
* Stack vertically on mobile
* Subtle animations
* No heavy colors
* Space-Together branding

---

# 🎯 FINAL RESULT

Director dashboard becomes:

* Data-driven
* Institutional
* Transparent
* Trust-building
* Enterprise-grade

This transforms Space-Together from management tool → decision intelligence system.
