import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Pz} from "../pz/pz.model";

interface UnitCreationAttrs {
    name: string;
}

@Table({
    tableName: "units"
})
export class Unit extends Model<Unit, UnitCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @HasMany(() => Pz)
    pz: Pz[]

}