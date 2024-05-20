import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { TableNameEnum } from './enums/table-name.enum';
import { BaseEntityModel } from './models/base-entity.model';
import { EventEntity } from './event.entity';

@Entity(TableNameEnum.PARTICIPANTS)
export class ParticipantEntity extends BaseEntityModel {
  @Column('text')
  fullname: string;

  @Column('text')
  email: string;

  @Column('date')
  dateOfBirth: Date;

  @Column('text')
  infoAboutEvent: string;

  @ManyToMany(() => EventEntity, (entity) => entity.participants)
  events?: EventEntity[];
}
