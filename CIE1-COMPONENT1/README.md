# MediCare Hospital Management System (HMS)

> An interactive, responsive, feature-rich web application built with HTML5, CSS3, Vanilla JavaScript (ES6+), and LocalStorage. Designed for managing hospital administrative tasks, patient records, doctors, appointments, medical history, prescriptions, billing, staff, and analytics.

---

## 🌟 Project Overview

**MediCare Hospital Management System** is a modern Single Page Application (SPA) designed to digitize healthcare management workflows. Built as an academic web development project for the IBM SkillsBuild Web Development Fundamentals framework, it provides an intuitive digital administrative interface for hospital administrators, doctors, receptionists, and patients.

---

## 🔑 Key Features

- **Authentication & Role Simulation**: Simulated login with pre-configured demo credentials for 4 roles: Administrator, Doctor, Receptionist, and Patient.
- **Executive Dashboard**:
  - Live Key Performance Indicators (KPIs): Total Patients, Active Doctors, Today's Appointments, Pending Appointments, Revenue Collections (₹), and Hospital Bed Availability.
  - Interactive SVG Charts: Patient Registration Weekly Trend and Appointment Status breakdown.
  - Recent Appointments quick table & action shortcuts.
- **Patient Management**: Full CRUD operations, dynamic age calculation from DOB, search/filter, and multi-tab Patient Profile viewer (Personal Info, Appointment History, Clinical Records, Prescriptions, Billing History).
- **Doctor Registry**: Manage medical specialists, qualifications, consultation fees (₹), department assignments, and weekly availability slots.
- **Appointment Scheduling & Conflict Prevention**: Book, confirm, reschedule, or cancel appointments with automatic doctor schedule conflict prevention.
- **Clinical Medical Records**: Connected patient diagnosis, symptoms, procedures, doctor notes, and follow-up tracking.
- **Multi-Medicine Prescriptions**: Issue prescription slips with dynamic line items for medicine, dosage, frequency, and duration.
- **Billing & Financial Invoices**: Auto-calculate subtotal, tax %, discount ₹, and net total in INR (₹) with payment status management and print-ready CSS invoice layouts.
- **Departments & Staff**: Manage specialized departments and non-doctor healthcare personnel (nurses, tech staff, accountants, support).
- **Reports & Analytics**: Aggregated system metrics with CSV export tools (Patients CSV, Appointments CSV, Billing CSV) and print reports.
- **Notifications**: Notification drawer with unread counter badge.
- **Theme & Customization**: Persisted Light/Dark theme modes and Emergency Data Reset button.

---

## 🛠️ Technology Stack

- **Structure**: HTML5 (Semantic elements)
- **Styling**: Modern Vanilla CSS3 (Custom properties, Flexbox, CSS Grid, Modals, Responsive Breakpoints, Print Media Queries)
- **Logic**: Vanilla JavaScript (ES6+ ES Modules pattern, DOM Manipulation, Array methods, Dynamic SVG generation)
- **Persistence**: Browser `LocalStorage` (`hms_*` keys)

---

## 🚀 Installation & Local Execution

1. Download or clone the repository into your local machine:
   ```bash
   git clone https://github.com/your-username/medicare-hms.git
   ```
2. Open the project folder in **Visual Studio Code**:
   ```bash
   code .
   ```
3. Run the application:
   - **Option A (Live Server)**: Right-click `index.html` and select **"Open with Live Server"**.
   - **Option B (Direct Browser)**: Double-click `index.html` to open directly in Google Chrome, Microsoft Edge, or Mozilla Firefox.

---

## 🔒 Demo Account Credentials

| User Role | Email | Password |
| :--- | :--- | :--- |
| **Administrator** | `admin@medicare.com` | `admin123` |
| **Doctor** | `doctor@medicare.com` | `doctor123` |
| **Receptionist** | `reception@medicare.com` | `reception123` |
| **Patient** | `patient@medicare.com` | `patient123` |

*Note: Quick demo buttons are available on the login page to fill these credentials automatically.*

---

## ⚠️ Limitations & Educational Disclaimer

> **Disclaimer**: This project is an educational front-end web development demonstration system. It is not intended for storing actual patient medical records or usage as a real-world HIPAA-compliant clinical production platform. Do not enter real personal sensitive medical data.

---

## 🔮 Future Scope (Version 2.0)

- **Backend**: Node.js & Express.js REST API
- **Database**: MySQL / PostgreSQL
- **Security**: Secure JWT Authentication & Password Hashing
- **Real-Time Sync**: WebSockets / Socket.io for live hospital status updates
