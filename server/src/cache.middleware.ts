// src/common/middleware/cache.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CacheMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Agar fayl bo'lsa, Cache-Control qo'shish
    if (req.url.startsWith('/files')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable'); // Keshni 1 yil davomida saqlash
    }
    next();
  }
}
