import {Body, Controller, Get, Post, Req, Res, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {CreateUserDto} from "./dto/create-user.dto";
import {AddRoleDto} from "./dto/add-role.dto";

@ApiTags("Users")
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {
    }

    @ApiOperation({summary: "Отримати усіх користувачів"})
    @ApiResponse({status: 200, type: [User]})
    @Roles("ADMIN")
    @Post()
    getAllUsers() {
        return this.usersService.getUsers();
    }

    @ApiOperation({summary: "Видати роль"})
    @ApiResponse({status: 200, type: [User]})
    @Roles("ADMIN")
    @Post("/role")
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }

    @Post("edit")
    editUser(@Req() req, @Res() res) {
        const userId = req.body.userId;
        const value = req.body.value;
        const field = req.body.field;
        return this.usersService.editUser(userId, field, value)
    }

}
