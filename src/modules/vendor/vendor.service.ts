import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vendor } from '../../common/entities';
import { Repository } from 'typeorm';
import { CreateVendorRequestDto, UpdateVendorRequestDto } from './dtos';

@Injectable()
export class VendorService {
  private readonly logger = new Logger(VendorService.name);

  constructor(
    @InjectRepository(Vendor)
    private vendorRepo: Repository<Vendor>,
  ) {}

  async fetchVendors() {
    this.logger.debug('Inside fetchVendors');
    // return await this.vendorRepo.find({ relations: ['user_role'] });
    return await this.vendorRepo
      .createQueryBuilder('vendor')
      .leftJoinAndSelect('vendor.user_role', 'user_role')
      .leftJoinAndSelect('vendor.country', 'country')
      .leftJoinAndSelect('vendor.vendor_type', 'vendor_type')
      .getMany();
  }

  async createVendor(body: CreateVendorRequestDto): Promise<Vendor> {
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

  async updateVendor(
    id: string,
    body: UpdateVendorRequestDto,
  ): Promise<Vendor> {
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
