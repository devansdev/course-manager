import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class NotificationDto {
  @ApiProperty({
    description: 'Lecture email',
    required: true,
  })
  @IsEmail()
  lecturer: string;

  @ApiProperty({
    description: 'Notification',
    required: true,
  })
  notification: string;
}
