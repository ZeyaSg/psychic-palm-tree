import Events from "./event/events";
import { useStore } from "../lib/store";

const Feed = () => {
  const user = useStore((state) => state.user);
  return (
    <div className="flex flex-col w-full min-h-screen border-x border-stone-200 md:max-w-lg">
      {user ? (
          <Events />
        )
       : (
        <div className="flex flex-col items-center justify-center w-full h-full text-center">
          Please login to view your events or register to create a new event
        </div>
      )}
    </div>
  );
};

export default Feed;
