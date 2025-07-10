import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import SetupScreen from "@/components/SetupScreen";
import TeamSelectionScreen from "@/components/TeamSelectionScreen";
import TeamCompletionScreen from "@/components/TeamCompletionScreen";
import GameLoadingScreen from "@/components/GameLoadingScreen";
import ResultScreen from "@/components/ResultScreen";
import FriendBattleHost from "@/components/FriendBattleHost";
import FriendBattleJoin from "@/components/FriendBattleJoin";

const Index = () => {
  const [gameMode, setGameMode] = useState('home');
  const [battleParams, setBattleParams] = useState(null);

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
    <div className="min-h-screen bg-gradient-to-b from-sky-300 to-sky-200 flex flex-col items-center justify-center">
      <div className="bg-white rounded-3xl px-8 py-6 shadow-lg mb-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          MY BASEBALL<br />ALL⭐STAR
        </h1>
      </div>
      <div className="flex flex-col space-y-4 w-full max-w-xs">
        <Button className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-full text-lg" onClick={() => setGameMode('solo')}>
          혼자 경기
        </Button>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-full text-lg" onClick={() => setGameMode('friend-host')}>
          친구와 대결 (방 만들기)
        </Button>
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 rounded-full text-lg" onClick={() => setGameMode('friend-join')}>
          친구방 참가
        </Button>
      </div>
    </div>
  );

  if (gameMode === 'home') return <HomeScreen />;
  if (gameMode === 'solo') return <SoloBattleScreen onBack={() => setGameMode('home')} />;
  if (gameMode === 'friend-host') return <FriendBattleHost onBack={() => setGameMode('home')} />;
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
  if (gameMode === 'friend-join') {
    // 친구방 참가만 눌렀을 때(파라미터 없이)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-300 to-sky-200">
        <div className="bg-white rounded-3xl px-8 py-6 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center">친구방 참가</h2>
        </div>
        <div className="text-gray-600 mb-4">초대 링크로 접속해 주세요.</div>
        <Button onClick={() => setGameMode('home')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-8 py-3 rounded-full">
          ← 홈으로
        </Button>
      </div>
    );
  }
  return <HomeScreen />;
};

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
