/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService){}

    @Get()
    getAllStudents() {
        const result = this.studentService.getAllStudents();
        const limit = 10;
        const page = 1;
        return {
            statusCode: HttpStatus.OK,
            message: 'Students fetched successfully',
            data: result,
             meta: {
                page,
                limit,
                total: result.length,
                totalPage: Math.ceil(result.length / limit),
            },
        };
    }

    @Get(':id')
    getOne(@Param('id') id: string){
        const result = this.studentService.getStudentById(Number(id));
        return {
            statusCode: HttpStatus.OK,
            message: 'Student fetched successfully',
            data: result,
        };
    }

    @Post()
    create(@Body() body: {name: string; age: number; email: string}){
        const result = this.studentService.createStudent(body);
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Student created successfully',
            data: result,
        };
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: {name: string; age:number; email: string}){
        const result = this.studentService.updateStudent(Number(id), body);
        return {
            statusCode: HttpStatus.OK,
            message: 'Student updated successfully',
            data: result,
        };
    }

    @Patch(':id')
    patch(@Param('id') id: string, @Body() body: Partial<{name: string; age:number; email: string}>){
        const result = this.studentService.patchStudent(Number(id), body);
        return {
            statusCode: HttpStatus.OK,
            message: 'Student patched successfully',
            data: result,
        };
    }

    //Delete
    @Delete(':id')
    remove(@Param('id') id:string){
        this.studentService.deleteStudent(Number(id));
        return {
            statusCode: HttpStatus.OK,
            message: 'Student deleted successfully',
            data: null,
        };
    }
}
