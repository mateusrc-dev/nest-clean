import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma/prisma.service'
import { CreateAccountController } from './controllers/create-account.controller'
import { envSchema } from './env'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env), // here the variable ambient will be validate
      isGlobal: true, // to be able to access settings in all modules -> there will be more than one module
    }),
    AuthModule,
  ], // this is a module and don't provider - we let's use 'forRoot' because this is a module of configuration
  controllers: [CreateAccountController],
  providers: [PrismaService],
})
export class AppModule {}

// providers is all that not is controllers - repositories, use cases... - that will be injectable in controllers
