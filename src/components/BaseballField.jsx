import { generatePlayers, calculateTeamScore } from "@/utils/playerData";

const BaseballField = ({ selectedPlayers, selectedPosition, onPositionClick, readonly = false }) => {
  const positions = [
    { pos: 'LF', x: 15, y: 25, label: 'LF' },
    { pos: 'CF', x: 50, y: 15, label: 'CF' },
    { pos: 'RF', x: 85, y: 25, label: 'RF' },
    { pos: '3B', x: 25, y: 65, label: '3B' },
    { pos: 'SS', x: 40, y: 55, label: 'SS' },
    { pos: '2B', x: 60, y: 55, label: '2B' },
    { pos: '1B', x: 75, y: 65, label: '1B' },
    { pos: 'C', x: 50, y: 85, label: 'C' },
    { pos: 'SP', x: 50, y: 70, label: 'P' },
    { pos: 'MR', x: 15, y: 85, label: 'MR' },
    { pos: 'CL', x: 85, y: 85, label: 'CL' },
    { pos: 'DH', x: 50, y: 95, label: 'DH' },
  ];

  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden">
      {/* Baseball field design */}
      <div className="absolute inset-0">
        {/* Outfield grass */}
        <div className="absolute inset-0"></div>
        {/* Infield dirt */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-80 h-80 rounded-full opacity-60"></div>
        {/* Pitcher's mound */}
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full"></div>
        {/* Home plate */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-4 h-4 transform rotate-45"></div>
      </div>
      {/* Position markers */}
      {positions.map(({ pos, x, y, label }) => {
        const player = selectedPlayers[pos];
        const isSelected = selectedPosition === pos;
        return (
          <div
            key={pos}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all ${!readonly ? 'hover:scale-110' : ''} ${isSelected ? 'scale-110 z-10' : ''}`}
            style={{ left: `${x}%`, top: `${y}%` }}
            onClick={() => !readonly && onPositionClick?.(pos)}
          >
            <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xs font-bold ${player ? 'border-blue-600 text-white' : isSelected ? 'border-yellow-500 text-yellow-800' : 'border-gray-400 text-gray-600'} ${!readonly ? 'hover:shadow-lg' : ''}`}>
              {player ? (
                <div className="text-center">
                  <div className="text-xs leading-tight">
                    {player.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
              ) : (
                label
              )}
            </div>
            {player && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs text-center text-white px-2 py-0.5 rounded whitespace-nowrap">
                {player.name.split(' ')[0]}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BaseballField;
