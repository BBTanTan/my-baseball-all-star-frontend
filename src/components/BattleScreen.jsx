import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const BattleScreen = ({ team1Name, team2Name, onResult }) => {
  const [loadingText, setLoadingText] = useState("⚾ Preparing the field...");
  const [progress, setProgress] = useState(0);

  const loadingMessages = [
    "⚾ Preparing the field...",
    "🏟️ Players warming up...",
    "🧎 Pitcher checking the mound...",
    "👥 Crowd getting excited...",
    "🎯 Umpire calling play ball...",
    "⚡ Game is starting!"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 100 / 60; // 60 steps for ~3 seconds
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(onResult, 500);
          return 100;
        }
        // Update loading message based on progress
        const messageIndex = Math.floor((newProgress / 100) * loadingMessages.length);
        setLoadingText(loadingMessages[Math.min(messageIndex, loadingMessages.length - 1)]);
        return newProgress;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [onResult]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="backdrop-blur-sm p-8 w-full max-w-md text-center">
        <CardContent className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">Epic Battle!</h1>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xl font-semibold">
              <span className="text-blue-600">{team1Name}</span>
              <span className="text-2xl">⚔️</span>
              <span className="text-red-600">{team2Name}</span>
            </div>
            <div className="w-full rounded-full h-4 overflow-hidden">
              <div 
                className="h-full transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-lg font-medium text-gray-700 animate-pulse">
              {loadingText}
            </p>
          </div>
          <div className="text-6xl animate-bounce">⚾</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BattleScreen;
