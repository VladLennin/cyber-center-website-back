import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Course} from "./course.model";
import {Question} from "./question.model";
import {Answer} from "./answer.model";
import {QuestionDto} from "./dto/question-dto";

@Injectable()
export class CourseService {

    constructor(@InjectModel(Course) private courseRepository: typeof Course,
                @InjectModel(Question) private questionRepository: typeof Question,
                @InjectModel(Answer) private answerRepository: typeof Answer) {
    }

    async createCourse(newCourse: any) {
        const course = await this.courseRepository.create({
            name: newCourse.name,
            img_href: newCourse.img_href,
            userId: 10
        })
        course.img_href = `course_${course.id}.${course.img_href}`
        await course.save()

        await this.createQuestions(newCourse.questions, course.id)

        return await Course.findOne({
            where: {id: course.id},
            include: [
                {
                    model: Question,
                    include: [Answer],
                },
            ],
        });
    }

    async createQuestions(questions: Question[], courseId: number) {
        for (let i = 0; i < questions.length; i++) {
            console.log(questions)
            const question = await this.questionRepository.create({
                courseId: courseId,
                correctAnswer: questions[i].correctAnswer,
                question: questions[i].question,
                img_href: questions[i].img_href
            })
            question.img_href = `course_${courseId}_${question.id}.${question.img_href}`
            await question.save()
            await this.createAnswers(questions[i].answers, question.id)
        }
    }

    async createAnswers(answers: Answer[], questionId: number) {
        for (let i = 0; i < answers.length; i++) {
            await this.answerRepository.create({...answers[i], questionId: questionId, text: answers[i].text})
        }
    }

    async getCourseWithQuestionsAndAnswers(courseId: number) {
        return await Course.findOne({
            where: {id: courseId},
            include: [
                {
                    model: Question,
                    include: [Answer],
                },
            ],
        });
    }

    async getCoursesPartly() {
        return await this.courseRepository.findAll();
    }
}