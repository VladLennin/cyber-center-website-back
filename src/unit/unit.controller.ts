import {Body, Controller, Get, Post, Req, Res} from '@nestjs/common';
import {UnitService} from "./unit.service";
import {AddPzDto} from "../pz/dto/add-pz.dto";

@Controller()
export class UnitController {
    constructor(private unitService: UnitService) {
    }

    @Post("unit")
    async createUnit(@Req() req) {
        const name = req.body.unit.name;
        console.log(name)
        return await this.unitService.createUnit(name)
    }

    @Get("unit")
    async getUnits(@Res() res) {
        res.send(await this.unitService.getAll())
    }

    @Post("admin/ant-pz")
    async addPz(@Req() req) {
        const pz = req.body.pz
        const unitId = req.body.unitId
        return await this.unitService.addPz(pz, unitId)
    }

}
