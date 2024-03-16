import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDeviceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  tagNumber: string;

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
