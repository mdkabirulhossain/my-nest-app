import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { EmployeeModule } from './employee/employee.module';
import { EmpoyeeService } from './empoyee/empoyee.service';

@Module({
  imports: [EmployeeModule],
  controllers: [AppController, UserController, ProductController],
  providers: [AppService, UserService, ProductService, EmpoyeeService],
})
export class AppModule {}
