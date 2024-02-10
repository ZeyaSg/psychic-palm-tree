import { IsNotEmpty, IsString, IsOptional } from "class-validator";

export class CreateEventDto {
  @IsString()
  @IsNotEmpty({ message: "Name cannot be empty" })
  name: string;

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  dateOfEvent: string;
}
