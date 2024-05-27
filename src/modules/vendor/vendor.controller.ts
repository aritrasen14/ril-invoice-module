import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VendorService } from './vendor.service';
import { UUIDValidationPipe } from 'src/Common/pipes';
import {
  CreateVendorRequestDto,
  UpdateVendorRequestDto,
  VendorResponseDto,
} from './dtos';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { USER_ROLES } from 'src/common/enums';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('vendor')
@Controller('vendor')
export class VendorController {
  private readonly logger = new Logger(VendorController.name);

  constructor(private readonly vendorService: VendorService) {}

  // * Fetch all vendors
  @ApiOperation({
    summary: 'Fetch all vendors!',
    operationId: 'fetchVendors',
  })
  @ApiOkResponse({
    description: 'Successfully fetched all vendors!',
    type: [VendorResponseDto],
  })
  @Get('/')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(USER_ROLES.FINANCE_AND_ACCOUNTS_TEAM, USER_ROLES.VENDOR)
  async fetchVendors(): Promise<VendorResponseDto[]> {
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
    type: VendorResponseDto,
  })
  async createVendor(
    @Body() body: CreateVendorRequestDto,
  ): Promise<VendorResponseDto> {
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
    type: VendorResponseDto,
  })
  async fetchVendorById(
    @Param('id', UUIDValidationPipe) id: string,
  ): Promise<VendorResponseDto> {
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
    type: VendorResponseDto,
  })
  async updateVendor(
    @Param('id', UUIDValidationPipe) id: string,
    @Body() body: UpdateVendorRequestDto,
  ): Promise<VendorResponseDto> {
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
