import { memo } from "react";
import AppName from "./appName";
import MenuBar from "./menuBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TopBar = () => {
  //
  return (
    <div className="absolute border w-full flex justify-between items-center py-1 px-4 bg-purple-50">
      <div>
        <MenuBar />
      </div>

      <div>
        <AppName />
      </div>

      <div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>US</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default memo(TopBar);
