import { AddEventDialog } from "./event/add-event-dialog";

const Sidebar = () => {

  return (
    <div className="flex flex-col gap-2 p-4">
      <AddEventDialog />
    </div>
  );
};

export default Sidebar;
