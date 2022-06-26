import { Test, TestingModule } from '@nestjs/testing';
import { LecturesService } from 'src/lectures/lectures.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const mockLecturesService = {
  findAll: () => 'as',
};

const lectureServiceProvider = {
  provide: LecturesService,
  useValue: mockLecturesService,
};

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, lectureServiceProvider],
    }).compile();
    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should shold add students to a lecture', () => {
    jest
      .spyOn(new UsersService(null, null), 'create')
      .mockImplementation(() => null);
    expect(
      controller.create({
        lecturer: 'lecturerken@hotmail.com',
        students: ['studentjon@hotmail.com', 'studenthon@hotmail.com'],
      }),
    ).toBeNull();
  });
});
