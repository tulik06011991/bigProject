import { Controller, Get, Param, Response } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('files/:fileName')  // 'fileName' parametrini to'g'ri sozlash
  getFile(@Param('fileName') fileName: string, @Response() res) {
    return this.appService.getFileByFileName(fileName, res);
  }
}

//
