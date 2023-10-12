import {
  Body,
  Controller,
  Post,
  HttpCode,
  UsePipes,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student'
import { WrongCredentialsError } from '@/domain/forum/application/use-cases/errors/wrong-credentials-error'

const authenticateBodySchema = z.object({
  // here we let's create the schema for create the validation
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema> // we can our schema for create the type of body

@Controller('/sessions')
export class AuthenticateController {
  constructor(private authenticateStudent: AuthenticateStudentUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(authenticateBodySchema)) // now the values received in the body of request will be validated
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body

    const result = await this.authenticateStudent.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value // let's store the error that occurred in variable

      switch (error.constructor) {
        // constructor returns the class that generated this error
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message) // error coming from nestjs will trigger error with status code
        default:
          throw new BadRequestException(error.message) // generic error
      }
    }

    const { accessToken } = result.value

    return { access_token: accessToken }
  }
}
