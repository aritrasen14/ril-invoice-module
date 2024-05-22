import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vendor } from './entity/vendor.entity';
import { Repository } from 'typeorm';
import { CreateVendorDto, UpdateVendorDto } from './dtos/vendor.dto';

@Injectable()
export class VendorService {
  private readonly logger = new Logger(VendorService.name);

  constructor(
    @InjectRepository(Vendor)
    private vendorRepo: Repository<Vendor>,
  ) {}

  async fetchVendors() {
    this.logger.debug('Inside fetchVendors');
    return await this.vendorRepo.find();
  }

  async createVendor(body: CreateVendorDto): Promise<Vendor> {
    this.logger.debug('Inside createVendor');
    const resultQuery = await this.vendorRepo
      .createQueryBuilder()
      .insert()
      .values(body)
      .returning('*')
      .execute();

    return resultQuery.raw[0];
  }

  async fetchVendorById(id: string) {
    this.logger.debug('Inside fetchVendorById');
    return await this.vendorRepo.findOneBy({ id });
  }

  async updateVendor(id: string, body: UpdateVendorDto): Promise<Vendor> {
    this.logger.debug('Inside updateVendor');

    const updateResult = await this.vendorRepo
      .createQueryBuilder()
      .update({ ...body })
      .where({ id })
      .returning('*')
      .execute();

    return updateResult.raw[0];
  }

  async deleteVendor(id: string): Promise<void> {
    this.logger.debug('Inside deleteVendor');

    const deleteResult = await this.vendorRepo
      .createQueryBuilder()
      .delete()
      .where({ id })
      .execute();

    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Vendor with ID ${id} not found!`);
    }
  }
}
