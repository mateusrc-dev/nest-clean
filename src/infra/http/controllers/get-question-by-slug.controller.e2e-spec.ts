import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest' // lib supertest will be used to make http requests

describe('Get question by slug (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      // run application programmatically
      imports: [AppModule], // this module have access the prisma service how provider and other services
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService) // to get access the database with prisma
    jwt = moduleRef.get(JwtService) // to get jwt object for create token
    await app.init()
  })

  test('[GET] /questions/:slug', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Mateus Raimundo',
        email: 'mateus@email.com',
        password: '123456',
      },
    })

    const accessToken = jwt.sign({ sub: user.id }) // creating token of authenticate with user created above

    await prisma.question.create({
      data: {
        title: 'Question 01',
        slug: 'question-01',
        content: 'Question content',
        authorId: user.id,
      },
    })

    const response = await request(app.getHttpServer())
      .get(`/questions/question-01`)
      .set('Authorization', `Bearer ${accessToken}`) // let's put a header with a token because this route needs this token to be authorized
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      question: expect.objectContaining({ title: 'Question 01' }),
    })
  })
})
