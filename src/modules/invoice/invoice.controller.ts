import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
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
