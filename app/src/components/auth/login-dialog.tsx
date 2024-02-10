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

export const LoginDialog = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const { loginUser } = useMutationUser();
  const [open, setOpen] = useState(false);

  const clearFields = () => {
    setUsername("");
    setPassword("");
  };

  const handleLogin = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (!username || !password) {
      toast({
        variant: "destructive",
        title: "Sorry! Username and password cannot be empty!",
        description: `Please enter your credentials to login.`,
      });
      return;
    }

    loginUser(username, password);

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
        <Button aria-label={"Click to login"} variant="default">
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>Provide your credentials here.</DialogDescription>
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
                  handleLogin(e);
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
              value={password}
              className="col-span-3"
              type="password"
              onChange={(e) => {
                e.preventDefault();
                setPassword(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin(e);
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
            <Button type="submit" onClick={handleLogin}>
              Login
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
