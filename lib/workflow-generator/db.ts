import { sql } from "@vercel/postgres";

/**
 * One row per Workflow Generator submission. The row is created the moment
 * step 1 (contact) is submitted, so partial completions are captured; the
 * generate route later updates the same row with the full input payload and
 * the model's output.
 *
 * The `ip` column doubles as the rate-limit ledger: the generate route
 * counts recent rows per IP instead of keeping any in-memory state, which
 * does not survive across serverless invocations on Vercel.
 */

let ready: Promise<void> | null = null;

export function ensureSchema(): Promise<void> {
  if (!ready) {
    ready = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS workflow_submissions (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          email TEXT NOT NULL,
          first_name TEXT NOT NULL,
          last_name TEXT NOT NULL,
          brand TEXT NOT NULL,
          source TEXT NOT NULL DEFAULT 'website',
          consent BOOLEAN NOT NULL DEFAULT false,
          ip TEXT,
          status TEXT NOT NULL DEFAULT 'partial',
          input_payload JSONB,
          generated_output JSONB
        )
      `;
      await sql`
        CREATE INDEX IF NOT EXISTS workflow_submissions_ip_created_idx
        ON workflow_submissions (ip, created_at)
      `;
    })();
    /* A failed first attempt must not poison every later request. */
    ready.catch(() => { ready = null; });
  }
  return ready;
}

export interface LeadInsert {
  email: string;
  firstName: string;
  lastName: string;
  brand: string;
  source: string;
  consent: boolean;
  ip: string | null;
}

export async function insertLead(lead: LeadInsert): Promise<string> {
  await ensureSchema();
  const { rows } = await sql`
    INSERT INTO workflow_submissions (email, first_name, last_name, brand, source, consent, ip)
    VALUES (${lead.email}, ${lead.firstName}, ${lead.lastName}, ${lead.brand},
            ${lead.source}, ${lead.consent}, ${lead.ip})
    RETURNING id
  `;
  return rows[0].id as string;
}

/** Rate-limit primitive for the generate route: completed generations from
 *  this IP within the window. Partial rows don't count against the limit. */
export async function countRecentGenerationsByIp(ip: string): Promise<number> {
  await ensureSchema();
  const { rows } = await sql`
    SELECT COUNT(*)::int AS n
    FROM workflow_submissions
    WHERE ip = ${ip}
      AND status <> 'partial'
      AND created_at > now() - interval '1 hour'
  `;
  return rows[0].n as number;
}
