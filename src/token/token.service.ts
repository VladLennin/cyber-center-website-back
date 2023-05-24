import {Injectable} from '@nestjs/common';
import * as process from "process";
import {InjectModel} from "@nestjs/sequelize";
import {Token} from "./token.model";
import {JwtService} from "@nestjs/jwt";
import {UserDto} from "../users/dto/user-dto";

@Injectable()
export class TokenService {

    constructor(private jwtService: JwtService,
                @InjectModel(Token) private tokenRepository: typeof Token) {
    }

    generateTokens(payload: UserDto) {
        const accessToken = this.jwtService.sign(payload, {expiresIn: "1h", secret: process.env.JWT_ACCESS_SECRET})
        const refreshToken = this.jwtService.sign(payload, {expiresIn: "1d", secret: process.env.JWT_REFRESH_SECRET})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = this.jwtService.verify(token, {secret: process.env.JWT_ACCESS_SECRET});
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = this.jwtService.verify(token, {secret: process.env.JWT_REFRESH_SECRET});
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await this.tokenRepository.findOne({where: {userId}})
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await this.tokenRepository.create({userId, refreshToken})
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await this.tokenRepository.destroy({where: {refreshToken: refreshToken}})
        console.log(tokenData)
        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await this.tokenRepository.findOne({where: {refreshToken}})
        return tokenData;
    }


}
