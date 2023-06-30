import {Answer} from "../answer.model";

export interface QuestionDto{
    img_href: string;
    correctAnswer: number;
    question: string;
    answers: Answer[]
}