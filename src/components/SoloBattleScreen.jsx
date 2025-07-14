import { useState } from "react";
import { Button } from "@/components/ui/button";
import TeamSelectionScreen from "@/components/TeamSelectionScreen";
import TeamCompletionScreen from "@/components/TeamCompletionScreen";
import GameLoadingScreen from "@/components/GameLoadingScreen";
import ResultScreen from "@/components/ResultScreen";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const SoloBattleScreen = ({ onBack }) => {
  const [step, setStep] = useState('setup');
  const [team1Name, setTeam1Name] = useState('드림');
  const [team2Name, setTeam2Name] = useState('나눔');
  const [team1Players, setTeam1Players] = useState(null);
  const [team1RandomPlayers, setTeam1RandomPlayers] = useState(null);
  const [team2RandomPlayers, setTeam2RandomPlayers] = useState(null);
  const [team2Players, setTeam2Players] = useState(null);
  const [currentTeamMode, setCurrentTeamMode] = useState('manual');
  const [gameScores, setGameScores] = useState(null);
  // 팀 이름 변경 로직 추가
  const [editingTeam1, setEditingTeam1] = useState(false);
  const [editingTeam2, setEditingTeam2] = useState(false);
  const [tempTeam1Name, setTempTeam1Name] = useState(team1Name);
  const [tempTeam2Name, setTempTeam2Name] = useState(team2Name);

  const handleTeam1NameChange = () => {
    setTeam1Name(tempTeam1Name);
    setEditingTeam1(false);
  };
  const handleTeam2NameChange = () => {
    setTeam2Name(tempTeam2Name);
    setEditingTeam2(false);
  };

  const handleTeam1Select = (mode) => {
    setCurrentTeamMode(mode);
    setStep("team1-select");
  };
  const handleTeam2Select = (mode) => {
    setCurrentTeamMode(mode);
    setStep("team2-select");
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
  const handleStartMatch = async () => {
    // 팀 정보와 선수 id 추출
    if (!(team1Players && team2Players)) return;
    setStep('loading');
    const homeTeam = {
      teamName: team1Name,
      playerIds: Object.values(team1Players).map(p => p?.id).filter(Boolean)
    };
    const awayTeam = {
      teamName: team2Name,
      playerIds: Object.values(team2Players).map(p => p?.id).filter(Boolean)
    };
    try {
      const res = await fetch(`${SERVER_BASE_URL}/plays/solo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ homeTeam, awayTeam })
      });
      if (!res.ok) throw new Error('서버 오류');
      const result = await res.json();
      console.log('대결 결과:', result);
      // result: { homeTeam: { teamName, teamScore }, awayTeam: { teamName, teamScore } }
      setGameScores({
        team1: result.homeTeam.teamScore,
        team2: result.awayTeam.teamScore,
        team1Name: result.homeTeam.teamName,
        team2Name: result.awayTeam.teamName
      });
      // GameLoadingScreen에서 onComplete 호출 시 결과 화면으로 이동
    } catch (err) {
      alert('대결 시작 요청 실패: ' + err.message);
    }
  };
  const handleGameComplete = (scores) => {
    setStep('result');
  };

  if (step === 'setup') {
    return (
      <div className="min-h-screen w-full flex flex-col items-center relative bg-[#b3e3fd] overflow-x-hidden font-jalnan">
        {/* 상단 구름+타이틀 */}
        <img
          src="/back_ground.png"
          alt="Home Background"
          className="w-full h-full object-cover absolute inset-0 z-0"
          style={{ minHeight: '100vh', minWidth: '100vw' }}
        />
        <div className="z-10 mt-20 mb-4 text-center font-title" style={{ color: '#535353', fontSize: '2rem', display: 'inline-block', padding: '0.2em 0.7em', WebkitTextStroke: '0.1px rgba(255,255,255)', fontWeight: 'bold' }}>
          MY BASEBALL<br />
          ALL✪STAR
        </div>

        <div className="flex flex-col items-center z-10 mt-1 mb-4">
          <div style={{ background: '#444', color: 'white', borderRadius: '2.5rem', fontWeight: 'normal', fontSize: '1.2rem', padding: '0.5rem 2.5rem', margin: '0 auto', fontFamily: 'yg-jalnan', boxShadow: '#535353' }}>
            혼자 경기
          </div>
        </div>
        
        
        {/* 팀 카드 영역 */}
        <div className="flex flex-row space-evenly w-full z-10" style={{ width: '100%' }}>
          {/* 드림팀 카드 */}
          <div
            className="flex-1 flex flex-col items-center bg-[#4ec16e] rounded-2xl py-4 px-2 mr-1 ml-2 font-jalnan"
            style={{ minWidth: '140px', maxWidth: '220px', flexGrow: 1, boxSizing: 'border-box', marginBottom: '10px' }}
          >
            {editingTeam1 ? (
              <div className="flex flex-col items-center w-full mb-2 font-jalnan">
                <input
                  value={tempTeam1Name}
                  onChange={e => setTempTeam1Name(e.target.value)}
                  className="text-gray-800 text-center rounded-full px-2 py-1 mb-2 w-full font-jalnan"
                  style={{ fontSize: '1.2rem' }}
                  maxLength={10}
                />
                <Button
                  onClick={handleTeam1NameChange}
                  className="bg-white text-[#444] rounded-full px-4 py-1 text-base font-jalnan"
                >
                  완료
                </Button>
              </div>
            ) : (
              <>
                <div className="text-white text-2xl mb-2 font-jalnan">{team1Name}</div>
                <Button
                  className="bg-white text-[#444] rounded-full px-3 py-1 mb-2 text-base font-jalnan"
                  onClick={() => {
                    setTempTeam1Name(team1Name);
                    setEditingTeam1(true);
                  }}
                >
                  팀 이름 변경하기
                </Button>
              </>
            )}
            <img src="/element/field.png" alt="Field" style={{ width: '90px', margin: '16px 0' }} />
            <div className={`bg-white rounded-full px-4 py-1 mt-2 mb-2 text-base font-jalnan ${team1Players ? 'text-[#2ca24c] border-2 border-[#2ca24c]' : 'text-[#aaa] border-2 border-[#aaa]'}`}>{team1Players ? '선수 선택 완료' : '선수 선택 미완료'}</div>
            <button
              className="w-full bg-[#e28a3d] text-white rounded-full py-2 mt-2 mb-2 font-jalnan"
              style={{ fontSize: '1rem' }}  
              onClick={() => handleTeam1Select('random')}
            >
              선수 <span style={{ color: '#ffe066' }}>랜덤</span> 선택
            </button>
            <button
              className="w-full bg-[#e28a3d] text-white rounded-full py-2 mb-2 font-jalnan"
              style={{ fontSize: '1rem' }}  
              onClick={() => handleTeam1Select('manual')}
            >
              선수 <span style={{ color: '#ffe066' }}>내가</span> 선택
            </button>
          </div>
          
          {/* 나눔팀 카드 */}
          <div
            className="flex-1 flex flex-col items-center bg-[#4ec16e] rounded-2xl py-4 px-2 mr-2 ml-1 font-jalnan"
            style={{ minWidth: '140px', maxWidth: '220px', flexGrow: 1, boxSizing: 'border-box', marginBottom: '10px' }}
          >
            {editingTeam2 ? (
              <div className="flex flex-col items-center w-full mb-2 font-jalnan">
                <input
                  value={tempTeam2Name}
                  onChange={e => setTempTeam2Name(e.target.value)}
                  className="text-gray-800 text-center rounded-full px-2 py-1 mb-2 w-full font-jalnan"
                  style={{ fontSize: '1.2rem' }}
                  maxLength={10}
                />
                <Button
                  onClick={handleTeam2NameChange}
                  className="bg-white text-[#444] rounded-full px-4 py-1 text-base font-jalnan"
                >
                  완료
                </Button>
              </div>
            ) : (
              <>
                <div className="text-white text-2xl font-jalnan mb-2">{team2Name}</div>
                <Button
                  className="bg-white text-[#444] rounded-full px-4 py-1 mb-2 text-base font-jalnan"
                  onClick={() => {
                    setTempTeam2Name(team2Name);
                    setEditingTeam2(true);
                  }}
                >
                  팀 이름 변경하기
                </Button>
              </>
            )}
            <img src="/element/field.png" alt="Field" style={{ width: '90px', margin: '16px 0' }} />
            <div className={`bg-white rounded-full px-4 py-1 mt-2 mb-2 text-base font-jalnan ${team2Players ? 'text-[#2ca24c] border-2 border-[#2ca24c]' : 'text-[#aaa] border-2 border-[#aaa]'}`}>{team2Players ? '선수 선택 완료' : '선수 선택 미완료'}</div>
            <button
              className="w-full bg-[#e28a3d] text-white rounded-full py-2 mt-2 mb-2 font-jalnan"
              style={{ fontSize: '1rem' }}  
              onClick={() => handleTeam2Select('random')}
            >
              선수 <span style={{ color: '#ffe066' }}>랜덤</span> 선택
            </button>
            <button
              className="w-full bg-[#e28a3d] text-white rounded-full py-2 mb-2 font-jalnan"
              style={{ fontSize: '1rem' }}  
              onClick={() => handleTeam2Select('manual')}
            >
              선수 <span style={{ color: '#ffe066' }}>내가</span> 선택
            </button>
          </div>
        </div>

        {/* 대결 시작하기 버튼 */}
        <div className="flex flex-col items-center z-10 mt-1 mb-12 w-full font-jalnan" style={{ maxWidth: '400px' }}>
          <button
            style={{ background: '#444', color: 'white', borderRadius: '2.5rem', fontWeight: 'normal', fontSize: '1.2rem', padding: '0.5rem 2.5rem', margin: '0 auto', fontFamily: 'yg-jalnan', boxShadow: '#535353' }}
            onClick={handleStartMatch}
            disabled={!(team1Players && team2Players)}
          >
            대결 시작하기
          </button>
        </div>
      </div>
    );
  }
  // step이 setup이 아닐 때는 기존 로직대로 화면 전환
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {step === 'team1-select' && (
          <TeamSelectionScreen 
            teamName={team1Name}
            teamNumber={1}
            mode={currentTeamMode}
            selectedPlayers={team1RandomPlayers}
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
            mode={currentTeamMode}
          />
        )}
        {step === 'team2-select' && (
          <TeamSelectionScreen 
            teamName={team2Name}
            teamNumber={2}
            mode={currentTeamMode}
            selectedPlayers={team2RandomPlayers}
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
            mode={currentTeamMode} // mode prop 추가
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
