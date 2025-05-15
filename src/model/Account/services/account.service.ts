import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../User/entities/user.entity';
import { AccountDto } from '../dto/account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    console.log('AccountService initialized');
  }

  async findAll() {
    try {
      console.log('AccountService.findAll() called');
      const users = await this.userRepository.find();
      console.log('Found users:', users);
      return users;
    } catch (error) {
      console.error('Error in findAll:', error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      console.log('AccountService.findOne() called with id:', id);
      const user = await this.userRepository.findOne({ where: { id } });
      console.log('Found user:', user);
      return user;
    } catch (error) {
      console.error('Error in findOne:', error);
      throw error;
    }
  }

  async create(createAccountDto: AccountDto) {
    try {
      console.log('AccountService.create() called with:', createAccountDto);
      const user = this.userRepository.create(createAccountDto);
      const result = await this.userRepository.save(user);
      console.log('Created user:', result);
      return result;
    } catch (error) {
      console.error('Error in service create:', error);
      throw error;
    }
  }
} 