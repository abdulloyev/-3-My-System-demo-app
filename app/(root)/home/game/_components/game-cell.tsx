import Image from "next/image";
import { CellType } from "@/types/game";

interface GameCellProps {
  type: CellType;
  isRobot: boolean;
  isSoul: boolean;
}

export function GameCell({ type, isRobot, isSoul }: GameCellProps) {
  return (
    <div
      className={`
      sm:h-[90px] sm:w-[90px] w-14 h-14 border-2 border-gray-300 rounded-lg
      flex items-center justify-center relative
      ${isRobot ? "bg-blue-200" : "bg-white"}
    `}
    >
      {type === "energy" && (
        <div className="w-full h-full bg-blue-500 rounded-lg opacity-50" />
      )}
      {type === "blocked" && (
        <Image
          src="/img/wall.png"
          alt="Robot"
          width={90}
          height={90}
          className="absolute z-10"
        />
      )}
      {type === "goal" && (
        <Image
          src="/img/home.png"
          alt="Goal"
          width={100}
          height={100}
          className="opacity-75"
        />
      )}
      {isRobot && (
        <Image
          src="/img/robotAi.png"
          alt="Robot"
          width={60}
          height={60}
          className="absolute z-10"
        />
      )}
      {isSoul && (
        <Image
          src="/img/soul.webp"
          alt="Soul"
          width={40}
          height={40}
          className="absolute z-20 animate-pulse"
        />
      )}
    </div>
  );
}
