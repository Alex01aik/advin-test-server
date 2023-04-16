import { S3 } from 'aws-sdk';
import { Injectable } from '@nestjs/common';
import type { Multer } from 'multer';
import internal from 'stream';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class S3Service {
  private readonly s3: S3;

  constructor() {
    this.s3 = new S3({
      region: process.env.S3_BUCKET_REGION,
      accessKeyId: process.env.S3_BUCKET_ACCESS_KEY,
      secretAccessKey: process.env.S3_BUCKET_ACCESS_SECRET_KEY,
    });
  }

  async uploadFile(
    file: Multer.File,
    name?: string,
  ): Promise<S3.ManagedUpload.SendData> {
    const fileStream = file.buffer;
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Body: fileStream,
      ContentType: file.mimetype,
      ACL: 'public-read',
      Key: name ? `${name}_${file.originalname}` : file.originalname,
    };

    return await this.s3.upload(params).promise();
  }

  async downloadFile(key: string): Promise<internal.Readable> {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
    };

    return await this.s3.getObject(params).createReadStream();
  }
}
