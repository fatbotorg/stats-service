import { Controller, Get } from '@nestjs/common';
import { UsersService } from '@app/users/users.service';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { User } from '@app/users/user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @ApiCreatedResponse({
        description: 'Get All Users',
        type: [User]
    })
    async getAll() {
        return await this.usersService.getAll();
    }
}
