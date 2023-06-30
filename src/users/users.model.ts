import {BelongsToMany, Column, DataType, HasMany, HasOne, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {Pz} from "../pz/pz.model";
import {Token} from "../token/token.model";
import {Course} from "../course/course.model";

interface UserCreationAttrs {
    email: string;
    password: string;
}

@Table({
    tableName: "users"
})
export class User extends Model<User, UserCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    surname: string;

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    fatherhood: string;

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    unit: string;


    @Column({type: DataType.STRING, unique: false, allowNull: false})
    rank: string;


    @Column({type: DataType.STRING, unique: false, allowNull: false})
    contactNumber: string;


    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]

    @HasMany(() => Course)
    courses: Course[]

    @HasOne(() => Token)
    token: Token

}