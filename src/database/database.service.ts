/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit, OnApplicationShutdown } from '@nestjs/common';

@Injectable()
export class DatabaseService implements OnModuleInit, OnApplicationShutdown {
    private isConnected = false;

    onModuleInit() {
        this.isConnected = true;
        console.log('Database is Connected..');
    }


    onApplicationShutdown(signal: string) {
        this.isConnected = false;
        console.log(`Database Disconnected due to app shutdown. Signal ${signal}`)
    }

    getStatus() {
        return this.isConnected ? 'Connected' : 'disconnect';
    }

}
