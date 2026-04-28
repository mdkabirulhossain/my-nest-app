/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';

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

    getAllStudents(){
        return this.students;
    }

    getStudentById(id: number){
        const student = this.students.find(std => std.id === id);

        if(!student) throw new NotFoundException('Student not Found!');

        return student;
    }

    //POST
    createStudent(data: {name: string; age:number; email: string}){
        const newStudent = {
            id: Date.now(),
            ...data,
        };
        this.students.push(newStudent);
        return newStudent;
    }


    //PUT
    updateStudent(id: number, data: {name?: string; age?:number; email?: string}){
        const studentIndex = this.students.findIndex(std => std.id === id);

        if(studentIndex < 0) throw new NotFoundException('Student not Found!');

        this.students[studentIndex] = {
            ...this.students[studentIndex],
            ...data
        };

        return this.students[studentIndex];
    }

    //PATCH
    patchStudent(id: number, data: Partial<{name?: string; age?:number; email?:string}>){
        const student = this.getStudentById(id);
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
