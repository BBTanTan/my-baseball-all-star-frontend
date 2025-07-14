import { useState } from "react";
import TeamSelectionScreen from "@/components/TeamSelectionScreen";
import TeamCompletionScreen from "@/components/TeamCompletionScreen";
import PasswordSetupScreen from "@/components/PasswordSetupScreen";

const FriendTeamSetupScreen = ({ onComplete, onBack }) => {
  const [step, setStep] = useState(0); // 0: Setup, 1: Select, 2: Complete, 3: Password
  const [teamName, setTeamName] = useState('나눔');
  const [editingTeamName, setEditingTeamName] = useState(false);
  const [mode, setMode] = useState("manual");
  const [selectedPlayers, setSelectedPlayers] = useState({});

  // 선수 선택 방식 핸들러
  const handleSelect = (selectedMode) => {
    setMode(selectedMode);
    if (teamName) setStep(1);
  };

  // SetupScreen: 팀명, 모드 선택
  if (step === 0) {
    console.log("팀 완성:", selectedPlayers, teamName);
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-between relative bg-[#b3e3fd] overflow-x-hidden font-jalnan">
        {/* 상단 구름+타이틀 */}
        <img
          src="/back_ground.png"
          alt="Home Background"
          className="w-full h-full object-cover absolute inset-0 z-0"
          style={{ minHeight: '100vh', minWidth: '100vw' }}
        />

        <div className="z-10 mt-20 mb-2 text-center font-title" style={{ color: '#535353', fontSize: '2rem', display: 'inline-block', padding: '0.2em 0.7em', WebkitTextStroke: '0.01px #fff', fontWeight: 'bold'}}>
          MY BASEBALL<br />
          ALL✪STAR
        </div>

        <div className="flex flex-col items-center z-10 mt-0 mb-2">
          <div style={{ background: '#444', color: 'white', borderRadius: '2.5rem', fontWeight: 'normal', fontSize: '1.2rem', padding: '0.5rem 2.5rem', margin: '0 auto', fontFamily: 'yg-jalnan', boxShadow: '#535353' }}>
            친구와 함께 경기
          </div>
        </div>

        {/* 팀 카드 영역 (단일, 가운데 정렬) */}
        <div className="flex justify-center w-full z-10" style={{ width: '100%' }}>
          <div
            className="flex flex-col items-center bg-[#4ec16e] rounded-2xl py-4 px-2 mx-2 font-jalnan"
            style={{ width: '260px', boxSizing: 'border-box', marginBottom: '10px' }}
          >
            {/* 팀명 입력/확정 */}
            {editingTeamName ? (
              <div className="flex flex-col items-center w-full mb-2 font-jalnan">
                <input
                  value={teamName}
                  onChange={e => setTeamName(e.target.value)}
                  className="text-gray-800 text-center rounded-full px-2 py-1 mb-2 w-full font-jalnan"
                  style={{ fontSize: '1.2rem', width: '100%' }}
                  maxLength={10}
                  placeholder="팀 이름을 입력하세요"
                />
                <button
                  onClick={() => {
                    setTeamName(teamName);
                    setEditingTeamName(false);
                  }}
                  className="bg-white text-[#444] rounded-full px-4 py-1 text-base font-jalnan w-full"
                  disabled={!teamName}
                >
                  완료
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center w-full mb-2 font-jalnan">
                <div className="text-white text-2xl mb-2 font-jalnan w-full text-center">{teamName}</div>
                <button
                  className="bg-white text-[#444] rounded-full px-3 py-1 mb-2 text-base font-jalnan w-full"
                  onClick={() => {
                    setTeamName(teamName);
                    setEditingTeamName(true);
                  }}
                >
                  팀 이름 변경하기
                </button>
              </div>
            )}
            <img src="/element/field.png" alt="Field" style={{ width: '90px', margin: '16px 0' }} />
            {/* 선수 선택 완료/미완료 표시 */}
            {(() => {
              const positionsCount = 12;
              const selectedCount = Object.keys(selectedPlayers).length;
              const isComplete = selectedCount === positionsCount && Object.values(selectedPlayers).every(Boolean);
              return (
                <div
                  className={`bg-white rounded-full px-4 py-1 mt-2 mb-2 text-base font-jalnan ${isComplete ? 'text-[#2ca24c] border-2 border-[#2ca24c]' : 'text-[#aaa] border-2 border-[#aaa]'}`}
                >
                  {isComplete ? '선수 선택 완료' : '선수 선택 미완료'}
                </div>
              );
            })()}
            <button
              className="w-full bg-[#e28a3d] text-white rounded-full py-2 mt-2 mb-2 font-jalnan"
              style={{ fontSize: '1rem' }}
              onClick={() => handleSelect('random')}
              disabled={!teamName}
            >
              선수 <span style={{ color: '#ffe066' }}>랜덤</span> 선택
            </button>
            <button
              className="w-full bg-[#e28a3d] text-white rounded-full py-2 mb-2 font-jalnan"
              style={{ fontSize: '1rem' }}
              onClick={() => handleSelect('manual')}
              disabled={!teamName}
            >
              선수 <span style={{ color: '#ffe066' }}>내가</span> 선택
            </button>
          </div>
        </div>

        {/* 다음 버튼들 */}
        <div className="flex flex-col items-center z-10 mb-8 w-full font-jalnan" style={{ maxWidth: '400px' }}>
          <button
            style={{ background: '#444', color: 'white', borderRadius: '2.5rem', fontWeight: 'normal', fontSize: '1.2rem', padding: '0.5rem 2.5rem', fontFamily: 'yg-jalnan', boxShadow: '#535353' }}
            onClick={() => setStep(3)}
            disabled={!teamName}
          >
            대결 시작하기
          </button>
          <button
            style={{ background: '#eee', color: '#444', borderRadius: '2.5rem', fontWeight: 'normal', fontSize: '1.2rem', padding: '0.5rem 2.5rem', margin: '0.5em auto 0', fontFamily: 'yg-jalnan', boxShadow: '#535353' }}
            onClick={onBack}
          >
            뒤로가기
          </button>
        </div>
      </div>
    );
  }

  // 선수 선택 화면
  if (step === 1) {
    return (
      <TeamSelectionScreen
        teamName={teamName}
        mode={mode}
        onNext={players => {
          setSelectedPlayers(players);
          setStep(2);
        }}
        onBack={() => setStep(0)}
      />
    );
  }

  // 팀 완성 화면
  if (step === 2) {
    return (
      <div>
        <TeamCompletionScreen
          selectedPlayers={selectedPlayers}
          teamName={teamName}
          onNext={() => {
            setStep(0)
          }}
          onBack={() => setStep(1)}
        />
      </div>
    );
  }

  // step === 3: 패스워드 설정 화면
  if (step === 3) {
    return (
      <PasswordSetupScreen
        teamName={teamName}
        onComplete={() => {/* 공유하기 동작 구현 필요 */}}
        playerIds={Object.values(selectedPlayers).map(p => p?.id).filter(Boolean)}
        onBack={() => setStep(0)}
        onHome={onBack} // 홈으로 이동
      />
    );
  }

  return null;
};

export default FriendTeamSetupScreen;
