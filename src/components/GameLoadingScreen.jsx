import { useState, useEffect } from "react";

const GameLoadingScreen = ({ team1Name, team2Name, onComplete }) => {
  const [currentInning, setCurrentInning] = useState(1);
  const [team1InningScores, setTeam1InningScores] = useState(Array(12).fill(0));
  const [team2InningScores, setTeam2InningScores] = useState(Array(12).fill(0));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInning(prev => {
        if (prev >= 9) {
          clearInterval(interval);
          // Calculate final scores
          const team1FinalScore = team1InningScores.slice(0, 9).reduce((sum, score) => sum + score, 0);
          const team2FinalScore = team2InningScores.slice(0, 9).reduce((sum, score) => sum + score, 0);
          setTimeout(() => onComplete({ team1: team1FinalScore, team2: team2FinalScore }), 1000);
          return 9;
        }
        // Simulate scoring for current inning
        const team1Score = Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : 0;
        const team2Score = Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : 0;
        setTeam1InningScores(scores => {
          const newScores = [...scores];
          newScores[prev - 1] = team1Score;
          return newScores;
        });
        setTeam2InningScores(scores => {
          const newScores = [...scores];
          newScores[prev - 1] = team2Score;
          return newScores;
        });
        return prev + 1;
      });
    }, 800);
    return () => clearInterval(interval);
  }, [onComplete, team1InningScores, team2InningScores]);

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
        {/* Game Status Board */}
        <div className="bg-black text-white p-6 rounded-3xl border-4 border-gray-300 w-full max-w-md">
          <div className="text-center space-y-4">
            <div className="text-green-400 text-lg font-bold">
              경기가 시작되었습니다
            </div>
            <div className="text-sm text-gray-300">
              선택한 선수가<br />
              홈런을 날리는 중
            </div>
            {/* Innings Display */}
            <div className="grid grid-cols-12 gap-1 text-xs">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((inning) => (
                <div key={inning} className="text-center">
                  <div className={`mb-1 ${inning <= currentInning ? 'text-white' : 'text-gray-600'}`}>
                    {inning}
                  </div>
                </div>
              ))}
            </div>
            {/* Team Scores by Inning */}
            <div className="space-y-2">
              <div className="grid grid-cols-12 gap-1 text-xs">
                {team1InningScores.map((score, index) => (
                  <div key={index} className="text-center">
                    <span className={`text-yellow-400 ${index < currentInning ? 'font-bold' : 'text-gray-600'}`}>
                      {index < currentInning ? score : ''}
                    </span>
                  </div>
                ))}
              </div>
              <div className="text-yellow-400 text-sm font-bold text-left">
                {team1Name}
              </div>
            </div>
            <div className="space-y-2">
              <div className="grid grid-cols-12 gap-1 text-xs">
                {team2InningScores.map((score, index) => (
                  <div key={index} className="text-center">
                    <span className={`text-yellow-400 ${index < currentInning ? 'font-bold' : 'text-gray-600'}`}>
                      {index < currentInning ? score : ''}
                    </span>
                  </div>
                ))}
              </div>
              <div className="text-yellow-400 text-sm font-bold text-left">
                {team2Name}
              </div>
            </div>
          </div>
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
          {/* Baseball */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full animate-bounce"></div>
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

export default GameLoadingScreen;
