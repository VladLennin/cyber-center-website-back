import {Controller, Get, Post, Req, Res} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {NewsService} from "./news.service";

@Controller()
export class NewsController {

    constructor(private newsService: NewsService) {
    }

    @Post("admin/news")
    addNews(@Req() req, @Res() res) {
        const newsDto = req.body;
        console.log(req.body)
        return this.newsService.addNews(newsDto)
    }

    @Post("news")
    getNews(@Req() req) {
        return this.newsService.getNews(req.body.count);
    }

}
