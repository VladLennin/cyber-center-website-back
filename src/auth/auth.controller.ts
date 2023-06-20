import {Controller, Get, HttpStatus, Post, Req, Res} from "@nestjs/common";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post("registration")
    async registration(@Req() req, @Res() res) {
        const user = req.body.user;
        const userData = await this.authService.registration(user)
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true,sameSite: 'none'})
        res.send(userData)
    }

    @Post('login')
    async login(@Req() req, @Res({passthrough: true}) res) {
        const userData = await this.authService.login(req.body.email, req.body.password)
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true,sameSite: 'none'})
        res.send(userData)
    }

    @Post("logout")
    async logout(@Req() req, @Res() res) {
        const {refreshToken} = req.cookies;
        const token = await this.authService.logout(refreshToken)
        res.clearCookie('refreshToken')
        res.send(HttpStatus.OK)
    }

    @Get('refresh')
    async refresh(@Req() req, @Res() res) {
        const {refreshToken} = req.cookies;
        const userData = await this.authService.refresh(refreshToken)
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 1000 * 60 * 60 * 24, httpOnly: true, secure: true,sameSite: 'none'})
        res.send(userData);
    }
}


