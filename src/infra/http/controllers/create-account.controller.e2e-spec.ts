import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest' // lib supertest will be used to make http requests

describe('Create account(E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      // run application programmatically
      imports: [AppModule], // this module have access the prisma service how provider
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService) // to get access the database with prisma
    await app.init()
  })

  test('[POST] /accounts', async () => {
    const response = await request(app.getHttpServer()).post('/accounts').send({
      // we let's use supertest to do request in route accounts
      name: 'Mateus Raimundo',
      email: 'mateus@email.com',
      password: '123456',
    })

    expect(response.statusCode).toBe(201)

    const userOnDatabase = await prisma.user.findUnique({
      where: {
        email: 'mateus@email.com',
      },
    })

    expect(userOnDatabase).toBeTruthy() // we let's verify if the user is create in database
  })
})
