import { EventResponseDto } from './event.response.dto';
import { EventOrderByEnum } from '../../enums/event-order-by.enum';
import { OrderEnum } from '../../../../../common/enums/order.enum';

export class EventListResponseDto {
  data: EventResponseDto[];
  meta: {
    limit?: number;
    offset?: number;
    total?: number;
    search?: string;
    orderBy?: EventOrderByEnum;
    order?: OrderEnum;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
