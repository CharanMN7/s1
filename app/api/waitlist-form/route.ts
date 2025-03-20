import { NextRequest, NextResponse } from "next/server";

// Rate limiting map (in production, use Redis or similar)
const rateLimit = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5;

function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  return forwardedFor ? forwardedFor.split(",")[0] : "unknown";
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateName(name: string): boolean {
  return name.length >= 2 && name.length <= 50 && /^[a-zA-Z\s]*$/.test(name);
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting check
    const clientIp = getClientIp(req);
    const now = Date.now();
    const clientData = rateLimit.get(clientIp);

    if (clientData) {
      if (now - clientData.timestamp > RATE_LIMIT_WINDOW) {
        rateLimit.set(clientIp, { count: 1, timestamp: now });
      } else if (clientData.count >= MAX_REQUESTS) {
        return NextResponse.json(
          {
            success: false,
            error: "Too many requests. Please try again later.",
          },
          { status: 429 },
        );
      } else {
        clientData.count++;
      }
    } else {
      rateLimit.set(clientIp, { count: 1, timestamp: now });
    }

    // Input validation
    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Name and email are required" },
        { status: 400 },
      );
    }

    if (!validateName(name)) {
      return NextResponse.json(
        { success: false, error: "Invalid name format" },
        { status: 400 },
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 },
      );
    }

    const formUrl = process.env.FORM_URL as string;
    const formId1 = process.env.FORM_ID1 as string;
    const formId2 = process.env.FORM_ID2 as string;

    const formBody = new URLSearchParams({
      [formId1]: name,
      [formId2]: email,
    });

    const response = await fetch(formUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody.toString(),
    });

    return NextResponse.json({ success: response.ok });
  } catch (error) {
    console.error("Error submitting form:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit form" },
      { status: 500 },
    );
  }
}
