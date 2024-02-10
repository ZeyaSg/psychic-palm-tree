import { Controller } from "@nestjs/common";
import { EventsService } from "./events.service";
import { CreateEventDto } from "./event-create.dto";
import { EventResponseDto } from "./event-response.dto";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { EventOwnershipGuard } from "src/guards/event-owner.guard";
import {
  Get,
  Delete,
  Param,
  Post,
  Body,
  NotFoundException,
} from "@nestjs/common";
import { UserId } from "src/decorators/user-id.decorator";

@Controller("events")
@UseGuards(JwtAuthGuard) //all actions require jwt authentication
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async create(
    @Body() createEventDto: CreateEventDto,
    @UserId() userId: number,
  ): Promise<EventResponseDto> {
    const event = await this.eventsService.create(createEventDto, userId);
    delete event.userId;
    return event;
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<EventResponseDto> {
    const event = await this.eventsService.findOne(id);
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    delete event.userId;
    return event;
  }

  @Get()
  async findAll(@UserId() userId: number): Promise<EventResponseDto[]> {
    const events = await this.eventsService.findAll(userId);

    return events;
  }
  @UseGuards(EventOwnershipGuard)
  @Delete(":id")
  async remove(
    @Param("id") id: string,
  ): Promise<{ statusCode: number; message: string }> {
    const event = await this.eventsService.remove(id);
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return {
      statusCode: 200,
      message: "Event deleted successfully",
    };
  }
}
