# School Management and Learning System

## Overview
This project is a full-featured **School Management and Learning System** designed to help schools manage students, courses, and educational resources effectively. It is built using **Next.js** for the frontend and **Actix (Rust)** for the backend API. The system supports file storage, messaging, and simple games to enhance the learning experience.

## Features
### 🏫 School Management
- Manage schools, students, teachers, and education bodies
- Support for multiple education levels

### 📚 Learning Resources
- Store and manage books, reports, and learning materials
- Categorization of subjects and topics

### ✉️ Communication
- Internal messaging system for teachers and students
- Notifications and updates

### 🎮 Interactive Learning
- Simple educational games for students

### 📊 Data Handling
- Built on **MongoDB** with **Prisma** for database interactions
- NoSQL-based flexible data storage

## Tech Stack
### Frontend:
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** (Styling)
- **next-intl** (Internationalization)

### Backend:
- **Actix (Rust)** for high-performance API
- **MongoDB** (NoSQL database)
- **Prisma** ORM for database management

### Deployment:
- **Vercel** for hosting the Next.js frontend
- **Tauri** for desktop version support

## Database Schema
The database uses a **NoSQL structure** to store information efficiently. It includes:
- **Users**: Students, teachers, and administrators
- **Schools**: Education bodies and levels
- **Subjects & Topics**: Organized knowledge base
- **Messages**: Internal communication system
- **Files**: Learning resources like books and reports

## Installation
### Prerequisites
Ensure you have the following installed:
- **Node.js** & **pnpm** (for Next.js)
- **Rust & Cargo** (for Actix API)
- **MongoDB** (for database storage)

### Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/school-management.git
   cd school-management
   ```
2. **Install frontend dependencies:**
   ```bash
   cd frontend
   pnpm install
   ```
3. **Run the frontend:**
   ```bash
   pnpm dev
   ```
4. **Run the backend:**
   ```bash
   cd backend
   cargo run
   ```

## Contribution
If you would like to contribute:
- Fork the repository
- Create a feature branch
- Submit a pull request

## License
This project is licensed under the **MIT License**.

---
💡 **Developed with Next.js & Actix for scalable and efficient school management.**

