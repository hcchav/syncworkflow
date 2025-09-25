# Lead Management Setup Instructions

## Database Setup (Supabase)

### 1. Create the Leads Table
Run the migration file in your Supabase SQL editor:
```sql
-- Copy and paste the contents of supabase/migrations/001_create_leads_table.sql
```

### 2. Environment Variables
Add these to your `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Email Service (Resend)
RESEND_API_KEY=your_resend_api_key_here
```

## Email Setup (Resend)

### 1. Get Resend API Key
1. Sign up at [resend.com](https://resend.com)
2. Create an API key in your dashboard
3. Add it to your `.env.local` file

### 2. Configure Email Settings
In `/src/app/api/lead/route.ts`, update:
- `from` email address (must be verified domain in Resend)
- `to` email addresses for notifications

## Testing

### 1. Test Database Connection
```bash
npm run dev
```
Visit: `http://localhost:3000/api/lead` (should return API status)

### 2. Test Lead Submission
Submit a form on your boat-tradeshow page and check:
- Console logs for database insertion
- Supabase dashboard for new records
- Email inbox for notifications

## Features Implemented

✅ **Database Storage**
- Leads stored in Supabase `leads` table
- Full validation and sanitization
- IP address and user agent tracking
- Timestamps and unique IDs

✅ **Email Notifications**
- Instant email alerts for new leads
- Rich HTML formatting with all lead details
- Graceful fallback if email fails

✅ **Error Handling**
- Validation errors with detailed messages
- Database error handling
- Email failure doesn't break form submission

✅ **Security**
- Row Level Security (RLS) enabled
- Input validation and sanitization
- SQL injection protection

## Database Schema

```sql
leads (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  next_show VARCHAR(50) NOT NULL,
  notes TEXT,
  source VARCHAR(100) NOT NULL,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
)
```

## Next Steps

1. Run the SQL migration in Supabase
2. Configure environment variables
3. Set up Resend account and verify domain
4. Test the complete flow
5. Monitor leads in Supabase dashboard
