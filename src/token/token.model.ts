import {Column, DataType, Model, Table} from "sequelize-typescript";


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

    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number;

    @Column({type: DataType.TEXT, allowNull: false})
    refreshToken: string;


}