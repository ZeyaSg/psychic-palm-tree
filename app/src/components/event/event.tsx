import type { Event as EventType } from "../../lib/types";
import EventActions from "./event-actions";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { OpenInNewWindowIcon } from "@radix-ui/react-icons";

const Event = ({ event }: { event: EventType }) => {
  const [eventId, setEventId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (event) {
      const { id } = event;
      setEventId(id);
    }
  }, [event]);

  const handleClickEvent = () => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div className="border-b ">
      <div className="relative w-3/4 h-48 mx-auto mt-5 bg-gray-200 rounded shadow-lg sm:w-72 md:w-96 sm:h-56 md:h-64 mb-7">
        
        <div className="absolute top-0 left-0 w-full h-full bg-white rounded shadow-md">
          <div className="flex justify-between">
            <div className="p-4 sm:p-5 md:p-6">
              <p className="font-semibold text-md sm:text-lg">{event.name}</p>
              <p className="text-md sm:text-lg">{event.location}</p>
              <p className="text-md sm:text-lg">{event.dateOfEvent}</p>
            </div>
            <div className="p-4">
              {" "}
              <EventActions event={event} eventId={eventId}/>
            </div>
          </div>
          <div className="absolute bottom-0 right-0">
            <div className="flex p-4">
              <Button
                variant="ghost"
                className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                onClick={handleClickEvent}
              >
                <OpenInNewWindowIcon className="w-5 h-5" />
                <span className="sr-only">Open event</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
