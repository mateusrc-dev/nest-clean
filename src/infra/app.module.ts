import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env/env'
import { AuthModule } from './auth/auth.module'
import { HttpModule } from './http/http.module'
import { EnvModule } from './env/env.module'
import { EventsModule } from './events/events.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env), // here the variable ambient will be validate
      isGlobal: true, // to be able to access settings in all modules -> there will be more than one module
    }),
    AuthModule,
    HttpModule,
    EnvModule, // this module will be visible throughout the application
    EventsModule,
  ], // this is a module and don't provider - we let's use 'forRoot' because this is a module of configuration
})
export class AppModule {}

// providers is all that not is controllers - repositories, use cases... - that will be injectable in controllers
