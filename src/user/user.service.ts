/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    private users = [
        {
            id: 1,
            name: 'Kabirul',
            email: 'kabirul@example.com' 
        },
        {
            id: 2,
            name: 'Rahman',
            email: 'rahman@example.com'
        }
    ];
    getAllUsers(){
        return this.users;
    }

    getUserById(id: number){
        return this.users.find(user => user.id === id);
    }
}
