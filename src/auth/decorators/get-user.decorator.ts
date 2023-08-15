import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';

export const GetUser = createParamDecorator( //los decoradores son simples funciones
//esta funcion recibe un callback
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    const userEmail = req.user.email;

    if (!user)
      throw new InternalServerErrorException(`User not found (request)`);
    return !data ? user : user[data];
  },
);
