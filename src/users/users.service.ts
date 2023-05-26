import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                private roleService: RolesService) {
    }

    async editUser(userId: number, field: string, value: any) {

        if (field === "email") {
            const candidate = await this.userRepository.findOne({where: {email: value}})
            if (candidate) {
                throw new HttpException("Користувач з такою поштою вже існує", HttpStatus.BAD_REQUEST)
            }
            const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

            if (!emailRegex.test(value)) {
                throw new HttpException('Некоректна пошта', HttpStatus.BAD_REQUEST);
            }
        }

        if (value === "") {
            throw new HttpException("Значення за мале", HttpStatus.BAD_REQUEST)
        }


        const user = await this.getUserByPk(userId);
        if (!user) {
            throw new HttpException("Такого користувача не інсує", HttpStatus.BAD_REQUEST)
        }

        user[field] = value
        return user.save()
    }

    async createUser(dto: CreateUserDto) {
        console.log(dto)
        const user = await this.userRepository.create(dto)
        const role = await this.roleService.getRoleByValue("USER")
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user;
    }

    async getUsers() {
        const users = await this.userRepository.findAll({include: {all: true}})
        return users
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
        return user
    }

    async getUserByPk(id: number) {
        const user = await this.userRepository.findByPk(id, {include: {all: true}})
        return user
    }


    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        const role = await this.roleService.getRoleByValue(dto.value)
        if (role && user) {
            await user.$add('role', role.id)
            return dto
        }
        throw new HttpException("Користувач або роль не знайдені", HttpStatus.NOT_FOUND)
    }


}
