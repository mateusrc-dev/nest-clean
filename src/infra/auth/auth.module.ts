import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { jwtStrategy } from './jwt.strategy'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { APP_GUARD } from '@nestjs/core'
import { EnvService } from '../env/env.service'
import { EnvModule } from '../env/env.module'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      // to access the EnvService it is necessary to import the EnvModule, it is not possible to access it only with providers outside this module
      global: true,
      async useFactory(env: EnvService) {
        const privateKey = env.get('JWT_PRIVATE_KEY')
        const publicKey = env.get('JWT_PUBLIC_KEY')

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
    EnvService,
    {
      provide: APP_GUARD, // will check whether or not the user can access the route
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
