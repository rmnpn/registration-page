import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Render,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParticipantService } from './services/participant.service';
import { RegisterParticipantRequestDto } from './models/dto/request/register-participant.request.dto';
import { ParticipantMapper } from './services/participant.mapper';
import { Response } from 'express';
@ApiTags('Participant')
@Controller({ path: 'participants', version: '1' })
export class ParticipantController {
  constructor(private participantService: ParticipantService) {}

  @Get(':id/register')
  @Render('event-register')
  public async showEventRegistrationForm(@Param('id') id: string) {
    return { eventId: id };
  }

  @ApiOperation({ summary: 'Registration For Event' })
  @Post(':id/register')
  public async handleEventRegistration(
    @Param('id') id: string,
    @Body() dto: RegisterParticipantRequestDto,
    @Res() res: Response,
  ): Promise<void> {
    await this.participantService.register(dto);
    res.redirect(HttpStatus.FOUND, `/events/${id}`);
  }
}
