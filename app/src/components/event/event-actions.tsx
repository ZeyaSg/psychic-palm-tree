import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import useMutationEvents from "../../hooks/use-mutation-events";
import { Event } from "../../lib/types";
import { useState } from "react";
import { Link } from "react-router-dom";

const EventActions = ({
  event,
  eventId,
}: {
  event: Event;
  eventId: string;
}) => {
  const { deleteEventById } = useMutationEvents();
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          onClick={() => setOpen(true)}
        >
          <DotsVerticalIcon className="w-5 h-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          className="text-red-500"
          onClick={() => deleteEventById(event.id)}
        >
          Delete
          <DropdownMenuItem>
            <Link to={`events/${eventId}`}>Link to event</Link>
          </DropdownMenuItem>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EventActions;
