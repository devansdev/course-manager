import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Lecture } from './entities/lecture.entity';

@Injectable()
export class LecturesService {
  constructor(
    @InjectRepository(Lecture)
    private lectureRepository: Repository<Lecture>,
  ) {}

  filterStudents(lecturerids: string[]) {
    return this.lectureRepository.find({
      where: {
        lectureId: In(lecturerids),
        suspended: 0,
      },
    });
  }

  filterByStudentIds(studentIds: string[]) {
    return this.lectureRepository.find({
      where: {
        studentId: In(studentIds),
        suspended: 0,
      },
    });
  }

  createLectures(lectures: Lecture[]) {
    this.lectureRepository.save(lectures).catch(() => {
      return new BadRequestException('could not add student to lecture!');
    });
  }

  async suspendStudent(lecture: string, student: string) {
    const updateEntity: Lecture = await this.lectureRepository.findOne({
      where: {
        lectureId: lecture,
        studentId: student,
      },
    });
    this.lectureRepository.update(updateEntity.id, {
      suspended: 1,
    });
  }
}
