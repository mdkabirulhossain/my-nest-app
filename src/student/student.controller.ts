/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService){}

    @Get()
    getAllStudents() {
        return this.studentService.getAllStudents();
    }

    @Get(':id')
    getOne(@Param('id') id: string){
        return this.studentService.getStudentById(Number(id));
    }

    @Post()
    create(@Body() body: {name: string; age: number; email: string}){
        return this.studentService.createStudent(body);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: {name: string; age:number; email: string}){
        return this.studentService.updateStudent(Number(id), body)
    }
}
