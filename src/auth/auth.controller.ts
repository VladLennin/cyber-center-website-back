import {Body, Controller, Post, UsePipes} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";
import {ValidationPipe} from "../pipes/validation.pipe";
import {User} from "../users/users.model";

@ApiTags("Auth")
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @Post("/login")
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

    @Post("/registration")
    registration(@Body("user") userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }
}
