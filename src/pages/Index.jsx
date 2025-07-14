import { useState, useEffect } from "react";
import FriendTeamSetupScreen from "@/components/FriendTeamSetupScreen";
import SoloBattleScreen from "@/components/SoloBattleScreen";
import Landing from "./Landing";

const Index = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [gameMode, setGameMode] = useState('home');
  const [battleParams, setBattleParams] = useState(null);
  const [friendTeam, setFriendTeam] = useState(null);

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
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* 전체 배경 이미지는 landing.png 하나로 */}
      <img
        src="/landing.png"
        alt="Home Background"
        className="w-full h-full object-cover absolute inset-0 z-0"
        style={{ minHeight: '100vh', minWidth: '100vw' }}
      />
      <div className="z-10 flex flex-col items-center justify-start gap-1" style={{ position: 'absolute', top: '2vh', left: '50%', transform: 'translateX(-50%)' }}>
        <img
          src="/element/logo.png"
          alt="Logo"
          className="mb-2"
          style={{ width: '55vw', maxWidth: '75vw', height: 'auto' }}
        />
        <img
          src="/element/baseball-cap.png"
          alt="Baseball Cap"
          className="mb-8"
          style={{ width: '140px', maxWidth: '40vw', height: 'auto' }}
        />
        <button
          onClick={() => setGameMode('solo')}
          className="font-jalnan mb-2"
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1.5rem',
            borderRadius: '2rem',
            background: '#FFFFFF',
            color: '#535353',
            fontWeight: 'normal',
            border: 'none',
            cursor: 'pointer',
            width: 'min(320px, 80vw)'
          }}
        >
          혼자 경기
        </button>
        <button
          onClick={() => setGameMode('friend-host')}
          className="font-jalnan"
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1.5rem',
            borderRadius: '2rem',
            background: '#FFFFFF',
            color: '#535353',
            fontWeight: 'normal',
            border: 'none',
            cursor: 'pointer',
            width: 'min(320px, 80vw)'
          }}
        >
          친구와 함께 경기
        </button>
      </div>
    </div>
  );

  if (showLanding) {
    return <Landing onStart={() => setShowLanding(false)} />;
  }

  if (gameMode === 'home') return <HomeScreen />;
  if (gameMode === 'solo') return <SoloBattleScreen onBack={() => setGameMode('home')} />;
  if (gameMode === 'friend-host') {
    if (!friendTeam) {
      return <FriendTeamSetupScreen onComplete={setFriendTeam} onBack={() => setGameMode('home')} />;
    }
    return <FriendBattleHost onBack={() => setGameMode('home')} myTeam={friendTeam} />;
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
  if (gameMode === 'friend-join') {
    // 친구방 참가만 눌렀을 때(파라미터 없이)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="rounded-3xl px-8 py-6 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center">친구방 참가</h2>
        </div>
        <div className="text-gray-600 mb-4">초대 링크로 접속해 주세요.</div>
      </div>
    );
  }
  return <HomeScreen />;
};

export default Index;
