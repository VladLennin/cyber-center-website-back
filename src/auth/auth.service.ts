import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {UsersService} from "../users/users.service";
import * as bcrypt from "bcryptjs";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {TokenService} from "../token/token.service";
import {UserDto} from "../users/dto/user-dto";


@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private tokenService: TokenService
    ) {
    }


    async registration(dto: CreateUserDto) {
        let candidate = await this.userService.getUserByEmail(dto.email)
        if (candidate) {
            throw new HttpException(`Користувач з  ${dto.email} вже існує`, HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(dto.password, 5);

        const user = await this.userService.createUser({...dto, password: hashPassword})

        const userDto = new UserDto(user)
        const tokens = this.tokenService.generateTokens({...userDto});
        await this.tokenService.saveToken(userDto.id,tokens.refreshToken);

        return {...tokens, user}
    }

    async login(email, password) {
        const user = await this.userService.getUserByEmail(email)
        if (!user) {
            throw new HttpException('Користувач з такою поштою не знайдений', HttpStatus.NOT_FOUND)
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw new HttpException('Пароль неправильний!', HttpStatus.BAD_REQUEST);
        }

        const userDto = new UserDto(user)
        const tokens = this.tokenService.generateTokens({...userDto});

        await this.tokenService.saveToken( userDto.id,tokens.refreshToken);
        return {...tokens, user}
    }

    async logout(refreshToken) {
        const token = await this.tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw new HttpException("Не авторизований користувач", HttpStatus.UNAUTHORIZED)
        }

        const userData = await this.tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await this.tokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb) {
            throw new HttpException("Не авторизований користувач ", HttpStatus.UNAUTHORIZED)
        }

        const user = await this.userService.getUserByPk(userData.id);
        const userDto = new UserDto(user)

        const tokens = this.tokenService.generateTokens({...userDto});
        console.log(tokens.refreshToken)

        await this.tokenService.saveToken(userDto.id,tokens.refreshToken);

        return {...tokens, user}
    }

}
