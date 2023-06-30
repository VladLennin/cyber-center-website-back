import {Controller, Get, Param, Post, Req} from "@nestjs/common";
import {CourseService} from "./course.service";

@Controller()
export class CourseController {

    constructor(private courseService: CourseService) {
    }

    @Post("admin/course")
    createCourse(@Req() req) {
        const course = req.body.course
        console.log(course)
        return this.courseService.createCourse(course)
    }

    @Get("/course/:id")
    getFullCourse(@Param("id") id: number) {
        return this.courseService.getCourseWithQuestionsAndAnswers(id)
    }

    @Get("/course")
    getCoursesPartly(){
        return this.courseService.getCoursesPartly()
    }

}