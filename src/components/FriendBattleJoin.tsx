
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import TeamSelectionScreen from "@/components/TeamSelectionScreen";
import BattleScreen from "@/components/BattleScreen";
import ResultScreen from "@/components/ResultScreen";
import TeamLineupDisplay from "@/components/TeamLineupDisplay";
import PasswordVerificationScreen from "@/components/PasswordVerificationScreen";
import { Player, Position, generatePlayers, calculateTeamScore } from "@/utils/playerData";

interface FriendBattleJoinProps {
  hostName: string;
  battleId: string;
  onBack: () => void;
}

const FriendBattleJoin = ({ hostName, battleId, onBack }: FriendBattleJoinProps) => {
  const [step, setStep] = useState<'opponent-info' | 'setup' | 'team-selection' | 'battle' | 'result' | 'password-screen' | 'history' | 'lineup-display'>('opponent-info');
  const [challengerName, setChallengerName] = useState('나눔팀');
  const [isEditingName, setIsEditingName] = useState(false);
  const [teamMode, setTeamMode] = useState<'random' | 'manual'>('manual');
  const [hostTeam, setHostTeam] = useState<Record<Position, Player | null>>({} as Record<Position, Player | null>);
  const [challengerTeam, setChallengerTeam] = useState<Record<Position, Player | null> | null>(null);

  // Generate a mock host team for demonstration
  useEffect(() => {
    const allPlayers = generatePlayers();
    const positions: Position[] = ['C', 'SP', 'MR', 'CL', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'DH'];
    const mockHostTeam: Record<Position, Player | null> = {} as Record<Position, Player | null>;
    const usedPlayers: Set<string> = new Set();
    
    positions.forEach(pos => {
      const positionPlayers = allPlayers.filter(p => 
        p.position === pos && !usedPlayers.has(`${p.name}-${p.team}`)
      );
      if (positionPlayers.length > 0) {
        const randomIndex = Math.floor(Math.random() * positionPlayers.length);
        const selectedPlayer = positionPlayers[randomIndex];
        mockHostTeam[pos] = selectedPlayer;
        usedPlayers.add(`${selectedPlayer.name}-${selectedPlayer.team}`);
      }
    });
    
    setHostTeam(mockHostTeam);
  }, []);

  const handleTeamComplete = (team: Record<Position, Player | null>) => {
    setChallengerTeam(team);
    setStep('opponent-info');
  };

  const handlePasswordVerify = (password: string) => {
    if (password === '1234') {
      setStep('history');
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  // Mock history data
  const mockHistory = [
    { result: 'WIN', myTeam: '우리 팀', score: '10 : 5', opponent: '상대 팀' },
    { result: 'LOSE', myTeam: '우리 팀', score: '0 : 10', opponent: '상대 팀' },
    { result: 'WIN', myTeam: '우리 팀', score: '15 : 5', opponent: '상대 팀' },
    { result: 'LOSE', myTeam: '우리 팀', score: '0 : 10', opponent: '상대 팀' }
  ];

  if (step === 'password-screen') {
    return (
      <PasswordVerificationScreen
        title={`{팀 이름} 게임 결과 확인하기`}
        onVerify={handlePasswordVerify}
        onBack={() => setStep('opponent-info')}
      />
    );
  }

  if (step === 'history') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-300 to-sky-200 relative overflow-hidden">
        {/* Clouds */}
        <div className="absolute top-8 left-8 w-32 h-20 bg-white rounded-full opacity-90"></div>
        <div className="absolute top-12 right-16 w-24 h-16 bg-white rounded-full opacity-80"></div>
        
        <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-6">
          {/* Title */}
          <div className="bg-gray-700 text-white px-8 py-4 rounded-3xl">
            <h2 className="text-xl font-bold">{`{팀 이름} 게임 결과 확인하기`}</h2>
          </div>

          {/* History List */}
          <div className="space-y-4 w-full max-w-md">
            {mockHistory.map((match, index) => (
              <div
                key={index}
                className={`rounded-3xl px-6 py-4 text-white font-bold text-center ${
                  match.result === 'WIN' ? 'bg-black border-4 border-white' : 'bg-black border-4 border-white'
                }`}
              >
                <div className="text-lg mb-2">
                  <span className={match.result === 'WIN' ? 'text-yellow-400' : 'text-white'}>
                    {match.result}
                  </span>
                  <span className="mx-2">{match.myTeam}</span>
                  <span className={match.result === 'WIN' ? 'text-green-400' : 'text-red-400'}>
                    {match.score}
                  </span>
                  <span className="mx-2">{match.opponent}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Back Button */}
          <Button
            onClick={() => setStep('opponent-info')}
            className="bg-white hover:bg-gray-50 text-gray-800 font-bold py-3 px-8 rounded-full"
          >
            돌아가기
          </Button>

          {/* Baseball Field */}
          <div className="relative w-80 h-40">
            <div className="absolute bottom-0 w-full h-32 bg-orange-400 rounded-t-full"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-24 bg-green-500 rounded-t-full">
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-yellow-500 rotate-45"></div>
            </div>
            <div className="absolute -bottom-6 -left-8 w-16 h-16 bg-white rounded-full border-4 border-red-500"></div>
            <div className="absolute -bottom-6 -right-8 w-16 h-16 bg-orange-600 rounded-full relative">
              <div className="absolute inset-2 border-2 border-orange-800 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'lineup-display') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-300 to-sky-200 relative overflow-hidden">
        {/* Clouds */}
        <div className="absolute top-8 left-8 w-32 h-20 bg-white rounded-full opacity-90"></div>
        <div className="absolute top-12 right-16 w-24 h-16 bg-white rounded-full opacity-80"></div>
        
        <div className="flex flex-col items-center p-4 space-y-6">
          <TeamLineupDisplay teamName={hostName} selectedPlayers={hostTeam} />
          
          <Button
            onClick={() => setStep('opponent-info')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-8 rounded-full"
          >
            돌아가기
          </Button>
        </div>
      </div>
    );
  }

  if (step === 'opponent-info') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-300 to-sky-200 relative overflow-hidden">
        {/* Clouds */}
        <div className="absolute top-8 left-8 w-32 h-20 bg-white rounded-full opacity-90"></div>
        <div className="absolute top-12 right-16 w-24 h-16 bg-white rounded-full opacity-80"></div>
        
        <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-8">
          {/* Title */}
          <div className="bg-white rounded-3xl px-8 py-6 shadow-lg">
            <h1 className="text-2xl font-bold text-gray-800 text-center">
              MY BASEBALL<br />
              ALL⭐STAR
            </h1>
          </div>

          {/* Main Title */}
          <div className="bg-gray-700 text-white px-8 py-4 rounded-3xl">
            <h2 className="text-xl font-bold">{`{${hostName}} 과의 경기를 준비하세요`}</h2>
          </div>

          {/* Team Cards */}
          <div className="flex space-x-4 w-full max-w-2xl">
            {/* Host Team - NOT EDITABLE */}
            <Card className="flex-1 bg-green-500 text-white rounded-3xl border-0 shadow-lg">
              <CardContent className="p-6 text-center space-y-4">
                <div className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm">
                  선수 선택 완료 <span className="bg-gray-800 px-2 py-1 rounded-full ml-2">완료</span>
                </div>
                <h3 className="text-2xl font-bold">{hostName}</h3>
                <p className="bg-gray-400 text-gray-200 rounded-full px-4 py-2 cursor-not-allowed">팀 이름 수정 불가</p>
                
                {/* Baseball Field Icon */}
                <div className="relative w-32 h-24 mx-auto">
                  <div className="absolute bottom-0 w-full h-16 bg-orange-400 rounded-t-full"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-12 bg-green-600 rounded-t-full">
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-yellow-400"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Challenger Team - EDITABLE */}
            <Card className="flex-1 bg-green-500 text-white rounded-3xl border-0 shadow-lg">
              <CardContent className="p-6 text-center space-y-4">
                <div className={`px-4 py-2 rounded-full text-sm ${
                  challengerTeam ? 'bg-gray-700 text-white' : 'bg-gray-400 text-gray-200'
                }`}>
                  {challengerTeam ? '선수 선택 완료' : '선수 선택 미완료'}
                </div>
                
                <h3 className="text-2xl font-bold">{challengerName}</h3>
                
                {/* Team Name Change Button */}
                {isEditingName ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={challengerName}
                      onChange={(e) => setChallengerName(e.target.value)}
                      className="bg-white text-gray-800 rounded-full px-4 py-2 text-center"
                      autoFocus
                    />
                    <Button
                      onClick={() => setIsEditingName(false)}
                      className="bg-white text-gray-800 rounded-full px-4 py-2 text-sm"
                    >
                      완료
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => setIsEditingName(true)}
                    className="bg-white text-gray-800 rounded-full px-4 py-2"
                  >
                    팀 이름 변경하기
                  </Button>
                )}
                
                {/* Baseball Field Icon */}
                <div className="relative w-32 h-24 mx-auto">
                  <div className="absolute bottom-0 w-full h-16 bg-orange-400 rounded-t-full"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-12 bg-green-600 rounded-t-full">
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-yellow-400"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 w-full max-w-sm">
            <Button 
              onClick={() => setStep('lineup-display')}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-full text-lg"
            >
              상대 팀 라인업<br />확인하기
            </Button>
            <Button 
              onClick={() => {
                setTeamMode('random');
                setStep('setup');
              }}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-full text-lg"
            >
              선수 랜덤 선택
            </Button>
            <Button 
              onClick={() => {
                setTeamMode('manual');
                setStep('setup');
              }}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-full text-lg"
            >
              선수 내가 선택
            </Button>
            {challengerTeam && (
              <Button
                onClick={() => setStep('battle')}
                className="w-full bg-gray-700 hover:bg-gray-800 text-white font-bold py-4 rounded-full text-lg"
              >
                대결 시작하기
              </Button>
            )}
            
            {/* Team History Button */}
            <Button
              onClick={() => setStep('password-screen')}
              className="w-full bg-white hover:bg-gray-50 text-gray-800 font-bold py-3 rounded-full"
            >
              내 팀 전적 확인
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'setup') {
    return (
      <TeamSelectionScreen 
        teamName={challengerName}
        teamNumber={2}
        mode={teamMode}
        onNext={handleTeamComplete}
        onBack={() => setStep('opponent-info')}
      />
    );
  }

  if (step === 'battle') {
    return (
      <BattleScreen 
        team1Name={hostName}
        team2Name={challengerName}
        onResult={() => setStep('result')}
      />
    );
  }

  if (step === 'result') {
    return (
      <ResultScreen 
        team1Name={hostName}
        team2Name={challengerName}
        onPlayAgain={() => setStep('opponent-info')}
        onHome={onBack}
      />
    );
  }

  return null;
};

export default FriendBattleJoin;
