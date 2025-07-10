
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface SetupScreenProps {
  team1Name: string;
  setTeam1Name: (name: string) => void;
  team2Name: string;
  setTeam2Name: (name: string) => void;
  team1Complete: boolean;
  team2Complete: boolean;
  onTeam1Select: (mode: 'random' | 'manual') => void;
  onTeam2Select: (mode: 'random' | 'manual') => void;
  onStartMatch: () => void;
}

const SetupScreen = ({ 
  team1Name, setTeam1Name, team2Name, setTeam2Name,
  team1Complete, team2Complete, onTeam1Select, onTeam2Select, onStartMatch
}: SetupScreenProps) => {
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

  const canStartMatch = team1Complete && team2Complete;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 to-sky-200 relative overflow-hidden">
      {/* Clouds */}
      <div className="absolute top-8 left-8 w-32 h-20 bg-white rounded-full opacity-90"></div>
      <div className="absolute top-12 right-16 w-24 h-16 bg-white rounded-full opacity-80"></div>
      <div className="absolute bottom-32 right-8 w-36 h-22 bg-white rounded-full opacity-85"></div>
      
      <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-8">
        {/* Title */}
        <div className="bg-white rounded-3xl px-8 py-6 shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            MY BASEBALL<br />
            ALL⭐STAR
          </h1>
        </div>

        {/* Main Title */}
        <div className="bg-gray-700 text-white px-8 py-4 rounded-3xl">
          <h2 className="text-xl font-bold">혼자 경기</h2>
        </div>

        {/* Team Cards */}
        <div className="flex space-x-4 w-full max-w-2xl">
          {/* Team 1 */}
          <Card className="flex-1 bg-green-500 text-white rounded-3xl border-0 shadow-lg">
            <CardContent className="p-6 text-center space-y-4">
              {editingTeam1 ? (
                <div className="space-y-2">
                  <Input
                    value={tempTeam1Name}
                    onChange={(e) => setTempTeam1Name(e.target.value)}
                    className="text-gray-800 text-center"
                  />
                  <Button
                    onClick={handleTeam1NameChange}
                    className="bg-white text-gray-800 rounded-full px-4 py-2 text-sm"
                  >
                    완료
                  </Button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold">{team1Name}</h3>
                  <Button
                    onClick={() => {
                      setTempTeam1Name(team1Name);
                      setEditingTeam1(true);
                    }}
                    className="bg-white text-gray-800 rounded-full px-4 py-2"
                  >
                    팀 이름 변경하기
                  </Button>
                </>
              )}
              
              {/* Status */}
              <div className={`px-4 py-2 rounded-full ${team1Complete ? 'bg-blue-500' : 'bg-gray-400'}`}>
                <span className="text-white font-bold">
                  {team1Complete ? '선수 선택 완료' : '선수 선택 미완료'}
                </span>
              </div>

              {/* Selection Buttons */}
              <div className="space-y-2">
                <Button
                  onClick={() => onTeam1Select('manual')}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-full"
                >
                  선수 내가 선택
                </Button>
                <Button
                  onClick={() => onTeam1Select('random')}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-full"
                >
                  선수 랜덤 선택
                </Button>
              </div>

              {/* Baseball Field Icon */}
              <div className="relative w-32 h-24 mx-auto">
                <div className="absolute bottom-0 w-full h-16 bg-orange-400 rounded-t-full"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-12 bg-green-600 rounded-t-full">
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-yellow-400"></div>
                </div>
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-2 h-2 bg-white rounded-full"></div>
                <div className="absolute bottom-4 right-4 w-2 h-2 bg-white rounded-full"></div>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full"></div>
              </div>
            </CardContent>
          </Card>

          {/* Team 2 */}
          <Card className="flex-1 bg-green-500 text-white rounded-3xl border-0 shadow-lg">
            <CardContent className="p-6 text-center space-y-4">
              {editingTeam2 ? (
                <div className="space-y-2">
                  <Input
                    value={tempTeam2Name}
                    onChange={(e) => setTempTeam2Name(e.target.value)}
                    className="text-gray-800 text-center"
                  />
                  <Button
                    onClick={handleTeam2NameChange}
                    className="bg-white text-gray-800 rounded-full px-4 py-2 text-sm"
                  >
                    완료
                  </Button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold">{team2Name}</h3>
                  <Button
                    onClick={() => {
                      setTempTeam2Name(team2Name);
                      setEditingTeam2(true);
                    }}
                    className="bg-white text-gray-800 rounded-full px-4 py-2"
                  >
                    팀 이름 변경하기
                  </Button>
                </>
              )}
              
              {/* Status */}
              <div className={`px-4 py-2 rounded-full ${team2Complete ? 'bg-blue-500' : 'bg-gray-400'}`}>
                <span className="text-white font-bold">
                  {team2Complete ? '선수 선택 완료' : '선수 선택 미완료'}
                </span>
              </div>

              {/* Selection Buttons */}
              <div className="space-y-2">
                <Button
                  onClick={() => onTeam2Select('manual')}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-full"
                >
                  선수 내가 선택
                </Button>
                <Button
                  onClick={() => onTeam2Select('random')}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-full"
                >
                  선수 랜덤 선택
                </Button>
              </div>

              {/* Baseball Field Icon */}
              <div className="relative w-32 h-24 mx-auto">
                <div className="absolute bottom-0 w-full h-16 bg-orange-400 rounded-t-full"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-12 bg-green-600 rounded-t-full">
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-yellow-400"></div>
                </div>
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-2 h-2 bg-white rounded-full"></div>
                <div className="absolute bottom-4 right-4 w-2 h-2 bg-white rounded-full"></div>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full"></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Start Match Button */}
        <Button
          onClick={onStartMatch}
          disabled={!canStartMatch}
          className={`w-full max-w-sm font-bold py-4 rounded-full text-lg ${
            canStartMatch 
              ? 'bg-gray-700 hover:bg-gray-800 text-white' 
              : 'bg-gray-400 text-gray-600 cursor-not-allowed'
          }`}
        >
          대결 시작하기
        </Button>
      </div>
    </div>
  );
};

export default SetupScreen;
