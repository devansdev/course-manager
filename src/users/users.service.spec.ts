import { Test, TestingModule } from '@nestjs/testing';
import { LecturesService } from 'src/lectures/lectures.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

const mockLecturesService = {
  findAll: () => 'as',
};

const lectureServiceProvider = {
  provide: LecturesService,
  useValue: mockLecturesService,
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, lectureServiceProvider],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create users and create lectures', async () => {
      const dto = new CreateUserDto();
      const result = await service.create(dto);
      console.log(result);
      //expect(cats).toEqual(catArray);
    });
  });
});
