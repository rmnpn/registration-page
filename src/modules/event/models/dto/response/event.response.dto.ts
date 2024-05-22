import { ParticipantResponseDto } from '../../../../ participant/models/dto/response/participant.response.dto';

export class EventResponseDto {
  id: string;
  name: string;
  description: string;
  event_date: Date;
  organizer: string;
  participants?: ParticipantResponseDto[];
}
