import { Body, Controller, Delete, Logger, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { UploadRequest, UploadResponse } from './dtos';

@ApiTags('File Upload & Delete')
@Controller('upload')
export class UploadController {
  private readonly logger = new Logger(UploadController.name);

  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @ApiOperation({
    summary: 'Get AWS pre-signed URL',
    operationId: 'fileUpload',
  })
  @ApiOkResponse({
    description: 'AWS pre-signed URL generated successfully!',
    type: UploadResponse,
  })
  async uploadFile(@Body() fileUpload: UploadRequest) {
    return {
      url: await this.uploadService.uploadFile(fileUpload.filename),
    };
  }

  @Delete('delete')
  @ApiOperation({
    summary: 'Remove file from AWS',
    operationId: 'fileDelete',
  })
  @ApiOkResponse({
    description: 'File removed successfully!',
  })
  async deleteFile(@Body() fileDelete: UploadRequest) {
    this.logger.debug('Inside deleteFile');
    return this.uploadService.deleteFile(fileDelete.filename);
  }
}
