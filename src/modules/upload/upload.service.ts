import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);

  private readonly s3: AWS.S3;
  constructor(private configService: ConfigService) {
    const credentials = {
      accessKeyId: this.configService.get<string>('AWS_S3_ACCESS_KEY'),
      secretAccessKey: this.configService.get<string>('AWS_S3_SECRET_KEY'),
    };
    AWS.config.update({
      credentials,
      region: this.configService.get<string>('AWS_S3_REGION'),
    });
    this.s3 = new AWS.S3();
  }

  async uploadFile(filename: string): Promise<string> {
    this.logger.debug('Inside uploadFile');
    const params = {
      Bucket: this.configService.get<string>('AWS_S3_BUCKETNAME'),
      Key: filename,
      ContentType: 'application/octet-stream',
      Expires: 3600,
    };

    const presignedUrl = await this.s3.getSignedUrlPromise('putObject', params);

    return presignedUrl;
  }

  async deleteFile(filename: string) {
    this.logger.debug('Inside deleteFile');
    const params = {
      Bucket: this.configService.get<string>('AWS_S3_BUCKETNAME'),
      Key: filename,
    };

    return this.s3.deleteObject(params).promise();
  }
}
