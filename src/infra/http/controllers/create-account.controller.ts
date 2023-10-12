import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ConflictException,
  BadRequestException,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student'
import { StudentAlreadyExistsError } from '@/domain/forum/application/use-cases/errors/student-already-exists-error'

const createAccountBodySchema = z.object({
  // here we let's create the schema for create the validation
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema> // we can our schema for create the type of body

@Controller('/accounts')
export class CreateAccountController {
  constructor(private registerStudent: RegisterStudentUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema)) // now the values received in the body of request will be validated
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = body

    const result = await this.registerStudent.execute({
      name,
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value // let's store the error that occurred in variable

      switch (error.constructor) {
        // constructor returns the class that generated this error
        case StudentAlreadyExistsError:
          throw new ConflictException(error.message) // error coming from nestjs will trigger error with status code
        default:
          throw new BadRequestException(error.message) // generic error
      }
    }
  }
}
