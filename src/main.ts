import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UserRole } from './users/enum/user-role.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const usersService = app.get(UsersService);

  if (!(await usersService.findOneByEmail('admin@test.com'))) {
    const user: CreateUserDto = {
      name: 'Administrator',
      email: 'admin@test.com',
      password: 'password',
      role: UserRole.ADMIN,
    };
    await usersService.create(user);
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(3000);
}
bootstrap();
