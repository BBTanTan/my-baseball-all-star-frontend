import { Card, CardContent } from "@/components/ui/card";

const TeamLineupDisplay = ({ teamName, selectedPlayers }) => {
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
      'DH': '지명 타자'
    };
    return positionNames[pos];
  };

  const fieldPositions = [
    { pos: 'CF', x: 50, y: 20, label: 'CF' },
    { pos: 'LF', x: 15, y: 30, label: 'LF' },
    { pos: 'RF', x: 85, y: 30, label: 'RF' },
    { pos: '2B', x: 60, y: 45, label: '2B' },
    { pos: 'SS', x: 40, y: 45, label: 'SS' },
    { pos: '3B', x: 25, y: 55, label: '3B' },
    { pos: '1B', x: 75, y: 55, label: '1B' },
    { pos: 'P', x: 50, y: 50, label: 'P' },
    { pos: 'C', x: 50, y: 70, label: 'C' },
    { pos: 'MP', x: 35, y: 80, label: 'MP' },
    { pos: 'CP', x: 65, y: 80, label: 'CP' }
  ];

  return (
    <div className="w-full">
      {/* 선수 그리드만 표시 */}
      <div className="w-full max-w-md mx-auto px-4">
        <div className="grid grid-cols-3 gap-3">
          {positions.slice(0, 9).map((pos) => {
            const player = selectedPlayers[pos];
            return (
              <Card key={pos} className="bg-white rounded-2xl">
                <CardContent className="p-3 text-center">
                  <div className="text-xs text-gray-600 mb-2">{getPositionName(pos)}</div>
                  <div className="w-12 h-12 rounded-full bg-gray-300 mx-auto mb-2 overflow-hidden">
                    {player && (
                      <img 
                        src={player.profileUrl || '/element/player-default.png'} 
                        alt={player.name} 
                        className="w-full h-full object-cover" 
                      />
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="text-blue-600 font-bold text-xs">{player?.team || ''}</div>
                    <div className="font-bold text-xs">{player?.name || ''}</div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional positions row */}
        <div className="grid grid-cols-3 gap-3 mt-3">
          {positions.slice(9).map((pos) => {
            const player = selectedPlayers[pos];
            return (
              <Card key={pos} className="bg-white rounded-2xl">
                <CardContent className="p-3 text-center">
                  <div className="text-xs text-gray-600 mb-2">{getPositionName(pos)}</div>
                  <div className="w-12 h-12 rounded-full bg-gray-300 mx-auto mb-2 overflow-hidden">
                    {player && (
                      <img 
                        src={player.profileUrl || '/element/player-default.png'} 
                        alt={player.name} 
                        className="w-full h-full object-cover" 
                      />
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="text-blue-600 font-bold text-xs">{player?.team || ''}</div>
                    <div className="font-bold text-xs">{player?.name || ''}</div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeamLineupDisplay;
