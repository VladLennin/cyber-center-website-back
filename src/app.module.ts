import {Module} from "@nestjs/common";
import {UsersModule} from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import * as process from "process";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users/users.model";
import {RolesModule} from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {UserRoles} from "./roles/user-roles.model";
import {AuthModule} from './auth/auth.module';
import {NewsModule} from './news/news.module';
import {TokenModule} from './token/token.module';
import {Token} from "./token/token.model";
import {UnitModule} from './unit/unit.module';
import {PzModule} from './pz/pz.module';
import {Unit} from "./unit/unit.model";
import {Pz} from "./pz/pz.model";
import {News} from "./news/news.model";


@Module({
    controllers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: String(process.env.POSTGRES_PASSWORD),
            database: process.env.POSTGRES_DB,
            models: [User, Role, UserRoles, Token,Unit,Pz, News],
            autoLoadModels: true,
            logging: false
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        NewsModule,
        TokenModule,
        UnitModule,
        PzModule
    ],
})
export class AppModule {
}