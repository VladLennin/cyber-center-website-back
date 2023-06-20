import {Module} from "@nestjs/common";
import {FishingService} from "./fishing.service";
import {FishingController} from "./fishing.controller";
import {SequelizeModule} from "@nestjs/sequelize";
import {Fishing} from "./fishing.model";

@Module({
    providers: [FishingService],
    controllers: [FishingController],
    imports: [
        SequelizeModule.forFeature([Fishing]),
    ],
    exports: [FishingService]
})
export class FishingModule {
}