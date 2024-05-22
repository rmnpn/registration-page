import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ParticipantRepository } from './participant.repository';
import { RegisterParticipantRequestDto } from '../models/dto/request/register-participant.request.dto';
import { EventRepository } from '../../event/services/event.repository';
import { ParticipantEntity } from '../../../database/entities/participant.entity';
import { EventDetailsRequestDto } from '../../event/models/dto/request/event-details.request.dto';

@Injectable()
export class ParticipantService {
  constructor(
    private readonly participantRepository: ParticipantRepository,
    private readonly eventRepository: EventRepository,
  ) {}

  public async register(
    dto: RegisterParticipantRequestDto,
  ): Promise<ParticipantEntity> {
    const event = await this.eventRepository.findOneBy({ id: dto.eventId });
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    const participant = await this.participantRepository.findOneBy({
      email: dto.email,
      eventId: dto.eventId,
    });
    if (participant) {
      throw new ConflictException(
        'Participant already register for this event',
      );
    }
    const entity = await this.participantRepository.save(
      this.participantRepository.create(dto),
    );
    return await this.participantRepository.findOneWithEvent(entity.id);
  }
}
