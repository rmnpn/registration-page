import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { EventOrderByEnum } from '../../enums/event-order-by.enum';
import { OrderEnum } from '../../../../../common/enums/order.enum';

export class EventListRequestDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number = 9;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  offset?: number = 0;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(EventOrderByEnum)
  orderBy?: EventOrderByEnum = EventOrderByEnum.EVENT_DATE;

  @IsOptional()
  @IsEnum(OrderEnum)
  order?: OrderEnum = OrderEnum.ASC;
}
