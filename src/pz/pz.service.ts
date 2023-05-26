import {Injectable} from '@nestjs/common';
import {AddPzDto} from "./dto/add-pz.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Pz} from "./pz.model";

@Injectable()
export class PzService {

    constructor(@InjectModel(Pz) private pzRepository: typeof Pz) {
    }

    async createPz(dto: AddPzDto) {
        const pz = await this.pzRepository.create(dto);
        const id = pz.id
        pz.src = `ant_pz_${id}.${pz.src}`
       const updatedPz = await pz.save()
        return updatedPz
    }


}
