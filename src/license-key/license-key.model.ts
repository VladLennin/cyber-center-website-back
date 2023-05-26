import {Column, DataType, ForeignKey, HasOne, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";

interface LicenseCreationAttrs {
}

@Table({tableName: "licenses"})
export class License extends Model<License, LicenseCreationAttrs> {
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false, defaultValue: "Відправлено"})
    status: string;

    @Column({type: DataType.STRING, defaultValue:""})
    key: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, defaultValue:0})
    allowedById: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull:false})
    userId: number;


}