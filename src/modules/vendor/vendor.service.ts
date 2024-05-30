import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vendor } from '../../common/entities';
import { Repository } from 'typeorm';
import {
  CreateVendorRequestDto,
  UpdateVendorRequestDto,
  VendorResponseDto,
} from './dtos';

@Injectable()
export class VendorService {
  private readonly logger = new Logger(VendorService.name);

  // *  Define readonly relations property to reduce redundancy
  private readonly relations: string[] = [
    'user_role',
    'country',
    'vendor_type',
  ];

  constructor(
    @InjectRepository(Vendor)
    private vendorRepo: Repository<Vendor>,
  ) {}

  async fetchVendors(): Promise<VendorResponseDto[]> {
    this.logger.debug('Inside fetchVendors');
    const resultQuery = await this.vendorRepo.find({
      relations: this.relations,
    });

    // return await this.vendorRepo
    //   .createQueryBuilder('vendor')
    //   .leftJoinAndSelect('vendor.user_role', 'user_role')
    //   .leftJoinAndSelect('vendor.country', 'country')
    //   .leftJoinAndSelect('vendor.vendor_type', 'vendor_type')
    //   .getMany();

    return resultQuery.map((vendor) => new VendorResponseDto(vendor));
  }

  async createVendor(body: CreateVendorRequestDto): Promise<VendorResponseDto> {
    this.logger.debug('Inside createVendor');

    const savedVendor = await this.vendorRepo.save(body);

    if (!savedVendor) {
      throw new BadRequestException('Error while saving the vendor!');
    }

    // Fetch the saved entity with relations
    const resultQuery = await this.fetchVendorById(savedVendor.id);

    if (!resultQuery) {
      throw new NotFoundException('No Vendor Found!');
    }

    // const resultQuery = await this.vendorRepo
    //   .createQueryBuilder()
    //   .insert()
    //   .values(body)
    //   .returning('*')
    //   .execute();

    return resultQuery;
  }

  async fetchVendorById(id: string): Promise<VendorResponseDto> {
    this.logger.debug('Inside fetchVendorById');
    const resultQuery = await this.vendorRepo.findOne({
      where: { id },
      relations: this.relations,
    });

    if (!resultQuery) {
      throw new NotFoundException('No Vendor Found!');
    }

    return new VendorResponseDto(resultQuery);
  }

  async updateVendor(
    id: string,
    body: UpdateVendorRequestDto,
  ): Promise<VendorResponseDto> {
    this.logger.debug('Inside updateVendor');

    const updateResult = await this.vendorRepo.update(id, body);

    if (!updateResult || updateResult.affected === 0) {
      throw new NotFoundException(`Vendor with ID ${id} not found`);
    }

    const updatedVendor = await this.fetchVendorById(id);

    if (!updatedVendor) {
      throw new NotFoundException(`Updated Vendor with ID ${id} not found`);
    }

    return updatedVendor;
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
