import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { LecturesModule } from 'src/lectures/lectures.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), LecturesModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
