import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MobileLayout from "./layout/MobileLayout";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const TeamSelectionScreen = (props) => {

  const {
    teamName,
    mode: initialMode = 'manual',
    onNext,
    onBack,
    selectedPlayers: externalSelectedPlayers // 추가: 외부에서 전달된 selectedPlayers
  } = props;

  const [selectedPosition, setSelectedPosition] = useState('CF');
  const [selectedPlayers, setSelectedPlayers] = useState(externalSelectedPlayers || {
    'C': null,
    'P': null,
    'MP': null,
    'CP': null,
    '1B': null,
    '2B': null,
    '3B': null,
    'SS': null,
    'LF': null,
    'CF': null,
    'RF': null,
    'DH': null
  });
  const [positionPlayerData, setPositionPlayerData] = useState([]);
  const [selectedPlayerList, setSelectedPlayerList] = useState([]);
  const [mode, setMode] = useState(initialMode); // 모드 상태 추가
  const positions = ['C', 'P', 'MP', 'CP', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'DH'];
  
  useEffect(() => {
    if (mode === 'random') {
      const fetchRandomTeam = async () => {
        try {
          const res = await fetch(`${SERVER_BASE_URL}/teams?mode=random`);
          if (!res.ok) {
            const text = await res.text();
            throw new Error('서버 오류');
          }
          const data = await res.json();
          if (!Array.isArray(data.playerResponses)) {
            return;
          }
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
          const randomTeam = {};
          let outfieldIdx = 0;
          data.playerResponses.forEach(player => {
            const pos = player.position;
            if (pos === '외야수') {
              const outfieldPositions = positionMapKor['외야수'];
              if (outfieldIdx < outfieldPositions.length) {
                randomTeam[outfieldPositions[outfieldIdx]] = {
                  ...player,
                  birthdate: player.dateOfBirth,
                  team: player.club
                };
                outfieldIdx++;
              }
            } else {
              const mappedPos = positionMapKor[pos];
              if (mappedPos) {
                randomTeam[mappedPos] = {
                  ...player,
                  birthdate: player.dateOfBirth,
                  team: player.club
                };
              }
            }
          });
          setSelectedPlayers(randomTeam);
          const playerList = Object.entries(randomTeam).map(([position, player]) => ({
            ...player,
            position
          }));
          setSelectedPlayerList(playerList);
          // 바로 TeamCompletionScreen으로 이동
          onNext(randomTeam);
        } catch (err) {
        }
      };
      fetchRandomTeam();
    } else {
      // 수동 모드일 때 초기화
      setSelectedPlayers({
        'C': null,
        'P': null,
        'MP': null,
        'CP': null,
        '1B': null,
        '2B': null,
        '3B': null,
        'SS': null,
        'LF': null,
        'CF': null,
        'RF': null,
        'DH': null
      });
      setSelectedPlayerList([]);
    }
  }, [mode, positionPlayerData]);
  
  useEffect(() => {
    // 서버에서 선수 리스트 가져오기
    const fetchPlayers = async () => {
      try {
        const res = await fetch(`${SERVER_BASE_URL}/players`);
        if (!res.ok) throw new Error('서버 오류');
        const data = await res.json();
        setPositionPlayerData(data);
      } catch (err) {
        console.error('선수 데이터 불러오기 실패:', err);
        setPositionPlayerData([]); // 실패 시 빈 배열
      }
    };
    fetchPlayers();
  }, []);

  const selectPlayer = (player) => {
    // 이미 선택된 포지션에 선수 있으면 교체, 없으면 추가
    setSelectedPlayers(prev => ({
      ...prev,
      [selectedPosition]: player
    }));
    setSelectedPlayerList(prevList => {
      // 해당 포지션에 이미 선수 있으면 교체
      const filtered = prevList.filter(p => p.position !== selectedPosition);
      return [...filtered, { ...player, position: selectedPosition }];
    });
  };
  const isTeamComplete = selectedPlayerList.length === positions.length;
  const getPositionName = (pos) => {
    const positionNames = {
      'C': '포수',
      'P': '선발 투수',
      'MP': '중간 투수',
      'CP': '마무리 투수',
      '1B': '1루수',
      '2B': '2루수',
      '3B': '3루수',
      'SS': '유격수',
      'LF': '외야수', // 좌익수 → 외야수
      'CF': '외야수', // 중견수 → 외야수
      'RF': '외야수', // 우익수 → 외야수
      'DH': '지명타자'
    };
    return positionNames[pos];
  };
  const getPlayersByPosition = (pos) => {
    const koreanPosition = getPositionName(pos);
    const found = positionPlayerData.find(p => p.position === koreanPosition);
    return found ? found.players : [];
  };
  const currentPositionPlayers = getPlayersByPosition(selectedPosition);
  const handleNext = () => {
    if (isTeamComplete) {
      onNext(selectedPlayers);
    }
  };
  const handlePositionClick = (position) => {
    setSelectedPosition(position);
  };
  const isPlayerAlreadySelected = (player) => {
    return Object.values(selectedPlayers).some(selectedPlayer => 
      selectedPlayer && selectedPlayer.name === player.name && selectedPlayer.team === player.team
    );
  };
  const fieldPositions = [
    { pos: 'CF', x: 50, y: 10, label: 'CF' },
    { pos: 'LF', x: 15, y: 30, label: 'LF' },
    { pos: 'RF', x: 85, y: 30, label: 'RF' },
    { pos: '2B', x: 50, y: 30, label: '2B' },
    { pos: 'SS', x: 30, y: 35, label: 'SS' },
    { pos: '3B', x: 25, y: 55, label: '3B' },
    { pos: '1B', x: 75, y: 55, label: '1B' },
    { pos: 'P', x: 50, y: 50, label: 'P' },
    { pos: 'C', x: 50, y: 90, label: 'C' },
    { pos: 'MP', x: 65, y: 80, label: 'MP' },
    { pos: 'CP', x: 80, y: 80, label: 'CP' },
    { pos: 'DH', x: 30, y: 80, label: 'DH' }
  ];
  // 구단 로고 매핑 객체
  const clubLogos = {
    "삼성 라이온즈": "/logos/samsung.png",
    "두산 베어스": "/logos/doosan.png",
    "KIA 타이거즈": "/logos/kia.png",
    "키움 히어로즈": "https://i.namu.wiki/i/i0qhQjUqhPst7K_uUfnRJSMSArHuzEvH4aYK01Si3M7YW_ow2jvRbXNzcWGMl7P6QpFZMeyl4t5ayF27mAqLMA.svg",
    "롯데 자이언츠": "https://i.namu.wiki/i/yqjUMCPvc2UWmZeqfGrEAHAbo0KNURTUerd4MkFGHZ5GPTC3u07o1h0oOlV1JmihawLZwEzpt3oD3Xua4Irv7A.svg",
    "한화 이글스": "https://i.namu.wiki/i/qbwq_IPPAN9zGlmlz_OmptqaVFxYaOZTufagjpybSxrEQXKBfHGwOA8tPVYX4VDm6jN8nlaxvMTJqu0SY4oaKg.svg",
    "NC 다이노스": "https://www.ncdinos.com/m/assets/images/sub/emblem01.png",
    "LG 트윈스": "https://blog.kakaocdn.net/dna/bybTsV/btrzw2iB1K7/AAAAAAAAAAAAAAAAAAAAAO8bDBc9D5HY8yDiTj1WGrAJVP5-ktlJuOkpWJlyXw5z/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1753973999&allow_ip=&allow_referer=&signature=GHlI9Qcoa0YLPU6gLJ6CPB0%2FHHM%3D",
    "SSG 랜더스": "https://www.ssglanders.com/img/wyverns/emblem/new/emblem_01.png",
    "KT WIZ": "https://i.namu.wiki/i/1I_O46xxWGvTC-arPbfuBwaYgmd0I9gOCfTSchy5Hf5zZ-blf38j7boUFED_abbT5R8Qsj_Ynb-b7x4zxPk4HQ.svg"
  };
  return (
    <MobileLayout outerBg="transparent" innerBg="transparent">
    <div className="h-screen w-full flex flex-col items-center justify-center relative font-jalnan">
      <div className="flex flex-col items-center w-full h-full z-10" style={{ background: 'transparent', borderRadius: '0', padding: '0', height: '100%' }}>
        {/* 타이틀 */}
        <div className="text-lg text-[#FFFFFF] mb-2 font-normal font-jalnan mt-8" style={{ background: '#535353', borderRadius: '1.5rem', padding: '0.5rem 1.5rem', boxShadow: '#535353', fontWeight: 'normal' }}>
          {teamName} 선수선택
        </div>
        {/* 필드 이미지 */}
        <div className="relative w-full flex justify-center mb-2" style={{ minHeight: '180px', height: '40%' }}>
          <img src="/element/field.png" alt="야구장" style={{ width: '100%', maxWidth: '90%', borderRadius: '1.5rem', height: '100%' }} />
          {/* 포지션 마커: 이미지 좌표 고정 */}
          {fieldPositions.map(({ pos, x, y, label }) => {
            const player = selectedPlayers[pos];
            const isSelected = selectedPosition === pos;
            return (
              <div
                key={pos}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all ${isSelected ? 'scale-110 z-10' : ''}`}
                style={{ left: `${x}%`, top: `${y}%` }}
                onClick={() => handlePositionClick(pos)}
              >
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-normal bg-white ${player ? 'border-blue-600 p-1' : isSelected ? 'border-yellow-500 text-yellow-800' : 'border-gray-400 text-gray-600'}`}>
                  {player ? (
                    <img src={player.profileUrl || player.imageUrl || '/element/player-default.png'} alt={player.name} className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <span className="w-full text-center font-normal font-jalnan">{label}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {/* Selected Position Info & Player List */}
        {mode === 'manual' ? (
          <>
            <div className="bg-blue-500 text-white px-4 py-2 rounded-full mb-2 font-normal font-jalnan">
                {getPositionName(selectedPosition)} 선택
            </div>
            <div className="w-full px-2" style={{ height: '40%' }}>
              <div className="space-y-2 overflow-y-auto" style={{ height: '100%' }}>
                {currentPositionPlayers.map((player) => {
                  const isAlreadySelected = isPlayerAlreadySelected(player);
                  const isCurrentlySelected = selectedPlayers[selectedPosition]?.id === player.id;
                  return (
                    <Card 
                      key={player.id} 
                      className={`flex items-center px-4 py-2 rounded-2xl cursor-pointer transition-all hover:shadow-lg ${
                        isCurrentlySelected 
                          ? 'bg-gray-300' // 선택 시 연한 회색 배경
                          : isAlreadySelected
                            ? 'opacity-60'
                            : 'hover:bg-gray-50'
                      }`}
                      onClick={() => !isAlreadySelected && selectPlayer(player)}
                    >
                      {/* 프로필 이미지 */}
                      <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border">
                        <img 
                          src={player.profileUrl || '/element/player-default.png'} 
                          alt={player.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      {/* 선수 정보 */}
                      <div className="flex-1 flex flex-col justify-center ml-4">
                        <div className="text-base font-normal font-jalnan">{player.name}</div>
                        <div className="text-sm font-normal text-gray-600 font-jalnan">{player.club}</div>
                        <div className="text-sm text-gray-500 font-jalnan">{player.dateOfBirth}</div>
                      </div>
                      {/* 구단 로고 */}
                      <div className="ml-4">
                        <img src={clubLogos[player.club]} alt={player.club} className="w-16 h-16 object-contain" />
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          // Show selected players for random mode
          <div className="w-full px-2" style={{ height: '40%' }}>
            <div className="space-y-2 overflow-y-auto" style={{ height: '100%' }}>
              {positions.map((pos) => {
                const player = selectedPlayers[pos];
                if (!player) return null;
                return (
                  <Card key={pos} className="rounded-2xl">
                    <CardContent className="p-3 flex items-center space-x-3 font-normal">
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <img 
                          src={player.profileUrl || '/element/player-default.png'} 
                          alt={player.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] text-gray-600 mb-1 font-normal font-jalnan">{getPositionName(pos)}</div>
                        <div className="text-blue-600 text-[10px] mb-1 font-normal font-jalnan">{player.club}</div>
                        <div className="text-xs truncate font-normal font-jalnan">{player.name}</div>
                        <div className="text-[10px] text-gray-500 font-normal font-jalnan">{player.birthdate}</div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
        {/* 버튼 영역 */}
        <div className="flex space-x-2 mt-4 w-full" style={{ height: '20%' }}>
          <Button onClick={onBack} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full flex-1 font-normal font-jalnan">뒤로가기</Button>
          {mode === 'manual' && (
            <Button onClick={handleNext} className={`px-4 py-2 rounded-full text-sm flex-1 font-normal font-jalnan ${isTeamComplete ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-400 text-gray-600 cursor-not-allowed'}`} disabled={!isTeamComplete}>{isTeamComplete ? '선택완료' : '선택 미완료'}</Button>
          )}
        </div>
      </div>
    </div>
    </MobileLayout>
  );
};

export default TeamSelectionScreen;
