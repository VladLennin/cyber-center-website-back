import {Controller, Get, Post, Query, Req} from "@nestjs/common";
import {FishingService} from "./fishing.service";
import {CreateFishingDto} from "./dto/create.fishing.dto";

@Controller("/fishing")
export class FishingController {

    constructor(private fishingService: FishingService) {
    }

    @Post()
    createFishing(@Req() req) {
        const dto: CreateFishingDto = req.body.fishing
        return this.fishingService.createFishing(dto)
    }

    @Get()
    getNews(@Req() req) {
        return this.fishingService.getFishing(req.body.count);
    }

    @Post("paginated")
    getNewsPaginated(@Req() req) {
        const page = req.body.page;
        const limit = req.body.limit;
        const offset = (page - 1) * limit;
        return this.fishingService.getFishingPaginated(offset, limit);
    }

    @Get("count")
    getCountNews() {
        return this.fishingService.getCountFishing();
    }

    @Get()
    getNEwsById(@Query('id') id: number,) {
        return this.fishingService.getFishingById(id)
    }


}