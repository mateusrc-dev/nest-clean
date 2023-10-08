import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { Env } from './env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // let's use 'true' in the type below because we will tell nest that the environment variables have been validated
  const configService: ConfigService<Env, true> = app.get(ConfigService) // here we can have access the something service of application
  const port = configService.get('PORT', { infer: true })

  await app.listen(port)
}
bootstrap()
