import {Controller, Get, Post, Req} from "@nestjs/common";
import {UpdPzService} from "./updPz.service";

@Controller("")
export class UpdPzController{

    constructor(private updPzService:UpdPzService) {
    }


    @Post("admin/upd-pz")
    createUpdPz(@Req() req){
        const updPz = req.body.updPz;
        return this.updPzService.createUpdPz(updPz)
    }

    @Get("admin/programs")
    getAllPrograms(){
        return this.updPzService.getAllPrograms()
    }


}