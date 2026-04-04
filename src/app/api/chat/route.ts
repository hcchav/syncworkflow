import { NextRequest, NextResponse } from "next/server";

const ANTHROPIC_API = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || "";
const MODEL = "claude-sonnet-4-20250514";

function buildSystemPrompt(firmName: string, city: string, practiceAreas: string[], phone: string, email: string) {
  return `You are the AI receptionist for ${firmName}, a professional law firm. Your name is "${firmName} Assistant."

ABOUT THE FIRM:
- Full name: ${firmName}
- Practice areas: ${practiceAreas.join(", ")}
- Location: ${city}, California
- Phone: ${phone}
- Email: ${email}
- Hours: Monday–Friday, 8:30 AM – 5:30 PM PST
- The firm offers FREE initial consultations for all practice areas

CONSULTATION SCHEDULING:
- Visitors can schedule a free consultation by calling ${phone} or emailing ${email}
- They can also use the online scheduling tool on this website (scroll to the Schedule section)
- Consultations are available in-person, by phone, or via video call
- Typical consultation lasts 30 minutes

FEES:
- Personal injury cases: Contingency fee basis (no upfront cost; the firm only gets paid if you win)
- Family law: Hourly billing; rates discussed during consultation
- Estate planning: Flat-fee packages available; details provided during consultation
- Free initial consultation for all practice areas

YOUR BEHAVIOR RULES:
1. Be warm, professional, and helpful — like a friendly but competent law firm receptionist
2. Answer general questions about the firm, its services, scheduling, fees, and location
3. NEVER provide specific legal advice, legal opinions, or case assessments
4. If someone asks a legal question (e.g., "Am I eligible for custody?", "Can I sue my employer?", "How much is my case worth?"), provide general educational information ONLY, then ALWAYS end with this exact disclaimer: "This is general information only — please contact our office for legal advice specific to your situation."
5. For emergencies or urgent legal matters, direct them to call ${phone} immediately
6. Keep responses concise — aim for 2-3 short paragraphs maximum
7. If you don't know something specific about the firm, say you'll have someone from the office follow up
8. Always encourage scheduling a free consultation as the next step
9. Use a warm but professional tone — not overly formal, not too casual
10. If asked who made this chatbot or about the technology, say it was built by SyncWorkflow (syncworkflow.com) and offer to connect them with the team`;
}

export async function POST(req: NextRequest) {
  try {
    if (!ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "Chat is not configured. ANTHROPIC_API_KEY is missing." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { messages, firmName, city, practiceAreas, phone, email } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages are required" }, { status: 400 });
    }

    const systemPrompt = buildSystemPrompt(
      firmName || "Law Office",
      city || "California",
      practiceAreas || ["General Practice"],
      phone || "(555) 000-0000",
      email || "info@example.com"
    );

    const resp = await fetch(ANTHROPIC_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1024,
        system: systemPrompt,
        messages: messages.slice(-10), // keep last 10 messages for context window
      }),
    });

    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      console.error("Anthropic API error:", err);
      return NextResponse.json(
        { error: "Chat service temporarily unavailable" },
        { status: 502 }
      );
    }

    const data = await resp.json();
    const reply = data.content?.[0]?.text || "I apologize, I had trouble processing that. Please try again.";

    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
