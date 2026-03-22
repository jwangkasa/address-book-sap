# Enterprise Address Book

A full-stack enterprise address book application built with Next.js 15, Supabase, and deployed on SAP BTP Cloud Foundry.

## Features

- 🔐 Google Social Login via Supabase Auth (SSR)
- 📇 Contact management with 9 fields
- 🎨 Modern UI with Tailwind CSS
- 🔒 Row Level Security (RLS) for data isolation
- ⚡ Server-side rendering with Next.js 15 App Router
- 🚀 Ready for SAP BTP Cloud Foundry deployment

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, RLS)
- **Authentication**: Google OAuth 2.0
- **Deployment**: SAP BTP Cloud Foundry (Node.js Buildpack)
- **Language**: TypeScript (Strict mode)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase account and project
- Google OAuth credentials configured in Supabase

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/address-book-sap.git
   cd address-book-sap
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Update `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Run the database migration**
   
   Open your Supabase SQL Editor and run the migration from:
   `../supabase/migrations/001_create_contacts_table.sql`

5. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Contact Fields

The address book manages contacts with the following fields:

- First Name
- Last Name
- Phone Number
- Mobile Number
- Email Address
- Company Name
- Job Title
- Occupation
- Country

## Authentication

This app uses Supabase Auth with Google Social Login:

1. Users click "Sign in with Google"
2. OAuth flow redirects to Google
3. After authorization, user is redirected back
4. Session is managed via secure HTTP-only cookies

## Security

- Row Level Security (RLS) ensures users can only access their own contacts
- Server-side session management with Supabase SSR
- Protected routes via Next.js middleware
- TypeScript strict mode for type safety

## Project Structure

```
address-book/
├── app/                    # Next.js App Router
│   ├── auth/
│   │   └── callback/       # OAuth callback handler
│   ├── login/              # Login page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── lib/
│   └── supabase/           # Supabase client utilities
│       ├── client.ts       # Browser client
│       └── server.ts       # Server client
├── types/
│   └── database.ts         # Database types
├── middleware.ts           # Auth middleware
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind configuration
└── tsconfig.json           # TypeScript configuration
```

## Deployment

This app is designed for deployment on SAP BTP Cloud Foundry:

1. Build the application: `npm run build`
2. Configure `manifest.yml` for Cloud Foundry
3. Deploy: `cf push`

See the project documentation for detailed deployment instructions.

## License

MIT