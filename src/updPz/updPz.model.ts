import {Column, DataType, Model, Table} from "sequelize-typescript";

interface UpdPzCreationAttrs {
}

@Table({
    tableName: "updPz"
})
export class UpdPz extends Model<UpdPz, UpdPzCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    src: string;

    @Column({type: DataType.STRING, allowNull: false})
    type: string;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, allowNull: false})
    for: string;
}