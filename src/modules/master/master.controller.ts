import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { MasterService } from './master.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { USER_ROLES } from 'src/common/enums';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('master')
@Controller('master')
export class MasterController {
  private readonly logger = new Logger(MasterController.name);

  constructor(private readonly masterService: MasterService) {}

  @Get('/currency')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    USER_ROLES.VENDOR,
    USER_ROLES.INVOICE_VALIDATION_TEAM,
    USER_ROLES.SCROLL_TEAM,
    USER_ROLES.FINANCE_AND_ACCOUNTS_TEAM,
  )
  @ApiOperation({
    summary: 'Fetch currencies!',
    operationId: 'fetchCurrencies',
  })
  @ApiResponse({
    description: 'Successfully fetched currencies!',
    // type: CurrencyResponseDto
  })
  async fetchCurrencies() {
    this.logger.debug('Inside fetchCurrencies');
    return await this.masterService.fetchCurrencies();
  }

  // * Fetch all invoice types
  @Get('/invoice-types')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    USER_ROLES.VENDOR,
    USER_ROLES.SCROLL_TEAM,
    USER_ROLES.INVOICE_VALIDATION_TEAM,
    USER_ROLES.FINANCE_AND_ACCOUNTS_TEAM,
  )
  @ApiOperation({
    summary: 'Fetch invoice types',
    operationId: 'fetchInvoiceTypes',
  })
  @ApiOkResponse({
    description: 'Successfully fetched invoice-types!',
    // type: InvoiceTypeResponseDto
  })
  async fetchInvoiceTypes() {
    return await this.masterService.fetchInvoiceTypes();
  }

  // * Fetch all gst types
  @Get('/gst-types')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    USER_ROLES.VENDOR,
    USER_ROLES.SCROLL_TEAM,
    USER_ROLES.INVOICE_VALIDATION_TEAM,
    USER_ROLES.FINANCE_AND_ACCOUNTS_TEAM,
  )
  @ApiOperation({
    summary: 'Fetch gst types',
    operationId: 'fetchGstTypes',
  })
  @ApiOkResponse({
    description: 'Successfully fetched gst-types!',
    // type: GstTypeResponseDto
  })
  async fetchGstTypes() {
    return await this.masterService.fetchGstTypes();
  }
}
