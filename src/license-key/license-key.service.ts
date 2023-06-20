import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {License} from "./license-key.model";
import {User} from "../users/users.model";

@Injectable()
export class LicenseKeyService {

    constructor(@InjectModel(License) private licenseRepository: typeof License,
                @InjectModel(User) private userRepository: typeof User) {
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

    async getAllRequests() {
        return await this.licenseRepository.findAll({order: [['status', 'ASC']]})
    }

    async getUserFromRequest(userId: number) {
        return await this.userRepository.findByPk(userId)
    }

    async rejectLicense(licenseId: number, userAllowedId: number) {
        const license = await this.licenseRepository.findByPk(licenseId)
        license.allowedById = userAllowedId;
        license.status = "Відхилено"
        await license.save()
        return license
    }

    async acceptLicense(licenseId: number, userAllowedId: number, key: string) {
        const license = await this.licenseRepository.findByPk(licenseId)
        license.allowedById = userAllowedId
        license.key = key;
        license.status = "Підтверджено"
        await license.save()
        return license
    }

    async getLicensePaginated(offset: number, limit: any) {
        return await this.licenseRepository.findAll({
            offset,
            limit,
            order: [['createdAt', 'DESC']]
        })
    }

    async getCountLicenses() {
        return await this.licenseRepository.count()
    }
}