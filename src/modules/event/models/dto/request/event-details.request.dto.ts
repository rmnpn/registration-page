import { IsOptional, IsString } from 'class-validator';

export class EventDetailsRequestDto {
  @IsOptional()
  @IsString()
  search?: string;
}
