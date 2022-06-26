import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Lecture } from './entities/lecture.entity';
import { LecturesService } from './lectures.service';

describe('LecturesService', () => {
  let service: LecturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LecturesService,
        {
          provide: getRepositoryToken(Lecture),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<LecturesService>(LecturesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
