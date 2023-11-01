import BottomBar from "@/components/bottomBar";
import LeftBar from "@/components/leftBar";
import TopBar from "@/components/topBar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <TopBar />
      <LeftBar />

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>

      <BottomBar />
    </div>
  );
};

export default RootLayout;
