import { forwardRef, Module } from '@nestjs/common';
import { EventService } from './services/event.service';
import { EventController } from './event.controller';
import { EventRepository } from './services/event.repository';
import { ParticipantModule } from '../ participant/participant.module';

@Module({
  imports: [forwardRef(() => ParticipantModule)],
  controllers: [EventController],
  providers: [EventService, EventRepository],
  exports: [EventRepository],
})
export class EventModule {}
