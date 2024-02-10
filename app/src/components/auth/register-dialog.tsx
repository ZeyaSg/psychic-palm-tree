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
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";
import useMutationUser from "../../hooks/use-mutations-users";

export const RegisterDialog = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const { registerUser } = useMutationUser();
  const [open, setOpen] = useState(false);

  const clearFields = () => {
    setUsername("");
    setPassword("");
  };

  const handleRegister = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!username || !password ) {
      toast({
        variant: "destructive",
        title: "Sorry! Username, and password cannot be empty! 🙁",
        description: `Please enter the required information to register.`,
      });
      return;
    }

    registerUser(username, password);

    clearFields();
    setOpen(false);
  };

  const handleCancel = () => {
    clearFields();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button aria-label={"Click to login"} variant="outline">
          Register
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
          <DialogDescription>
            Please complete this form to register.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              value={username}
              className="col-span-3"
              onChange={(e) => {
                e.preventDefault();
                setUsername(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRegister(e);
                }
              }}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              className="col-span-3"
              onChange={(e) => {
                e.preventDefault();
                setPassword(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRegister(e);
                }
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"} type="reset" onClick={handleCancel}>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" onClick={handleRegister}>
              Register
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
