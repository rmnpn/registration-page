import { EventEntity } from '../../../database/entities/event.entity';
import { EventResponseDto } from '../models/dto/response/event.response.dto';
import { ParticipantMapper } from '../../ participant/services/participant.mapper';
import { EventListResponseDto } from '../models/dto/response/event-list.response.dto';
import { EventListRequestDto } from '../models/dto/request/event-list.request.dto';

export class EventMapper {
  public static toResponseDto(entity: EventEntity): EventResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      event_date: entity.event_date,
      organizer: entity.organizer,
      participants: entity.participants
        ? ParticipantMapper.toResponseManyDto(entity.participants)
        : null,
    };
  }

  public static toResponseListDto(
    entities: EventEntity[],
    total: number,
    query: EventListRequestDto,
  ): EventListResponseDto {
    return {
      data: entities.map(EventMapper.toResponseDto),
      meta: {
        ...query,
        total,
        hasNext: total - query.offset - query.limit > 0,
        hasPrev: query.offset > 0,
      },
    };
  }
}
