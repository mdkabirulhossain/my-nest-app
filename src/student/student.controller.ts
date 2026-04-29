/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService){}

    @Get()
    getAllStudents(@Query('page') page: string = '1', @Query('limit') limit: string = '10') {
        let pageNumber = Number(page) || 1;
        let limitNumber = Number(limit) || 10;

        // Ensure page and limit are positive integers
        pageNumber = Math.max(1, Math.floor(pageNumber));
        limitNumber = Math.max(1, Math.floor(limitNumber));

        // Industry standard: Set a reasonable maximum limit to prevent abuse
        const maxLimit = 100;
        if (limitNumber > maxLimit) {
            limitNumber = maxLimit;
        }

        const { data, total } = this.studentService.getAllStudents(pageNumber, limitNumber);

        return {
            statusCode: HttpStatus.OK,
            message: 'Students fetched successfully',
            data: data,
            meta: {
                page: pageNumber,
                limit: limitNumber,
                total: total,
                totalPage: Math.ceil(total / limitNumber),
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
