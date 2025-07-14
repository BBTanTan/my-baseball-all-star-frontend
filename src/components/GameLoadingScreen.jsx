import { useState, useEffect } from "react";
import ResultScreen from "@/components/ResultScreen";

const GameLoadingScreen = ({ team1Name, team2Name, onComplete }) => {
  const [currentInning, setCurrentInning] = useState(1);
  const [team1InningScores, setTeam1InningScores] = useState(Array(12).fill(0));
  const [team2InningScores, setTeam2InningScores] = useState(Array(12).fill(0));
  const [step, setStep] = useState('loading');
  const [finalScores, setFinalScores] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInning(prev => {
        if (prev >= 9) {
          clearInterval(interval);
          // Calculate final scores
          const team1FinalScore = team1InningScores.slice(0, 9).reduce((sum, score) => sum + score, 0);
          const team2FinalScore = team2InningScores.slice(0, 9).reduce((sum, score) => sum + score, 0);
          setTimeout(() => {
            setFinalScores({ team1: team1FinalScore, team2: team2FinalScore });
            setStep('result');
            if (onComplete) onComplete({ team1: team1FinalScore, team2: team2FinalScore });
          }, 1000);
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

  if (step === 'result' && finalScores) {
    return (
      <ResultScreen
        team1Name={team1Name}
        team2Name={team2Name}
        team1Score={finalScores.team1}
        team2Score={finalScores.team2}
        onPlayAgain={() => {
          setCurrentInning(1);
          setTeam1InningScores(Array(9).fill(0));
          setTeam2InningScores(Array(9).fill(0));
          setStep('loading');
          setFinalScores(null);
        }}
        onHome={() => {
          if (onComplete) onComplete(null);
        }}
      />
    );
  }

  // loading 화면
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Fullscreen background image */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          backgroundImage: "url('/landing.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundColor: "transparent"
        }}
      />
      <div className="flex flex-col items-center pt-2 pb-0 px-2 space-y-2" style={{ position: "relative", zIndex: 1 }}>
        {/* Logo 이미지 */}
        <img
          src="/element/logo.png"
          alt="Logo"
          className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain mb-2"
        />
        {/* Game Status Board */}
        <div className="bg-black text-white p-6 rounded-3xl border-4 border-gray-300 w-full max-w-md">
          <div className="text-center space-y-4">
            <div className="text-green-400 text-lg font-bold font-dunggeunmo">
              경기가 시작되었습니다
            </div>
            <div className="text-sm text-gray-300 font-dunggeunmo">
              선택한 선수가<br />
              홈런을 날리는 중
            </div>
            {/* Innings Display (맨 위) */}
            <div className="grid grid-cols-10 gap-1 text-lg font-dunggeunmo items-end mb-2">
              <div className="col-span-1" />
              {[1,2,3,4,5,6,7,8,9].map((inning) => (
                <div key={inning} className="text-center col-span-1">
                  <div className={`mb-1 ${inning <= currentInning ? 'text-white' : 'text-gray-600'}`}>{inning}</div>
                </div>
              ))}
            </div>
            {/* Team Scores by Inning */}
            <div className="space-y-2 font-dunggeunmo">
              <div className="grid grid-cols-10 gap-1 text-lg items-center">
                <div className="col-span-1 text-yellow-400 text-sm font-bold text-center">{team1Name}</div>
                {team1InningScores.slice(0,9).map((score, index) => (
                  <div key={index} className="text-center col-span-1">
                    <span className={`text-yellow-400 ${index < currentInning ? 'font-normal' : 'text-gray-600'}`}>{index < currentInning ? score : ''}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-10 gap-1 text-lg items-center">
                <div className="col-span-1 text-yellow-400 text-sm font-bold text-center">{team2Name}</div>
                {team2InningScores.slice(0,9).map((score, index) => (
                  <div key={index} className="text-center col-span-1">
                    <span className={`text-yellow-400 ${index < currentInning ? 'font-normal' : 'text-gray-600'}`}>{index < currentInning ? score : ''}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameLoadingScreen;
