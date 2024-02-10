import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Event } from "./event.entity";
import { CreateEventDto } from "./event-create.dto";

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}
  // Creates a new instance of the Event entity and saves it to the database.
  // Returns the newly created event.
  async create(createEventDto: CreateEventDto, userId: number): Promise<Event> {
    const event = this.eventRepository.create({
      ...createEventDto,
      userId: userId,
    });
    return this.eventRepository.save(event);
  }

  async createEvent(eventDto: CreateEventDto): Promise<Event> {
    const { name, ...eventInfo } = eventDto;
    const event = await this.eventRepository.create({
      ...eventInfo,
      name: name,
    });
    return this.eventRepository.save(event);
  }

  async findOne(id: string): Promise<Event | null> {
    return this.eventRepository.findOneBy({ id });
  }

  // Return all events that match the given search criteria.
  // If no search criteria is given, returns all events with default pagination settings.
  async findAll(userId?: number): Promise<Event[]> {
    const queryBuilder = this.eventRepository.createQueryBuilder("event");

    let hasWhereCondition = false;

    if (userId !== undefined) {
      if (hasWhereCondition) {
        queryBuilder.andWhere("event.userId = :userId", { userId });
      } else {
        queryBuilder.where("event.userId = :userId", { userId });
        hasWhereCondition = true;
      }
    }

    return await queryBuilder.getMany();
  }
  //   // Updates entity partially. Entity must match the given id.
  //   // If this method is executed on a entity that does not exist, it will return null.
  //   async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
  //     const event = await this.eventRepository.preload({ id, ...updateEventDto });
  //     if (!event) {
  //       return null;
  //     }
  //     return this.eventRepository.save(event);
  //   }

  //   // Removes a given entity from the database and returns the entity that was removed.
  //   // If this method is executed on a entity that does not exist, it will return null.
  async remove(id: string): Promise<Event | null> {
    const event = await this.findOne(id);
    if (!event) {
      return null;
    }

    return this.eventRepository.remove(event);
  }
}
