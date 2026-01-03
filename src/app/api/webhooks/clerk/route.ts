import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: Request) {
  console.log("Webhook request received");

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET
  if (!WEBHOOK_SECRET) {
    console.error("Missing CLERK_WEBHOOK_SECRET");
    return new Response('Error: Missing Secret', { status: 500 })
  }

  // Next.js 15+ requires awaiting headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Missing Svix headers");
    return new Response('Error occured -- no svix headers', { status: 400 })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
    console.log("Verification Successful");
  } catch (err) {
    // Cast err to Error type to access .message safely
    const error = err as Error;
    console.error('Verification Failed:', error.message);
    return new Response('Error verifying webhook', { status: 400 })
  }

  // Initialize Supabase (Ensure your .env has the CORRECTED .supabase.co URL)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const eventType = evt.type;

  if (eventType === 'user.created') {
    const { id } = evt.data;
    console.log(`Attempting to create workspace for user: ${id}`);

    const { error } = await supabase
      .from('workspaces')
      .insert({ id: id, name: "My Workspace" })

    if (error) {
      // THIS WILL TELL US THE EXACT REASON (e.g., Table not found, Duplicate ID, etc.)
      console.error('SUPABASE DB ERROR:', error.message, error.code, error.details);
      return new Response(`Error creating workspace: ${error.message}`, { status: 500 })
    }
    
    console.log('SUCCESS: Workspace created in database');
  }

  return new Response('Webhook processed', { status: 200 })
}