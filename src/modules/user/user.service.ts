import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/common/entities';
import { Repository } from 'typeorm';
import { UserResponseDto } from './dtos/user_response.dto';
import { CreateUserDto } from './dtos/create_user_request.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async registerUser(body: CreateUserDto): Promise<UserResponseDto> {
    this.logger.debug('Inside registerUser');

    const user = new User();
    user.email = body.email;
    user.password = body.password;
    user.user_role_id = body.user_role_id;

    const savedUser = await user.save();

    if (!savedUser) {
      throw new BadRequestException('Error while registering new user!');
    }

    const resultQuery = await this.fetchUserById(savedUser.id);

    return resultQuery;
  }

  async fetchUserById(id: string): Promise<UserResponseDto> {
    this.logger.debug('Inside fetchUserById');
    const resultQuery = await this.userRepo.findOne({
      where: { id },
      relations: ['user_role'],
    });

    if (!resultQuery) {
      throw new NotFoundException('User not found!');
    }

    return new UserResponseDto(resultQuery);
  }

  async getUserByEmail(email: string): Promise<UserResponseDto> {
    this.logger.debug('Inside getUserByEmail');
    const resultQuery = await this.userRepo.findOne({
      where: { email },
      relations: ['user_role'],
    });

    if (!resultQuery) {
      throw new NotFoundException('User not found!');
    }

    return new UserResponseDto(resultQuery);
  }

  async getUserById(id: string): Promise<UserResponseDto> {
    this.logger.debug('Inside getUserById');
    const resultQuery = await this.userRepo.findOne({ where: { id } });

    if (!resultQuery) {
      throw new NotFoundException('User not found!');
    }

    return new UserResponseDto(resultQuery);
  }

  async updateUser(id: string, body: Partial<User>): Promise<UserResponseDto> {
    this.logger.debug('Inside updateUser');
    const modifiedUser = await this.userRepo.update(id, body);

    if (!modifiedUser || modifiedUser.affected === 0) {
      throw new NotFoundException('No user found!');
    }

    return this.getUserById(id);
  }
}
