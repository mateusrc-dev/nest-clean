import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest' // lib supertest will be used to make http requests
import { StudentFactory } from 'test/factories/make-student'

describe('Upload attachment (E2E)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      // run application programmatically
      imports: [AppModule, DatabaseModule], // this module have access the prisma service how provider and other services
      providers: [StudentFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    studentFactory = moduleRef.get(StudentFactory)
    jwt = moduleRef.get(JwtService) // to get jwt object for create token
    await app.init()
  })

  test('[POST] /attachments', async () => {
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() }) // creating token of authenticate with user created above

    const response = await request(app.getHttpServer())
      .post('/attachments')
      .set('Authorization', `Bearer ${accessToken}`) // let's put a header with a token because this route needs this token to be authorized
      .attach('file', './test/e2e/splash.png')

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      attachmentId: expect.any(String),
    })
  })
})
