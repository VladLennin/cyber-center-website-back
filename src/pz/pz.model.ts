import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
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
    @ApiProperty({example: "1", description: "Унікальний ідентифікатор"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: "Windows 7", description: "Для якої системи"})
    @Column({type: DataType.STRING, allowNull: false})
    typeFor: string;

    @ApiProperty({example: "АСУ-Дніпро", description: "Тип мережі"})
    @Column({type: DataType.STRING, allowNull: false})
    network: string;

    @ApiProperty({example: "uploads/some.exe", description: "Ссилка на скачування"})
    @Column({type: DataType.STRING, allowNull: false})
    src: string;

    @ForeignKey(() => Unit)
    @Column({type: DataType.INTEGER})
    unitId: number

    @BelongsTo(() => Unit)
    unit: Unit;

}