import {Controller, Get, Post, Query, Req} from "@nestjs/common";
import {LicenseKeyService} from "./license-key.service";

@Controller("license")
export class LicenseKeyController {

    constructor(private licenseKeyService: LicenseKeyService) {
    }

    @Post()
    createRequest(@Req() req) {
        const user = req.body
        return this.licenseKeyService.createRequest(user)
    }


    @Get()
    getAllRequests() {
        return this.licenseKeyService.getAllRequests()
    }

    @Post("/user")
    getUserFromRequest(@Req() req) {
        return this.licenseKeyService.getUserFromRequest(req.body.userId)
    }

    @Post("/accept")
    acceptLicense(@Req() req) {
        const userAllowedId = req.body.userAllowedId;
        const licenseId = req.body.licenseId;
        const key = req.body.key;
        return this.licenseKeyService.acceptLicense(licenseId, userAllowedId, key)
    }

    @Post("/reject")
    rejectLicense(@Req() req) {
        const userAllowedId = req.body.userAllowedId;
        const licenseId = req.body.licenseId;
        return this.licenseKeyService.rejectLicense(licenseId, userAllowedId)
    }


    @Post("/paginated")
    getNewsPaginated(@Req() req) {
        const page = req.body.page;
        const limit = req.body.limit;
        const offset = (page - 1) * limit;
        return this.licenseKeyService.getLicensePaginated(offset, limit);
    }

    @Get("/count")
    getCountNews() {
        return this.licenseKeyService.getCountLicenses();
    }



}