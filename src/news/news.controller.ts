import {Controller, Get, HttpStatus, Param, Post, Query, Req, Res} from '@nestjs/common';
import {NewsService} from "./news.service";

@Controller()
export class NewsController {

    constructor(private newsService: NewsService) {
    }

    @Post("admin/news")
    addNews(@Req() req) {
        const newsDto = req.body
        console.log(newsDto)
        return this.newsService.addNews(newsDto);
    }

    @Get("news")
    getNews() {
        console.log("some")
        return this.newsService.getNews();
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
        console.log("catched")
        return this.newsService.getCountNews();
    }

    @Get("news/:id")
    getNewsById(@Param('id') id: number,) {
        return this.newsService.getNewsById(id)
    }

    @Post("news/search")
    getSearchedNews(@Req() req){
        const searchString = req.body.searchString;
        const all = req.body.all
        return this.newsService.getSearchedNews(searchString, all)
    }


}
