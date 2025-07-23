import { useState, useEffect } from "react";
import ResultScreen from "@/components/ResultScreen";
import MobileLayout from "./layout/MobileLayout";

function distributeScoreToInnings(finalScore, innings = 9, maxPerInning = 3) {
  // 0~maxPerInning 사이에서 랜덤하게 분배, 합이 finalScore가 되도록
  let scores = Array(innings).fill(0);
  let remaining = finalScore;
  while (remaining > 0) {
    // 남은 점수와 maxPerInning 중 작은 값까지 랜덤
    const idx = Math.floor(Math.random() * innings);
    const add = Math.min(remaining, Math.floor(Math.random() * (maxPerInning + 1)));
    if (scores[idx] + add <= maxPerInning && add > 0) {
      scores[idx] += add;
      remaining -= add;
    }
  }
  return scores;
}

const GameLoadingScreen = ({ team1Name, team2Name, team1FinalScore, team2FinalScore ,onComplete }) => {
  const [currentInning, setCurrentInning] = useState(1);
  const [team1InningScores, setTeam1InningScores] = useState(distributeScoreToInnings(team1FinalScore));
  const [team2InningScores, setTeam2InningScores] = useState(distributeScoreToInnings(team2FinalScore));
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
        return prev + 1;
      });
    }, 800);
    return () => clearInterval(interval);
  }, [onComplete]);

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
    <MobileLayout>
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Fullscreen background image */}
      <img src="/landing.png" alt="Home Background" className="w-full h-full object-cover absolute inset-0 z-0"/>

      <div className="flex flex-col items-center pt-2 pb-0 px-2 space-y-2" style={{ position: "relative", zIndex: 1 }}>
        {/* Logo 이미지 */}
        <img
          src="/element/logo.png"
          alt="Logo"
          className="mb-2"
          style={{ width: '55vw', maxWidth: '200px', height: 'auto' }}
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
                <div className="col-span-1 text-white text-sm font-bold text-center">{team1Name}</div>
                {team1InningScores.slice(0,9).map((score, index) => (
                  <div key={index} className="text-center col-span-1">
                    <span className={`text-yellow-400 ${index < currentInning ? 'font-normal' : 'text-gray-600'}`}>{index < currentInning ? score : ''}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-10 gap-1 text-lg items-center">
                <div className="col-span-1 text-white text-sm font-bold text-center">{team2Name}</div>
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
    </MobileLayout>
  );
};

export default GameLoadingScreen;
