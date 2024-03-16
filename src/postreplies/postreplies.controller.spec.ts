import { Test, TestingModule } from '@nestjs/testing';
import { PostrepliesController } from './postreplies.controller';
import { PostrepliesService } from './postreplies.service';

describe('PostrepliesController', () => {
  let controller: PostrepliesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostrepliesController],
      providers: [PostrepliesService],
    }).compile();

    controller = module.get<PostrepliesController>(PostrepliesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
