import { memo } from "react";
import AppName from "../../_components/appName";
import MenuBar from "./menuBar";
import Profile from "./profile";

const TopBar = () => {
  return (
    <div className="absolute border w-full flex justify-between items-center py-1 px-4 bg-purple-50">
      <div>
        <MenuBar />
      </div>

      <div>
        <AppName />
      </div>

      <div>
        <Profile />
      </div>
    </div>
  );
};

export default memo(TopBar);
