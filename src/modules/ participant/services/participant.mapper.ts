import { ParticipantEntity } from '../../../database/entities/participant.entity';
import { ParticipantResponseDto } from '../models/dto/response/participant.response.dto';
import { EventMapper } from '../../event/services/event.mapper';
import { EventDetailsRequestDto } from '../../event/models/dto/request/event-details.request.dto';

export class ParticipantMapper {
  public static toResponseDto(
    entity: ParticipantEntity,
  ): ParticipantResponseDto {
    return {
      id: entity.id,
      fullname: entity.fullname,
      email: entity.email,
      dateOfBirth: entity.dateOfBirth,
      infoAboutEvent: entity.infoAboutEvent,
      event: entity.event ? EventMapper.toResponseDto(entity.event) : null,
    };
  }

  public static toResponseManyDto(entities: ParticipantEntity[]) {
    return entities.map(ParticipantMapper.toResponseDto);
  }
}
