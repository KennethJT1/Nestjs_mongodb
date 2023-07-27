import { UpdateStudentDto } from '../dto/update-student.dto';
import { IStudent } from '../interface/student.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentDto } from 'src/dto/create-student.dto';

@Injectable()
export class StudentService {
  constructor(@InjectModel('Student') private studentModel: Model<IStudent>) {}

  async createStudent(createStudentDto: CreateStudentDto): Promise<IStudent> {
    const newStudent = await new this.studentModel(createStudentDto);
    return newStudent.save();
  }

  async getAllstudents(): Promise<IStudent[]> {
    const students = await this.studentModel.find();
    if (!students || students.length === 0) {
      throw new NotFoundException('Student not found');
    }
    return students;
  }

  async getSingleStudent(studentId: string): Promise<IStudent> {
    const existingStudent = await this.studentModel.findById(studentId);
    if (!existingStudent) {
      throw new NotFoundException(`'Studnt with #${studentId} not found`);
    }
    return existingStudent;
  }

  async deleteStudent(studentId: string): Promise<any> {
    const existingStudent = await this.studentModel.findByIdAndDelete(
      studentId,
    );
    if (!existingStudent) {
      throw new NotFoundException(`'Studnt with #${studentId} not found`);
    }
    return {
      msg: 'Student deleted successfully',
    };
  }

  async updateStudent(
    studentId: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<IStudent> {
    const existingStudent = await this.studentModel.findByIdAndUpdate(
      studentId,
      updateStudentDto,
      { new: true },
    );
    if (!existingStudent) {
      throw new NotFoundException(`'Studnt with #${studentId} not found`);
    }
    return existingStudent;
  }
}
