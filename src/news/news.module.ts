import {Module} from '@nestjs/common';
import {NewsController} from './news.controller';
import {NewsService} from './news.service';
import {News} from "./news.model";
import {SequelizeModule} from "@nestjs/sequelize";

@Module({
    controllers: [NewsController],
    providers: [NewsService],
    imports: [
        SequelizeModule.forFeature([News]),
    ],
    exports: [
        NewsService
    ]
})
export class NewsModule {
}
