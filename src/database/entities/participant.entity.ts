import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TableNameEnum } from './enums/table-name.enum';
import { BaseEntityModel } from './models/base-entity.model';
import { EventEntity } from './event.entity';
import { HearFromEnum } from '../../modules/ participant/models/enums/hear-from.enum';

@Entity(TableNameEnum.PARTICIPANTS)
export class ParticipantEntity extends BaseEntityModel {
  @Column('text')
  fullname: string;

  @Column('text')
  email: string;

  @Column('date')
  dateOfBirth: Date;

  @Column('enum', { enum: HearFromEnum })
  infoAboutEvent: HearFromEnum;

  @Column()
  eventId: string;
  @ManyToOne(() => EventEntity, (entity) => entity.participants)
  @JoinColumn({ foreignKeyConstraintName: 'eventId' })
  event?: EventEntity;
}
