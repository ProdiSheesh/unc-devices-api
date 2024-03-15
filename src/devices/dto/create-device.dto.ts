import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { isUnique } from 'src/lib/validations/is-unique.validation';

export class CreateDeviceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @isUnique({ tableName: 'devices', column: 'tagNumber' })
  @IsString()
  @IsNotEmpty()
  tagNumber: string;

  @isUnique({ tableName: 'devices', column: 'serialNumber' })
  @IsString()
  @IsOptional()
  serialNumber: string;

  @IsString()
  @IsOptional()
  remarks: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsInt()
  @IsNotEmpty()
  categoryId: number;
}
