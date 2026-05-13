## Local Development & Execution Instructions

Follow these exact steps to run a fresh clone of this project on your machine.

### 1. Prerequisites

Ensure you have Node.js installed on your machine.

### 2. Environment Setup

Before starting the servers, you must set up your backend configuration:

1. Navigate into the `backend/` folder.
2. Duplicate `.env.example` and rename the new file to `.env`.
3. Open `.env` and paste the PORT and MONGO_URI text from .env.example file

### 3. Installation

You do not need to install dependencies folder by folder. Run the following command in the root directory to fetch all dependencies for the root, frontend, and backend automatically.

npm run install-all

### 4. Running the Application

To boot up both the backend API server and the frontend interface concurrently in a single terminal session, execute this command in your root directory

npm start

## Project Documentation: Clinical Booking Platform

## 1. What Was Built

A high-performance, full-stack patient scheduling and administrative management system tailored for the Vero Scribe Clinic. The platform is split into two distinct user experiences connected by a shared, synchronized backend:

The Patient Journey: A responsive, modern homepage detailing Vero Scribe’s core value proposition (AI-powered clinical documentation, zero-delay scheduling, and HIPAA compliance). Patients can browse a dynamic directory of specialized clinicians, view their explicit availability, and access an intuitive booking form (powered by Ant Design) to submit consultation requests with automatic client-side email formatting and real-time form validation.

The Administrative Dashboard: A secure management control panel that renders all global clinic requests inside a structured tabular layout. Administrative staff can scan clinical queues and immediately take action on Pending requests.

## 2. Key Technical & Product Decisions

### Frontend Architecture

React (SPA) & Vite: Chosen to construct a lightning-fast Single Page Application. Vite was selected over older build tools to guarantee sub-second Hot Module Replacement (HMR) and optimized production asset splitting.

Tailwind CSS: Utilized for styling to keep the application bundle incredibly lightweight by eliminating bulky external stylesheets.

Ant Design (Components & Configuration): Integrated to provide robust, accessible UI components out of the box, such as the DatePicker, Select drop-downs, and data Table. Implemented Ant Design's ConfigProvider context token system to completely re-theme the form layout seamlessly into a professional dark-mode dashboard without messy global CSS style overrides.

TanStack Query (React Query): Implemented as the primary server-state and caching layer. By utilizing its unique memory management and automated cache invalidation engine, the application instantly displays previously requested doctor profiles on the scheduling view without making redundant, heavy API network requests to the backend database.

### Backend & Database Architecture

Node.js & Express: Selected to build a lightweight, asynchronous, scalable RESTful API router to serve client data.

MongoDB & Mongoose Schema Modeling: Chosen as a flexible NoSQL document storage system. Mongoose models enforce explicit datatypes for relational data patching (such as nesting a reference to a Doctor document inside an Appointment object).

REST API Design: Implemented semantic, clean endpoints to support clean data separation:

GET /api/doctors – Retrieves the directory of specialized physicians and live booking hours.

GET /api/appointments – Fetches the aggregated master queue for administration.

POST /api/appointments – Submits formatted patient request payloads to MongoDB.

PATCH /api/appointments/:id – Updates the precise status of a requested booking document.

Advanced UX & Reliability Engineering
Asynchronous UI State Preservation: Resolved a common scheduling bug where spinning loaders would flash or disappear prematurely. The dashboard table locks rows in place during a status patch and only hides the spinner after the database has fully refetched the fresh dataset.

Timezone Displacement Fix: Configured dates to parse exclusively against the UTC timeline to prevent native browser timezones from automatically shifting appointment dates backward or forward for users in different regions.

Automated Form Security Reset: Configured the patient form to programmatically clear its internal fields instantly upon hitting success. This prevents double-submission bugs and wipes dirty data fields if a user attempts to cycle backwards using the browser.

## 3. Future Roadmap (What to Improve with More Time)

If granted an extended timeline, the system would be upgraded with the following production-ready features:

Advanced Search & Optimization
Debounced Client-Side Filtering: If the physician directory grows beyond standard sizes, introducing a debounced search input would allow patients to scan by name or filter dynamically by specialty without overloading database connections.

Virtual Windowed Tables: For heavily populated clinics with thousands of monthly records, migrating the Ant Design table to a virtualized layout (like react-window) ensures the DOM only renders visible rows, preserving 60fps scrolling performance.

Enhanced Admin Infrastructure
Role-Based Access Control (RBAC) & Protected Routes: Restricting the /appointments admin screen behind a real authentication barrier (using JWT tokens or secure HTTP-only cookies) so only verified clinic staff can read sensitive patient details.

Multi-Dimensional Status Tabs: Adding clear filtering tabs (All, Pending, Confirmed, Cancelled) across the top of the Ant Design table to let administrators quickly sort their workload priorities.

Product & Communication Loop
Live Webhook Notifications: Integrating an external messaging service (like Twilio or SendGrid) to automatically shoot a confirmation email or SMS message to the patient the exact millisecond the admin clicks "Confirm" or "Cancel" on their dashboard.
