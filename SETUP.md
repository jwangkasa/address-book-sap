# Setup Guide: Enterprise Address Book

This guide will help you set up the application with Supabase and Google OAuth authentication.

## Prerequisites

- Node.js 18+ installed
- Supabase account
- Google Cloud Platform account (for OAuth credentials)

## Step 1: Configure Google OAuth in Supabase

### 1.1 Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth client ID**
5. Select **Web application**
6. Add Authorized redirect URIs:
   ```
   https://tvzppchsjqpuweyevrkk.supabase.co/auth/v1/callback
   ```
7. Save and note down:
   - **Client ID**
   - **Client Secret**

### 1.2 Enable Google Provider in Supabase

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard/project/tvzppchsjqpuweyevrkk)
2. Navigate to **Authentication** > **Providers**
3. Find **Google** in the list
4. Toggle it to **Enabled**
5. Enter your Google OAuth credentials:
   - **Client ID**: (from step 1.1)
   - **Client Secret**: (from step 1.1)
6. Click **Save**

## Step 2: Get Supabase API Keys

1. In Supabase Dashboard, go to **Settings** > **API**
2. Copy the following:
   - **Project URL**: `https://tvzppchsjqpuweyevrkk.supabase.co`
   - **anon public key**: (starts with `eyJ...`)

## Step 3: Configure Environment Variables

1. Open `.env.local` in the project root
2. Update with your actual keys:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tvzppchsjqpuweyevrkk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

## Step 4: Run Database Migration

1. Go to [Supabase SQL Editor](https://supabase.com/dashboard/project/tvzppchsjqpuweyevrkk/sql)
2. Click **New Query**
3. Copy the entire contents of `../supabase/migrations/001_create_contacts_table.sql`
4. Paste into the SQL Editor
5. Click **Run** to execute

This will create:
- ✅ `contacts` table with all required fields
- ✅ Row Level Security (RLS) policies
- ✅ Performance indexes
- ✅ Auto-update triggers

## Step 5: Verify Setup

### 5.1 Check Database

1. Go to **Table Editor** in Supabase
2. Verify `contacts` table exists
3. Check that RLS is enabled (lock icon should be visible)

### 5.2 Check Authentication

1. Go to **Authentication** > **Providers**
2. Verify Google is enabled and configured

### 5.3 Check Policies

1. Go to **Authentication** > **Policies**
2. Select `contacts` table
3. Verify 4 policies exist:
   - Users can view their own contacts (SELECT)
   - Users can insert their own contacts (INSERT)
   - Users can update their own contacts (UPDATE)
   - Users can delete their own contacts (DELETE)

## Step 6: Run the Application

```bash
# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Step 7: Test Authentication

1. Navigate to the login page
2. Click **Sign in with Google**
3. Authorize with your Google account
4. You should be redirected to the home page showing your email

## Troubleshooting

### "Unsupported provider" Error

**Cause**: Google OAuth is not enabled in Supabase
**Solution**: Follow Step 1.2 above to enable Google provider

### "Invalid API Key" Error

**Cause**: Incorrect or missing Supabase anon key
**Solution**: 
1. Get the correct key from Supabase Dashboard > Settings > API
2. Update `.env.local`
3. Restart the dev server

### "Redirect URI Mismatch" Error

**Cause**: Google OAuth redirect URI not configured correctly
**Solution**:
1. In Google Cloud Console, add both:
   - Production: `https://tvzppchsjqpuweyevrkk.supabase.co/auth/v1/callback`
   - Development: `http://localhost:54321/auth/v1/callback` (if using local Supabase)

### RLS Policies Not Working

**Cause**: Migration not run or policies not created
**Solution**:
1. Run the migration again
2. Check policies in Supabase Dashboard
3. Ensure each policy has the condition: `auth.uid() = user_id`

## Next Steps

Once authentication is working:
1. Implement CRUD operations for contacts
2. Build contact list UI
3. Add search and filter functionality
4. Prepare for SAP BTP deployment

## Support

For issues:
- Check Supabase logs: Dashboard > Logs
- Review browser console for errors
- Verify all environment variables are set correctly