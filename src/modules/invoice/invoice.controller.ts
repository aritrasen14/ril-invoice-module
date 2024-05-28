import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { InvoiceService } from './invoice.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { USER_ROLES } from 'src/common/enums';
import { SubmitInvoiceRequestDto } from './dtos';

@ApiTags('invoice')
@Controller('invoice')
export class InvoiceController {
  private readonly logger = new Logger(InvoiceController.name);

  constructor(private readonly invoiceService: InvoiceService) {}

  // * Fetch all invoices
  @ApiOperation({
    summary: 'Fetch all invoices!',
    operationId: 'fetchInvoices',
  })
  @ApiOkResponse({
    description: 'Successfully fetched all invoices!',
    // type: []
  })
  @Get('/')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    USER_ROLES.FINANCE_AND_ACCOUNTS_TEAM,
    USER_ROLES.INVOICE_VALIDATION_TEAM,
    USER_ROLES.SCROLL_TEAM,
    USER_ROLES.VENDOR,
  )
  async fetchInvoices() {
    //! InvoiceResponseDto
    this.logger.debug('Inside fetchInvoices');
    return await this.invoiceService.fetchAllInvoices();
  }

  // * Submit a invoice
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(USER_ROLES.VENDOR)
  @ApiOperation({
    summary: 'Submit a Invoice!',
    operationId: 'submitAInvoice',
  })
  @ApiCreatedResponse({
    description: 'Successfully submitted a invoice!',
    // type: InvoiceResponseDto,
  })
  async submitInvoice(@Body() body: SubmitInvoiceRequestDto) {
    //! InvoiceResponseDto
    this.logger.debug('Inside submitInvoice');
    return await this.invoiceService.submitInvoice(body);
  }

  // * Fetch invoice by Id

  // * Update invoice

  // * Delete invoice
}
