import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from 'src/dto/create-student.dto';
import { UpdateStudentDto } from 'src/dto/update-student.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async createStudent(
    @Res() response,
    @Body() createStudentDto: CreateStudentDto,
  ) {
    try {
      const student = await this.studentService.createStudent(createStudentDto);
      return response.status(HttpStatus.CREATED).json({
        msg: 'Student created successfully',
        Student: student,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Get()
  async getAllstudents(@Res() response) {
    try {
      const students = await this.studentService.getAllstudents();
      return response.status(HttpStatus.OK).json({
        count: students.length,
        Students: students,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        error: error.message,
      });
    }
  }

  @Put('/:id')
  async updateStudent(
    @Res() response,
    @Param('id') studentId: string,
    @Body()
    updateStudentDto: UpdateStudentDto,
  ) {
    try {
      const student = await this.studentService.updateStudent(
        studentId,
        updateStudentDto,
      );
      return response.status(HttpStatus.OK).json({
        msg: 'Student updated successfully',
        Student: student,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Get('/:id')
  async getSingleStudent(@Res() response, @Param('id') studentId: string) {
    try {
      const student = await this.studentService.getSingleStudent(studentId);
      return response.status(HttpStatus.OK).json({
        Student: student,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Delete('/:id')
  async deleteStudent(@Res() response, @Param('id') studentId: string) {
    try {
      const student = await this.studentService.deleteStudent(studentId);
      return response.status(HttpStatus.OK).json({
        msg: student,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }
}
