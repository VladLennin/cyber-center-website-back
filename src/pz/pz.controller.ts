import {Controller, Post, Req} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {InjectModel} from "@nestjs/sequelize";
import {Token} from "../token/token.model";
import {PzService} from "./pz.service";

@Controller()
export class PzController {
    constructor(private pzService: PzService,) {
    }
    // @Post("admin/ant-pz")
    // addAntPz(@Req() req){
    //     const dto = req.body
    //   return  this.pzService.createPz(dto)
    // }
}
