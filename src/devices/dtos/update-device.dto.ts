import { IsInt, IsOptional, IsString } from 'class-validator';

export default class UpdateDeviceDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  tagNumber: string;

  @IsString()
  @IsOptional()
  serialNumber: string;

  @IsString()
  @IsOptional()
  remarks: string;

  @IsString()
  @IsOptional()
  status: string;

  @IsInt()
  @IsOptional()
  category: number;
}
