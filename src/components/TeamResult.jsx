import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ShareModal from "./ShareModal";
import MobileLayout from "./layout/MobileLayout";

const TeamResult = ({ teamName, results, onBack }) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const shareUrl = window.location.href;

  // 결과 데이터 변환: 서버 결과를 화면에 맞게 가공
  const displayResults = (results && results.length > 0)
    ? results.map(r => {
        let result;
        if (r.homeTeamScore > r.awayTeamScore) {
          result = "WIN";
        } else if (r.homeTeamScore < r.awayTeamScore) {
          result = "LOSE";
        } else {
          result = "DRAW";
        }
        return {
          result,
          myScore: r.homeTeamScore,
          opponentScore: r.awayTeamScore,
          opponentName: r.awayTeamName
        };
      })
    : [];

  return (
    <MobileLayout>
    <div className="min-h-screen w-full flex flex-col items-center justify-start relative bg-[#b3e3fd] overflow-x-hidden font-jalnan">
      <img src="/landing.png" alt="Home Background" className="w-full h-full object-cover absolute inset-0 z-0"/>
      <div className="mt-10 relative z-10 w-full flex flex-col items-center">

      {/* 타이틀 */}
      <div className="text-lg text-[#FFFFFF] mb-2 font-normal font-jalnan mt-12 mb-8" style={{ background: '#535353', borderRadius: '1.5rem', padding: '0.5rem 1.5rem', boxShadow: '#535353', fontWeight: 'normal' }}>
          {`${teamName} 게임 결과 확인하기`}
      </div>
      {/* 결과 리스트 */}
      <div className="w-full flex flex-col items-center gap-6 mb-8">
        {displayResults.length === 0 ? (
          <div
            className="w-[90%] max-w-xl bg-black rounded-[48px] flex items-center justify-center px-8 py-6 border-4 border-white shadow-lg"
            style={{ fontFamily: 'DungGeunMo, monospace', minHeight: '80px' }}
          >
            <div>
              <span className="text-yellow-400 text-xl font-bold text-center block mb-10 mt-3">
                아직 진행된 경기가 없습니다
              </span>
              <span className="text-white text-base text-l font-normal text-center block">
                친구들에게 공유하고 <br />경기를 진행해 볼까요?
              </span>
            </div>
          </div>
        ) : (
          displayResults.map((r, idx) => (
            <div
              key={idx}
              className="w-[90%] max-w-xl bg-black rounded-[48px] flex items-center justify-between px-8 py-6 border-4 border-white shadow-lg"
              style={{ fontFamily: 'DungGeunMo, monospace' }}
            >
              <span className={
                r.result === "WIN"
                  ? "text-yellow-400 text-2xl font-normal mr-4"
                  : r.result === "DRAW"
                    ? "text-blue-400 text-2xl font-normal mr-4"
                    : "text-gray-400 text-2xl font-normal mr-4"
              }>
                {r.result}
              </span>
              <span className="text-white text-l mr-2">{teamName}</span>
              <span className={
                r.result === "WIN"
                  ? "text-green-400 text-3xl font-normal mx-2"
                  : r.result === "DRAW"
                    ? "text-blue-400 text-3xl font-normal mx-2"
                    : "text-gray-400 text-3xl font-normal mx-2"
              }>
                {r.myScore}
              </span>
              <span className="text-white text-2xl mx-2 font-bold">:</span>
              <span className={
                r.result === "LOSE"
                  ? "text-red-400 text-3xl font-normal mx-2"
                  : r.result === "DRAW"
                    ? "text-blue-400 text-3xl font-normal mx-2"
                    : "text-white text-3xl font-normal mx-2"
              }>
                {r.opponentScore}
              </span>
              <span className="text-white text-l ml-2">{r.opponentName}</span>
            </div>
          ))
        )}
      </div>
      <div className="w-4/5 max-w-md mx-auto mt-4">
        <div className="flex space-x-4 w-full">
          <Button
            onClick={() => setShowShareModal(true)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-8 py-4 rounded-full w-1/2"
          >
            공유하기
          </Button>
          <Button
            onClick={onBack}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-8 py-4 rounded-full w-1/2"
          >
            또 경기하기
          </Button>
        </div>
      </div>
      </div>
      <ShareModal
        shareUrl={shareUrl}
        title={teamName + " 팀을 공유해요!"}
        open={showShareModal}
        onClose={() => setShowShareModal(false)}
      />
    </div>
    </MobileLayout>
  );
};

export default TeamResult;
