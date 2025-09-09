import { Role } from '../enums/role.enum';
import { CreateUserDto } from '../user/dto/create-user.dto';

export const createUserDtoMock: CreateUserDto = {
  name: 'Teste',
  email: 'teste@test.com',
  birthAt: '1997-03-11',
  password: 'Aa123456#',
  role: Role.USER,
};
