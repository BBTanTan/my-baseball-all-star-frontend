import { useState } from "react";
import TeamSelectionScreen from "@/components/TeamSelectionScreen";
import TeamCompletionScreen from "@/components/TeamCompletionScreen";

const FriendTeamSetupScreen = ({ onComplete, onBack }) => {
  const [step, setStep] = useState(0); // 0: Setup, 1: Select, 2: Complete
  const [teamName, setTeamName] = useState("");
  const [editingTeamName, setEditingTeamName] = useState(true);
  const [tempTeamName, setTempTeamName] = useState("");
  const [mode, setMode] = useState("manual");
  const [selectedPlayers, setSelectedPlayers] = useState({});

  // 선수 선택 방식 핸들러
  const handleSelect = (selectedMode) => {
    setMode(selectedMode);
    if (teamName) setStep(1);
  };

  // SetupScreen: 팀명, 모드 선택
  if (step === 0) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-between relative bg-[#b3e3fd] overflow-x-hidden font-jalnan">
        {/* 상단 구름+타이틀 */}
        <img
          src="/back_ground.png"
          alt="Home Background"
          className="w-full h-full object-cover absolute inset-0 z-0"
          style={{ minHeight: '100vh', minWidth: '100vw' }}
        />

        <div className="z-10 mt-8 mb-2 text-center font-title" style={{ color: '#535353', fontSize: '2rem', display: 'inline-block', padding: '0.2em 0.7em', WebkitTextStroke: '0.01px #fff', textStroke: '0.1px #fff', fontWeight: 'bold', background: 'rgba(255,255,255,0.10)' }}>
          MY BASEBALL<br />
          ALL✪STAR
        </div>

        <div className="flex flex-col items-center z-10 mt-2 mb-4">
          <div style={{ background: '#444', color: 'white', borderRadius: '2.5rem', fontWeight: 'normal', fontSize: '1.2rem', padding: '0.5rem 2.5rem', margin: '0 auto', fontFamily: 'yg-jalnan', boxShadow: '#535353' }}>
            친구와 함께 경기
          </div>
        </div>

        <div className="z-10 mt-8 mb-2 text-lg text-white text-center drop-shadow" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.18)' }}>
          원하는 팀 이름을 정하고<br />
          선수 선택 방식을 골라주세요!
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
                  value={tempTeamName}
                  onChange={e => setTempTeamName(e.target.value)}
                  className="text-gray-800 text-center rounded-full px-2 py-1 mb-2 w-full font-jalnan"
                  style={{ fontSize: '1.2rem', width: '100%' }}
                  maxLength={10}
                  placeholder="팀 이름을 입력하세요"
                />
                <button
                  onClick={() => {
                    setTeamName(tempTeamName);
                    setEditingTeamName(false);
                  }}
                  className="bg-white text-[#444] rounded-full px-4 py-1 text-base font-jalnan w-full"
                  disabled={!tempTeamName}
                >
                  완료
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center w-full mb-2 font-jalnan">
                <div className="text-white text-3xl mb-2 font-jalnan w-full">{teamName}</div>
                <button
                  className="bg-white text-[#444] rounded-full px-3 py-1 mb-2 text-base font-jalnan w-full"
                  onClick={() => {
                    setTempTeamName(teamName);
                    setEditingTeamName(true);
                  }}
                >
                  팀 이름 변경하기
                </button>
              </div>
            )}
            <img src="/element/field.png" alt="Field" style={{ width: '90px', margin: '16px 0' }} />
            <div className={`bg-white rounded-full px-4 py-1 mt-2 mb-2 text-base font-jalnan text-[#aaa] border-2 border-[#aaa]`}>선수 선택 미완료</div>
            <button
              className={`w-full bg-[#e28a3d] text-white rounded-full py-2 mt-2 mb-2 font-jalnan ${mode === 'random' ? 'border-2 border-yellow-400' : ''}`}
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

        {/* 다음 버튼 */}
        <div className="flex flex-col items-center z-10 mt-8 mb-8 w-full font-jalnan" style={{ maxWidth: '400px' }}>
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
  return (
    <TeamCompletionScreen
      selectedPlayers={selectedPlayers}
      teamName={teamName}
      onNext={() => {
        if (onComplete) onComplete({ selectedPlayers, teamName });
      }}
      onBack={() => setStep(1)}
    />
  );
};

export default FriendTeamSetupScreen;
