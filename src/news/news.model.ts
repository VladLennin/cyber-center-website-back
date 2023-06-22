import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";

interface NewsCreationAttrs {
    imgHref: string;
    content: string;
    name: string;
    date: Date;

}

@Table({
    tableName: "news",
    timestamps: false
})
export class News extends Model<News, NewsCreationAttrs> {
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique: true})
    id: number;

    @Column({type:DataType.TEXT})
    hashed_link:string;

    @Column({type: DataType.TEXT, allowNull: false})
    img_href: string;

    @Column({type: DataType.TEXT, allowNull: false})
    content: string;

    @Column({type: DataType.TEXT, allowNull: false})
    title: string;

    @Column({type: DataType.DATE, allowNull: false})
    date_pub: Date;

    @Column({type:DataType.DATE, allowNull:false})
    created_at:Date;

    @Column({type:DataType.TEXT, allowNull:false})
    description:string;


}