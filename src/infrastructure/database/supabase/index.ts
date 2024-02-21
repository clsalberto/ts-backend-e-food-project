import { createClient } from '@supabase/supabase-js'
import { env } from '~/infrastructure/env'
import { Database } from './database.types'

export const supabase = createClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
