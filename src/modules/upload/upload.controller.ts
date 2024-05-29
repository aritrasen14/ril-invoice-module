import {
  Body,
  Controller,
  Delete,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { UploadRequest, UploadResponse } from './dtos';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadFile(@UploadedFile() fileUpload) {
    this.logger.debug('Inside logger');
    return {
      url: await this.uploadService.uploadFile(fileUpload.originalname),
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
