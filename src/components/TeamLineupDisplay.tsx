
import { Card, CardContent } from "@/components/ui/card";
import { Player, Position } from "@/utils/playerData";

interface TeamLineupDisplayProps {
  teamName: string;
  selectedPlayers: Record<Position, Player | null>;
}

const TeamLineupDisplay = ({ teamName, selectedPlayers }: TeamLineupDisplayProps) => {
  const positions: Position[] = ['C', 'SP', 'MR', 'CL', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'DH'];

  const getPositionName = (pos: Position) => {
    const positionNames = {
      'C': '포수',
      'SP': '선발투수', 
      'MR': '중간투수',
      'CL': '마무리투수',
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
    { pos: 'CF' as Position, x: 50, y: 20, label: 'CF' },
    { pos: 'LF' as Position, x: 15, y: 30, label: 'LF' },
    { pos: 'RF' as Position, x: 85, y: 30, label: 'RF' },
    { pos: '2B' as Position, x: 60, y: 45, label: '2B' },  
    { pos: 'SS' as Position, x: 40, y: 45, label: 'SS' },
    { pos: '3B' as Position, x: 25, y: 55, label: '3B' },
    { pos: '1B' as Position, x: 75, y: 55, label: '1B' },
    { pos: 'SP' as Position, x: 50, y: 50, label: 'P' },
    { pos: 'C' as Position, x: 50, y: 70, label: 'C' },
    { pos: 'MR' as Position, x: 35, y: 80, label: 'MP' },
    { pos: 'CL' as Position, x: 65, y: 80, label: 'CP' }
  ];

  return (
    <div className="w-full space-y-6">
      {/* Title */}
      <div className="bg-gray-700 text-white px-6 py-3 rounded-full text-center">
        <h3 className="text-lg font-bold">{teamName} 선수</h3>
      </div>

      {/* Baseball Field with Selected Players */}
      <div className="relative w-80 h-64 mx-auto">
        {/* Outfield (brown area) */}
        <div className="absolute bottom-0 w-full h-48 bg-orange-400 rounded-t-full"></div>
        {/* Infield (green area) */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-32 bg-green-500 rounded-t-full">
          {/* Diamond outline */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-24 border-4 border-yellow-400 rotate-45"></div>
        </div>

        {/* Position markers with selected players */}
        {fieldPositions.map(({ pos, x, y, label }) => {
          const player = selectedPlayers[pos];
          
          return (
            <div
              key={pos}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <div className="w-12 h-12 rounded-full border-2 bg-blue-500 border-blue-600 text-white p-1 flex items-center justify-center">
                {player ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=150&h=150&fit=crop&crop=face" 
                      alt={player.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                ) : (
                  <span className="text-xs font-bold">{label}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Players Grid */}
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
                        src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=150&h=150&fit=crop&crop=face" 
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
                        src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=150&h=150&fit=crop&crop=face" 
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
