import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {Unit} from "../unit/unit.model";
import {Course} from "./course.model";
import {Answer} from "./answer.model";

interface QuestionCreationAttrs {
    courseId: number;
    img_href:string;
    correctAnswer:number;
    question:string;

}

@Table({
    tableName: "questions",
})
export class Question extends Model<Question, QuestionCreationAttrs> {
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique: true})
    id: number;



    @Column({type: DataType.STRING, allowNull: false})
    img_href: string;

    @Column({type: DataType.INTEGER})
    correctAnswer: number;

    @Column({type: DataType.STRING, allowNull: false})
    question: string;

    @ForeignKey(() => Course)
    @Column({type: DataType.INTEGER})
    courseId: number

    @HasMany(() => Answer)
    answers: Answer[]

    @BelongsTo(() => Course)
    course: Course;
}