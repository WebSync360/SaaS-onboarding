import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occurred', {
      status: 400,
    })
  }

  // Initialize Supabase with Service Role Key to bypass RLS during setup
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const eventType = evt.type

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data

    // 1. Extract primary email
    const primaryEmail = email_addresses?.[0]?.email_address
    
    // 2. Format name
    const fullName = `${first_name || ''} ${last_name || ''}`.trim()

    console.log(`🚀 Syncing User Created Event for: ${id}`)

    // 3. Insert into Workspaces table matching your new SQL schema
    // Use .upsert() instead of .insert()
    const { error } = await supabase
      .from('workspaces')
      .upsert({
        id: id,
        name: fullName || 'New Workspace',
        user_email: primaryEmail,
        avatar_url: image_url,
        role: 'UNKNOWN',
      }, { onConflict: 'id' }) // Tell it to just update if the 'id' already exists

    if (error) {
      console.error('Supabase Sync Error:', error.message)
      return new Response(`Error: ${error.message}`, { status: 500 })
    }

    console.log(`Successfully synced user ${id} to Supabase`)
  }

  return new Response('Webhook processed successfully', { status: 200 })
}