import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase';
import { Resend } from 'resend';

// Validation schema for lead data
const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  nextShow: z.enum(['Soon', '30-60 days', '60-90 days', 'Not scheduled']),
  notes: z.string().max(300, 'Notes must be less than 300 characters').optional(),
  source: z.string().default('boat-tradeshow-landing'),
});

// Initialize Resend client (only if API key is available)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the incoming data
    const validatedData = leadSchema.parse(body);
    
    // Sanitize the data for database
    const sanitizedData = {
      name: validatedData.name.trim(),
      email: validatedData.email.toLowerCase().trim(),
      company: validatedData.company.trim(),
      next_show: validatedData.nextShow,
      notes: validatedData.notes?.trim() || '',
      source: validatedData.source,
      ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      user_agent: request.headers.get('user-agent') || 'unknown',
    };

    // Store in database (Supabase) - with fallback for missing config
    let leadData = null;
    
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const { data, error: dbError } = await supabaseAdmin
        .from('leads')
        .insert([sanitizedData])
        .select()
        .single();

      if (dbError) {
        console.error('Database error:', dbError);
        // Don't throw error - continue with email notification
        console.warn('Database storage failed, but continuing with email notification');
      } else {
        leadData = data;
        console.log('Lead stored in database:', leadData);
      }
    } else {
      console.warn('Supabase not configured - lead will only be logged and emailed');
      // Create a temporary lead object for email
      leadData = { id: `temp_${Date.now()}`, ...sanitizedData };
    }

    // Send email notification
    try {
      if (process.env.RESEND_API_KEY && resend) {
        const emailResult = await resend.emails.send({
          from: 'SyncWorkflow <noreply@syncworkflow.com>',
          to: ['heroncchavez@gmail.com'], // Replace with your notification email
          subject: `New Boat Show Lead: ${sanitizedData.name} from ${sanitizedData.company}`,
          html: `
            <h2>New Lead Submission</h2>
            <p><strong>Name:</strong> ${sanitizedData.name}</p>
            <p><strong>Email:</strong> ${sanitizedData.email}</p>
            <p><strong>Company:</strong> ${sanitizedData.company}</p>
            <p><strong>Next Show:</strong> ${sanitizedData.next_show}</p>
            <p><strong>Notes:</strong> ${sanitizedData.notes || 'None'}</p>
            <p><strong>Source:</strong> ${sanitizedData.source}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>IP Address:</strong> ${sanitizedData.ip_address}</p>
          `,
        });
        
        console.log('Email notification sent:', emailResult);
      } else {
        console.warn('RESEND_API_KEY not configured, skipping email notification');
      }
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // Don't fail the entire request if email fails
    }

    // Always log the lead data for debugging
    console.log('Lead submission processed:', {
      id: leadData?.id,
      name: sanitizedData.name,
      email: sanitizedData.email,
      company: sanitizedData.company,
      timestamp: new Date().toISOString()
    });
    
    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Lead submitted successfully',
        leadId: leadData?.id || `temp_${Date.now()}`
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Lead submission error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation error',
          errors: error.errors 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}

// Handle GET requests (optional - for testing)
export async function GET() {
  return NextResponse.json(
    { 
      message: 'Lead API endpoint is working',
      methods: ['POST'],
      endpoint: '/api/lead'
    },
    { status: 200 }
  );
}
