import { useState } from "react";
import { Button } from "@/components/ui/button";

const ResultScreen = ({ team1Name, team2Name, team1Score, team2Score, onPlayAgain, onHome }) => {
  const finalTeam1Score = team1Score || Math.floor(Math.random() * 12) + 1;
  const finalTeam2Score = team2Score || Math.floor(Math.random() * 12) + 1;
  const winner = finalTeam1Score > finalTeam2Score ? team1Name : team2Name;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 to-sky-200 relative overflow-hidden">
      {/* Clouds */}
      <div className="absolute top-8 left-8 w-32 h-20 bg-white rounded-full opacity-90"></div>
      <div className="absolute top-12 right-16 w-24 h-16 bg-white rounded-full opacity-80"></div>
      <div className="absolute bottom-32 right-8 w-36 h-22 bg-white rounded-full opacity-85"></div>
      
      <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-8">
        {/* Title */}
        <div className="bg-white rounded-3xl px-8 py-6 shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            MY BASEBALL<br />
            ALL⭐STAR
          </h1>
        </div>

        {/* Result Board */}
        <div className="bg-black text-white p-6 rounded-3xl border-4 border-gray-300 w-full max-w-md">
          <div className="text-center space-y-4">
            <div className="text-red-400 text-lg font-bold">
              경기가 종료되었습니다
            </div>
            
            <div className="flex justify-between items-center text-2xl font-bold">
              <span>{team1Name}</span>
              <span>{team2Name}</span>
            </div>
            
            <div className="flex justify-between items-center text-6xl font-bold">
              <span>{finalTeam1Score}</span>
              <span className="text-lg text-gray-400">VS</span>
              <span>{finalTeam2Score}</span>
            </div>
            
            <div className="text-sm text-gray-300">
              팀 프렌차이즈 선수의 온디시 날,<br />
              9연패를 이겨내고 좋에서 승리했습니다<br />
              팬들이 눈물을 흘립니다
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Button
            onClick={onPlayAgain}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-8 py-4 rounded-full"
          >
            공유하기
          </Button>
          
          <Button
            onClick={onHome}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-8 py-4 rounded-full"
          >
            또 경기하기
          </Button>
        </div>

        {/* Baseball Field */}
        <div className="relative w-80 h-40">
          {/* Outfield */}
          <div className="absolute bottom-0 w-full h-32 bg-orange-400 rounded-t-full"></div>
          {/* Infield */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-24 bg-green-500 rounded-t-full">
            {/* Diamond */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-yellow-500 rotate-45"></div>
          </div>
          
          {/* Baseball and Glove decorations */}
          <div className="absolute -bottom-6 -left-8 w-16 h-16 bg-white rounded-full border-4 border-red-500"></div>
          <div className="absolute -bottom-6 -right-8 w-16 h-16 bg-orange-600 rounded-full relative">
            <div className="absolute inset-2 border-2 border-orange-800 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
