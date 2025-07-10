import { useState } from "react";
import { Button } from "@/components/ui/button";
import SetupScreen from "@/components/SetupScreen";
import TeamSelectionScreen from "@/components/TeamSelectionScreen";
import TeamCompletionScreen from "@/components/TeamCompletionScreen";
import GameLoadingScreen from "@/components/GameLoadingScreen";
import ResultScreen from "@/components/ResultScreen";

const SoloBattleScreen = ({ onBack }) => {
  const [step, setStep] = useState('setup');
  const [team1Name, setTeam1Name] = useState('드림팀');
  const [team2Name, setTeam2Name] = useState('나눔팀');
  const [team1Players, setTeam1Players] = useState(null);
  const [team2Players, setTeam2Players] = useState(null);
  const [currentTeamMode, setCurrentTeamMode] = useState('manual');
  const [gameScores, setGameScores] = useState(null);

  const handleTeam1Select = (mode) => {
    setCurrentTeamMode(mode);
    setStep('team1-select');
  };
  const handleTeam2Select = (mode) => {
    setCurrentTeamMode(mode);
    setStep('team2-select');
  };
  const handleTeam1Complete = (players) => {
    if (players) {
      setTeam1Players(players);
      setStep('team1-complete');
    }
  };
  const handleTeam2Complete = (players) => {
    if (players) {
      setTeam2Players(players);
      setStep('team2-complete');
    }
  };
  const handleStartMatch = () => setStep('loading');
  const handleGameComplete = (scores) => {
    setGameScores(scores);
    setStep('result');
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <Button 
          onClick={onBack}
          className="mb-6 rounded-2xl px-6 py-3 text-gray-800 hover:bg-gray-50"
        >
          ← 홈으로
        </Button>
        {step === 'setup' && (
          <SetupScreen 
            team1Name={team1Name}
            setTeam1Name={setTeam1Name}
            team2Name={team2Name}
            setTeam2Name={setTeam2Name}
            team1Complete={team1Players !== null}
            team2Complete={team2Players !== null}
            onTeam1Select={handleTeam1Select}
            onTeam2Select={handleTeam2Select}
            onStartMatch={handleStartMatch}
          />
        )}
        {step === 'team1-select' && (
          <TeamSelectionScreen 
            teamName={team1Name}
            teamNumber={1}
            mode={currentTeamMode}
            onNext={handleTeam1Complete}
            onBack={() => setStep('setup')}
          />
        )}
        {step === 'team1-complete' && team1Players && (
          <TeamCompletionScreen 
            teamName={team1Name}
            selectedPlayers={team1Players}
            onNext={() => setStep('setup')}
            onBack={() => setStep('team1-select')}
          />
        )}
        {step === 'team2-select' && (
          <TeamSelectionScreen 
            teamName={team2Name}
            teamNumber={2}
            mode={currentTeamMode}
            onNext={handleTeam2Complete}
            onBack={() => setStep('setup')}
          />
        )}
        {step === 'team2-complete' && team2Players && (
          <TeamCompletionScreen 
            teamName={team2Name}
            selectedPlayers={team2Players}
            onNext={() => setStep('setup')}
            onBack={() => setStep('team2-select')}
          />
        )}
        {step === 'loading' && (
          <GameLoadingScreen 
            team1Name={team1Name}
            team2Name={team2Name}
            onComplete={handleGameComplete}
          />
        )}
        {step === 'result' && gameScores && (
          <ResultScreen 
            team1Name={team1Name}
            team2Name={team2Name}
            team1Score={gameScores.team1}
            team2Score={gameScores.team2}
            onPlayAgain={() => setStep('setup')}
            onHome={onBack}
          />
        )}
      </div>
    </div>
  );
};

export default SoloBattleScreen;
