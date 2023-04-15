import { IsBoolean } from 'class-validator';

export class MockAuthRes {
  @IsBoolean()
  isAuth: boolean;
}
