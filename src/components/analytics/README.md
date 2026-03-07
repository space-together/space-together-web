# Analytics Dashboard Components

This directory contains the analytics dashboard components for the Director role in Space-Together.

## Components

### 1. EnrollmentChart (`enrollment-chart.tsx`)
- **Type**: Line Chart
- **Purpose**: Shows student enrollment trends over time
- **Data Source**: `GET /analytics/enrollment-trends`
- **Features**:
  - Responsive container
  - Month-based X-axis
  - Student count Y-axis
  - Hover tooltips
  - Loading skeleton
  - Empty state handling

### 2. AttendanceCard (`attendance-card.tsx`)
- **Type**: KPI Card
- **Purpose**: Displays overall attendance rate percentage
- **Data Source**: `GET /analytics/attendance-rate`
- **Features**:
  - Color-coded display:
    - Green: ≥85%
    - Yellow: 70-85%
    - Red: <70%
  - Large number display
  - Loading skeleton
  - Error handling

### 3. PassFailChart (`pass-fail-chart.tsx`)
- **Type**: Pie Chart
- **Purpose**: Shows pass/fail distribution of students
- **Data Source**: `GET /analytics/pass-fail`
- **Features**:
  - Green for PASS
  - Red for FAIL
  - Center label with total count
  - Hover tooltips
  - Loading skeleton
  - Empty state handling

### 4. FeeSummaryCard (`fee-summary-card.tsx`)
- **Type**: KPI Cards Grid
- **Purpose**: Displays fee collection metrics
- **Data Source**: `GET /analytics/fee-summary`
- **Features**:
  - 4 KPI cards:
    1. Total Expected (RWF)
    2. Total Collected (RWF)
    3. Outstanding (RWF)
    4. Collection Rate (%)
  - Currency formatting for Rwanda (RWF)
  - Color-coded values
  - Responsive grid layout

### 5. TeacherWorkloadChart (`teacher-workload-chart.tsx`)
- **Type**: Bar Chart
- **Purpose**: Shows number of classes per teacher
- **Data Source**: `GET /analytics/teacher-workload`
- **Features**:
  - Teacher names on X-axis
  - Class count on Y-axis
  - Rich tooltips showing:
    - Teacher name
    - Number of classes
    - Total students (optional)
    - Subjects taught (optional)
  - Loading skeleton
  - Empty state handling

## Page Implementation

### Analytics Page (`src/app/[lang]/(application)/s-t/analytics/page.tsx`)

**Route**: `/s-t/analytics`

**Access Control**:
- Only users with `role: "SCHOOLSTAFF"` can access
- Requires active school context
- Shows AccessDenied component for unauthorized users

**Layout**:
```
┌─────────────────────────────────────┐
│ Page Header                         │
├─────────────────────────────────────┤
│ Fee Summary Cards (4 cards)        │
├─────────────────────────────────────┤
│ ┌─────────────┬─────────────┐      │
│ │ Enrollment  │ Attendance  │      │
│ │ Chart       │ Card        │      │
│ ├─────────────┼─────────────┤      │
│ │ Pass/Fail   │ Teacher     │      │
│ │ Chart       │ Workload    │      │
│ └─────────────┴─────────────┘      │
└─────────────────────────────────────┘
```

## Data Fetching

All components use **SWR** for data fetching with:
- Automatic revalidation
- Error handling
- Loading states
- Parallel fetching

### API Endpoints Expected

```typescript
// Enrollment Trends
GET /analytics/enrollment-trends
Response: Array<{ month: string; students: number }>

// Attendance Rate
GET /analytics/attendance-rate
Response: { rate: number }

// Pass/Fail Distribution
GET /analytics/pass-fail
Response: { pass: number; fail: number }

// Fee Summary
GET /analytics/fee-summary
Response: {
  totalExpected: number;
  totalCollected: number;
  outstanding: number;
  collectionRate: number;
}

// Teacher Workload
GET /analytics/teacher-workload
Response: Array<{
  name: string;
  classes: number;
  subjects?: string[];
  totalStudents?: number;
}>
```

## Dependencies

- **Recharts**: For charts (Line, Bar, Pie)
- **SWR**: For data fetching
- **shadcn/ui**: Card, Skeleton components
- **Tailwind CSS**: Styling

## Usage

```tsx
import EnrollmentChart from "@/components/analytics/enrollment-chart";
import AttendanceCard from "@/components/analytics/attendance-card";
import PassFailChart from "@/components/analytics/pass-fail-chart";
import FeeSummaryCard from "@/components/analytics/fee-summary-card";
import TeacherWorkloadChart from "@/components/analytics/teacher-workload-chart";

// In your page
<EnrollmentChart token={auth.token} schoolToken={auth.schoolToken} />
<AttendanceCard token={auth.token} schoolToken={auth.schoolToken} />
<PassFailChart token={auth.token} schoolToken={auth.schoolToken} />
<FeeSummaryCard token={auth.token} schoolToken={auth.schoolToken} />
<TeacherWorkloadChart token={auth.token} schoolToken={auth.schoolToken} />
```

## Design Principles

1. **Clean Academic Feel**: Minimal colors, professional appearance
2. **Responsive**: Mobile-first design, stacks on small screens
3. **Loading States**: Skeleton loaders for better UX
4. **Error Handling**: Graceful fallbacks with CardError component
5. **Empty States**: Clear messaging when no data available
6. **Space-Together Branding**: Consistent with platform design system

## Future Enhancements

- Export to PDF/Excel functionality
- Date range filters
- Drill-down capabilities
- Real-time updates via WebSocket
- Comparison with previous periods
- Custom dashboard configuration
