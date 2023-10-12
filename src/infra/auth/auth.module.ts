import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { Env } from '@/infra/env'
import { jwtStrategy } from './jwt.strategy'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { APP_GUARD } from '@nestjs/core'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      async useFactory(config: ConfigService<Env, true>) {
        const privateKey = config.get('JWT_PRIVATE_KEY', { infer: true })
        const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true })

        return {
          signOptions: { algorithm: 'RS256' }, // type of algorithm
          privateKey: Buffer.from(privateKey, 'base64'), // loading data in memory
          publicKey: Buffer.from(publicKey, 'base64'),
        }
      },
    }),
  ],
  providers: [
    jwtStrategy,
    {
      provide: APP_GUARD, // will check whether or not the user can access the route
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
