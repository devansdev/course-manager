import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

export const UNIQUE_LECTURE_STUDENT_CONSTRAINT =
  'unique_lecture_student_constraint';

@Entity('lectures')
@Unique(UNIQUE_LECTURE_STUDENT_CONSTRAINT, ['lectureId', 'studentId'])
export class Lecture {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'lecture_id',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  lectureId: string;

  @Column({
    name: 'student_id',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  studentId: string;

  @Column({
    name: 'suspended',
    type: 'smallint',
    nullable: false,
    default: 0,
  })
  suspended: number;
}
