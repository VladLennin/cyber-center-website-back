import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {AuthService} from "./auth.service";
import {TokenService} from "../token/token.service";

@Injectable()
export class JwtAuthGuard implements CanActivate {

    constructor(private tokenService: TokenService
    ) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const authHeader = req.headers.authorization
            const bearer = authHeader.split(" ")[0]
            const accessToken = authHeader.split(" ")[1]

            if (!authHeader || !accessToken) {
                throw new UnauthorizedException({message: "Користувач не авторизован"})
            }

            const userData = this.tokenService.validateAccessToken(accessToken);
            if (!userData) {
                throw new UnauthorizedException({message: "Користувач не авторизован"})
            }

            return true

        } catch (e) {
            throw new UnauthorizedException({message: "Користувач не авторизован"})
        }
    }


}