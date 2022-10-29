import {Body, Controller, Post} from '@nestjs/common';
import {UserSubscribeDto} from "./dto/UserSubscribeDto";
import {UserEntity} from "./entites/user.entity";
import {UserService} from "./user.service";
import {LoginCredentialsDto} from "./dto/LoginCredentials.dto";

@Controller('users')
export class UserController {

    constructor(
        private userService: UserService
    ) {
    }

    @Post()
    async register(
        @Body() userData: UserSubscribeDto
    ): Promise<Partial<UserEntity>> {
        return await this.userService.register(userData);
    }

    @Post('login')
    async login(
        @Body() loginData: LoginCredentialsDto
    ) {
        return await this.userService.login(loginData);
    }
    
}
