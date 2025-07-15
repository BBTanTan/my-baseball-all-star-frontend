import { useState } from "react";
import { Button } from "@/components/ui/button";
import ShareModal from "./ShareModal";

const ResultScreen = ({ team1Name, team2Name, team1Score, team2Score, onPlayAgain, onHome }) => {
  const finalTeam1Score = team1Score || Math.floor(Math.random() * 12) + 1;
  const finalTeam2Score = team2Score || Math.floor(Math.random() * 12) + 1;

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
              팀 프렌차이즈 선수의 온디시 날,<br />
              9연패를 이겨내고 좋에서 승리했습니다<br />
              팬들이 눈물을 흘립니다
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
