import { UseCaseError } from '@/core/errors/use-case-error'

export class ResourceNotFoundError extends Error implements UseCaseError {
  // UseCaseError is to differentiate where the error comes from
  constructor() {
    super('Resource not found') // 'super' calls the constructor of the class we are extending (Error)
  }
} // error of when we find a information in database and she not exist
