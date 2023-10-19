import { PrismaClient } from '@prisma/client' // for have access the database
import { randomUUID } from 'node:crypto'
import { config } from 'dotenv' // for have access the environment variable
import { execSync } from 'node:child_process'

config({ path: '.env', override: true }) // config loading the environment variable and we can put configs
// 'override' tells nest to override the variable when this variable has been defined in the past
config({ path: '.env.test', override: true })

const prisma = new PrismaClient()

function generateUniqueDataBaseUrl(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provider a DATABASE_URL environment variable')
  }

  const url = new URL(process.env.DATABASE_URL) // create a url object with methods

  url.searchParams.set('schema', schemaId)
  // here we let's change value of query param for a schemaId - will be create a isolated database for test

  return url.toString()
}

const schemaId = randomUUID()

beforeAll(async () => {
  const databaseURL = generateUniqueDataBaseUrl(schemaId)

  process.env.DATABASE_URL = databaseURL // we let's overwrite the environment variable with new database url

  // execSync - for execute a command in code
  execSync('npx prisma migrate deploy') // deploy will be for run the migrations without verify if have new schemas - creating new schema for test
}) // will execute before of all tests

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`) // drop schema after of test
  await prisma.$disconnect()
}) // will after of all tests
