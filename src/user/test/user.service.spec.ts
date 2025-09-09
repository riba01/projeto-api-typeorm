import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUserDtoMock } from '../../testing/create-user-dto.mock';
import { updateUserDtoMock } from '../../testing/update-user-dto.mock';
import { updatePartialUserDtoMock } from '../../testing/updatePartial-user-dto.mock';
import { userEntityListMock } from '../../testing/user-entity-list.mock';
import { userRepositoryMock } from '../../testing/user-repository.mock';
import { UserEntity } from '../entity/user.entity';
import { UserService } from '../user.service';

describe('UserService', () => {
  let userService: UserService;
  let usersRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, userRepositoryMock],
    }).compile();

    userService = module.get<UserService>(UserService);
    usersRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(usersRepository).toBeDefined();
  });

  describe('Create', () => {
    test('method create', async () => {
      jest.spyOn(usersRepository, 'findOneBy').mockResolvedValueOnce(null);
      const user = await userService.create(createUserDtoMock);

      expect(user).toEqual(userEntityListMock[0]);
    });
  });
  describe('Read', () => {
    test('method Read', async () => {
      const user = await userService.readAll();

      expect(user).toEqual(userEntityListMock);
    });

    test('method Read one', async () => {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockResolvedValueOnce(userEntityListMock[0]);
      const user = await userService.readOne(1);

      expect(user).toEqual(userEntityListMock[0]);
    });
  });
  describe('Update', () => {
    test('method update', async () => {
      const user = await userService.upadateUser(1, updateUserDtoMock);

      expect(user).toEqual(userEntityListMock[0]);
    });

    test('method updatePartial', async () => {
      const user = await userService.upadatePartialUser(
        1,
        updatePartialUserDtoMock,
      );

      expect(user).toEqual(userEntityListMock[0]);
    });
  });
  describe('Delete', () => {
    test('method delete', async () => {
      const user = await userService.deleteUser(1);

      expect(user).toEqual({
        name: userEntityListMock[0].name,
        email: userEntityListMock[0].email,
      });
    });
  });
});
