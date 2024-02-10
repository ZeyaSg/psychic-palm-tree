import Header from "../components/header";
import Feed from "../components/feed";
import Aside from "../components/aside";
import Sidebar from "@/components/sidebar";

const MainView = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <Feed />
      <Aside />
    </>
  );
};

export default MainView;
