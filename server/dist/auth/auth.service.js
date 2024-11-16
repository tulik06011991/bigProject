"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const auth_entity_1 = require("../auth/entities/auth.entity");
let AuthService = AuthService_1 = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async register(createUserDto) {
        const { email, password, name } = createUserDto;
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            this.logger.warn(`User with email ${email} already exists`);
            throw new common_1.HttpException('User with this email already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new this.userModel({
            email,
            password: hashedPassword,
            name,
        });
        try {
            await newUser.save();
            this.logger.log(`User registered with email: ${email}`);
            return newUser;
        }
        catch (error) {
            this.logger.error('Registration failed', error.stack);
            throw new common_1.HttpException('Failed to register user', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async login(loginUserDto) {
        const { email, password } = loginUserDto;
        const auth = await this.userModel.findOne({ email });
        if (!auth) {
            this.logger.warn(`Auth not found for email: ${email}`);
            throw new common_1.HttpException('Invalid credentials: User not found', common_1.HttpStatus.UNAUTHORIZED);
        }
        const isMatch = await bcrypt.compare(password, auth.password);
        if (!isMatch) {
            this.logger.warn(`Invalid credentials for email: ${email}`);
            throw new common_1.HttpException('Invalid credentials: Incorrect password', common_1.HttpStatus.UNAUTHORIZED);
        }
        const payload = { email: auth.email, sub: auth._id };
        const token = this.jwtService.sign(payload);
        this.logger.log(`User logged in with email: ${email}`);
        return { access_token: token };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(auth_entity_1.auth.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map