import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {CourseController} from "./course.controller";
import {CourseService} from "./course.service";
import {Course} from "./course.model";
import {Question} from "./question.model";
import {User} from "../users/users.model";
import {Answer} from "./answer.model";

@Module({
    controllers: [CourseController],
    providers: [CourseService],
    imports: [
        SequelizeModule.forFeature([Course, Question, User, Answer]),
    ],
    exports: [
        CourseService
    ]
})
export class CourseModule{}