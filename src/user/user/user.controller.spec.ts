import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import httpMock from 'node-mocks-http';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      imports: [], // masukin module lain di sini
      providers: [], // masukin provider lain di sini
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should can say hello', async () => {
    const response = await controller.sayHello('Ariq', 'Aziz');
    expect(response).toBe('Hello Ariq Aziz');
  });

  it('should can view template', async () => {
    const response = httpMock.createResponse();
    controller.viewHello('Ariq', response);

    expect(response._getRenderView()).toBe('index.html');
    expect(response._getRenderData()).toEqual({
      title: 'Template Engine',
      name: 'Ariq',
    });
  });
});
