import { IsArray, IsNotEmpty } from 'class-validator';
export class DeleteManyIdsDto {
  @IsNotEmpty()
  @IsArray()
  ids: string[];
}
