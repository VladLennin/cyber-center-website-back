import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";

interface UserCreationAttrs {
    email: string;
    password: string;
}

@Table({
    tableName: "users"
})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: "1", description: "Унікальний ідентифікатор"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: "mail@mail.com", description: "Пошта"})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: "123456qwerty", description: "Пароль"})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: "mail@mail.com", description: "Пошта"})
    @Column({type: DataType.STRING, unique: false, allowNull: false})
    surname: string;

    @ApiProperty({example: "mail@mail.com", description: "Пошта"})
    @Column({type: DataType.STRING, unique: false, allowNull: false})
    name: string;

    @ApiProperty({example: "mail@mail.com", description: "Пошта"})
    @Column({type: DataType.STRING, unique: false, allowNull: false})
    fatherhood: string;

    @ApiProperty({example: "mail@mail.com", description: "Пошта"})
    @Column({type: DataType.STRING, unique: false, allowNull: false})
    unit: string;


    @ApiProperty({example: "mail@mail.com", description: "Пошта"})
    @Column({type: DataType.STRING, unique: false, allowNull: false})
    rank: string;


    @ApiProperty({example: "mail@mail.com", description: "Пошта"})
    @Column({type: DataType.STRING, unique: false, allowNull: false})
    contactNumber: string;


    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]
}