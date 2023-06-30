import {Column, DataType, ForeignKey, HasMany, HasOne, Model, Table} from "sequelize-typescript";
import {Pz} from "../pz/pz.model";
import {Question} from "./question.model";
import {User} from "../users/users.model";


interface CourseCreationAttrs {
    name: string;
    img_href: string;
    userId: number
}

@Table({
    tableName: "courses",
})
export class Course extends Model<Course, CourseCreationAttrs> {
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, allowNull: false})
    img_href: string

    @HasMany(() => Question)
    questions: Question[]

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number
}