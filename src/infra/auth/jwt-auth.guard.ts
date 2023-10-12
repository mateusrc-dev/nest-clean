import { AuthGuard } from '@nestjs/passport'
import { IS_PUBLIC_KEY } from './public'
import { Reflector } from '@nestjs/core'
import { ExecutionContext, Injectable } from '@nestjs/common'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) {
      // if isPublic equals true, then the user can have access to the route
      return true
    }

    return super.canActivate(context) // verify if the jwt exist inside of headers
  }
}
