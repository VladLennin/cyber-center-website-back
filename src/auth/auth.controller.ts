// import {Body, Controller, Get, Post, UsePipes} from '@nestjs/common';
// import {ApiTags} from "@nestjs/swagger";
// import {CreateUserDto} from "../users/dto/create-user.dto";
// import {AuthService} from "./auth.service";
// import {ValidationPipe} from "../pipes/validation.pipe";
// import {User} from "../users/users.model";
//
// @ApiTags("Auth")
// @Controller('auth')
// export class AuthController {
//
//     constructor(private authService: AuthService) {
//     }
//
//     @Post("/login")
//     login(@Body("email") email: string, @Body("password") password: string) {
//         return this.authService.login(email, password)
//     }
//
//     @Post("/registration")
//     registration(@Body("user") userDto: CreateUserDto) {
//         return this.authService.registration(userDto)
//     }
//
// }

import {Controller, Get, Post, Req, Res, UseGuards} from "@nestjs/common";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post("registration")
    async registration(@Req() req, @Res() res) {
        const user = req.body.user;
        const userData = await this.authService.registration(user)
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        res.send(userData)
    }

    @Post('login')
    async login(@Req() req, @Res({passthrough: true}) res) {
        const userData = await this.authService.login(req.body.email, req.body.password)
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        res.send(userData)
    }

    @Post("logout")
    async logout(@Req() req, @Res() res) {
        const {refreshToken} = req.cookies;
        const token = await this.authService.logout(refreshToken)
        res.clearCookie('refreshToken')
        return token
    }

    @Get('refresh')
    async refresh(@Req() req, @Res() res) {
        const {refreshToken} = req.cookies;
        const userData = await this.authService.refresh(refreshToken)
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 1000 * 60 * 60 * 24, httpOnly: true})
        res.send(userData);
    }
}


