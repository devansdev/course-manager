import { ApiProperty } from '@nestjs/swagger';

import { IsEmail } from 'class-validator';

export class SuspendUserDto {
  @ApiProperty({
    description: 'Lecture email',
    required: true,
  })
  @IsEmail()
  lecturer: string;

  @ApiProperty({
    description: 'Student email',
    required: true,
  })
  @IsEmail()
  student: string;
}
