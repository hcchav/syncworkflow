# Lead Form Setup Guide

## ✅ What I Fixed

The form submission was not working because the `onSubmit` function was only logging to console instead of calling the API endpoint. I've now fixed it to:

1. ✅ Call `/api/lead` endpoint with form data
2. ✅ Store lead in Supabase database
3. ✅ Send email notification to heroncchavez@gmail.com
4. ✅ Show success message to user
5. ✅ Display error alert if submission fails

## 🔧 Required Environment Variables

You need to create a `.env.local` file in the root directory with these variables:

```env
# Supabase Configuration (REQUIRED for database storage)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Resend Email API (REQUIRED for email notifications)
RESEND_API_KEY=your_resend_api_key

# Optional
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

## 📧 Email Configuration

The email is already configured to send to: **heroncchavez@gmail.com**

To get a Resend API key:
1. Go to https://resend.com
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add it to `.env.local` as `RESEND_API_KEY`

**Note:** You'll also need to verify your domain in Resend, or use their test domain for development.

## 🗄️ Database Setup

The database migration is already created at:
`supabase/migrations/001_create_leads_table.sql`

To apply the migration:

1. Make sure you have Supabase CLI installed:
   ```bash
   npm install -g supabase
   ```

2. Link your project:
   ```bash
   supabase link --project-ref your-project-ref
   ```

3. Apply migrations:
   ```bash
   supabase db push
   ```

## 🧪 Testing the Form

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the homepage
3. Scroll to the "Ready to Transform Your Boat Show Results?" section
4. Fill out the form with test data
5. Click "Book My Demo"

### What Should Happen:

✅ Form validates the input
✅ Shows loading state on submit button
✅ Stores lead in Supabase `leads` table
✅ Sends email to heroncchavez@gmail.com
✅ Shows success message
✅ Logs submission details to console

### If It Fails:

- Check browser console for errors
- Check server logs for API errors
- Verify environment variables are set correctly
- Ensure Supabase migration has been applied
- Verify Resend API key is valid

## 📊 Viewing Submitted Leads

### Option 1: Supabase Dashboard
1. Go to your Supabase project dashboard
2. Navigate to Table Editor
3. Select the `leads` table
4. View all submissions

### Option 2: SQL Query
```sql
SELECT * FROM leads ORDER BY created_at DESC;
```

## 🔍 Troubleshooting

### Database Not Storing Leads
- Check that `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set
- Verify the migration has been applied
- Check RLS policies allow inserts

### Email Not Sending
- Verify `RESEND_API_KEY` is set correctly
- Check Resend dashboard for sending limits
- Verify domain is configured in Resend
- Check server logs for email errors

### Form Not Submitting
- Open browser DevTools → Network tab
- Submit the form
- Look for POST request to `/api/lead`
- Check response status and body

## 📝 Form Data Structure

The form collects:
- **name**: User's full name (min 2 characters)
- **email**: Valid email address
- **company**: Company name (min 2 characters)
- **nextShow**: When their next boat show is
- **notes**: Optional additional information (max 300 characters)
- **source**: Automatically set to 'homepage-form'

Plus automatically captured:
- **ip_address**: User's IP address
- **user_agent**: Browser information
- **created_at**: Timestamp of submission

## 🎯 Next Steps

1. Create `.env.local` file with your credentials
2. Apply the database migration
3. Test the form submission
4. Check your email (heroncchavez@gmail.com) for notifications
5. Verify leads are appearing in Supabase

---

**Need Help?** Check the console logs for detailed error messages.
