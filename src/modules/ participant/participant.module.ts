import { forwardRef, Module } from '@nestjs/common';
import { ParticipantService } from './services/participant.service';
import { ParticipantController } from './participant.controller';
import { ParticipantRepository } from './services/participant.repository';
import { EventModule } from '../event/event.module';

@Module({
  imports: [forwardRef(() => EventModule)],
  controllers: [ParticipantController],
  providers: [ParticipantService, ParticipantRepository],
  exports: [ParticipantRepository],
})
export class ParticipantModule {}
