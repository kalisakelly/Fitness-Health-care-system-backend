import { Test, TestingModule } from '@nestjs/testing';
import { PostrepliesService } from './postreplies.service';

describe('PostrepliesService', () => {
  let service: PostrepliesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostrepliesService],
    }).compile();

    service = module.get<PostrepliesService>(PostrepliesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
