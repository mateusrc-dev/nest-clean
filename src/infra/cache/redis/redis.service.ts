import { Env } from '@/infra/env/env'
import { OnModuleDestroy } from '@nestjs/common'
import { Redis } from 'ioredis'

export class RedisService extends Redis implements OnModuleDestroy {
  constructor(envService: Env) {
    super({
      host: envService.REDIS_HOST,
      port: envService.REDIS_PORT,
      db: envService.REDIS_DB,
    })
  }

  onModuleDestroy() {
    return this.disconnect()
  }
}
