# Members Management System - Next.js

A modern Next.js application for managing members linked to societies and events at Wayamba University.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with Font Awesome and metadata
│   ├── page.tsx            # Home page (redirects to /members)
│   ├── members/
│   │   └── page.tsx        # Members management page
│   └── globals.css         # Global Tailwind styles
└── components/
    ├── TopBar.tsx          # Navigation bar with dropdowns
    └── MembersTable.tsx    # Members table component with filters
```

## Features

✅ **Members Management**
- Add, edit, and delete members
- Real-time search by name
- Filter by role, society, and event
- Inline table editing
- Pagination (20 items per page)

✅ **UI/UX**
- Responsive design with Tailwind CSS
- Navigation menu with dropdown
- User profile dropdown
- Icon integration with Font Awesome
- Smooth animations

✅ **Technology Stack**
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React + Font Awesome
- **Build**: Webpack (for Windows compatibility)

## Installation

```bash
cd se-members-management
npm install
```

## Development

```bash
npm run dev -- --webpack
```

Opens at: `http://localhost:3000`

## Build

```bash
npx next build --webpack
```

## Key Components

### TopBar.tsx
- Navigation menu with links
- Profile dropdown with logout
- Responsive menu toggle

### MembersTable.tsx
- Dynamic member table with inline editing
- Multi-filter system (search, role, society, event)
- Add/edit/delete/view operations
- Pagination controls
- Save data functionality

## Data Structure

Each member record contains:
- `name` - Member's name
- `email` - Email address
- `society` - Associated society
- `date` - Registration date
- `role` - Position/role
- `regId` - Registration ID
- `event` - Associated event

## Running the Application

1. **Development mode:**
   ```bash
   npm run dev -- --webpack
   ```

2. **Production build:**
   ```bash
   npx next build --webpack
   npm start
   ```

## Notes

- The project uses Webpack instead of Turbopack due to Windows platform requirements
- All data is stored in component state (can be extended with backend API)
- Font Awesome icons are loaded from CDN for a lightweight build
- Tailwind CSS provides responsive, utility-first styling

## Migration from HTML/CSS/JS

This project was successfully converted from vanilla HTML, CSS, and JavaScript to a modern Next.js application with:
- Component-based architecture
- Server and client-side rendering capabilities
- TypeScript for type safety
- Tailwind CSS for styling
- React hooks for state management

---

**Converted**: May 17, 2026
**Location**: `C:\Users\piran\Desktop\se-members-management`
