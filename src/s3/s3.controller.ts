import { Controller, Get, Query, Res } from '@nestjs/common';
import { S3Service } from './s3.service';
import { Response } from 'express';

@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Get('download')
  async register(@Query('key') key: string, @Res() res: Response) {
    const s3Stream = await this.s3Service.downloadFile(key);
    res.setHeader('Content-disposition', `attachment; filename=${key}`);
    res.setHeader('Content-type', 'application/octet-stream');

    s3Stream.pipe(res);
  }
}
