
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy } from "lucide-react";
import TeamSelectionScreen from "@/components/TeamSelectionScreen";
import { Player, Position } from "@/utils/playerData";

interface FriendBattleHostProps {
  onBack: () => void;
}

const FriendBattleHost = ({ onBack }: FriendBattleHostProps) => {
  const [step, setStep] = useState<'setup' | 'team-selection' | 'password-setup' | 'link-sharing'>('setup');
  const [hostName, setHostName] = useState('드림팀');
  const [isEditingName, setIsEditingName] = useState(false);
  const [teamMode, setTeamMode] = useState<'random' | 'manual'>('manual');
  const [hostTeam, setHostTeam] = useState<Record<Position, Player | null> | null>(null);
  const [battleId] = useState(() => Math.random().toString(36).substring(2, 15));
  const [linkCopied, setLinkCopied] = useState(false);
  const [password, setPassword] = useState('');

  const battleLink = `${window.location.origin}${window.location.pathname}?battle=${battleId}&host=${encodeURIComponent(hostName)}`;

  const handleTeamComplete = (team: Record<Position, Player | null>) => {
    setHostTeam(team);
    setStep('password-setup');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(battleLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = battleLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  if (step === 'setup') {
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
            <h2 className="text-xl font-bold">친구와 경기</h2>
          </div>

          {/* Team Card */}
          <Card className="w-full max-w-sm bg-green-500 text-white rounded-3xl border-0 shadow-lg">
            <CardContent className="p-6 text-center space-y-4">
              <h3 className="text-2xl font-bold">{hostName}</h3>
              
              {/* Team Name Change Button */}
              {isEditingName ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={hostName}
                    onChange={(e) => setHostName(e.target.value)}
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

          {/* Selection Status */}
          <div className={`px-8 py-3 rounded-full text-white font-bold ${
            hostTeam ? 'bg-green-600' : 'bg-gray-400'
          }`}>
            {hostTeam ? '선수 선택 완료' : '선수 선택 미완료'}
          </div>

          {/* Selection Buttons */}
          <div className="space-y-4 w-full max-w-sm">
            <Button 
              onClick={() => {
                setTeamMode('random');
                setStep('team-selection');
              }}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-full text-lg"
            >
              선수 랜덤 선택
            </Button>
            <Button 
              onClick={() => {
                setTeamMode('manual');
                setStep('team-selection');
              }}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-full text-lg"
            >
              선수 내가 선택
            </Button>
            
            {hostTeam && (
              <Button 
                onClick={() => setStep('password-setup')}
                className="w-full bg-gray-700 hover:bg-gray-800 text-white font-bold py-4 rounded-full text-lg"
              >
                대결 시작하기
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (step === 'team-selection') {
    return (
      <TeamSelectionScreen 
        teamName={hostName}
        teamNumber={1}
        mode={teamMode}
        onNext={handleTeamComplete}
        onBack={() => setStep('setup')}
      />
    );
  }

  if (step === 'password-setup') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-300 to-sky-200 relative overflow-hidden">
        {/* Clouds */}
        <div className="absolute top-8 left-8 w-32 h-20 bg-white rounded-full opacity-90"></div>
        <div className="absolute top-12 right-16 w-24 h-16 bg-white rounded-full opacity-80"></div>
        
        <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-8">
          <div className="bg-white rounded-3xl px-8 py-6 shadow-lg">
            <h1 className="text-2xl font-bold text-gray-800 text-center">
              MY BASEBALL<br />
              ALL⭐STAR
            </h1>
          </div>

          <div className="bg-gray-700 text-white px-8 py-4 rounded-3xl">
            <h2 className="text-xl font-bold">친구와 경기</h2>
          </div>

          <Card className="w-full max-w-sm bg-green-500 text-white rounded-3xl border-0 shadow-lg">
            <CardContent className="p-6 text-center space-y-4">
              <h3 className="text-2xl font-bold">{hostName}</h3>
              
              <div className="relative w-32 h-24 mx-auto">
                <div className="absolute bottom-0 w-full h-16 bg-orange-400 rounded-t-full"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-12 bg-green-600 rounded-t-full">
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-yellow-400"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full max-w-sm bg-gray-600 text-white rounded-3xl border-0 shadow-lg">
            <CardContent className="p-6 text-center space-y-4">
              <p className="text-sm">게임 확인을 위해<br />비밀번호를 입력해 주세요</p>
              <input
                type="password"
                placeholder="비밀번호 입력"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-4 rounded-2xl text-center text-black text-lg font-bold"
              />
              <Button 
                onClick={() => setStep('link-sharing')}
                disabled={!password.trim()}
                className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-2 rounded-full disabled:opacity-50"
              >
                완료
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 'link-sharing') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-300 to-sky-200 relative overflow-hidden flex items-center justify-center p-4">
        <Card className="bg-white rounded-3xl p-8 w-full max-w-md text-center shadow-lg">
          <CardContent className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">🎉 팀 준비 완료!</h1>
            <p className="text-lg text-gray-700">
              친구들에게 링크를 공유하세요!
            </p>

            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm font-bold text-gray-800 mb-2">도전 링크:</p>
              <div className="bg-white p-3 rounded border text-sm break-all">
                {battleLink}
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={copyLink}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-full"
              >
                <Copy className="mr-2 h-5 w-5" />
                {linkCopied ? "링크 복사됨! ✓" : "링크 복사"}
              </Button>

              <Button
                onClick={onBack}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-full"
              >
                홈으로 돌아가기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};

export default FriendBattleHost;
