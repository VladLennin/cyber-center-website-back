import {Body, Controller, Get, Post, Req, Res} from '@nestjs/common';
import {UnitService} from "./unit.service";
import {AddPzDto} from "../pz/dto/add-pz.dto";

@Controller('unit')
export class UnitController {

    //test

    constructor(private unitService: UnitService) {
    }

    @Post()
    async createUnit(@Req() req) {
        const name = req.body.unit.name;
        console.log(name)
        return await this.unitService.createUnit(name)
    }

    @Get()
    async getUnits(@Res() res) {
        res.send(await this.unitService.getAll())
    }

    @Post("/add-pz")
    async addPz(@Body("unitId") unitId: number, @Body("addPzDto") addPzDto: AddPzDto) {
        return await this.unitService.addPz(unitId, addPzDto)
    }

}
