import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { insertLead } from "@/lib/workflow-generator/db";
import { upsertContact } from "@/lib/workflow-generator/hubspot";

/**
 * Step-1 lead capture. Called the moment the contact step is submitted so
 * partial completions are recorded even if the visitor never generates.
 * Postgres is the system of record; the HubSpot upsert is best-effort and
 * never fails the request.
 */

const LeadSchema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  brand: z.string().trim().min(1).max(200),
  email: z.email().trim().max(320),
  /* The UI cannot submit without the checkbox; the server enforces it too. */
  consent: z.literal(true),
  source: z.string().trim().min(1).max(100).optional(),
});

export async function POST(request: NextRequest) {
  let parsed;
  try {
    parsed = LeadSchema.safeParse(await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check your details and try again." },
      { status: 400 },
    );
  }

  const lead = parsed.data;
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  const source = lead.source ?? "website";

  let id: string;
  try {
    id = await insertLead({
      email: lead.email.toLowerCase(),
      firstName: lead.firstName,
      lastName: lead.lastName,
      brand: lead.brand,
      source,
      consent: lead.consent,
      ip,
    });
  } catch (err) {
    console.error("[workflow-generator] lead insert failed:", err);
    return NextResponse.json(
      { error: "Something went wrong on our side. Please try again." },
      { status: 500 },
    );
  }

  /* Best-effort CRM sync; the lead is already safe in Postgres. */
  await upsertContact({
    email: lead.email.toLowerCase(),
    firstName: lead.firstName,
    lastName: lead.lastName,
    brand: lead.brand,
    source,
  });

  return NextResponse.json({ id });
}
