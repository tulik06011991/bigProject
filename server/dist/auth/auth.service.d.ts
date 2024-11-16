import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { auth } from '../auth/entities/auth.entity';
import { CreateAuthDto } from '../auth/dto/create-auth.dto';
import { LoginUserDto } from '../auth/dto/login-user.dto';
import { RedisService } from '../redis.service';
export declare class AuthService {
    private userModel;
    private jwtService;
    private redisService;
    private readonly logger;
    constructor(userModel: Model<auth>, jwtService: JwtService, redisService: RedisService);
    register(createUserDto: CreateAuthDto): Promise<auth>;
    login(loginUserDto: LoginUserDto): Promise<{
        message: string;
        data: {
            token: string;
        };
    }>;
}
