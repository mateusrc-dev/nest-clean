import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CreateAccountController } from './controllers/create-account.controller'

@Module({
  controllers: [CreateAccountController],
  providers: [PrismaService],
})
export class AppModule {}

// providers is all that not is controllers - repositories, use cases... - that will be injectable in controllers
