import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
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
import { InvoiceResponseDto, SubmitInvoiceRequestDto } from './dtos';
import { UUIDValidationPipe } from 'src/Common/pipes';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
// * Custom decorator for handling pagination
import { ApiPaginatedResponse } from 'src/common/decorators';
import { PaginationQuery } from 'src/common/decorators/pagination-query.dto';

@ApiTags('invoice')
@Controller('invoice')
export class InvoiceController {
  private readonly logger = new Logger(InvoiceController.name);

  constructor(private readonly invoiceService: InvoiceService) {}

  // * Fetch all invoices
  @Get('/')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    USER_ROLES.FINANCE_AND_ACCOUNTS_TEAM,
    USER_ROLES.INVOICE_VALIDATION_TEAM,
    USER_ROLES.SCROLL_TEAM,
    USER_ROLES.VENDOR,
  )
  @ApiOperation({
    summary: 'Fetch all invoices!',
    operationId: 'fetchInvoices',
  })
  @ApiPaginatedResponse({
    model: InvoiceResponseDto,
    description: 'List of Invoices!',
  })
  async fetchInvoices(
    @Query() query: PaginationQuery,
  ): Promise<Pagination<InvoiceResponseDto>> {
    this.logger.debug('Inside fetchInvoices');

    const options: IPaginationOptions = {
      limit: query.limit,
      page: query.page,
    };
    return await this.invoiceService.paginate(options);
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
    type: InvoiceResponseDto,
  })
  async submitInvoice(
    @Body() body: SubmitInvoiceRequestDto,
  ): Promise<InvoiceResponseDto> {
    this.logger.debug('Inside submitInvoice');
    return await this.invoiceService.submitInvoice(body);
  }

  // * Fetch invoice by Id
  @Get('/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    USER_ROLES.VENDOR,
    USER_ROLES.SCROLL_TEAM,
    USER_ROLES.INVOICE_VALIDATION_TEAM,
    USER_ROLES.FINANCE_AND_ACCOUNTS_TEAM,
  )
  @ApiOkResponse({
    description: 'Successfully fetched invoice!',
  })
  async fetchInvoiceById(
    @Param('id', UUIDValidationPipe) id: string,
  ): Promise<InvoiceResponseDto> {
    return await this.invoiceService.fetchInvoiceById(id);
  }

  // * Update invoice

  // * Delete invoice

  // * Fetch invoice by status
  @Get('/status/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(
    USER_ROLES.VENDOR,
    USER_ROLES.SCROLL_TEAM,
    USER_ROLES.INVOICE_VALIDATION_TEAM,
    USER_ROLES.FINANCE_AND_ACCOUNTS_TEAM,
  )
  @ApiOperation({
    summary: 'Fetch invoices by status!',
    operationId: 'fetchInvoiceByStatus',
  })
  @ApiOkResponse({
    description: 'Successfully fetched invoices by status!',
    type: [InvoiceResponseDto],
  })
  async fetchInvoiceByStatus(
    @Param('id', UUIDValidationPipe) invoiceStatusId: string,
  ): Promise<InvoiceResponseDto[]> {
    return await this.invoiceService.fetchInvoicesByStatus(invoiceStatusId);
  }
}
