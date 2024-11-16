import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { auth } from '../auth/entities/auth.entity';
import { CreateAuthDto } from '../auth/dto/create-auth.dto';
import { LoginUserDto } from '../auth/dto/login-user.dto';
export declare class AuthService {
    private userModel;
    private jwtService;
    private readonly logger;
    constructor(userModel: Model<auth>, jwtService: JwtService);
    register(createUserDto: CreateAuthDto): Promise<auth>;
    login(loginUserDto: LoginUserDto): Promise<{
        access_token: string;
    }>;
}
