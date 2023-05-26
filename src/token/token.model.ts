import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Unit} from "../unit/unit.model";
import {User} from "../users/users.model";


interface TokenCreationAttrs {
    refreshToken: string;
    userId: number;
}


@Table({
    tableName: "tokens"
})
export class Token extends Model<Token, TokenCreationAttrs> {
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique: true})
    id: number

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number;

    @Column({type: DataType.TEXT, allowNull: false})
    refreshToken: string;

}