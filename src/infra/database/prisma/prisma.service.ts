import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable() // to allow this service to be accessed by other parts of the application
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // with extends not is need created instance
  // public client: PrismaClient

  constructor() {
    // this.client = new PrismaClient() // created instance of PrismaClient for have access the database
    super({
      log: ['warn', 'error'],
    }) // will called the constructor of class PrismaClient
  }

  // when we created active connection will use this methods
  onModuleInit() {
    // when module init will connect with prisma
    return this.$connect()
  }

  onModuleDestroy() {
    return this.$disconnect()
  }
}
