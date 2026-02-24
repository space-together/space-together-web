# Analytics API Reference

This document describes the backend API endpoints required for the Director Analytics Dashboard.

## Base URL
```
/analytics
```

## Authentication
All endpoints require:
- `Authorization: Bearer {token}` header
- `X-School-Token: {schoolToken}` header (optional, for school context)

## Endpoints

### 1. Enrollment Trends

**Endpoint**: `GET /analytics/enrollment-trends`

**Description**: Returns monthly student enrollment data for the current academic year.

**Response**:
```json
[
  {
    "month": "Jan",
    "students": 450
  },
  {
    "month": "Feb",
    "students": 465
  },
  {
    "month": "Mar",
    "students": 470
  }
]
```

**Response Schema**:
```typescript
Array<{
  month: string;      // Short month name (Jan, Feb, Mar, etc.)
  students: number;   // Total enrolled students for that month
}>
```

**Implementation Notes**:
- Return last 12 months of data
- Count active students only
- Group by month

---

### 2. Attendance Rate

**Endpoint**: `GET /analytics/attendance-rate`

**Description**: Returns the overall attendance rate percentage for the school.

**Response**:
```json
{
  "rate": 87.3
}
```

**Response Schema**:
```typescript
{
  rate: number;  // Percentage (0-100)
}
```

**Calculation**:
```
rate = (total_present / total_expected) * 100
```

**Implementation Notes**:
- Calculate for current academic term/year
- Include all classes and students
- Round to 1 decimal place

---

### 3. Pass/Fail Distribution

**Endpoint**: `GET /analytics/pass-fail`

**Description**: Returns the count of students who passed vs failed in the most recent assessment period.

**Response**:
```json
{
  "pass": 420,
  "fail": 45
}
```

**Response Schema**:
```typescript
{
  pass: number;   // Number of students who passed
  fail: number;   // Number of students who failed
}
```

**Implementation Notes**:
- Use most recent term/semester results
- Define pass threshold (e.g., ≥50% or ≥60%)
- Count unique students

---

### 4. Fee Summary

**Endpoint**: `GET /analytics/fee-summary`

**Description**: Returns financial summary of school fees.

**Response**:
```json
{
  "totalExpected": 50000000,
  "totalCollected": 42500000,
  "outstanding": 7500000,
  "collectionRate": 85.0
}
```

**Response Schema**:
```typescript
{
  totalExpected: number;    // Total fees expected (RWF)
  totalCollected: number;   // Total fees collected (RWF)
  outstanding: number;      // Outstanding fees (RWF)
  collectionRate: number;   // Collection rate percentage (0-100)
}
```

**Calculations**:
```
outstanding = totalExpected - totalCollected
collectionRate = (totalCollected / totalExpected) * 100
```

**Implementation Notes**:
- Calculate for current academic year
- Include all fee types (tuition, materials, etc.)
- Amounts in Rwandan Francs (RWF)

---

### 5. Teacher Workload

**Endpoint**: `GET /analytics/teacher-workload`

**Description**: Returns the number of classes assigned to each teacher.

**Response**:
```json
[
  {
    "name": "John Doe",
    "classes": 5,
    "subjects": ["Mathematics", "Physics"],
    "totalStudents": 150
  },
  {
    "name": "Jane Smith",
    "classes": 4,
    "subjects": ["English", "Literature"],
    "totalStudents": 120
  }
]
```

**Response Schema**:
```typescript
Array<{
  name: string;           // Teacher full name
  classes: number;        // Number of classes assigned
  subjects?: string[];    // Optional: List of subjects taught
  totalStudents?: number; // Optional: Total students across all classes
}>
```

**Implementation Notes**:
- Include active teachers only
- Count unique class assignments
- Sort by number of classes (descending)
- Limit to top 10-15 teachers for chart readability

---

## Error Responses

All endpoints should return standard error responses:

**401 Unauthorized**:
```json
{
  "error": "Unauthorized",
  "message": "Invalid or missing authentication token"
}
```

**403 Forbidden**:
```json
{
  "error": "Forbidden",
  "message": "You don't have permission to access analytics"
}
```

**404 Not Found**:
```json
{
  "error": "Not Found",
  "message": "School not found"
}
```

**500 Internal Server Error**:
```json
{
  "error": "Internal Server Error",
  "message": "An error occurred while fetching analytics data"
}
```

---

## Permission Requirements

All analytics endpoints require:
- User role: `SCHOOLSTAFF`
- Active school context
- Optional: Specific permission like `analytics.read.school`

---

## Performance Considerations

1. **Caching**: Consider caching analytics data for 5-15 minutes
2. **Indexing**: Ensure database indexes on:
   - `students.created_at`
   - `attendance.date`
   - `grades.term_id`
   - `fees.payment_date`
   - `teacher_classes.teacher_id`

3. **Aggregation**: Use database aggregation functions for better performance
4. **Pagination**: Not required for these endpoints (limited data)

---

## Testing

### Sample cURL Commands

```bash
# Enrollment Trends
curl -X GET "http://localhost:3000/analytics/enrollment-trends" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "X-School-Token: YOUR_SCHOOL_TOKEN"

# Attendance Rate
curl -X GET "http://localhost:3000/analytics/attendance-rate" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "X-School-Token: YOUR_SCHOOL_TOKEN"

# Pass/Fail Distribution
curl -X GET "http://localhost:3000/analytics/pass-fail" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "X-School-Token: YOUR_SCHOOL_TOKEN"

# Fee Summary
curl -X GET "http://localhost:3000/analytics/fee-summary" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "X-School-Token: YOUR_SCHOOL_TOKEN"

# Teacher Workload
curl -X GET "http://localhost:3000/analytics/teacher-workload" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "X-School-Token: YOUR_SCHOOL_TOKEN"
```

---

## Implementation Checklist

- [ ] Create `/analytics` route group
- [ ] Implement authentication middleware
- [ ] Implement role-based access control (SCHOOLSTAFF only)
- [ ] Create database queries for each endpoint
- [ ] Add caching layer
- [ ] Write unit tests
- [ ] Write integration tests
- [ ] Add API documentation
- [ ] Performance testing
- [ ] Deploy to staging
- [ ] Deploy to production

---

## Database Schema Requirements

Ensure your database has these tables/collections:

1. **students**: `id`, `created_at`, `status`, `class_id`
2. **attendance**: `id`, `student_id`, `date`, `status`
3. **grades**: `id`, `student_id`, `subject_id`, `score`, `term_id`
4. **fees**: `id`, `student_id`, `amount`, `paid_amount`, `payment_date`
5. **teachers**: `id`, `name`, `status`
6. **teacher_classes**: `id`, `teacher_id`, `class_id`, `subject_id`
7. **classes**: `id`, `name`, `student_count`

---

## Future Enhancements

1. Add date range filters: `?startDate=2024-01-01&endDate=2024-12-31`
2. Add comparison endpoints: `/analytics/enrollment-trends/compare`
3. Add export endpoints: `/analytics/export?format=pdf|excel`
4. Add real-time updates via WebSocket
5. Add custom dashboard configuration
6. Add drill-down endpoints for detailed views
