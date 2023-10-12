import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EnvService } from './env/env.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // let's use 'true' in the type below because we will tell nest that the environment variables have been validated
  const envService = app.get(EnvService) // here we can have access the something service of application
  const port = envService.get('PORT')

  await app.listen(port)
}

bootstrap()
