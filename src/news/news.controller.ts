import {Controller, Get, HttpStatus, Param, Post, Query, Req, Res} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {NewsService} from "./news.service";

@Controller()
export class NewsController {

    constructor(private newsService: NewsService) {
    }

    @Post("admin/news")
    addNews(@Req() req) {
        const newsDto = req.body
        return this.newsService.addNews(newsDto);
    }

    @Post("news")
    getNews(@Req() req) {
        return this.newsService.getNews(req.body.count);
    }

    @Post("news/paginated")
    getNewsPaginated(@Req() req) {
        const page = req.body.page;
        const limit = req.body.limit;
        const offset = (page - 1) * limit;
        return this.newsService.getNewsPaginated(offset, limit);
    }

    @Get("news/count")
    getCountNews() {
        return this.newsService.getCountNews();
    }

    @Get("news")
    getNEwsById(@Query('id') id: number,) {
        return this.newsService.getNewsById(id)
    }


}
