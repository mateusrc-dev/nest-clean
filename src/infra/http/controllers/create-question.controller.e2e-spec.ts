import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest' // lib supertest will be used to make http requests
import { StudentFactory } from 'test/factories/make-student'

describe('Create question (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let studentFactory: StudentFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      // run application programmatically
      imports: [AppModule, DatabaseModule], // this module have access the prisma service how provider
      providers: [StudentFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService) // to get access the database with prisma
    studentFactory = moduleRef.get(StudentFactory)
    jwt = moduleRef.get(JwtService) // to get jwt object for create token
    await app.init()
  })

  test('[POST] /questions', async () => {
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() }) // creating token of authenticate with user created above

    const response = await request(app.getHttpServer())
      .post('/questions')
      .set('Authorization', `Bearer ${accessToken}`) // let's put a header with a token because this route needs this token to be authorized
      .send({
        // we let's use supertest to do request in route accounts
        title: 'New question',
        content: 'Question content',
      })

    expect(response.statusCode).toBe(201)

    const questionOnDatabase = await prisma.question.findFirst({
      where: {
        title: 'New question',
      },
    })

    expect(questionOnDatabase).toBeTruthy() // we let's verify if the user is create in database
  })
})
