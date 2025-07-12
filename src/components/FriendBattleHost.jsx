import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy } from "lucide-react";
import TeamSelectionScreen from "@/components/TeamSelectionScreen";
import { generatePlayers, calculateTeamScore } from "@/utils/playerData";

const FriendBattleHost = ({ onBack }) => {
  const [step, setStep] = useState('setup');
  const [hostName, setHostName] = useState('드림팀');
  const [isEditingName, setIsEditingName] = useState(false);
  const [teamMode, setTeamMode] = useState('manual');
  const [hostTeam, setHostTeam] = useState(null);
  const [battleId] = useState(() => Math.random().toString(36).substring(2, 15));
  const [linkCopied, setLinkCopied] = useState(false);
  const [password, setPassword] = useState('');

  const battleLink = `${window.location.origin}${window.location.pathname}?battle=${battleId}&host=${encodeURIComponent(hostName)}`;

  const handleTeamComplete = (team) => {
    setHostTeam(team);
    setStep('password-setup');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(battleLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = battleLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  if (step === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-300 to-sky-200 relative overflow-hidden">
        {/* ...중략... */}
      </div>
    );
  }

  if (step === 'team-selection') {
    return (
      <TeamSelectionScreen 
        teamName={hostName}
        teamNumber={1}
        mode={teamMode}
        onNext={handleTeamComplete}
        onBack={() => setStep('setup')}
      />
    );
  }

  if (step === 'password-setup') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-300 to-sky-200 relative overflow-hidden">
        {/* ...중략... */}
      </div>
    );
  }

  if (step === 'link-sharing') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-300 to-sky-200 relative overflow-hidden flex items-center justify-center p-4">
        {/* ...중략... */}
      </div>
    );
  }

  return null;
};

export default FriendBattleHost;
