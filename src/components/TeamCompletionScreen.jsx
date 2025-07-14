/*선택 완료시 라인업 화면 */
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const TeamCompletionScreen = ({ teamName, selectedPlayers, onNext, onBack, mode }) => {
  const positions = ['C', 'P', 'MP', 'CP', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'DH'];
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
      'LF': '좌익수',
      'CF': '중견수',
      'RF': '우익수',
      'DH': '지명타자'
    };
    return positionNames[pos];
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
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center relative font-jalnan">
      <div className="flex flex-col items-center w-full h-full z-10" style={{ background: 'transparent', borderRadius: '0', padding: '0', height: '100%' }}>
        {/* Title */}
        <div className="text-lg text-[#FFFFFF] mb-2 font-normal font-jalnan mt-8" style={{ background: '#535353', borderRadius: '1.5rem', padding: '0.5rem 1.5rem', boxShadow: '#535353', fontWeight: 'normal' }}>
          <h2 className="text-xl font-bold">{teamName} 선수</h2>
        </div>
        {/* 필드 이미지 및 선수 배치 */}
        <div className="relative w-full flex justify-center mb-8" style={{ minHeight: '180px', height: '40%' }}>
          <img src="/element/field.png" alt="야구장" style={{ width: '100%', maxWidth: '80vh', borderRadius: '1.5rem', height: '100%' }} />
          {fieldPositions.map(({ pos, x, y, label }) => {
            const player = selectedPlayers[pos];
            return (
              <div
                key={pos}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all`}
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-normal bg-white border-blue-600 p-1`}>
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
        {/* 선수 라인업 박스 (스크롤) */}
        <div className="w-full max-w-md px-2" style={{ height: '35%', overflowY: 'auto', background: 'rgba(255,255,255,0.8)', borderRadius: '1.5rem', marginBottom: '0.5rem' }}>
          <div className="grid grid-cols-3 gap-3 py-3">
            {positions.map((pos) => {
              const player = selectedPlayers[pos];
              return (
                <Card key={pos} className="bg-white rounded-2xl">
                  <CardContent className="p-3 text-center">
                    <div className="text-s text-gray-600 mb-2 font-jalnan">{getPositionName(pos)}</div>
                    <div className="w-12 h-12 rounded-full bg-gray-300 mx-auto mb-2 overflow-hidden">
                      {player && (
                        <img 
                          src={player.profileUrl || player.imageUrl || '/element/player-default.png'} 
                          alt={player.name} 
                          className="w-full h-full object-cover" 
                        />
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="text-black-600 font-normal text-xs font-jalnan">{player?.club || player?.team || ''}</div>
                      <div className="font-normal text-xs font-jalnan">{player?.name || ''}</div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
        {/* 버튼 영역: TeamSelectionScreen과 동일하게 하단 고정 배치 */}
        <div className="w-full flex justify-center items-center mt-4">
          <div className="flex space-x-2 w-full max-w-md px-2">
            <Button 
              onClick={() => {
                if (mode === 'random') {
                  window.location.reload();
                } else {
                  onBack();
                }
              }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-8 py-4 rounded-full w-1/2"
            >
              뒤로가기
            </Button>
            <Button
              onClick={onNext}
              className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-full w-1/2"
            >
              선택완료
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCompletionScreen;
