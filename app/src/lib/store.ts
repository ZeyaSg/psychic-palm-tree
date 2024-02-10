import type { Event, User } from "./types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  events: Event[];
  user: User | null;
  selectedEventId: string | null;
};

type Action = {
  setEvents: (events: Event[]) => void;
  removeEvent: (id: string) => void;
  addEvent: (event: Event) => void;
  setUser: (user: User) => void;
  clearUser: () => void;
  setSelectedEventId: (id: string) => void;
  clearSelectedEventId: () => void;
};

// define the initial state
const initialState: State = {
  events: [],
  user: null,
  selectedEventId: null,
};

export const useStore = create<State & Action>()(
  immer((set, get) => ({
    ...initialState,

    setEvents: (events) => set({ events }),

    removeEvent: (id) => {
      const newEvents = get().events.filter((event) => event.id !== id);
      set({ events: newEvents });
    },

    addEvent: (event) => {
      set({ events: [event, ...get().events] });
    },

    setUser: (user) => set({ user }),

    clearUser: () => set({ user: null }),

    setSelectedEventId: (id) => set({ selectedEventId: id }),

    clearSelectedEventId: () => set({ selectedEventId: null }),

  })),
);
