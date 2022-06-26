import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isArray, isEmail } from 'class-validator';
import { UserType } from 'src/enums/user-type';
import { Lecture } from 'src/lectures/entities/lecture.entity';
import { LecturesService } from 'src/lectures/lectures.service';
import { In, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { SuspendUserDto } from './dto/suspend-user.dto';
import { NotificationDto } from './dto/notification-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private lectureService: LecturesService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    // creates lecturer if not in the database
    const existingLecturer: User = await this.userRepository.findOne({
      where: {
        email: createUserDto.lecturer,
      },
    });

    if (!existingLecturer) {
      await this.userRepository
        .save({
          email: createUserDto.lecturer,
          type: UserType.LECTURER,
        })
        .catch(() => {
          return new BadRequestException('could not create lecturer!');
        });
    }

    // creates students if not in databse
    const existingStudents: User[] = await this.userRepository.find({
      where: {
        email: In(createUserDto.students),
      },
    });

    const insertingStudents: string[] = createUserDto.students.filter(
      (student: string) =>
        existingStudents.filter((user: User) => user.email === student)
          .length === 0,
    );

    // Students array validates for email
    insertingStudents.map((student: string) => {
      if (!isEmail(student)) {
        throw new BadRequestException('Student email validation failed!');
      }
    });
    await this.userRepository
      .save(
        insertingStudents.map((student: string) => ({
          email: student,
          type: UserType.STUDENT,
        })),
      )
      .catch(() => {
        return new BadRequestException('could not create students!');
      });

    const students: User[] = await this.userRepository.find({
      where: {
        email: In(createUserDto.students),
      },
    });

    this.lectureService.createLectures(
      students.map((student: User) => ({
        id: uuidv4(),
        lectureId: existingLecturer.id,
        studentId: student.id,
        suspended: 0,
      })),
    );
  }

  async filter(filterUserDto: FilterUserDto) {
    let emailValidation = true;
    let lecturers: User[] = [];
    if (isArray(filterUserDto.lecturer)) {
      filterUserDto.lecturer.map((lecturer: string) => {
        if (!isEmail(lecturer)) {
          emailValidation = false;
        }
      });
      if (!emailValidation) {
        throw new BadRequestException('Invalid email supplied!');
      }

      lecturers = await this.userRepository.find({
        where: {
          email: In(filterUserDto.lecturer),
          type: UserType.LECTURER,
        },
      });
    } else {
      const lecturer: any = filterUserDto.lecturer;
      lecturers = await this.userRepository.find({
        where: {
          email: lecturer,
          type: UserType.LECTURER,
        },
      });
    }

    const lectures: Lecture[] = await this.lectureService.filterStudents(
      lecturers.map((lecturer: User) => lecturer.id),
    );

    const users: User[] = await this.userRepository.find({
      where: {
        id: In(lectures.map((lecture: Lecture) => lecture.studentId)),
        type: UserType.STUDENT,
      },
      select: ['email'],
    });

    return users.map((user: User) => user.email);
  }

  async retriveForNotification(notificationDto: NotificationDto) {
    const lecturer: User = await this.userRepository.findOne({
      where: {
        email: notificationDto.lecturer,
        type: UserType.LECTURER,
      },
    });

    const foundEmails: string[] = [];
    let notification: string = notificationDto.notification;

    const emailRegex =
      /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    while (true) {
      const match: string[] = emailRegex.exec(notification);
      if (!match || match.length === 0) {
        break;
      }
      foundEmails.push(match[0]);
      notification = notification.replace(match[0], '');
    }

    let mentionedLectures: Lecture[] = [];
    if (foundEmails.length > 0) {
      const mentionedStudetns: User[] = await this.userRepository.find({
        where: {
          email: In(foundEmails),
        },
      });

      mentionedLectures = await this.lectureService.filterByStudentIds(
        mentionedStudetns.map((student: User) => student.id),
      );
    }

    // no need to filter from every one since the lecture specific stuednts shold always notified
    let lectureSpecificStudents: Lecture[] = [];
    lectureSpecificStudents = await this.lectureService.filterStudents([
      lecturer.id,
    ]);

    const returnStudentIds: string[] = [];
    mentionedLectures.map((lecture: Lecture) => {
      returnStudentIds.push(lecture.studentId);
    });
    lectureSpecificStudents.map((lecture: Lecture) => {
      if (returnStudentIds.indexOf(lecture.studentId) === -1) {
        returnStudentIds.push(lecture.studentId);
      }
    });

    const notificationStudents: User[] = await this.userRepository.find({
      where: {
        id: In(returnStudentIds),
      },
      select: ['email'],
    });
    return notificationStudents.map((student: User) => student.email);
  }

  async suspend(suspendUserDto: SuspendUserDto) {
    const users: User[] = await this.userRepository.find({
      where: {
        email: In([suspendUserDto.lecturer, suspendUserDto.student]),
      },
    });
    if (!users) {
      return new BadRequestException(
        'Either lecturer, student or both does not exist!',
      );
    }
    const students: User[] = users.filter(
      (user: User) => user.type === UserType.STUDENT,
    );

    if (students.length === 0) {
      return new BadRequestException('Student email has not been provied!');
    }

    const lecturers: User[] = users.filter(
      (user: User) => user.type === UserType.LECTURER,
    );

    if (lecturers.length === 0) {
      throw new BadRequestException('Lectureer email has not been provied!');
    }

    return this.lectureService.suspendStudent(lecturers[0].id, students[0].id);
  }
}
