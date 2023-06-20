import {Column, DataType, Model, Table} from "sequelize-typescript";

interface FishingCreationAttrs {
}

@Table({tableName: "fishing"})
export class Fishing extends Model<Fishing, FishingCreationAttrs> {

    @Column({type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    img: string;

    @Column({type: DataType.DATE, allowNull: false})
    date: Date;

    @Column({type: DataType.STRING, allowNull: false})
    fakeSender: string;

    @Column({type: DataType.STRING, allowNull: false})
    sender: string;

    @Column({type: DataType.TEXT, allowNull: false})
    description: string;

}
