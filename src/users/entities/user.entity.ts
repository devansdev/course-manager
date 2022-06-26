import { Lecture } from 'src/lectures/entities/lecture.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    name: 'type',
    type: 'smallint',
    nullable: false,
  })
  type: number;

  @OneToMany(() => Lecture, (lecture: Lecture) => lecture.lectureId)
  lectures: Lecture[];
}
