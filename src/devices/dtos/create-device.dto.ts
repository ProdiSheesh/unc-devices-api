import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class CreateDeviceDto {
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

  @IsInt()
  @IsNotEmpty()
  category: number;
}
