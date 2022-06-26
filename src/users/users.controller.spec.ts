import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
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
