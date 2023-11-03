import {Module} from "@nestjs/common";
import {UsersModule} from './users/users.module';
import {ConfigModule} from "@nestjs/config";
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
import {LicenseKeyModule} from "./license-key/license-key.module";
import {License} from "./license-key/license-key.model";
import {FishingModule} from "./fishing/fishing.module";
import {Fishing} from "./fishing/fishing.model";
import {UpdPz} from "./updPz/updPz.model";
import {UpdPzModule} from "./updPz/updPz.module";
import {CourseModule} from "./course/course.module";
import {Course} from "./course/course.model";
import {Question} from "./course/question.model";
import {Answer} from "./course/answer.model";


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
            models: [User, Role, UserRoles, Token, Unit, Pz, News, License, Fishing, UpdPz, Course, Question, Answer],
            autoLoadModels: true,
            logging: false
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        NewsModule,
        TokenModule,
        UnitModule,
        PzModule,
        LicenseKeyModule,
        FishingModule,
        UpdPzModule,
        CourseModule
    ],
})
export class AppModule {
}