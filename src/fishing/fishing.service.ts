import {Injectable} from "@nestjs/common";
import {CreateFishingDto} from "./dto/create.fishing.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Fishing} from "./fishing.model";
import {Sequelize} from "sequelize";

@Injectable()
export class FishingService {

    constructor(@InjectModel(Fishing) private fishingRepository: typeof Fishing) {
    }

    async createFishing(dto: CreateFishingDto) {
        console.log(dto)
        const fishing = await this.fishingRepository.create(dto);
        const id = fishing.id
        fishing.img = `fishing_${id}.${fishing.img}`
        const updatedFishing = await fishing.save()
        return updatedFishing
    }

    async getFishing(count: number) {
        const fishing = await this.fishingRepository.findAll({
            limit: count,
            order: [[Sequelize.col("date"), 'DESC']],
        })
        return fishing;
    }

    async getFishingPaginated(offset: number, limit: number) {
        return await this.fishingRepository.findAll({
            offset,
            limit,
            order: [['createdAt', 'DESC']]
        })
    }

    async getCountFishing() {
        return await this.fishingRepository.count()
    }

    async getFishingById(id: number) {
        return await this.fishingRepository.findByPk(id)
    }

}