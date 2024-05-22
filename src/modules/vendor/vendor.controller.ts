import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VendorService } from './vendor.service';
import { Vendor } from './entity/vendor.entity';
import {
  CreateVendorDto,
  CreateVendorResponseDto,
  UpdateVendorDto,
} from './dtos/vendor.dto';
import { UUIDValidationPipe } from 'src/Common/pipes';

@ApiTags('vendor')
@Controller('vendor')
export class VendorController {
  private readonly logger = new Logger(VendorController.name);

  constructor(private readonly vendorService: VendorService) {}

  // * Fetch all vendors
  @Get('/')
  @ApiOperation({
    summary: 'Fetch all vendors!',
    operationId: 'fetchVendors',
  })
  @ApiOkResponse({
    description: 'Successfully fetched all vendors!',
    type: [CreateVendorResponseDto],
  })
  async fetchVendors(): Promise<Vendor[]> {
    this.logger.debug('Inside fetchVendors');
    return await this.vendorService.fetchVendors();
  }

  // * Create vendor
  @Post()
  @ApiOperation({
    summary: 'Create a vendor!',
    operationId: 'createVendor',
  })
  @ApiCreatedResponse({
    description: 'Successfully created a vendor!',
    type: CreateVendorResponseDto,
  })
  async createVendor(@Body() body: CreateVendorDto): Promise<Vendor> {
    this.logger.debug('Inside createVendor');
    return await this.vendorService.createVendor(body);
  }

  // * Fetch vendor by Id
  @Get('/:id')
  @ApiOperation({
    summary: 'Fetch vendor by id!',
    operationId: 'fetchVendorById',
  })
  @ApiOkResponse({
    description: 'Successfully fetched vendor!',
    type: CreateVendorResponseDto,
  })
  async fetchVendorById(
    @Param('id', UUIDValidationPipe) id: string,
  ): Promise<Vendor> {
    this.logger.debug('Inside fetchVendorById');
    return await this.vendorService.fetchVendorById(id);
  }

  // * Update vendor
  @Put('/:id')
  @ApiOperation({
    summary: 'Update vendor!',
    operationId: 'updateVendor',
  })
  @ApiOkResponse({
    description: 'Vendor updated successfully!',
    type: CreateVendorResponseDto,
  })
  async updateVendor(
    @Param('id', UUIDValidationPipe) id: string,
    @Body() body: UpdateVendorDto,
  ): Promise<Vendor> {
    this.logger.debug('Inside updateVendor');
    return await this.vendorService.updateVendor(id, body);
  }

  // * Delete vendor
  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete vendor!',
    operationId: 'deleteVendor',
  })
  @ApiResponse({
    description: 'Vendor deleted successfully!',
  })
  async deleteUpdate(
    @Param('id', UUIDValidationPipe) id: string,
  ): Promise<void> {
    this.logger.debug('Inside deleteUpdate');
    return await this.vendorService.deleteVendor(id);
  }
}
