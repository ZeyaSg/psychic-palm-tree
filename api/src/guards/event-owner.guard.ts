import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { RequestWithUser } from "src/decorators/user-id.decorator";
import { EventsService } from "src/events/events.service";

@Injectable()
export class EventOwnershipGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private eventsService: EventsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Get the user id from the request object
    const user = (request as RequestWithUser).user;
    const userId = user.userId;
    // The JWT strategy will throw an error if it fails to validate the token

    // Get the event id from the request params
    const eventId = request.params.id;

    // If eventId is not provided
    if (!eventId) {
      throw new BadRequestException("Invalid or missing event ID");
    }

    const event = await this.eventsService.findOne(eventId);

    // If event does not exist
    if (!event) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
    }

    // Check if the event belongs to the user
    return event.userId == userId;
  }
}
