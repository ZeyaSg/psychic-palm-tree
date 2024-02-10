import { SyntheticEvent, useState } from "react";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import useMutationEvents from "../../hooks/use-mutation-events";
import { useToast } from "../../components/ui/use-toast";
import { useStore } from "../../lib/store";

export const AddEventDialog = () => {
  const [name, setName] = useState("");
  const { addNewEvent } = useMutationEvents();
  const { toast } = useToast();
  const user = useStore((state) => state.user);
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [dateOfEvent, setDateOfEvent] = useState("");


  const handleSave = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!name) {
      toast({
        variant: "destructive",
        title: "Sorry! Name cannot be empty! 🙁",
        description: `Please enter a name for your event.`,
      });
      return;
    }
    await addNewEvent(name, location, dateOfEvent);
    setName("");
    setLocation("");
    setDateOfEvent("");
    setOpen(false);
  };

  const handleCancel = () => {
    setName("");
    setLocation("");
    setDateOfEvent("");
    setOpen(false);
  };

  const handleOnopenChange = (open: boolean) => {
    if (!open) {
      setName("");
      setLocation("");
      setDateOfEvent("");
    }
    setOpen(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOnopenChange}>
      <DialogTrigger asChild>
        <Button aria-label={"Create an Event"} variant="default" size="sm">
          <PlusCircledIcon className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create Event</DialogTitle>
          <DialogDescription>
            {user
              ? "Give a name to your event here."
              : "Please login to create an event."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {user && (
            <div className="grid items-center grid-cols-4 gap-4">
              <Input
                id="name"
                placeholder="Name of your event"
                value={name}
                className="col-span-4"
                onChange={(e) => {
                  e.preventDefault();
                  setName(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSave(e);
                  }
                }}
              />
              <Input
                id="location"
                placeholder="Location of your event (Optional)"
                value={location}
                className="col-span-4"
                onChange={(e) => {
                  e.preventDefault();
                  setLocation(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSave(e);
                  }
                }}
              />
              <Input
                id="dateOfEvent"
                placeholder="Date of your event (Optional)"
                value={dateOfEvent}
                className="col-span-4"
                onChange={(e) => {
                  e.preventDefault();
                  setDateOfEvent(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSave(e);
                  }
                }}
              />
            </div>
          )}
        </div>
        <DialogFooter>
          {!user && (
            <DialogClose asChild>
              <Button>Okay</Button>
            </DialogClose>
          )}
          {user && (
            <DialogClose asChild>
              <Button variant={"secondary"} type="reset" onClick={handleCancel}>
                Cancel
              </Button>
            </DialogClose>
          )}
          {user && (
            <DialogClose asChild>
              <Button type="submit" onClick={handleSave}>
                Save
              </Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
