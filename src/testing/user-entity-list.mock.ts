import { Role } from '../enums/role.enum';
import { UserEntity } from '../user/entity/user.entity';

export const userEntityListMock: UserEntity[] = [
  {
    id: 1,
    name: 'Teste',
    email: 'teste@test.com',
    birthAt: '1997-03-11',
    password: '$2b$10$Dwh.PUKXlufxbrM0jGYkcevrKfUSWjHyUgXjbt0TQi6LwMUeYqu9G',
    role: Role.ADMIN,
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
  },
  {
    id: 2,
    name: 'Armando',
    email: 'armando@test.com',
    birthAt: '1997-03-11',
    password: '$2b$10$Dwh.PUKXlufxbrM0jGYkcevrKfUSWjHyUgXjbt0TQi6LwMUeYqu9G',
    role: Role.USER,
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
  },
  {
    id: 3,
    name: 'Bia',
    email: 'bia@test.com',
    birthAt: '1997-03-11',
    password: '$2b$10$Dwh.PUKXlufxbrM0jGYkcevrKfUSWjHyUgXjbt0TQi6LwMUeYqu9G',
    role: Role.USER,
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
  },
];
