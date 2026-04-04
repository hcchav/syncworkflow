import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { to, firmName, website, slug, failCount, passCount, total, gaps } =
      body;

    if (!to || !firmName || !slug) {
      return NextResponse.json(
        { error: "Missing required fields: to, firmName, slug" },
        { status: 400 }
      );
    }

    const firstName = firmName.split(" ")[0] || "there";
    const domain = website
      ?.replace("https://", "")
      .replace("http://", "")
      .replace(/\/$/, "");
    const auditUrl = `https://syncworkflow.com/audit/${slug}`;
    const pct = total ? Math.round((passCount / total) * 100) : 0;

    const gapBullets = (gaps || [])
      .slice(0, 3)
      .map((g: string) => `  \u2022 ${g}`)
      .join("\n");
    const moreCount = (failCount || 0) - (gaps || []).slice(0, 3).length;
    const moreLine =
      moreCount > 0 ? `\n  \u2022 ...and ${moreCount} more areas` : "";

    const subject = `I found ${failCount || "several"} gaps on ${domain || "your website"} \u2014 free audit inside`;

    const textBody = `Hi ${firstName},

I ran a complimentary digital presence audit on your firm's website and found some things you'll want to know about.

Your site scored ${pct}% (${passCount} of ${total} checks passed). The biggest gaps I found:

${gapBullets}${moreLine}

I've put together a personalized audit snapshot for your firm \u2014 you can view it here:

\ud83d\udd17 ${auditUrl}

It includes your score breakdown, the top gaps costing you clients, and 3 quick wins you can implement this week for under $500.

Most of these are straightforward fixes. Would you be open to a quick 10-minute call this week? Here's my calendar: https://calendly.com/heroncchavez/30min

Best,
Heron Chavez
Digital Strategy Consultant
heron@syncworkflow.com`;

    const htmlBody = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #2d2d32;">
  <p>Hi ${firstName},</p>

  <p>I ran a complimentary digital presence audit on your firm's website and found some things you'll want to know about.</p>

  <p>Your site scored <strong>${pct}%</strong> (${passCount} of ${total} checks passed). The biggest gaps I found:</p>

  <ul style="color: #c0392b; padding-left: 20px;">
    ${(gaps || [])
      .slice(0, 3)
      .map((g: string) => `<li style="margin-bottom: 4px;">${g}</li>`)
      .join("\n    ")}
    ${moreCount > 0 ? `<li style="color: #64646e;">...and ${moreCount} more areas</li>` : ""}
  </ul>

  <p>I've put together a <strong>personalized audit snapshot</strong> for your firm:</p>

  <p style="text-align: center; margin: 24px 0;">
    <a href="${auditUrl}" style="display: inline-block; background-color: #009688; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 600; font-size: 15px;">
      View Your Audit Results &rarr;
    </a>
  </p>

  <p>It includes your score breakdown, the top gaps costing you clients, and <strong>3 quick wins</strong> you can implement this week for under $500.</p>

  <p>Most of these are straightforward fixes. Would you be open to a quick 10-minute call this week?</p>

  <p style="text-align: center; margin: 20px 0;">
    <a href="https://calendly.com/heroncchavez/30min" style="display: inline-block; background-color: #0f2850; color: #ffffff; text-decoration: none; padding: 10px 24px; border-radius: 8px; font-weight: 600; font-size: 14px;">
      Book a Free Call
    </a>
  </p>

  <p>Best,<br/>
  <strong>Heron Chavez</strong><br/>
  <span style="color: #64646e; font-size: 13px;">Digital Strategy Consultant</span><br/>
  <a href="mailto:heron@syncworkflow.com" style="color: #1e64b4; font-size: 13px;">heron@syncworkflow.com</a></p>
</div>`;

    const { data, error } = await resend.emails.send({
      from: "Heron Chavez <heron@syncworkflow.com>",
      to: [to],
      subject,
      text: textBody,
      html: htmlBody,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err: any) {
    console.error("Send email error:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
