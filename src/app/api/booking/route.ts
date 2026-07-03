// app/api/booking/route.ts
import { NextResponse } from "next/server";

type BookingPayload = {
  fullName?: string;
  email?: string;
  phone?: string;
  eventType?: string;
  eventDate?: string;
  eventVenue?: string;
  serviceType?: string;
  preferredPackage?: string;
  guestCount?: string;
  additionalDetails?: string;
  agreed?: boolean;
};

// Mirror the form's required fields — never trust the client to have validated.
const REQUIRED: (keyof BookingPayload)[] = [
  "fullName",
  "email",
  "phone",
  "eventType",
  "eventDate",
  "eventVenue",
  "serviceType",
  "preferredPackage",
];

export async function POST(request: Request) {
  let data: BookingPayload;

  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // Server-side validation
  const missing = REQUIRED.filter((key) => !String(data[key] ?? "").trim());
  if (missing.length > 0) {
    return NextResponse.json(
      { error: "Missing required fields.", fields: missing },
      { status: 422 },
    );
  }
  if (!data.agreed) {
    return NextResponse.json(
      { error: "Terms and conditions must be accepted." },
      { status: 422 },
    );
  }

  try {
    // ---------------------------------------------------------------
    // TODO: persist the booking. Pick whichever fits your stack:
    //
    //   1) Email it to yourself (e.g. Resend / Nodemailer):
    //      await resend.emails.send({
    //        from: "bookings@yourdomain.com",
    //        to: "you@yourdomain.com",
    //        subject: `New booking — ${data.fullName}`,
    //        text: JSON.stringify(data, null, 2),
    //      });
    //
    //   2) Save to a database (Prisma / Mongo / Supabase, etc.):
    //      await db.booking.create({ data });
    //
    //   3) Append to Google Sheets / Airtable / Notion.
    //
    // For now it just logs so the endpoint works end to end:
    // ---------------------------------------------------------------
    console.log("New booking received:", data);

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("Failed to save booking:", err);
    return NextResponse.json(
      { error: "Failed to save booking." },
      { status: 500 },
    );
  }
}
