import { IsArray, IsString, ArrayNotEmpty } from 'class-validator';

export class CreateSubmissionDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  blockIds: string[];
}
