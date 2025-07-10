import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import SetupScreen from "@/components/SetupScreen";
import TeamSelectionScreen from "@/components/TeamSelectionScreen";
import TeamCompletionScreen from "@/components/TeamCompletionScreen";
import GameLoadingScreen from "@/components/GameLoadingScreen";
import ResultScreen from "@/components/ResultScreen";
import FriendBattleHost from "@/components/FriendBattleHost";
import FriendBattleJoin from "@/components/FriendBattleJoin";
import { Player, Position } from "@/utils/playerData";

const Index = () => {
  const [gameMode, setGameMode] = useState<'home' | 'solo' | 'friend-host' | 'friend-join'>('home');
  const [battleParams, setBattleParams] = useState<{ battleId: string; hostName: string } | null>(null);

  // Check URL parameters for friend battle join
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const battleId = urlParams.get('battle');
    const hostName = urlParams.get('host');
    
    if (battleId && hostName) {
      setBattleParams({ battleId, hostName: decodeURIComponent(hostName) });
      setGameMode('friend-join');
    }
  }, []);

  const HomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 to-sky-200 relative overflow-hidden">
      <div className="absolute top-8 left-8 w-32 h-20 bg-white rounded-full opacity-90"></div>
      <div className="absolute top-12 right-16 w-24 h-16 bg-white rounded-full opacity-80"></div>
      <div className="absolute bottom-32 left-16 w-28 h-18 bg-white rounded-full opacity-75"></div>
      <div className="absolute bottom-20 right-8 w-36 h-22 bg-white rounded-full opacity-85"></div>
      
      <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-8">
        <div className="relative">
          <div className="bg-white rounded-3xl px-8 py-6 shadow-lg">
            <h1 className="text-2xl font-bold text-gray-800 text-center">
              MY BASEBALL<br />
              ALL⭐STAR
            </h1>
          </div>
        </div>

        <div className="relative">
          <div className="w-32 h-32 relative">
            <div className="w-28 h-20 bg-blue-400 rounded-t-full mx-auto relative">
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="w-32 h-8 bg-red-500 rounded-b-2xl mx-auto -mt-2"></div>
          </div>
        </div>

        <div className="space-y-4 w-full max-w-sm">
          <Button 
            onClick={() => setGameMode('solo')}
            className="w-full bg-white hover:bg-gray-50 text-gray-800 font-bold py-6 rounded-2xl text-lg shadow-lg border-0"
          >
            혼자 경기
          </Button>
          
          <Button 
            onClick={() => setGameMode('friend-host')}
            className="w-full bg-white hover:bg-gray-50 text-gray-800 font-bold py-6 rounded-2xl text-lg shadow-lg border-0"
          >
            친구와 함께 경기
          </Button>
        </div>

        <div className="relative w-80 h-40">
          <div className="absolute bottom-0 w-full h-32 bg-orange-400 rounded-t-full"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-24 bg-green-500 rounded-t-full">
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-yellow-500 rotate-45"></div>
          </div>
          <div className="absolute -bottom-4 -left-8 w-16 h-16 bg-white rounded-full border-4 border-red-500" style={{
            background: 'radial-gradient(circle, white 60%, transparent 60%), linear-gradient(45deg, red 2px, transparent 2px)',
            backgroundSize: '100% 100%, 8px 8px'
          }}></div>
          <div className="absolute -bottom-4 -right-8 w-16 h-16 bg-orange-600 rounded-full relative">
            <div className="absolute inset-2 border-2 border-orange-800 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-8 bg-orange-800"></div>
          </div>
        </div>
      </div>
    </div>
  );

  if (gameMode === 'home') {
    return <HomeScreen />;
  }

  if (gameMode === 'solo') {
    return <SoloBattleScreen onBack={() => setGameMode('home')} />;
  }

  if (gameMode === 'friend-host') {
    return <FriendBattleHost onBack={() => setGameMode('home')} />;
  }

  if (gameMode === 'friend-join' && battleParams) {
    return (
      <FriendBattleJoin 
        hostName={battleParams.hostName}
        battleId={battleParams.battleId}
        onBack={() => {
          setGameMode('home');
          setBattleParams(null);
          window.history.replaceState({}, document.title, window.location.pathname);
        }}
      />
    );
  }

  return <HomeScreen />;
};

// Solo Battle Screen Component
const SoloBattleScreen = ({ onBack }: { onBack: () => void }) => {
  const [step, setStep] = useState<'setup' | 'team1-select' | 'team1-complete' | 'team2-select' | 'team2-complete' | 'loading' | 'result'>('setup');
  const [team1Name, setTeam1Name] = useState('드림팀');
  const [team2Name, setTeam2Name] = useState('나눔팀');
  const [team1Players, setTeam1Players] = useState<Record<Position, Player | null> | null>(null);
  const [team2Players, setTeam2Players] = useState<Record<Position, Player | null> | null>(null);
  const [currentTeamMode, setCurrentTeamMode] = useState<'random' | 'manual'>('manual');
  const [gameScores, setGameScores] = useState<{ team1: number; team2: number } | null>(null);

  const handleTeam1Select = (mode: 'random' | 'manual') => {
    setCurrentTeamMode(mode);
    setStep('team1-select');
  };

  const handleTeam2Select = (mode: 'random' | 'manual') => {
    setCurrentTeamMode(mode);
    setStep('team2-select');
  };

  const handleTeam1Complete = (players?: Record<Position, Player | null>) => {
    if (players) {
      setTeam1Players(players);
      setStep('team1-complete');
    }
  };

  const handleTeam2Complete = (players?: Record<Position, Player | null>) => {
    if (players) {
      setTeam2Players(players);
      setStep('team2-complete');
    }
  };

  const handleStartMatch = () => {
    setStep('loading');
  };

  const handleGameComplete = (scores: { team1: number; team2: number }) => {
    setGameScores(scores);
    setStep('result');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 to-sky-200 p-4">
      <div className="max-w-4xl mx-auto">
        <Button 
          onClick={onBack}
          className="mb-6 bg-white hover:bg-gray-50 text-gray-800 rounded-2xl px-6 py-3"
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

export default Index;
