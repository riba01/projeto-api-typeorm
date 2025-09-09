import { Role } from '../enums/role.enum';
import { UpdatePatchUserDto } from '../user/dto/update-patch-user.dto';

export const updatePartialUserDtoMock: UpdatePatchUserDto = {
  name: 'Teste',
  email: 'teste@test.com',
  role: Role.USER,
};
