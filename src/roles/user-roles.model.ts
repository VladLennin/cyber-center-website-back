import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";
import {Role} from "./roles.model";

@Table({
    tableName: "user_roles",
    createdAt: false,
    updatedAt: false
})
export class UserRoles extends Model<UserRoles> {
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique: true})
    id: number

    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER, allowNull: false})
    roleId: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number;

}