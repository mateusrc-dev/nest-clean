import { Controller, Post } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

/* const createAccountBodySchema = z.object({
    // here we let's create the schema for create the validation
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  }) */

// type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema> // we can our schema for create the type of body

@Controller('/sessions')
export class AuthenticateController {
  constructor(private jwt: JwtService) {}

  @Post()
  // @HttpCode(201)
  // @UsePipes(new ZodValidationPipe(createAccountBodySchema)) // now the values received in the body of request will be validated
  async handle() {
    const token = this.jwt.sign({ sub: 'user-id' })

    return token
  }
}
