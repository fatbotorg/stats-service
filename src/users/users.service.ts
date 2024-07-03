import { Injectable } from '@nestjs/common';
import { User } from '@app/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

    async getAll(): Promise<User[]> {
        return await this.usersRepository.find();
    }
}
