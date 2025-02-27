# Hirrd - Job Portal Application

![Hirrd Logo](public/logo.png)

Hirrd is a modern job portal application that connects job seekers with employers. The platform enables companies to post job listings and candidates to search and apply for positions that match their skills and interests.

## Features

- **User Authentication** - Secure login/signup via Clerk
- **Dual User Roles** - Separate interfaces for candidates and recruiters
- **Job Listings** - Browse, search, and filter available positions
- **Job Applications** - Apply with resume upload and track application status
- **Job Management** - Post jobs, review applications, and update hiring status
- **Company Management** - Add new companies with logos
- **Saved Jobs** - Save interesting positions for later review

## Tech Stack

<div style="display: flex; gap: 20px; flex-wrap: wrap; margin: 30px 0;">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="50" alt="React" title="React"/>
    <img src="https://vitejs.dev/logo.svg" width="50" alt="Vite" title="Vite"/>
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" width="50" alt="Tailwind CSS" title="Tailwind CSS"/>
    <img src="https://www.clerk.dev/images/clerk-logo.svg" width="50" alt="Clerk" title="Clerk"/>
    <img src="https://supabase.com/logo.svg" width="50" alt="Supabase" title="Supabase"/>
    <img src="https://ui.shadcn.com/apple-touch-icon.png" width="50" alt="shadcn/ui" title="shadcn/ui"/>
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="50" alt="JavaScript" title="JavaScript"/>
</div>

- **Frontend Framework**: React with Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Authentication**: Clerk
- **Database and Storage**: Supabase
- **Routing**: React Router v6
- **Form Handling**: React Hook Form with Zod validation
- **Markdown Support**: MD Editor for rich text content

## Installation and Setup

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Supabase account
- Clerk account

### Environment Variables

Create a `.env` file in the root directory with the following:

```
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Installation Steps

1. Clone the repository
     ```bash
     git clone https://github.com/username/hirrd-job-portal.git
     cd hirrd-job-portal
     ```

2. Install dependencies
     ```bash
     npm install
     # or
     yarn
     ```

3. Start the development server
     ```bash
     npm run dev
     # or
     yarn dev
     ```

4. Open your browser and navigate to `http://localhost:5173`

## Database Schema

The application uses the following main tables in Supabase:

- **users** - User profiles and authentication
- **jobs** - Job listings with details
- **applications** - Job applications submitted by candidates
- **companies** - Company information and logos
- **saved_jobs** - Jobs saved by users for later reference

## Project Structure

```
/src
    /api - API functions to interact with Supabase
    /components - Reusable UI components
        /ui - shadcn/ui components
    /data - Static data files
    /hooks - Custom React hooks
    /lib - Utility functions
    /pages - Main application pages
    /utils - Helper utilities
    main.jsx - Application entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.