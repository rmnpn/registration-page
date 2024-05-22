import { Injectable } from '@nestjs/common';
import { EventRepository } from './event.repository';
import { EventListRequestDto } from '../models/dto/request/event-list.request.dto';
import { EventDetailsRequestDto } from '../models/dto/request/event-details.request.dto';

@Injectable()
export class EventService {
  constructor(private readonly eventRepository: EventRepository) {}

  public async getEventList(query: EventListRequestDto) {
    return await this.eventRepository.getEventList(query);
  }

  public async getDetails(eventId: string, query: EventDetailsRequestDto) {
    return await this.eventRepository.getDetails(eventId, query);
  }
}
