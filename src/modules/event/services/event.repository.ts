import { Injectable } from '@nestjs/common';
import { EventEntity } from '../../../database/entities/event.entity';
import { DataSource, Repository } from 'typeorm';
import { EventListRequestDto } from '../models/dto/request/event-list.request.dto';
import { EventOrderByEnum } from '../models/enums/event-order-by.enum';
import { EventDetailsRequestDto } from '../models/dto/request/event-details.request.dto';

@Injectable()
export class EventRepository extends Repository<EventEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(EventEntity, dataSource.manager);
  }

  public async getEventList(
    query: EventListRequestDto,
  ): Promise<[EventEntity[], number]> {
    const qb = this.createQueryBuilder('event');
    if (query.search) {
      qb.andWhere(
        'CONCAT(LOWER(event.name), LOWER(event.organizer)) LIKE :search',
      );
      qb.setParameter('search', `%${query.search.toLowerCase()}%`);
    }
    if (query.orderBy) {
      switch (query.orderBy) {
        case EventOrderByEnum.EVENT_DATE:
          qb.addOrderBy('event.event_date', query.order);
          break;
        case EventOrderByEnum.TITLE:
          qb.addOrderBy('event.name', query.order);
          break;
        case EventOrderByEnum.ORGANIZER:
          qb.addOrderBy('event.organizer', query.order);
          break;
      }
    }
    qb.limit(query.limit);
    qb.offset(query.offset);
    return await qb.getManyAndCount();
  }

  public async getDetails(
    eventId: string,
    query: EventDetailsRequestDto,
  ): Promise<EventEntity> {
    const qb = this.createQueryBuilder('event');
    qb.leftJoinAndSelect(
      'event.participants',
      'participant',
      'participant.eventId = :eventId',
      { eventId },
    );
    qb.andWhere('event.id = :eventId', { eventId });

    if (query.search) {
      qb.andWhere(
        'CONCAT(LOWER(participant.fullname), LOWER(participant.email)) LIKE :search',
      );
      qb.setParameter('search', `%${query.search.toLowerCase()}%`);
    }
    return await qb.getOne();
  }
}
