import {Controller, Get, Post, Req} from "@nestjs/common";
import {LicenseKeyService} from "./license-key.service";

@Controller("license")
export class LicenseKeyController{

    constructor(private licenseKeyService:LicenseKeyService) {}

    @Post()
    createRequest(@Req() req){
        const user = req.body
        return this.licenseKeyService.createRequest(user)
    }


    @Get()
    getAllRequests(){
        return this.licenseKeyService.getAllRequests()
    }
}