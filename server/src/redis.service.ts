import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';   // ioredis kutubxonasini import qilamiz

@Injectable()
export class RedisService {
  private redisClient: Redis;

  constructor() {
    // Redis'ga ulanish
    this.redisClient = new Redis({
      host: 'redis-15851.c273.us-east-1-2.ec2.redns.redis-cloud.com',  // Redis server manzili (yoki cloud Redis manzili)
      port: 15851,         // Redis porti (default 6379)
      password: '0Wq2cm7SdDtRlY8tSD34Paz4Ab6184W2',       // Redis paroli (agar kerak bo'lsa, shu yerga kiritishingiz mumkin)
    });
  }

  // Redis'ga ma'lumot yozish
  async set(key: string, value: string, expiration: number = 3600): Promise<string> {
    return await this.redisClient.setex(key, expiration, value);  // 'EX' — expiry time (sekundlarda)
  }

  // Redis'dan ma'lumot olish
  async get(key: string): Promise<string | null> {
    return await this.redisClient.get(key);  // Redis'dan ma'lumot olish
  }

  // Redis'ni yopish
  async quit(): Promise<void> {
    await this.redisClient.quit();  // Redis clientini yopish
  }
}
