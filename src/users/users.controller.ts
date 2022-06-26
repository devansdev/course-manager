import { Controller, Get, Post, Body, HttpCode, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { SuspendUserDto } from './dto/suspend-user.dto';
import { NotificationDto } from './dto/notification-user.dto';

@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    this.usersService.create(createUserDto);
  }

  @Post('suspend')
  suspend(@Body() suspendUserDto: SuspendUserDto) {
    return this.usersService.suspend(suspendUserDto);
  }

  @Post('retrievefornotifications')
  retriveForNotification(@Body() notificationDto: NotificationDto) {
    return this.usersService.retriveForNotification(notificationDto);
  }

  @Get('commonstudents')
  filterUsers(@Query() filterUserDto: FilterUserDto) {
    return this.usersService.filter(filterUserDto);
  }
}
