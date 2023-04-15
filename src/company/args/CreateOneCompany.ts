import { IsMongoId, IsString } from 'class-validator';

export class CreateOneCompanyDto {
  @IsString()
  name: string;

  @IsString()
  doc: string;

  @IsMongoId()
  userId: string;
}
