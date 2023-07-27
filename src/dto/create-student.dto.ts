import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @MaxLength(36)
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly roleNumber: number;

  @IsNumber()
  @IsNotEmpty()
  readonly class: number;

  @IsString()
  @MaxLength(36)
  @IsNotEmpty()
  readonly gender: string;

  @IsNumber()
  @IsNotEmpty()
  readonly marks: number;
}
