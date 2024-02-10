import { useToast } from "../components/ui/use-toast";
import { fetchEvents, fetchEventById } from "../lib/api";
import { useStore } from "../lib/store";
import { useEffect, useState } from "react";
import { Event } from "../lib/types";

function useQueryEvents() {
  const { toast } = useToast();
  const events = useStore((state) => state.events);
  const setEvents = useStore((state) => state.setEvents);
  const setSelectedEventId = useStore((state) => state.setSelectedEventId);
  const clearSelectedEventId = useStore((state) => state.clearSelectedEventId);
  const [event, setEvent] = useState<Event | null>(null);

  const loadEvents = async () => {
    try {
      const fetchedEvents = await fetchEvents();
      setEvents(fetchedEvents);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to fetch events",
        description:
          (error as Error).message ||
          "There was an error loading the events. Please try again later.",
      });
    }
  };

  const loadEvent = async (id: string) => {
    let event = null;
    try {
      event = await fetchEventById(id);
      setEvent(event);
      setSelectedEventId(event.id);
    } catch (error) {
      setEvent(null);
      clearSelectedEventId();
      toast({
        variant: "destructive",
        title: "Failed to fetch events",
        description:
          (error as Error).message ||
          "There was an error loading the event. Please try again later.",
      });
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return { events, event, loadEvent };
}

export default useQueryEvents;
