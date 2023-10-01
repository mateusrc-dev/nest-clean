import { Injectable } from '@nestjs/common'

@Injectable() // will be a dependency
export class AppService {
  getHello(): string {
    return 'Hello World!'
  }
}
