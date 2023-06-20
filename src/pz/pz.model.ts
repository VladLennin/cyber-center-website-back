import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Unit} from "../unit/unit.model";

interface PzCreationAttrs {
    typeFor: string;
    network: string;
    src: string;
}

@Table({
    tableName: "pz"
})
export class Pz extends Model<Pz, PzCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    os: string;

    @Column({type: DataType.STRING, allowNull: false})
    network: string;

    @Column({type: DataType.STRING, allowNull: false})
    src: string;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @ForeignKey(() => Unit)
    @Column({type: DataType.INTEGER})
    unitId: number

    @BelongsTo(() => Unit)
    unit: Unit;

}