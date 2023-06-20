import {Body, Controller, Get, Post, Req, Res, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {Roles} from "../auth/roles-auth.decorator";
import {AddRoleDto} from "./dto/add-role.dto";

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {
    }

    @Roles("ADMIN")
    @Get()
    getAllUsers() {
        return this.usersService.getUsers();
    }

    @Roles("ADMIN")
    @Post("/role")
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }

    @Post("edit")
    editUser(@Req() req) {
        const userId = req.body.userId;
        const value = req.body.value;
        const field = req.body.field;
        return this.usersService.editUser(userId, field, value)
    }

    @Post("/pk")
    getUserByPk(@Req() req){
        const id = req.body.userId;
        return this.usersService.getUserByPk(id)
    }

    @Post("/paginated")
    getNewsPaginated(@Req() req) {
        const page = req.body.page;
        const limit = req.body.limit;
        const offset = (page - 1) * limit;
        return this.usersService.getUsersPaginated(offset, limit);
    }

    @Get("/count")
    getCountNews() {
        return this.usersService.getCountUsers();
    }


}
