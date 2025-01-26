/* eslint-disable react/no-unescaped-entities */
"use client"; // Bu kod Next.js "client component" bo'lishini bildiradi.

import { useState, useCallback, useEffect } from "react"; // React hooks'larni import qilamiz.
import { Button } from "@/components/ui/button"; // Tugma komponenti.
import { Card } from "@/components/ui/card"; // Kartochka komponenti.
import Image from "next/image"; // Rasmni yuklash uchun Next.js moduli.
import { CellType, Direction, GameState } from "@/types/game"; // O'yin uchun tur va yo'nalish ma'lumotlarini import qilamiz.
import { GameCell } from "./game-cell"; // Har bir hujayra komponentini import qilamiz.
// import { MoveDown, MoveLeft, MoveRight, MoveUp } from "lucide-react";

// Bosqichlar gridlari
const LEVELS: { name: string; grid: CellType[][] }[] = [
  {
    name: "Tepa-past",
    grid: [
      ["empty", "blocked", "empty", "empty", "empty"],
      ["empty", "empty", "energy", "empty", "empty"],
      ["energy", "empty", "empty", "blocked", "energy"],
      ["empty", "blocked", "empty", "empty", "empty"],
      ["energy", "empty", "empty", "energy", "goal"],
    ],
  },
  {
    name: "Oldinga-orqaga",
    grid: [
      ["empty", "blocked", "energy", "empty", "goal"],
      ["empty", "empty", "blocked", "energy", "empty"],
      ["blocked", "energy", "empty", "empty", "energy"],
      ["empty", "blocked", "empty", "blocked", "empty"],
      ["energy", "empty", "empty", "energy", "empty"],
    ],
  },
  {
    name: "Chapga-o'nga",
    grid: [
      ["empty", "blocked", "energy", "empty", "goal"],
      ["empty", "empty", "blocked", "energy", "empty"],
      ["blocked", "energy", "empty", "empty", "energy"],
      ["empty", "blocked", "empty", "blocked", "empty"],
      ["energy", "empty", "empty", "energy", "empty"],
    ],
  },
  {
    name: "Uzoq-yaqin",
    grid: [
      ["empty", "blocked", "energy", "empty", "goal"],
      ["empty", "empty", "blocked", "energy", "empty"],
      ["blocked", "energy", "empty", "empty", "energy"],
      ["empty", "blocked", "empty", "blocked", "empty"],
      ["energy", "empty", "empty", "energy", "empty"],
    ],
  },
  {
    name: "Uzoq-yaqin",
    grid: [
      ["empty", "blocked", "energy", "empty", "goal"],
      ["empty", "empty", "blocked", "energy", "empty"],
      ["blocked", "energy", "empty", "empty", "energy"],
      ["empty", "blocked", "empty", "blocked", "empty"],
      ["energy", "empty", "empty", "energy", "empty"],
    ],
  },
];

export default function GameBoard() {
  const [currentLevel, setCurrentLevel] = useState(0); // Bosqich holati.
  const [gameState, setGameState] = useState<GameState>({
    robotPosition: { row: 0, col: 0 },
    soulPosition: null,
    grid: LEVELS[0].grid,
    moves: 0,
    isComplete: false,
  });
  const [audio, setAudio] = useState<{ [key: string]: HTMLAudioElement }>({}); // Ovoz fayllari.

  // useEffect - ovozlarni yuklash.
  useEffect(() => {
    setAudio({
      move: new Audio("/sound/short-and-bubbly.mp3"),
      energy: new Audio("/sound/Energiya.mp3"),
      complete: new Audio("/sound/finish-gold.mp3"),
    });
  }, []);

  // Ovoz ijrosi.
  const playSound = (sound: "move" | "energy" | "complete") => {
    if (audio[sound]) {
      audio[sound].currentTime = 0;
      audio[sound]
        .play()
        .catch(error => console.error("Ovoz ijrosida xatolik:", error));
    }
  };

  // Robotni harakatlantirish funksiyasi.
  const moveRobot = useCallback(
    (direction: Direction) => {
      setGameState(currentState => {
        const newPosition = { ...currentState.robotPosition };
        const { grid } = currentState;

        // Yo'nalishga qarab pozitsiyani yangilash.
        switch (direction) {
          case "up":
            if (newPosition.row > 0) newPosition.row--;
            break;
          case "down":
            if (newPosition.row < grid.length - 1) newPosition.row++;
            break;
          case "left":
            if (newPosition.col > 0) newPosition.col--;
            break;
          case "right":
            if (newPosition.col < grid[0].length - 1) newPosition.col++;
            break;
        }

        if (
          grid[newPosition.row][newPosition.col] === "blocked" ||
          (newPosition.row === currentState.robotPosition.row &&
            newPosition.col === currentState.robotPosition.col)
        ) {
          return currentState;
        }

        playSound("move");

        let newSoulPosition = currentState.soulPosition;
        const newGrid = currentState.grid.map(row => [...row]);

        if (grid[newPosition.row][newPosition.col] === "energy") {
          playSound("energy");
          newSoulPosition = { ...newPosition };
          newGrid[newPosition.row][newPosition.col] = "empty";
        }

        const isComplete = grid[newPosition.row][newPosition.col] === "goal";

        if (isComplete) {
          playSound("complete");
        }

        return {
          ...currentState,
          robotPosition: newPosition,
          soulPosition: newSoulPosition,
          grid: newGrid,
          moves: currentState.moves + 1,
          isComplete,
        };
      });
    },
    [audio]
  );

  // Keyingi bosqichga o'tish.
  const nextLevel = () => {
    if (currentLevel < LEVELS.length - 1) {
      setCurrentLevel(prev => prev + 1);
      setGameState({
        robotPosition: { row: 0, col: 0 },
        soulPosition: null,
        grid: LEVELS[currentLevel + 1].grid,
        moves: 0,
        isComplete: false,
      });
    } else {
      alert("O'yin tugadi! Barcha bosqichlarni yakunladingiz!");
    }
  };

  return (
    <Card className="p-6 bg-[#f5d6c6]">
      <div className="mb-6 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Joriy bosqich:{" "}
          <span className="text-blue-600">{LEVELS[currentLevel].name}</span>
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-inner">
          <Image
            src="/img/robot-game.png"
            alt="Robot"
            width={100}
            height={100}
            className="rounded-full border-4 border-blue-300 shadow-lg transform hover:scale-110 transition-transform duration-300"
          />
          <div className="text-center sm:text-left">
            <div className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              Qadamlar:{" "}
              <span className="text-blue-700 font-black">
                {gameState.moves}
              </span>
            </div>
            <p className="text-gray-500 text-sm sm:text-base mt-2">
              Har bir qadam muvaffaqiyat sari yaqinlashtiradi! 🚀
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 mb-6">
        {gameState.grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <GameCell
              key={`${rowIndex}-${colIndex}`}
              type={cell}
              isRobot={
                rowIndex === gameState.robotPosition.row &&
                colIndex === gameState.robotPosition.col
              }
              isSoul={
                gameState.soulPosition?.row === rowIndex &&
                gameState.soulPosition?.col === colIndex
              }
            />
          ))
        )}
      </div>
      <div className="grid grid-cols-3 gap-4 max-w-[300px] mx-auto">
        <div />
        <Button onClick={() => moveRobot("up")} disabled={gameState.isComplete}>
          {/* <MoveUp className="sm:size-8" /> */}
          Yuqoriga
        </Button>
        <div />
        <Button
          onClick={() => moveRobot("left")}
          disabled={gameState.isComplete}
        >
          {/* <MoveLeft className="sm:size-8" /> */}
          Chapga
        </Button>
        <Button
          onClick={() => moveRobot("down")}
          disabled={gameState.isComplete}
        >
          {/* <MoveDown className="sm:size-8" /> */}
          Pastga
        </Button>
        <Button
          onClick={() => moveRobot("right")}
          disabled={gameState.isComplete}
        >
          {/* <MoveRight className="sm:size-8" /> */}
          O'ngga
        </Button>
      </div>
      {gameState.isComplete && (
        <div className="mt-6 text-center">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 animate-bounce">
            Bosqich tugadi!
          </h1>
          <Button onClick={nextLevel} className="mt-4">
            Keyingi bosqichga o'tish
          </Button>
        </div>
      )}
    </Card>
  );
}
