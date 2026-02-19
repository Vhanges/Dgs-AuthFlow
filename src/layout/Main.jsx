import { Outlet } from "react-router-dom";
import Header from "../components/Main/Header";

const Main = ({ headerType }) => {
  return (
    <div className="text-white w-full h-screen flex flex-col items-center overflow-y-auto">
      <Header
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
