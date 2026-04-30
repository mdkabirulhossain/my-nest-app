/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
    private students = [
        {
            id: 1,
            name: 'Kabirul',
            age: 23,
            email: 'kabirul@example.com' 
        },
        {
            id: 2,
            name: 'Rahman',
            age: 35,
            email: 'rahman@example.com'
        }
    ];

    getAllStudents(page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;
        const data = this.students.slice(skip, skip + limit);
        return {
            data,
            total: this.students.length,
        };
    }

    getStudentById(id: number){
        const student = this.students.find(std => std.id === id);

        if(!student) throw new NotFoundException('Student not Found!');

        return student;
    }

    //POST
    createStudent(data: CreateStudentDto){
        // Check for duplicate email
        const existingStudentByEmail = this.students.find(std => std.email === data.email);
        if (existingStudentByEmail) {
            throw new ConflictException(`Student with email ${data.email} already exists`);
        }

        const newStudent = {
            id: Date.now(),
            ...data,
        };
        this.students.push(newStudent);
        return newStudent;
    }


    //PUT
    updateStudent(id: number, data: UpdateStudentDto){
        const studentIndex = this.students.findIndex(std => std.id === id);

        if(studentIndex < 0) throw new NotFoundException('Student not Found!');

        if (data.email) {
            const existingStudentByEmail = this.students.find(std => std.email === data.email && std.id !== id);
            if (existingStudentByEmail) {
                throw new ConflictException(`Student with email ${data.email} already exists`);
            }
        }

        this.students[studentIndex] = {
            ...this.students[studentIndex],
            ...data
        };

        return this.students[studentIndex];
    }

    //PATCH
    patchStudent(id: number, data: UpdateStudentDto){
        const student = this.getStudentById(id);

        if (data.email) {
            const existingStudentByEmail = this.students.find(std => std.email === data.email && std.id !== id);
            if (existingStudentByEmail) {
                throw new ConflictException(`Student with email ${data.email} already exists`);
            }
        }

        Object.assign(student, data);
        return student;
    }

    //DELETE
    deleteStudent(id: number){
        const studentIndex = this.students.findIndex(std => std.id === id);

        if(studentIndex < 0) throw new NotFoundException('Student not Found!');

        this.students.splice(studentIndex, 1);
    }

}
