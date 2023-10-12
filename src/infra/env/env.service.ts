// this file will be a helper to look for the environment variable

import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Env } from './env'

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService<Env, true>) {}

  get<T extends keyof Env>(key: T) {
    // let's create a generic that will be the keys
    // let's returns all keys that exist in Env (object with our keys)
    return this.configService.get<T>(key, { infer: true })
  }
}
