import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import TeamSelectionScreen from "@/components/TeamSelectionScreen";
import BattleScreen from "@/components/BattleScreen";
import ResultScreen from "@/components/ResultScreen";
import TeamLineupDisplay from "@/components/TeamLineupDisplay";
import PasswordVerificationScreen from "@/components/PasswordVerificationScreen";
import { generatePlayers, calculateTeamScore } from "@/utils/playerData";

const FriendBattleJoin = ({ hostName, battleId, onBack }) => {
  const [step, setStep] = useState('opponent-info');
  const [challengerName, setChallengerName] = useState('나눔팀');
  const [isEditingName, setIsEditingName] = useState(false);
  const [teamMode, setTeamMode] = useState('manual');
  const [hostTeam, setHostTeam] = useState({});
  const [challengerTeam, setChallengerTeam] = useState(null);

  // Generate a mock host team for demonstration
  useEffect(() => {
    const allPlayers = generatePlayers();
    const positions = ['C', 'SP', 'MR', 'CL', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'DH'];
    const mockHostTeam = {};
    const usedPlayers = new Set();
    positions.forEach(pos => {
      const positionPlayers = allPlayers.filter(p => p.position === pos && !usedPlayers.has(`${p.name}-${p.team}`));
      if (positionPlayers.length > 0) {
        const randomIndex = Math.floor(Math.random() * positionPlayers.length);
        const selectedPlayer = positionPlayers[randomIndex];
        mockHostTeam[pos] = selectedPlayer;
        usedPlayers.add(`${selectedPlayer.name}-${selectedPlayer.team}`);
      }
    });
    setHostTeam(mockHostTeam);
  }, []);

  const handleTeamComplete = (team) => {
    setChallengerTeam(team);
    setStep('opponent-info');
  };

  const handlePasswordVerify = (password) => {
    if (password === '1234') {
      setStep('history');
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  // Mock history data
  const mockHistory = [
    { result: 'WIN', myTeam: '우리 팀', score: '10 : 5', opponent: '상대 팀' },
    { result: 'LOSE', myTeam: '우리 팀', score: '0 : 10', opponent: '상대 팀' },
    { result: 'WIN', myTeam: '우리 팀', score: '15 : 5', opponent: '상대 팀' },
    { result: 'LOSE', myTeam: '우리 팀', score: '0 : 10', opponent: '상대 팀' }
  ];

  // ...중략 (UI 렌더링 부분 동일)...

  return null;
};

export default FriendBattleJoin;
