import { useState } from "react";
import { Button } from "@/components/ui/button";
import ShareModal from "./ShareModal";

const ResultScreen = ({ team1Name, team2Name, team1Score, team2Score, onPlayAgain, onHome }) => {
  const finalTeam1Score = team1Score || Math.floor(Math.random() * 12) + 1;
  const finalTeam2Score = team2Score || Math.floor(Math.random() * 12) + 1;

  // 결과별 문구
  const winMessages = [
    "9회말 끝내기 홈런! 팬들이 환호합니다.",
    "클린업 트리오의 연속 타점으로 승리했습니다.",
    "에이스 투수의 무실점 호투로 승리를 지켰습니다.",
    "만루 찬스에서 역전 그랜드슬램!",
    "불펜진의 완벽한 세이브로 승리를 마무리했습니다.",
    "타석에서 4안타, 5타점! 오늘의 히어로입니다.",
    "병살타로 위기를 넘기고, 역전승을 거뒀습니다.",
    "볼넷으로 출루, 득점까지 완벽한 경기 운영!",
    "역전 쓰리런으로 거머쥔 짜릿한 승리!"
  ];
  const loseMessages = [
    "9회말 끝내기 홈런을 허용하며 아쉽게 패배했습니다.",
    "실책과 볼넷이 쌓여 점수를 내주었습니다.",
    "불펜이 흔들리며 역전패를 당했습니다.",
    "만루 위기에서 병살타를 놓쳐 아쉬운 결과.",
    "삼진 10개, 타선이 침묵하며 패배했습니다.",
    "클린업 트리오가 침묵, 득점 없이 경기를 마쳤습니다.",
    "타점 찬스에서 번번이 막혀 팬들이 아쉬워합니다.",
    "연패의 늪에서 벗어나지 못했습니다.",
    "마지막 타석에서 역전 기회를 놓쳤습니다.",
    "팬들이 아쉬움에 눈물을 흘립니다.",
    "투수의 호투에도 불구하고 득점이 부족했습니다.",
    "실책과 폭투로 점수를 내주며 패배했습니다. 팬들이 눈물을 흘립니다."
  ];
  const drawMessages = [
    "치열한 투수전 끝에 무승부를 기록했습니다.",
    "양 팀 모두 홈런 한 방씩, 승부를 가리지 못했습니다.",
    "9회말 만루 찬스, 득점 없이 경기가 끝났습니다.",
    "불펜진의 호투로 실점 없이 경기를 마무리했습니다.",
    "타석에서 번갈아 득점, 결국 동점으로 마무리.",
    "팬들은 박수로 경기를 마무리합니다.",
    "승부를 가리지 못한 명승부였습니다.",
    "동점, 다음 경기가 기대됩니다.",
    "마지막 타석에서 동점타! 양 팀 모두 최선을 다했습니다.",
    "병살타와 삼진, 수비가 빛난 경기였습니다."
  ];

  let resultType = "draw";
  if (finalTeam1Score > finalTeam2Score) resultType = "win";
  else if (finalTeam1Score < finalTeam2Score) resultType = "lose";

  function getRandomMessage(type) {
    if (type === "win") return winMessages[Math.floor(Math.random() * winMessages.length)];
    if (type === "lose") return loseMessages[Math.floor(Math.random() * loseMessages.length)];
    return drawMessages[Math.floor(Math.random() * drawMessages.length)];
  }

  const [showShareModal, setShowShareModal] = useState(false);
  const shareUrl = window.location.href;

  
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Fullscreen background image */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          backgroundImage: "url('/landing.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundColor: "transparent"
        }}
      />
      <div className="flex flex-col items-center space-around pt-2 pb-0 px-2 space-y-2" style={{ position: "relative", zIndex: 1 }}>
        {/* Logo 이미지 */}
        <img
          src="/element/logo.png"
          alt="Logo"
          className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain"
        />
        {/* Result Board */}
        <div className="bg-black text-white p-6 rounded-3xl border-4 border-gray-300 w-full max-w-md">
          <div className="text-center space-y-4 font-dunggeunmo">
            <div className="text-red-400 text-lg font-bold">
              경기가 종료되었습니다
            </div>
            
            <div className="flex justify-around items-center text-2xl font-bold">
              <span>{team1Name}</span>
              <span>{team2Name}</span>
            </div>
            
            <div className="flex justify-around items-center text-6xl font-bold">
              <span>{finalTeam1Score}</span>
              <span className="text-lg text-gray-400">VS</span>
              <span>{finalTeam2Score}</span>
            </div>
            
            <div className="text-sm text-gray-300">
              {getRandomMessage(resultType)}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-md mx-auto">
          <div className="flex space-x-4 w-full">
            {typeof onHome === 'function' ? (
              <Button
                onClick={onHome}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-8 py-4 rounded-full w-1/2"
              >
                홈으로
              </Button>
            ) : (
                <Button
                  onClick={() => setShowShareModal(true)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-8 py-4 rounded-full w-1/2"
                >
                  공유하기
                </Button>
            )}
            <Button
                  onClick={onPlayAgain}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-8 py-4 rounded-full w-1/2"
            >
              또 경기하기
            </Button>
          </div>
        </div>
        <ShareModal
        shareUrl={shareUrl}
        title={"친구들과 게임을 공유해요!"}
        open={showShareModal}
        onClose={() => setShowShareModal(false)}
      />
      </div>
    </div>
  );
};

export default ResultScreen;
