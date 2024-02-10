import { useToast } from "../components/ui/use-toast";
import { createEvent, deleteEvent } from "../lib/api";
import { useStore } from "../lib/store";

function useMutationEvents() {
  const { toast } = useToast();
  const removeEvent = useStore((state) => state.removeEvent);
  const addEvent = useStore((state) => state.addEvent);
  const deleteEventById = async (eventId: string) => {
    try {
      await deleteEvent(eventId);
      removeEvent(eventId);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to delete the event",
        description:
          (error as Error).message ||
          "There was an error deleting the event. Please try again later.",
      });
    }
  };

  const addNewEvent = async (name: string, location?: string, dateOfEvent?: string) => {
    try {
      const newEvent = await createEvent(name, location, dateOfEvent);
      addEvent(newEvent);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to create the event",
        description:
          (error as Error).message ||
          "There was an error creating the event. Please try again later.",
      });
    }
  };

  return { deleteEventById, addNewEvent };
}

export default useMutationEvents;
