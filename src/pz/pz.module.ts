import {forwardRef, Module} from '@nestjs/common';
import {PzService} from './pz.service';
import {PzController} from './pz.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {UnitModule} from "../unit/unit.module";
import {Unit} from "../unit/unit.model";
import {Pz} from "./pz.model";

@Module({
    providers: [PzService],
    controllers: [PzController],
    imports: [
        SequelizeModule.forFeature([Unit,Pz]),
        forwardRef(() => UnitModule)
    ],
    exports: [
        PzService
    ]
})
export class PzModule {
}
