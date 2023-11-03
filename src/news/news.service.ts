import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {News} from "./news.model";
import {CreateNewsDto} from "../news/dto/create-news.dto";
import {Op, Sequelize} from "sequelize";

@Injectable()
export class NewsService {
    constructor(@InjectModel(News) private newsRepository: typeof News) {
    }

    async addNews(newsDto: CreateNewsDto) {
        const news = await this.newsRepository.create(newsDto)
        return news;
    }

    async getNews() {
        const news = await this.newsRepository.findAll({
            limit: 10,
            order: [[Sequelize.col("date_pub"), 'DESC']],
        })
        return news;
    }

    async getNewsPaginated(offset: number, limit: number) {
        return await this.newsRepository.findAll({
            offset,
            limit,
            order: [['created_at', 'DESC']]
        })
    }

    async getCountNews() {
        return await this.newsRepository.count()
    }

    async getNewsById(id: number) {
        return await this.newsRepository.findByPk(id)
    }

    async getSearchedNews(searchString: string, all: boolean) {
        if (all) {
            return await this.newsRepository.findAll({
                order: [['created_at', 'DESC']],
                where: {
                    title: {
                        [Op.iLike]: `%${searchString}%`
                    }
                }
            })
        } else {
            return await this.newsRepository.findAll({
                limit: 5,
                order: [['created_at', 'DESC']],
                where: {
                    title: {
                        [Op.iLike]: `%${searchString}%`
                    }
                }
            })
        }
    }
}
