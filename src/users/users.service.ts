import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { SignupInput } from 'src/auth/dto/inputs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private logger: Logger = new Logger('User-Service');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return [];
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  async block(id: string): Promise<User> {
    throw new Error('Block user');
  }

  async create(signupInput: SignupInput): Promise<User> {
    try {
      const newUser = await this.userRepository.create({
        ...signupInput,
        password: bcrypt.hashSync(signupInput.password, 10),
      });

      return await this.userRepository.save(newUser);
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  private handleError(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail.replace('Key', ''));
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Plese check server Logs');
  }
}
