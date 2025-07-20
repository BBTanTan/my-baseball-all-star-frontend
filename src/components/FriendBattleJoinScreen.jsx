import PasswordVerificationScreen from "@/components/PasswordVerificationScreen";
import { useEffect, useState } from "react";
import TeamCompletionScreen from "@/components/TeamCompletionScreen";
import TeamSelectionScreen from "@/components/TeamSelectionScreen";
import GameLoadingScreen from "@/components/GameLoadingScreen";
import ResultScreen from "@/components/ResultScreen";
import { useSearchParams, useNavigate } from "react-router-dom";
import MobileLayout from "./layout/MobileLayout";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;


// 친구가 링크로 접속해서 join하는 화면
const FriendBattleJoinScreen = () => {
  const navigate = useNavigate();
  const [homeTeam, setHomeTeam] = useState(null);
  const [homeTeamError, setHomeTeamError] = useState(false);
  const [showPasswordVerification, setShowPasswordVerification] = useState(false);
  const [step, setStep] = useState(0); // 0: 상대팀 라인업+내팀 선택, 1: 내팀 완성, 2: 상대팀 라인업 확인, 3: 내 팀 선택, 4: 게임 로딩
  const [myTeamName, setMyTeamName] = useState("드림"); // 기본값을 "드림팀"으로 고정
  const [mode, setMode] = useState("manual");
  const [selectedPlayers, setSelectedPlayers] = useState({});
  const [myTeamNameEdit, setMyTeamNameEdit] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [gameScores, setGameScores] = useState(null);

  useEffect(() => {
    const teamUuid = searchParams.get('teamUuid');
    if (teamUuid) {
      fetch(`${SERVER_BASE_URL}/teams/${teamUuid}`)
        .then(res => res.json())
        .then(data => {
          if (!data || !data.teamId || !data.teamName || !data.players) {
            setHomeTeamError(true);
            return;
          }
          // 한글 포지션명 → 영문 포지션명 매핑 및 외야수 분배
          const positionMapKor = {
            '포수': 'C',
            '선발 투수': 'P',
            '중간 투수': 'MP',
            '마무리 투수': 'CP',
            '1루수': '1B',
            '2루수': '2B',
            '3루수': '3B',
            '유격수': 'SS',
            '외야수': ['LF', 'CF', 'RF'],
            '지명타자': 'DH'
          };
          const selectedPlayers = {};
          let outfieldIdx = 0;
          data.players.forEach(player => {
            const pos = player.position;
            if (pos === '외야수') {
              const outfieldPositions = positionMapKor['외야수'];
              if (outfieldIdx < outfieldPositions.length) {
                selectedPlayers[outfieldPositions[outfieldIdx]] = {
                  ...player,
                  birthdate: player.dateOfBirth,
                  team: player.club
                };
                outfieldIdx++;
              }
            } else {
              const mappedPos = positionMapKor[pos];
              if (mappedPos) {
                selectedPlayers[mappedPos] = {
                  ...player,
                  birthdate: player.dateOfBirth,
                  team: player.club
                };
              }
            }
          });
          // 모든 포지션이 반드시 존재하도록 보장
          const allPositions = ['C', 'P', 'MP', 'CP', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'DH'];
          allPositions.forEach(pos => {
            if (!selectedPlayers[pos]) {
              selectedPlayers[pos] = {};
            }
          });
          setHomeTeam({
            teamId: data.teamId,
            teamName: data.teamName,
            selectedPlayers
          });
        })
        .catch(() => setHomeTeamError(true));
    } else {
      setHomeTeamError(true);
    }
  }, []);

  if (showPasswordVerification) {
    return <PasswordVerificationScreen 
    teamName={homeTeam.teamName} 
    teamId={homeTeam?.teamId}
    onBack={() => setShowPasswordVerification(false)} />;
  }
  // step === 4: 로딩 화면 (이동)
  if (step === 4) {
    return (
      <GameLoadingScreen
        team1Name={homeTeam.teamName}
        team2Name={myTeamName}
        onComplete={() => setStep(5)}
      />
    );
  }

  // step === 5: 결과 화면 (이동)
  if (step === 5 && gameScores) {
    return (
      <ResultScreen
        team1Name={gameScores.team1Name}
        team2Name={gameScores.team2Name}
        team1Score={gameScores.team1}
        team2Score={gameScores.team2}
        onPlayAgain={() => {
          setSelectedPlayers({});
          setStep(0);
        }}
        onHome={() => { window.location.href = '/'; }}
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
        onBack={() => {
          setSelectedPlayers({});
          setStep(0);
        }}
      />
    );
  }

  // 상대팀 라인업 확인 화면
  if (step === 2) {
    return (
      <TeamCompletionScreen
        selectedPlayers={homeTeam.selectedPlayers}
        teamName={homeTeam.teamName}
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
        onBack={() => {
              setTeam1Players(null);
              setStep('setup');
        }}
      />
    );
  }

  // 데이터가 아직 로딩 중일 때
  if (!homeTeam && !homeTeamError) {
    return <div className="min-h-screen flex items-center justify-center">팀 정보를 불러오는 중...</div>;
  }

  // 에러 메시지
  if (homeTeamError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-jalnan bg-[#b3e3fd]">
        <div className="bg-white text-red-500 rounded-2xl px-8 py-6 text-xl font-bold shadow-lg">
          팀 정보를 찾을 수 없습니다.<br />링크를 다시 확인해 주세요.
        </div>
      </div>
    );
  }

  // step === 0: 상대팀 라인업+내팀 선택
  // 선택완료/미완료 상태
  const positionsCount = 12;
  const selectedCount = Object.keys(selectedPlayers).length;
  const isComplete = selectedCount === positionsCount && Object.values(selectedPlayers).every(Boolean);

  // 대결 시작 버튼 핸들러: 여기서 서버에 요청 보내고 로딩/결과 처리
  const handleStartMatch = async () => {
    if (!homeTeam || !isComplete || !myTeamName) return;
    setStep(4); // 로딩 화면으로 이동
    const homeTeamId = homeTeam.teamId;
    const awayTeam = {
      teamName: myTeamName,
      playerIds: Object.values(selectedPlayers).map(p => p?.id).filter(Boolean)
    };
    try {
      const res = await fetch(`${SERVER_BASE_URL}/plays/friend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ homeTeamId, awayTeam })
      });
      if (!res.ok) throw new Error('서버 오류');
      const result = await res.json();
      setGameScores({
        team1: result.homeTeam.teamScore,
        team2: result.awayTeam.teamScore,
        team1Name: result.homeTeam.teamName,
        team2Name: result.awayTeam.teamName
      });
    } catch (err) {
      alert('대결 시작 요청 실패: ' + err.message);
      setStep(0);
    }
  };

  return (
    <MobileLayout>
      <div className="min-h-screen w-full flex flex-col items-center justify-center relative bg-[#b3e3fd] overflow-x-hidden font-jalnan">
        {/* 홈 버튼 */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 z-20 text-[#444] rounded-full w-10 h-10 flex items-center justify-center font-jalnan shadow border-2 border-[#b3e3fd]"
          style={{ backgroundImage: "url('/element/home.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
          aria-label="홈으로"
        >
        </button>
        {/* 배경 */}
        <img src="/back_ground.png" alt="Home Background" className="w-full h-full object-cover absolute inset-0 z-0"/>
        {/* 타이틀 */}
        <div className="z-10 mt-20 mb-1 text-center font-title font-extrabold" style={{ color: "#535353", fontSize: "1.7rem", display: "inline-block", padding: "0.2em 0.7em", fontWeight: "200", textShadow: "0 0 2px #fff, 0 0 4px #fff", lineHeight: "0.9" }}>
          MY BASEBALL<br />ALL✪STAR
        </div>
        {/* 안내 */}
        <div className="z-10 mt-2 mb-4 text-center">
          <div style={{ background: '#444', color: 'white', borderRadius: '2.5rem', fontWeight: 'normal', fontSize: '1.2rem', padding: '0.5rem 2.5rem', margin: '0 auto', fontFamily: 'yg-jalnan', boxShadow: '#535353' }}>
            {homeTeam.teamName}팀과의 경기를 준비하세요
          </div>
        </div>
        {/* 카드 영역 */}
        <div className="flex flex-row justify-center items-center w-full z-10" style={{ width: '100%' }}>
          {/* 상대팀 카드 */}
          <div
            className="flex-1 flex flex-col items-center bg-[#4ec16e] rounded-2xl py-4 px-2 mx-2 font-jalnan"
            style={{ minWidth: '140px', maxWidth: '220px', flexGrow: 1, boxSizing: 'border-box', marginBottom: '10px' }}
          >             
            <div
              className="text-white text-2xl font-jalnan mb-2 w-full text-center truncate min-w-0"
              style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)' }}
              title={homeTeam.teamName}
            >
              {homeTeam.teamName}팀
            </div>
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
            {(myTeamNameEdit) ? (
              <div className="flex flex-col items-center w-full mb-2 font-jalnan">
                <input
                  value={myTeamName}
                  onChange={e => setMyTeamName(e.target.value)}
                  className="text-gray-800 text-center rounded-full px-2 py-1 mb-2 w-full font-jalnan"
                  style={{ fontSize: '1rem' }}
                  maxLength={10}
                  placeholder="팀 이름을 입력하세요"
                />
                <button
                  onClick={() => {
                    setMyTeamName(myTeamName);
                    setMyTeamNameEdit(false);
                  }}
                  className="bg-white text-[#444] rounded-full px-4 py-1 text-base font-jalnan w-full"
                  disabled={!myTeamName}
                >
                  완료
                </button>
              </div>
            ) : (
              <>
                <div
                  className="text-white text-2xl font-jalnan mb-2 w-full text-center truncate min-w-0"
                  style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)' }}
                  title={myTeamName}
                >
                  {myTeamName}
                </div>
                <button
                  className="bg-white text-[#444] rounded-full px-3 py-1 mb-2 text-base font-jalnan w-full"
                  onClick={() => {
                    setMyTeamName(myTeamName);
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
            onClick={handleStartMatch}
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
    </MobileLayout>
  );
};

export default FriendBattleJoinScreen;
