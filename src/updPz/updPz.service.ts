import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {UpdPz} from "./updPz.model";
import {AddPzDto} from "../pz/dto/add-pz.dto";
import {Sequelize} from "sequelize";

@Injectable({})
export class UpdPzService {

    constructor(@InjectModel(UpdPz) private updPzRepository: typeof UpdPz) {
    }

    async createUpdPz(newUpdPz: any) {
        try {
            const updPz = await this.updPzRepository.create(newUpdPz);
            const id = updPz.id
            updPz.src = `upd_pz_${id}.${updPz.src}`
            const updatedPz = await updPz.save()
            return updatedPz
        } catch (e) {
            throw e
        }
    }

    async getAllPrograms() {
        try {
            return this.updPzRepository.findAll({
                attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('for')), 'uniqueValues']],
            })
        } catch (e) {
            throw e
        }
    }

    async getAllUpdPz(){
        try{
            return await this.updPzRepository.findAll()
        }catch(e){
            throw e
        }
    }
}