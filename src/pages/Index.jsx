import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import SetupScreen from "@/components/SetupScreen";
import TeamSelectionScreen from "@/components/TeamSelectionScreen";
import TeamCompletionScreen from "@/components/TeamCompletionScreen";
import GameLoadingScreen from "@/components/GameLoadingScreen";
import ResultScreen from "@/components/ResultScreen";
import FriendBattleHost from "@/components/FriendBattleHost";
import FriendBattleJoin from "@/components/FriendBattleJoin";
import SoloBattleScreen from "@/components/SoloBattleScreen";
import Landing from "./Landing";

const Index = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [gameMode, setGameMode] = useState('home');
  const [battleParams, setBattleParams] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const battleId = urlParams.get('battle');
    const hostName = urlParams.get('host');
    if (battleId && hostName) {
      setBattleParams({ battleId, hostName: decodeURIComponent(hostName) });
      setGameMode('friend-join');
      setShowLanding(false);
    }
  }, []);

  const HomeScreen = () => (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <img 
        src="/logo.png" 
        alt="Logo" 
        className="w-70 h-auto mb-6 sm:w-40 md:w-48 lg:w-56 xl:w-64"
        style={{ maxWidth: '80vw' }}
      />
      <div className="flex flex-col space-y-4 w-full max-w-xs">
        <Button className="font-bold py-4 rounded-full text-lg text-white bg-green-600 hover:bg-green-700" onClick={() => setGameMode('solo')}>
          혼자 경기
        </Button>
        <Button className="font-bold py-4 rounded-full text-lg text-white bg-blue-600 hover:bg-blue-700" onClick={() => setGameMode('friend-host')}>
          친구와 대결 (방 만들기)
        </Button>
        <Button className="font-bold py-4 rounded-full text-lg text-white bg-yellow-500 hover:bg-yellow-600" onClick={() => setGameMode('friend-join')}>
          친구방 참가
        </Button>
      </div>
    </div>
  );

  if (showLanding) {
    return <Landing onStart={() => setShowLanding(false)} />;
  }

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
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="rounded-3xl px-8 py-6 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center">친구방 참가</h2>
        </div>
        <div className="text-gray-600 mb-4">초대 링크로 접속해 주세요.</div>
        <Button onClick={() => setGameMode('home')} className="font-bold px-8 py-3 rounded-full text-gray-800 bg-gray-300 hover:bg-gray-400">
          ← 홈으로
        </Button>
      </div>
    );
  }
  return <HomeScreen />;
};

export default Index;
