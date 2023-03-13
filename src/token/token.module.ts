import {Module} from '@nestjs/common';
import {TokenService} from './token.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Token} from "./token.model";
import {JwtModule} from "@nestjs/jwt";

@Module({
    providers: [TokenService],
    imports: [
        SequelizeModule.forFeature([Token]),
        JwtModule
    ],
    exports: [
        TokenService,
    ]
})
export class TokenModule {
}
