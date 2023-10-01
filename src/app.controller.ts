import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { PrismaService } from './prisma/prisma.service'

// this is a decorator - this decorator is a function that adds behavior to something - it can be applied to classes, methods, properties
// this decorator receives the argument and modifies it - @ indicates that everything after will be an argument
@Controller('/api')
export class AppController {
  constructor(
    private appService: AppService,
    private prisma: PrismaService, // for be possible use methods of this instance
  ) {} // inversion of dependencies - we let's receive appService in constructor

  @Get('/hello')
  async index() {
    return await this.prisma.user.findMany()
  }
}
