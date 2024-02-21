import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number(),
  NODE_ENV: z.enum(['development', 'production']).default('development'),

  BASE_URL: z.string().url(),
  FRONT_URL: z.string().url(),

  SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string()
})

export const env = envSchema.parse(process.env)
