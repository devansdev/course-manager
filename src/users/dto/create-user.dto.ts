import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Lecture email',
    required: true,
  })
  @IsEmail()
  lecturer: string;

  @ApiProperty({
    description: 'Student emails as an array',
    required: true,
    isArray: true,
  })
  @IsArray()
  @ArrayMinSize(1)
  students: string[];
}
