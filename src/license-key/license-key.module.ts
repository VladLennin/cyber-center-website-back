import {Module} from "@nestjs/common";
import {LicenseKeyController} from "./license-key.controller";
import {LicenseKeyService} from "./license-key.service";
import {License} from "./license-key.model";
import {User} from "../users/users.model";
import {SequelizeModule} from "@nestjs/sequelize";

@Module({
    controllers: [LicenseKeyController],
    providers: [LicenseKeyService],
    imports: [
        SequelizeModule.forFeature([License, User]),
    ],
    exports: [LicenseKeyService]
})
export class LicenseKeyModule {
}