import { z } from 'zod'

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().optional().default(3333), // 'coerce' transforms string into number
})

export type Env = z.infer<typeof envSchema>
