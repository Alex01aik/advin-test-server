import { IsMongoId, IsString } from 'class-validator';

export class CreateOneCompanyDto {
  @IsString()
  name: string;

  @IsMongoId()
  userId: string;
}
