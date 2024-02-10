export type User = {
  id: string;
  userName: string;
};

export type Event = {
  id: string;
  userId: string;
  name: string;
  timestamp: string;
  location: string;
  dateOfEvent: string;
};
