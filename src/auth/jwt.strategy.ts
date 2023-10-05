import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Env } from 'src/env'
import { z } from 'zod'

const tokenPayloadSchema = z.object({
  sub: z.string().uuid(), // sub - inside of token have the id of user
})

export type TokenPayload = z.infer<typeof tokenPayloadSchema>

@Injectable() // all class that is a provider in nestjs need has injectable
export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService<Env, true>) {
    // the private key is only used to create new tokens - to validate that the user is logged in the public key is needed
    const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true })

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // our token is in header and your type is bearer
      secretOrKey: Buffer.from(publicKey, 'base64'), // because our secret is base64
      algorithms: ['RS256'],
    })
  }

  async validate(payload: TokenPayload) {
    // this method will validate if the token has the necessary information for our application to start
    return tokenPayloadSchema.parse(payload) // doing validation...
  }
}
