import { IsNotEmpty, IsString } from 'class-validator';

export default class UpdateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
