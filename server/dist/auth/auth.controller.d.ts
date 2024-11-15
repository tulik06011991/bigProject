import { AuthService } from './auth.service';
import { CreateAuthDto } from '../auth/dto/create-auth.dto';
import { LoginUserDto } from '../auth/dto/login-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createAuthDto: CreateAuthDto): Promise<import("./entities/auth.entity").auth>;
    login(loginUserDto: LoginUserDto): Promise<{
        access_token: string;
    }>;
}
