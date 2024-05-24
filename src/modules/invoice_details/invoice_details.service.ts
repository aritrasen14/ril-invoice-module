import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceDetails } from 'src/common/entities';
import { Repository } from 'typeorm';

@Injectable()
export class InvoiceDetailsService {
  constructor(
    @InjectRepository(InvoiceDetails)
    private invoiceDetails: Repository<InvoiceDetails>,
  ) {}
}
