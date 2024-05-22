import { HearFromEnum } from '../../enums/hear-from.enum';
import { EventResponseDto } from '../../../../event/models/dto/response/event.response.dto';

export class ParticipantResponseDto {
  id: string;
  fullname: string;
  email: string;
  dateOfBirth: Date;
  infoAboutEvent: HearFromEnum;
  event?: EventResponseDto;
}
