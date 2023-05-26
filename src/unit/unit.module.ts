import {forwardRef, Module} from '@nestjs/common';
import {UnitService} from './unit.service';
import {UnitController} from './unit.controller';
import {Pz} from "../pz/pz.model";
import {SequelizeModule} from "@nestjs/sequelize";
import {PzModule} from "../pz/pz.module";
import {Unit} from "./unit.model";

@Module({
    providers: [UnitService],
    controllers: [UnitController],
    imports: [
        SequelizeModule.forFeature([Unit, Pz]),
        forwardRef(() => PzModule)
    ],
    exports: [
        UnitService
    ]
})
export class UnitModule {
}
