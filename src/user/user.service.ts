import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {UserSubscribeDto} from "./dto/UserSubscribeDto";
import {Repository} from "typeorm";
import {UserEntity} from "./entites/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';
import {LoginCredentialsDto} from "./dto/LoginCredentials.dto";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private jwtService: JwtService
    ) {
    }

    async register(userData: UserSubscribeDto): Promise<Partial<UserEntity>> {

        const user = this.userRepository.create({
            ...userData
        });
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, user.salt);

        try {
            await this.userRepository.save(user);
        } catch (e) {
            throw  new ConflictException(`Le username et la password doivent être unique.`);
        }

        return {
            id: user.id,
            username: user.username,
            email: user.email
        };
    }

    async login(credentials: LoginCredentialsDto) {

        const {username, password} = credentials;
        const user = await this.userRepository.createQueryBuilder("user")
            .where("user.username = :username or user.email = :username")
            .setParameters({username})
            .getOne();

        if (!user) {
            throw new NotFoundException(`Nom d'utilisateur ou mot de passe incorrecte.`);
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new NotFoundException(`Nom d'utilisateur ou mot de passe incorrecte.`)
        }

        const payload = {
            username: user.username,
            email: user.email,
            role: user.role
        }
        const jwt = this.jwtService.sign(payload);

        return {
            access_token: jwt
        }

    }
}
