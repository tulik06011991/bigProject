import { AuthService } from './auth.service';
import { CreateAuthDto } from '../auth/dto/create-auth.dto';
import { LoginUserDto } from '../auth/dto/login-user.dto';
export declare class AuthController {
    private readonly authService;
    private readonly logger;
    constructor(authService: AuthService);
    register(createAuthDto: CreateAuthDto): Promise<{
        message: string;
        data: import("./entities/auth.entity").auth;
    }>;
    login(loginUserDto: LoginUserDto): Promise<{
        message: string;
        data: {
            token: {
                access_token: string;
            };
        };
    }>;
}
