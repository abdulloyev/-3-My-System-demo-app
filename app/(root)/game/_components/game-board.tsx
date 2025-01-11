/* eslint-disable react/no-unescaped-entities */
"use client"; // Bu kod Next.js "client component" bo'lishini bildiradi.

import { useState, useCallback, useEffect } from "react"; // React xookslarni import qilamiz.
import { Button } from "@/components/ui/button"; // Tugma komponenti.
import { Card } from "@/components/ui/card"; // Kartochka komponenti.
import Image from "next/image"; // Rasmni yuklash uchun Next.js moduli.
import { Direction, GameState } from "@/types/game"; // O'yin uchun tur va yo'nalish ma'lumotlarini import qilamiz.
import { GameCell } from "./game-cell"; // Har bir hujayra komponentini import qilamiz.
import { MoveDown, MoveLeft, MoveRight, MoveUp } from "lucide-react";

// O'yinning dastlabki holati
const INITIAL_STATE: GameState = {
  robotPosition: { row: 0, col: 0 }, // Robot qaysi satr va ustunda joylashganini bildiradi.
  soulPosition: null, // Robot "soul" (energiyani) to'plagan pozitsiya (hozircha null).
  grid: [
    ["empty", "blocked", "empty", "empty", "empty"], // 1-qatordagi hujayralar.
    ["energy", "empty", "empty", "blocked", "energy"], // 2-qatordagi hujayralar.
    ["empty", "empty", "energy", "empty", "goal"], // 3-qatordagi hujayralar ("goal" - maqsad joylashgan joy).
  ],
  moves: 0, // Robot tomonidan amalga oshirilgan harakatlar soni.
  isComplete: false, // O'yin yakunlanganmi, yo'qmi.
};

export default function GameBoard() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE); // O'yinning hozirgi holatini boshqarish uchun state.
  const [audio, setAudio] = useState<{ [key: string]: HTMLAudioElement }>({}); // Ovoz fayllarini boshqarish uchun state.

  // useEffect - komponent yuklanganida ishlaydi
  useEffect(() => {
    setAudio({
      move: new Audio("/sound/short-and-bubbly.mp3"), // Harakat uchun ovoz.
      energy: new Audio("/sound/Energiya.mp3"), // Energiya yig'ilganda ovoz.
      complete: new Audio("/sound/finish-gold.mp3"), // O'yin yakunlanganda ovoz.
    });
  }, []);

  // Ovoz o'ynatish funksiyasi
  const playSound = (sound: "move" | "energy" | "complete") => {
    if (audio[sound]) {
      audio[sound]
        .play()
        .catch(error => console.error("Ovoz ijrosida xatolik:", error));
    }
  };

  // Robotni harakatlantirish funksiyasi
  const moveRobot = useCallback(
    (direction: Direction) => {
      setGameState(currentState => {
        const newPosition = { ...currentState.robotPosition }; // Robotning yangi pozitsiyasini aniqlash uchun ob'yekt nusxasi.

        // Yo'nalishga qarab yangi pozitsiyani o'zgartiramiz
        switch (direction) {
          case "up":
            if (newPosition.row > 0) newPosition.row--; // Tepaga.
            break;
          case "down":
            if (newPosition.row < currentState.grid.length - 1)
              newPosition.row++; // Pastga.
            break;
          case "left":
            if (newPosition.col > 0) newPosition.col--; // Chapga.
            break;
          case "right":
            if (newPosition.col < currentState.grid[0].length - 1)
              newPosition.col++; // O'ngga.
            break;
        }

        // Agar yangi pozitsiya bloklangan bo'lsa yoki robotning pozitsiyasi o'zgarmagan bo'lsa, hech narsa qilmaymiz
        if (
          currentState.grid[newPosition.row][newPosition.col] === "blocked" ||
          (newPosition.row === currentState.robotPosition.row &&
            newPosition.col === currentState.robotPosition.col)
        ) {
          return currentState;
        }

        playSound("move"); // Harakat ovozi o'ynatiladi.

        let newSoulPosition = currentState.soulPosition; // Energiya pozitsiyasi (agar yig'ilsa, yangilanadi).
        const newGrid = currentState.grid.map(row => [...row]); // Grid nusxasi.

        // Agar robot energiya yig'ilgan joyga o'tsa
        if (currentState.grid[newPosition.row][newPosition.col] === "energy") {
          playSound("energy"); // Energiya yig'ildi degan ovoz o'ynatiladi.
          newSoulPosition = { ...newPosition }; // Yangi energiya pozitsiyasi.
          newGrid[newPosition.row][newPosition.col] = "empty"; // Energiya hujayrasini "bo'sh" qilib yangilaymiz.
        }

        // Agar robot maqsadga yetgan bo'lsa
        const isComplete =
          currentState.grid[newPosition.row][newPosition.col] === "goal";
        if (isComplete) {
          playSound("complete"); // O'yin tugadi degan ovoz o'ynatiladi.
        }

        // Yangi o'yin holatini qaytaramiz
        return {
          ...currentState,
          robotPosition: newPosition,
          soulPosition: newSoulPosition,
          grid: newGrid, // Yangilangan gridni saqlaymiz.
          moves: currentState.moves + 1, // Harakatlar soni oshadi.
          isComplete,
        };
      });
    },
    [audio]
  );

  return (
    <Card className="p-6 bg-[#f5d6c6]">
      {/* O'yin kartasi. */}
      <div className="mb-4">
        <div className="flex items-center gap-6 mb-6 p-4">
          <Image
            src="/img/robot-game.png"
            alt="Robot"
            width={90}
            height={90}
            className="rounded-lg border-4 p-2 border-white shadow-md animate-pulse"
          />
          <div className="sm:text-2xl text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            Qadamlar:{" "}
            <span className="text-blue-700 font-black">{gameState.moves}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-2 mb-6">
        {" "}
        {/* Hujayralar tarmog'i. */}
        {gameState.grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <GameCell
              key={`${rowIndex}-${colIndex}`}
              type={cell}
              isRobot={
                rowIndex === gameState.robotPosition.row &&
                colIndex === gameState.robotPosition.col
              } // Robotning joylashuvi.
              isSoul={
                gameState.soulPosition?.row === rowIndex &&
                gameState.soulPosition?.col === colIndex
              } // Energiya pozitsiyasi.
            />
          ))
        )}
      </div>
      <div className="grid grid-cols-3 gap-4 max-w-[300px] mx-auto">
        {/* Harakat tugmalari. */}
        <div />
        <Button onClick={() => moveRobot("up")} disabled={gameState.isComplete}>
          <MoveUp className="sm:size-8" />
        </Button>
        <div />
        <Button
          onClick={() => moveRobot("left")}
          disabled={gameState.isComplete}
        >
          <MoveLeft className="sm:size-8" />
        </Button>
        <Button
          onClick={() => moveRobot("down")}
          disabled={gameState.isComplete}
        >
          <MoveDown className="sm:size-8" />
        </Button>
        <Button
          onClick={() => moveRobot("right")}
          disabled={gameState.isComplete}
        >
          <MoveRight className="sm:size-8" />
        </Button>
      </div>
      {gameState.isComplete && (
        <div className="mt-6 text-center">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 animate-bounce">
            Tabriklaymiz!
          </h1>
          <p className="text-lg font-medium text-gray-700 mt-2">
            Siz jumboqni{" "}
            <span className="text-green-600 font-bold text-xl">
              {gameState.moves}
            </span>{" "}
            ta harakatda yakunladingiz!
          </p>
        </div>
      )}
    </Card>
  );
}
