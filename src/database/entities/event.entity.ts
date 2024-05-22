import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntityModel } from './models/base-entity.model';
import { TableNameEnum } from './enums/table-name.enum';
import { ParticipantEntity } from './participant.entity';

@Entity(TableNameEnum.EVENTS)
export class EventEntity extends BaseEntityModel {
  @Column('text')
  name: string;

  @Column('text')
  description: string;

  @Column('date')
  event_date: Date;

  @Column('text')
  organizer: string;

  @OneToMany(() => ParticipantEntity, (entity) => entity.event)
  participants: ParticipantEntity[];
}
