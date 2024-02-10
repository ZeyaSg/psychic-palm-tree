import Event from "./event";
import useQueryEvents from "../../hooks/use-query-events";

const Events = () => {
  const { events } = useQueryEvents();

  if (!events || events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-gray-500">No events found.</p>
      </div>
    );
  }

  return (
    <div className="">
      {events.map((event) => (
        <Event event={event} key={event.id} />
      ))}
    </div>
  );
};

export default Events;
