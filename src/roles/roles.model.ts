import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {UserRoles} from "./user-roles.model";

interface RoleCreationAttrs{
    value:string;
    description:string;
}

@Table({
    tableName: "roles"
})
export class Role extends Model<Role, RoleCreationAttrs> {
    @ApiProperty({example:"1", description:"Унікальний ідентифікатор"})
    @Column({type:DataType.INTEGER, primaryKey:true, autoIncrement:true, unique:true})
    id:number

    @ApiProperty({example:"Admin", description:"Роль користувача"})
    @Column({type: DataType.STRING, unique:true, allowNull:false})
    value: string;

    @ApiProperty({example:"Ви адмін, можете користуватись таким фунціоналом...", description:"Опис Ролі"})
    @Column({type: DataType.STRING, allowNull:false})
    description: string;


    @BelongsToMany(()=>User, ()=> UserRoles)
    users: User[]
}