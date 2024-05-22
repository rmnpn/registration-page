import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ParticipantEntity } from '../../../database/entities/participant.entity';
import { EventDetailsRequestDto } from '../../event/models/dto/request/event-details.request.dto';
import { EventOrderByEnum } from '../../event/models/enums/event-order-by.enum';

@Injectable()
export class ParticipantRepository extends Repository<ParticipantEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ParticipantEntity, dataSource.manager);
  }
  public async findOneWithEvent(id: string): Promise<ParticipantEntity> {
    return await this.findOne({ where: { id }, relations: { event: true } });
  }
}
