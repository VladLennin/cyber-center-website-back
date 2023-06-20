import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {UpdPzService} from "./updPz.service";
import {UpdPzController} from "./updPz.controller";
import {UpdPz} from "./updPz.model";

@Module({
    providers: [UpdPzService],
    controllers: [UpdPzController],
    imports: [
        SequelizeModule.forFeature([UpdPz]),
    ],
    exports: [
        UpdPzService
    ]
})
export class UpdPzModule {
}