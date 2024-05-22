import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParticipantService } from './services/participant.service';
import { RegisterParticipantRequestDto } from './models/dto/request/register-participant.request.dto';
import { ParticipantResponseDto } from './models/dto/response/participant.response.dto';
import { ParticipantMapper } from './services/participant.mapper';

@ApiTags('Participant')
@Controller({ path: 'participants', version: '1' })
export class ParticipantController {
  constructor(private participantService: ParticipantService) {}

  @ApiOperation({ summary: 'Registration For Event' })
  @Post('registration')
  public async registrationForEvent(
    @Body() dto: RegisterParticipantRequestDto,
  ): Promise<ParticipantResponseDto> {
    const entity = await this.participantService.register(dto);
    return ParticipantMapper.toResponseDto(entity);
  }
}
