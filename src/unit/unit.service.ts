import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Unit} from './unit.model';
import {InjectModel} from "@nestjs/sequelize";
import {AddPzDto} from "../pz/dto/add-pz.dto";
import {PzService} from "../pz/pz.service";

@Injectable()
export class UnitService {

    constructor(@InjectModel(Unit) private unitRepository: typeof Unit,
                private pzService: PzService) {
    }

    async createUnit(name: string) {
        const candidate = await this.unitRepository.findOne({where: {name: name}})
        if (candidate) {
            throw new HttpException("Підрозділ з такою назвою вже існує", HttpStatus.BAD_REQUEST)
        }

        return await this.unitRepository.create({name})
    }

    async getAll() {
        return await this.unitRepository.findAll({include: {all: true}})
    }

    async addPz(pzDto: AddPzDto, unitId: number) {
        console.log(unitId)
        const unit = await this.unitRepository.findByPk(unitId, {include: {all: true}})
        console.log(unit)
        if (!unit) {
            throw new HttpException("Такого підрозділу не існує", HttpStatus.NOT_FOUND)
        }

        const pz = await this.pzService.createPz(pzDto)
        if (!pz) {
            throw new HttpException("При створенні ПЗ виникла помилка", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        await unit.$add('pz', pz.id)
        return pz;
    }


}
