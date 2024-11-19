import { Injectable } from '@nestjs/common';

import { Response } from 'express';

import { join } from 'path';

@Injectable()
export class AppService {

  getFileByFileName(fileName: string, res: Response) {
    const filePath = join(process.cwd(), 'uploads', fileName);

    // Faylni yuborish
    return res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Failed to send file');
      }
    });
  }

}
 
