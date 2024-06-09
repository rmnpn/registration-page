import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, Query, Render } from '@nestjs/common';
import { EventService } from './services/event.service';
import { EventListRequestDto } from './models/dto/request/event-list.request.dto';
import { EventListResponseDto } from './models/dto/response/event-list.response.dto';
import { EventMapper } from './services/event.mapper';
import { EventDetailsRequestDto } from './models/dto/request/event-details.request.dto';
import { EventResponseDto } from './models/dto/response/event.response.dto';

@ApiTags('Event')
@Controller({ path: 'events', version: '1' })
export class EventController {
  constructor(private eventService: EventService) {}

  @Get()
  @Render('events-list')
  public async getEvents(
    @Query() query: EventListRequestDto,
  ): Promise<EventListResponseDto> {
    const [entities, total] = await this.eventService.getEventList(query);
    return EventMapper.toResponseListDto(entities, total, query);
  }

  @ApiOperation({ summary: 'Get list for event' })
  @Get(':eventId')
  @Render('event-participants')
  public async getDetails(
    @Param('eventId') eventId: string,
    @Query() query: EventDetailsRequestDto,
  ): Promise<EventResponseDto> {
    const entity = await this.eventService.getDetails(eventId, query);
    return EventMapper.toResponseDto(entity);
  }

}
