import { Role } from '../enums/role.enum';
import { UpdateUserDto } from '../user/dto/update-user.dto';

export const updateUserDtoMock: UpdateUserDto = {
  name: 'Teste',
  email: 'teste@test.com',
  birthAt: '1997-03-11',
  password: 'Aa123456#',
  role: Role.USER,
};
