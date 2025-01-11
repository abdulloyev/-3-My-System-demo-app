import React from "react";
import GameBoard from "./_components/game-board";

const GamePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center">
      <GameBoard />
    </div>
  );
};

export default GamePage;
