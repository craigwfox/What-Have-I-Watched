// src/routes/+layout.ts
import { invalidate } from '$app/navigation'
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit'
import type { LayoutLoad } from './$types'
import type { Database } from '../DatabaseDefinitions'

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
  depends('supabase:auth')

  const supabase = createSupabaseLoadClient<Database>({
		supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
		supabaseKey: import.meta.env.VITE_SUPABASE_KEY,
		event: { fetch },
    serverSession: data.session,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return { supabase, session }
}
