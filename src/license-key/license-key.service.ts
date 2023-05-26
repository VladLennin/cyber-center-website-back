import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {License} from "./license-key.model";
import {User} from "../users/users.model";

@Injectable()
export class LicenseKeyService {

    constructor(@InjectModel(License) private licenseRepository: typeof License) {
    }


    async createRequest(user: User) {

        const notAllowedLicenses = await this.licenseRepository.findOne({
            where: {
                userId: user.id,
                status: "Відправлено"
            }, include: {all: true}
        })
        console.log(notAllowedLicenses)
        if (!notAllowedLicenses) {
            console.log(user.id)
            const license = await this.licenseRepository.create({userId: user.id})
            return license
        } else {
            throw new HttpException("Ви маєте ще не підтверджений запрос", HttpStatus.BAD_REQUEST)
        }
    }

    async getAllRequests(){
        return await this.licenseRepository.findAll()
    }
}