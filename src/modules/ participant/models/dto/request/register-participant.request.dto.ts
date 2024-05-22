import {
  IsDate,
  IsEnum,
  IsString,
  IsUUID,
  Length,
  Matches,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { TransformHelper } from '../../../../../common/helpers/transform.helper';
import { HearFromEnum } from '../../enums/hear-from.enum';

export class RegisterParticipantRequestDto {
  @IsString()
  @Length(4, 60)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  fullname: string;

  @ApiProperty({ example: 'test@gmail.com' })
  @IsString()
  @Length(0, 300)
  @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
  email: string;

  @IsDate()
  @Type(() => Date)
  dateOfBirth: Date;

  @IsEnum(HearFromEnum)
  infoAboutEvent: HearFromEnum;

  @ApiProperty({ example: 'b892374f-54f5-4f83-b7f8-cb6db158187d' })
  @IsUUID()
  eventId: string;
}
