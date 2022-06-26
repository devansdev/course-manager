import { ApiProperty } from '@nestjs/swagger';

export class FilterUserDto {
  @ApiProperty({
    description: 'Lecture email',
    required: true,
  })
  lecturer: string[];
}
