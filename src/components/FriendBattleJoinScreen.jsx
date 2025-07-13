import PasswordVerificationScreen from "@/components/PasswordVerificationScreen";
import { useEffect, useState } from "react";
import TeamCompletionScreen from "@/components/TeamCompletionScreen";
import TeamSelectionScreen from "@/components/TeamSelectionScreen";
import GameLoadingScreen from "@/components/GameLoadingScreen";

// 친구가 링크로 접속해서 join하는 화면
// URL에서 teamId를 받아 상대팀 라인업을 보여주고, 내 팀을 선택할 수 있음
const mockOpponentTeam = {
  teamName: "상대팀",
  selectedPlayers: {
    // ...포지션별 mock 선수 정보
    "투수": { name: "김상대", position: "투수", club: "삼성" },
    "포수": { name: "박상대", position: "포수", club: "두산" },
    // ...생략
  },
};

const FriendBattleJoinScreen = () => {
  const [showPasswordVerification, setShowPasswordVerification] = useState(false);
  const [opponentTeam, setOpponentTeam] = useState(null);
  const [step, setStep] = useState(0); // 0: 상대팀 라인업+내팀 선택, 1: 내팀 완성, 2: 상대팀 라인업 확인, 3: 내 팀 선택, 4: 게임 로딩
  const [myTeamName, setMyTeamName] = useState("");
  const [mode, setMode] = useState("manual");
  const [selectedPlayers, setSelectedPlayers] = useState({});
  const [myTeamNameEdit, setMyTeamNameEdit] = useState(false);
  const [tempMyTeamName, setTempMyTeamName] = useState("");
  useEffect(() => {
    // fetch(`/api/friend-team/${teamId}`)
    setOpponentTeam(mockOpponentTeam);
  }, []);

  if (!opponentTeam) return <div>로딩중...</div>;

  // 게임 로딩 화면 (대결 시작)
  if (showPasswordVerification) {
    return <PasswordVerificationScreen teamName={myTeamName} onBack={() => setShowPasswordVerification(false)} />;
  }
  if (step === 4) {
    return (
      <GameLoadingScreen
        team1Name={opponentTeam.teamName}
        team2Name={myTeamName}
        myTeam={{ teamName: myTeamName, selectedPlayers }}
        opponentTeam={opponentTeam}
        onBack={() => setStep(0)}
      />
    );
  }

  // 내 팀 완성 화면
  if (step === 1) {
    return (
      <TeamCompletionScreen
        selectedPlayers={selectedPlayers}
        teamName={myTeamName}
        onNext={() => setStep(0)}
        onBack={() => setStep(0)}
      />
    );
  }

  // 상대팀 라인업 확인 화면
  if (step === 2) {
    return (
      <TeamCompletionScreen
        selectedPlayers={opponentTeam.selectedPlayers}
        teamName={opponentTeam.teamName}
        isOpponent
        onNext={() => setStep(0)}
        onBack={() => setStep(0)}
      />
    );
  }

  // 내 팀 선택 화면 (전체 이동)
  if (step === 3) {
    return (
      <TeamSelectionScreen
        teamName={myTeamName}
        mode={mode}
        onNext={players => {
          setSelectedPlayers(players);
          setStep(1);
        }}
        onBack={() => setStep(0)}
      />
    );
  }

  // step === 0: 상대팀 라인업+내팀 선택
  // 선택완료/미완료 상태
  const positionsCount = 12;
  const selectedCount = Object.keys(selectedPlayers).length;
  const isComplete = selectedCount === positionsCount && Object.values(selectedPlayers).every(Boolean);
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between relative bg-[#b3e3fd] overflow-x-hidden font-jalnan">
      {/* 배경 */}
      <img src="/back_ground.png" alt="Home Background" className="w-full h-full object-cover absolute inset-0 z-0" style={{ minHeight: '100vh', minWidth: '100vw' }} />
      {/* 타이틀 */}
        <div className="z-10 mt-8 mb-2 text-center font-title" style={{ color: '#535353', fontSize: '2rem', display: 'inline-block', padding: '0.2em 0.7em', WebkitTextStroke: '0.1px rgba(255,255,255)', fontWeight: 'bold' }}>
        MY BASEBALL<br />ALL✪STAR
      </div>
      {/* 안내 */}
      <div className="z-10 mt-2 mb-4 text-center">
        <div style={{ background: '#444', color: 'white', borderRadius: '2.5rem', fontWeight: 'normal', fontSize: '1.2rem', padding: '0.5rem 2.5rem', margin: '0 auto', fontFamily: 'yg-jalnan', boxShadow: '#535353' }}>
          {opponentTeam.teamName} 과의 경기를 준비하세요
        </div>
      </div>
      {/* 카드 영역 */}
      <div className="flex flex-row justify-around w-full z-10" style={{ width: '100%' }}>
        {/* 상대팀 카드 */}
      <div
        className="flex-1 flex flex-col items-center bg-[#4ec16e] rounded-2xl py-4 px-2 mx-2 font-jalnan"
        style={{ minWidth: '140px', maxWidth: '220px', flexGrow: 1, boxSizing: 'border-box', marginBottom: '10px' }}
      >          
        <div className="text-white text-2xl font-jalnan mb-2">{opponentTeam.teamName}팀</div>
          <button
            className="bg-white text-[#444] rounded-full px-3 py-1 mb-2 text-base font-jalnan w-full invisible"
            tabIndex={-1}
            aria-hidden="true"
          >
            더미
          </button>
          <img src="/element/field.png" alt="Field" style={{ width: '90px', margin: '16px 0' }} />
          <div className="bg-white rounded-full px-4 py-1 mt-2 mb-2 text-base font-jalnan text-[#aaa] border-2 border-[#aaa]">선수 선택 완료</div>
          <button
            className="w-full bg-[#e28a3d] text-white rounded-full py-2 mt-2 mb-8 font-jalnan"
            style={{ fontSize: '1rem' }}
            onClick={() => setStep(2)}
          >

            <span>
              상대 팀 <span style={{ color: '#ffe066' }}>라인업</span>
              <div style={{ paddingTop: '1px' }}>확인하기</div>
            </span>
          </button>
        </div>
        {/* 내 팀 카드 */}
          <div
            className="flex-1 flex flex-col items-center bg-[#4ec16e] rounded-2xl py-4 px-2 mx-2 font-jalnan"
            style={{ minWidth: '140px', maxWidth: '220px', flexGrow: 1, boxSizing: 'border-box', marginBottom: '10px' }}
          >          
          {(myTeamNameEdit || !myTeamName) ? (
            <div className="flex flex-col items-center w-full mb-2 font-jalnan">
              <input
                value={tempMyTeamName}
                onChange={e => setTempMyTeamName(e.target.value)}
                className="text-gray-800 text-center rounded-full px-2 py-1 mb-2 w-full font-jalnan"
                style={{ fontSize: '0.8rem' }}
                maxLength={10}
                placeholder="팀 이름을 입력하세요"
              />
              <button
                onClick={() => {
                  setMyTeamName(tempMyTeamName);
                  setMyTeamNameEdit(false);
                }}
                className="bg-white text-[#444] rounded-full px-4 py-1 text-base font-jalnan w-full"
                disabled={!tempMyTeamName}
              >
                완료
              </button>
            </div>
          ) : (
            <>
              <div className="text-white text-2xl font-jalnan mb-2 w-full text-center">{myTeamName}</div>
              <button
                className="bg-white text-[#444] rounded-full px-3 py-1 mb-2 text-base font-jalnan w-full"
                onClick={() => {
                  setTempMyTeamName(myTeamName);
                  setMyTeamNameEdit(true);
                }}
              >
                팀 이름 변경하기
              </button>
            </>
          )}
          <img src="/element/field.png" alt="Field" style={{ width: '90px', margin: '16px 0' }} />
          <div className={`bg-white rounded-full px-4 py-1 mt-2 mb-2 text-base font-jalnan ${isComplete ? 'text-[#2ca24c] border-2 border-[#2ca24c]' : 'text-[#aaa] border-2 border-[#aaa]'}`}>
            {isComplete ? '선수 선택 완료' : '선수 선택 미완료'}
          </div>
          <button
            className="w-full bg-[#e28a3d] text-white rounded-full py-2 mt-2 mb-2 font-jalnan"
            style={{ fontSize: '1rem' }}
            onClick={() => {
              setMode('random');
              setStep(3);
            }}
            disabled={!myTeamName}
          >
            선수 <span style={{ color: '#ffe066' }}>랜덤</span> 선택
          </button>
          <button
            className="w-full bg-[#e28a3d] text-white rounded-full py-2 mb-2 font-jalnan"
            style={{ fontSize: '1rem' }}
            onClick={() => {
              setMode('manual');
              setStep(3);
            }}
            disabled={!myTeamName}
          >
            선수 <span style={{ color: '#ffe066' }}>내가</span> 선택
          </button>
        </div>
      </div>
      {/* 하단 버튼 */}
      <div className="flex flex-col items-center z-10 mb-8 w-full font-jalnan" style={{ maxWidth: '400px' }}>
        <button
          style={{ background: '#444', color: 'white', borderRadius: '2.5rem', fontWeight: 'normal', fontSize: '1.2rem', padding: '0.5rem 2.5rem', fontFamily: 'yg-jalnan', boxShadow: '#535353' }}
          onClick={() => {
            if (isComplete && myTeamName) setStep(4);
          }}
          disabled={!isComplete || !myTeamName}
        >
          대결 시작
        </button>
        <button
          style={{ background: '#eee', color: '#aaa', borderRadius: '2.5rem', fontWeight: 'normal', fontSize: '1.2rem', padding: '0.5rem 2.5rem', margin: '0.5em auto 0', fontFamily: 'yg-jalnan', boxShadow: '#535353' }}
          onClick={() => setShowPasswordVerification(true)}
        >
          내 팀 전적 확인
        </button>
      </div>
    </div>
  );
}
export default FriendBattleJoinScreen;
