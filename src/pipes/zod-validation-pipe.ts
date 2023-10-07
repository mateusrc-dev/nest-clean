import { PipeTransform, BadRequestException } from '@nestjs/common'
import { ZodSchema, ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value) // Here the validation will be done
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          errors: fromZodError(error),
          message: 'Validation Failed',
          statusCode: 400,
        })
      }
      throw new BadRequestException('Validation failed')
    }
    return value
  }
}
