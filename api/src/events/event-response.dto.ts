import { UserResponseDTO } from "src/user/user-response.dto";

export class EventResponseDto {
  id: string;
  name: string;
  timestamp: Date;
  location?: string;
  dateOfEvent?: string;
  user?: UserResponseDTO;
}
