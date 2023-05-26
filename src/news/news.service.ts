import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {News} from "./news.model";
import {CreateNewsDto} from "../news/dto/create-news.dto";
import {Sequelize} from "sequelize";

@Injectable()
export class NewsService {

    constructor(@InjectModel(News) private newsRepository: typeof News) {
    }

    async addNews(newsDto: CreateNewsDto) {
        const news = await this.newsRepository.create(newsDto)
        return news;
    }

    async getNews(count: number) {
        const news = await this.newsRepository.findAll({
            limit: count,
            order: [[Sequelize.col("date"), 'DESC']],
        })
        return news;
    }

    async getNewsPaginated(offset: number, limit: number) {
        return await this.newsRepository.findAll({
            offset,
            limit,
            order: [['createdAt', 'DESC']]
        })
    }

    async getCountNews() {
        return await this.newsRepository.count()
    }

    async getNewsById(id: number) {
        return await this.newsRepository.findByPk(id)
    }

}
