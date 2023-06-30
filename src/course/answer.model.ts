import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Question} from "./question.model";

interface AnswerCreationAttrs {
    questionId: number;
    text: string;
}

@Table({
    tableName: "answers",
})
export class Answer extends Model<Answer, AnswerCreationAttrs> {
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique: true})
    id: number;

    @Column({type: DataType.INTEGER, allowNull:false})
    number: number;

    @Column({type: DataType.STRING})
    text: string;

    @ForeignKey(() => Question)
    @Column({type: DataType.INTEGER})
    questionId: number;


}