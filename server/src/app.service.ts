import { Injectable } from '@nestjs/common';
import { Response } from 'express'; 
import { join } from 'path';

@Injectable()
export class AppService {
getFileByFileName(fileName: string , res:  Response) {
    const filePath =  join(process.cwd(), 'uploads', fileName)
    console.log(filePath);
    return res.sendFile(filePath)
}
}
