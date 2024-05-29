import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { MasterService } from './master.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CurrenciesResponseDto,
  GstTypesResponseDto,
  InvoiceStatusesResponseDto,
  InvoiceTypesResponseDto,
} from './dtos/master.response';

@ApiTags('master')
@Controller('master')
export class MasterController {
  private readonly logger = new Logger(MasterController.name);

  constructor(private readonly masterService: MasterService) {}

  @Get('/currency')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Fetch currencies!',
    operationId: 'fetchCurrencies',
  })
  @ApiResponse({
    description: 'Successfully fetched currencies!',
    type: [CurrenciesResponseDto],
  })
  async fetchCurrencies(): Promise<CurrenciesResponseDto[]> {
    this.logger.debug('Inside fetchCurrencies');
    return await this.masterService.fetchCurrencies();
  }

  // * Fetch all invoice types
  @Get('/invoice-types')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Fetch invoice types',
    operationId: 'fetchInvoiceTypes',
  })
  @ApiOkResponse({
    description: 'Successfully fetched invoice-types!',
    type: [InvoiceTypesResponseDto],
  })
  async fetchInvoiceTypes(): Promise<InvoiceTypesResponseDto[]> {
    return await this.masterService.fetchInvoiceTypes();
  }

  // * Fetch all gst types
  @Get('/gst-types')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Fetch gst types',
    operationId: 'fetchGstTypes',
  })
  @ApiOkResponse({
    description: 'Successfully fetched gst-types!',
    type: [GstTypesResponseDto],
  })
  async fetchGstTypes(): Promise<GstTypesResponseDto[]> {
    return await this.masterService.fetchGstTypes();
  }

  // * Fetch all invoice statuses
  @Get('/invoice-status')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Fetch invoice statues',
    operationId: 'fetchInvoiceStatues',
  })
  @ApiOkResponse({
    description: 'Successfully fetched invoice-statues!',
    type: [InvoiceStatusesResponseDto],
  })
  async fetchInvoiceStatuses(): Promise<InvoiceStatusesResponseDto[]> {
    return await this.masterService.fetchInvoiceStatuses();
  }
}
