import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

const Main = ({ headerType }) => {
  return (
    <div className="text-white w-full h-screen flex flex-col items-center overflow-y-auto">
      <NavigationBar
        headerOne={headerType === "header-one"}
        headerTwo={headerType === "header-two"}
      />
      <main className="w-full flex items-center">
        <Outlet />
      </main>
    </div>
  );
};

export default Main;
