import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { generatePlayers } from "@/utils/playerData";

const TeamSelectionScreen = ({
  teamName,
  teamNumber,
  mode,
  onNext,
  onBack
}) => {
  const [selectedPosition, setSelectedPosition] = useState('CF');
  const [selectedPlayers, setSelectedPlayers] = useState({
    'C': null,
    'SP': null,
    'MR': null,
    'CL': null,
    '1B': null,
    '2B': null,
    '3B': null,
    'SS': null,
    'LF': null,
    'CF': null,
    'RF': null,
    'DH': null
  });
  const [allPlayers] = useState(() => generatePlayers());
  const positions = ['C', 'SP', 'MR', 'CL', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'DH'];
  useEffect(() => {
    if (mode === 'random') {
      const randomTeam = {};
      const usedPlayers = new Set();
      positions.forEach(pos => {
        const positionPlayers = allPlayers.filter(p => 
          p.position === pos && !usedPlayers.has(`${p.name}-${p.team}`)
        );
        if (positionPlayers.length > 0) {
          const randomIndex = Math.floor(Math.random() * positionPlayers.length);
          const selectedPlayer = positionPlayers[randomIndex];
          randomTeam[pos] = selectedPlayer;
          usedPlayers.add(`${selectedPlayer.name}-${selectedPlayer.team}`);
        }
      });
      setSelectedPlayers(randomTeam);
    }
  }, [mode, allPlayers]);
  const selectPlayer = (player) => {
    setSelectedPlayers(prev => ({
      ...prev,
      [selectedPosition]: player
    }));
  };
  const isTeamComplete = positions.every(pos => selectedPlayers[pos] !== null);
  const currentPositionPlayers = allPlayers.filter(p => p.position === selectedPosition);
  const handleNext = () => {
    if (isTeamComplete) {
      onNext(selectedPlayers);
    }
  };
  const handlePositionClick = (position) => {
    setSelectedPosition(position);
  };
  const getPositionName = (pos) => {
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
  const isPlayerAlreadySelected = (player) => {
    return Object.values(selectedPlayers).some(selectedPlayer => 
      selectedPlayer && selectedPlayer.name === player.name && selectedPlayer.team === player.team
    );
  };
  const fieldPositions = [
    { pos: 'CF', x: 50, y: 20, label: 'CF' },
    { pos: 'LF', x: 15, y: 30, label: 'LF' },
    { pos: 'RF', x: 85, y: 30, label: 'RF' },
    { pos: '2B', x: 60, y: 45, label: '2B' },
    { pos: 'SS', x: 40, y: 45, label: 'SS' },
    { pos: '3B', x: 25, y: 55, label: '3B' },
    { pos: '1B', x: 75, y: 55, label: '1B' },
    { pos: 'SP', x: 50, y: 50, label: 'P' },
    { pos: 'C', x: 50, y: 70, label: 'C' },
    { pos: 'MR', x: 35, y: 80, label: 'MP' },
    { pos: 'CL', x: 65, y: 80, label: 'CP' }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 to-sky-200 relative overflow-hidden">
      {/* Clouds */}
      <div className="absolute top-8 left-8 w-24 h-16 bg-white rounded-full opacity-90"></div>
      <div className="absolute top-12 right-16 w-20 h-12 bg-white rounded-full opacity-80"></div>
      <div className="absolute bottom-32 right-8 w-28 h-18 bg-white rounded-full opacity-85"></div>
      <div className="flex flex-col items-center p-2 space-y-4 w-full max-w-md mx-auto">
        {/* Title */}
        <div className="bg-gray-700 text-white px-6 py-3 rounded-full mt-4">
          <h2 className="text-lg font-bold">{teamName} 선수선택</h2>
        </div>
        {/* Baseball Field */}
        <div className="relative w-72 h-56 mx-auto">
          {/* Outfield (brown area) */}
          <div className="absolute bottom-0 w-full h-40 bg-orange-400 rounded-t-full"></div>
          {/* Infield (green area) */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-56 h-28 bg-green-500 rounded-t-full">
            {/* Diamond outline */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-20 border-4 border-yellow-400 rotate-45"></div>
          </div>
          {/* Position markers */}
          {fieldPositions.map(({ pos, x, y, label }) => {
            const player = selectedPlayers[pos];
            const isSelected = selectedPosition === pos;
            return (
              <div
                key={pos}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all ${
                  isSelected ? 'scale-110 z-10' : ''
                }`}
                style={{ left: `${x}%`, top: `${y}%` }}
                onClick={() => handlePositionClick(pos)}
              >
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                  player 
                    ? 'bg-blue-500 border-blue-600 text-white p-1' 
                    : isSelected 
                      ? 'bg-yellow-300 border-yellow-500 text-yellow-800' 
                      : 'bg-white border-gray-400 text-gray-600'
                }`}>
                  {player ? (
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=150&h=150&fit=crop&crop=face" 
                        alt={player.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  ) : (
                    label
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {/* Selected Position Info */}
        <div className="bg-blue-500 text-white px-4 py-2 rounded-full">
          <span className="font-bold text-sm">{getPositionName(selectedPosition)} 선택</span>
        </div>
        {/* Player Selection List or Selected Players Display */}
        {mode === 'manual' ? (
          <div className="w-full px-2">
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {currentPositionPlayers.slice(0, 6).map((player, index) => {
                const isAlreadySelected = isPlayerAlreadySelected(player);
                const isCurrentlySelected = selectedPlayers[selectedPosition]?.name === player.name;
                return (
                  <Card 
                    key={`${player.name}-${player.team}-${index}`} 
                    className={`cursor-pointer transition-all hover:shadow-lg rounded-2xl ${
                      isCurrentlySelected 
                        ? 'ring-2 ring-blue-500 bg-blue-100' 
                        : isAlreadySelected
                          ? 'bg-gray-200 opacity-60'
                          : 'bg-white hover:bg-gray-50'
                    }`} 
                    onClick={() => !isAlreadySelected && selectPlayer(player)}
                  >
                    <CardContent className="p-3 flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
                        <img 
                          src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=150&h=150&fit=crop&crop=face" 
                          alt={player.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-gray-600 mb-1">{getPositionName(selectedPosition)}</div>
                        <div className="text-blue-600 font-bold text-xs mb-1">{player.team}</div>
                        <div className="font-bold text-sm truncate">{player.name}</div>
                        <div className="text-xs text-gray-500">{player.birthdate}</div>
                      </div>
                      {isAlreadySelected && (
                        <div className="text-gray-500 text-xs">선택됨</div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ) : (
          // Show selected players for random mode
          <div className="w-full px-2">
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {positions.map((pos) => {
                const player = selectedPlayers[pos];
                if (!player) return null;
                return (
                  <Card key={pos} className="bg-blue-100 rounded-2xl">
                    <CardContent className="p-3 flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
                        <img 
                          src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=150&h=150&fit=crop&crop=face" 
                          alt={player.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-gray-600 mb-1">{getPositionName(pos)}</div>
                        <div className="text-blue-600 font-bold text-xs mb-1">{player.team}</div>
                        <div className="font-bold text-sm truncate">{player.name}</div>
                        <div className="text-xs text-gray-500">{player.birthdate}</div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
        {/* Action Buttons */}
        <div className="flex space-x-3 mt-6 w-full px-2">
          <Button 
            onClick={onBack} 
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-3 rounded-full flex-1"
          >
            뒤로가기
          </Button>
          <Button 
            onClick={handleNext} 
            className={`font-bold px-6 py-3 rounded-full text-sm flex-1 ${
              isTeamComplete 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-gray-400 text-gray-600 cursor-not-allowed'
            }`}
            disabled={!isTeamComplete}
          >
            {isTeamComplete ? '선택완료' : '선택 미완료'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeamSelectionScreen;
