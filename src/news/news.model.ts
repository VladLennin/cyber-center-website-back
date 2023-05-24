import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";

interface NewsCreationAttrs {
    imgHref: string;
    content: string;
    name: string;
    date: Date;

}

@Table({
    tableName: "news"
})
export class News extends Model<News, NewsCreationAttrs> {
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    imgHref: string;

    @Column({type: DataType.TEXT, allowNull: false})
    content: string;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.DATE, allowNull: false})
    date: Date;


}