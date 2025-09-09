import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { userEntityListMock } from './user-entity-list.mock';

export const userRepositoryMock = {
  provide: getRepositoryToken(UserEntity),
  useValue: {
    create: jest.fn(),
    save: jest.fn().mockResolvedValue(userEntityListMock[0]),
    find: jest.fn().mockResolvedValue(userEntityListMock),
    findOne: jest.fn().mockResolvedValue(userEntityListMock[0]),
    findOneBy: jest.fn().mockResolvedValue(null),
    update: jest.fn().mockResolvedValue(userEntityListMock[0]),
    delete: jest.fn(),
  },
};
