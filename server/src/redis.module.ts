import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';

@Module({
  providers: [RedisService],  // RedisService'ni provider sifatida qo'shamiz
  exports: [RedisService],    // RedisService'ni eksport qilamiz, shunda boshqa modullarda foydalanish mumkin
})
export class RedisModule {}
