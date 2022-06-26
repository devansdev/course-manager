import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lecture } from './entities/lecture.entity';
import { LecturesService } from './lectures.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lecture])],
  providers: [LecturesService],
  exports: [LecturesService],
})
export class LecturesModule {}
