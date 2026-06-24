<<<<<<< HEAD
# 🎓 StudyNotion - Full Stack Learning Management System (LMS)

A fully functional Learning Management System (LMS) built using the MERN Stack that enables students to learn online, instructors to create and manage courses, and administrators to manage course categories and platform structure.

---

# 🚀 Features

## 👨‍🎓 Student Features

* User Registration & Login
* OTP Email Verification
* JWT Authentication & Refresh Tokens
* Browse Available Courses
* View Detailed Course Information
* Add Courses to Cart
* Purchase / Enroll in Courses
* Access Enrolled Courses Dashboard
* Watch Course Lectures
* Mark Lectures as Completed
* Track Course Progress
* Submit Ratings & Reviews
* Update Profile Information
* Change Password
* Forgot Password Functionality

---

## 👨‍🏫 Instructor Features

* Instructor Dashboard
* Create New Courses
* Edit Existing Courses
* Delete Courses
* Upload Course Thumbnails
* Create Sections
* Create Subsections (Lectures)
* Manage Course Content
* View Student Enrollments
* Revenue Analytics
* Student Enrollment Analytics
* Course Performance Visualization
* Publish Courses

### Course Creation Workflow

Instructors cannot create categories directly.

While creating a course, instructors must select a category that has already been created and approved by the Admin.

This ensures proper platform organization and consistency.

---

## 👨‍💼 Admin Features

* Create Categories
* Manage Course Categories
* Control Platform Course Structure
* Organize Learning Content

### Category Management

The Admin controls the categories available on the platform.

Examples:

* Web Development
* Data Structures & Algorithms
* Machine Learning
* DevOps
* Competitive Programming

Instructors can only create courses under these approved categories.

---

# 🔐 Authentication & Security

* OTP Email Verification
* JWT Authentication
* Refresh Token Mechanism
* Password Hashing using Bcrypt
* Protected Routes
* Role-Based Access Control (RBAC)
* Secure API Authorization

### Roles Supported

* Student
* Instructor
* Admin

Each role has access only to its authorized functionality.

---

# 📚 Course Management

Each Course Includes:

* Course Name
* Description
* Thumbnail
* Price
* Category
* Learning Outcomes
* Instructions
* Sections
* Subsections
* Video Lectures
* Publish Status

---

# ⭐ Ratings & Reviews

Students enrolled in a course can:

* Submit Ratings
* Write Reviews
* View Reviews

Additional validations:

* Only enrolled students can review a course.
* Duplicate reviews are prevented.

---

# 📈 Analytics Dashboard

Instructor Dashboard provides:

### Revenue Analytics

* Total Income Generated
* Revenue Distribution

### Student Analytics

* Total Students Enrolled
* Course-wise Enrollment Statistics

### Visual Reports

* Interactive Pie Charts
* Course Performance Overview

---

# 🎥 Learning Experience

Students can:

* Watch Video Lectures
* Navigate Between Sections
* Track Progress
* Resume Learning Anytime
* Complete Lectures
* Monitor Completion Percentage

---

# ☁️ Media Management

All media assets are managed using Cloudinary.

### Supported Assets

* Course Thumbnails
* Images
* Videos

---

# 🏗️ Tech Stack

## Frontend

* React.js
* Redux Toolkit
* React Router DOM
* Tailwind CSS
* Axios
* React Hook Form
* React Hot Toast
* Chart.js
* React ChartJS 2

---

## Backend

* Node.js
* Express.js

---

## Database

* MongoDB
* Mongoose ODM

---

## Authentication & Security

* JWT
* Refresh Tokens
* Bcrypt

---

## Cloud Services

* Cloudinary

---

## Email Services

* Nodemailer

---

# 🗄️ Database Models

### User

Stores:

* Student
* Instructor
* Admin

information.

---

### Profile

Stores:

* Gender
* Date of Birth
* Contact Number
* About Section

---

### Course

Stores:

* Course Information
* Instructor Reference
* Category
* Students Enrolled
* Sections

---

### Category

Stores course categories created by Admin.

---

### Section

Stores course modules.

---

### SubSection

Stores lecture content and videos.

---

### Rating & Review

Stores student ratings and feedback.

---

### Course Progress

Stores completed lectures and progress tracking.

---

# 🔄 Application Flow

## Student Flow

1. Register Account
2. Verify OTP
3. Login
4. Browse Courses
5. Add to Cart
6. Enroll in Course
7. Watch Lectures
8. Track Progress
9. Complete Course
10. Submit Review

---

## Instructor Flow

1. Login
2. Create Course
3. Select Admin-Created Category
4. Upload Thumbnail
5. Add Sections
6. Add Lectures
7. Publish Course
8. View Analytics

---

## Admin Flow

1. Login
2. Create Categories
3. Manage Platform Course Structure
4. Control Available Categories

---

# 📊 Major Implemented Functionalities

✅ Authentication System

✅ OTP Verification

✅ Refresh Token Mechanism

✅ Role-Based Authorization

✅ Student Dashboard

✅ Instructor Dashboard

✅ Admin Category Management

✅ Course Creation

✅ Course Editing

✅ Course Deletion

✅ Section & Subsection Management

✅ Cloudinary Media Upload

✅ Enrollment System

✅ Shopping Cart

✅ Course Progress Tracking

✅ Ratings & Reviews

✅ Analytics Dashboard

✅ Revenue Statistics

✅ Responsive UI

---

# 🚀 Future Enhancements

* AI Course Assistant
* Course Completion Certificates
* Real Payment Gateway Integration
* Discussion Forums
* Live Classes
* Real-Time Notifications
* Advanced Search & Filters
* Wishlist Feature
* Admin Analytics Dashboard

---

# 👨‍💻 Author

**Pradeep Singh**

Built during Semester Break after 4th Semester to gain hands-on experience with full-stack web development, scalable backend architecture, authentication systems, analytics dashboards, and role-based access control using the MERN Stack.
=======
# StudyNotion
An Online Education Platform
>>>>>>> c6344026a2efe76f49e8ae804e2933ca7053fb16
