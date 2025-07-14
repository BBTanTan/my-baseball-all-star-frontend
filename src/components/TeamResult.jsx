import React from "react";

const TeamResult = ({ teamName, results, onBack }) => {
  // 결과 데이터 변환: 서버 결과를 화면에 맞게 가공
  const displayResults = (results && results.length > 0)
    ? results.map(r => {
        const isWin = r.homeTeamScore > r.awayTeamScore;
        return {
          result: isWin ? "WIN" : "LOSE",
          myScore: r.homeTeamScore,
          opponentScore: r.awayTeamScore,
          opponentName: r.awayTeamName
        };
      })
    : [];

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-start relative font-jalnan"
      style={{
        backgroundImage: "url('/landing.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* 타이틀 */}
      <div className="text-lg text-[#FFFFFF] mb-2 font-normal font-jalnan mt-12 mb-8" style={{ background: '#535353', borderRadius: '1.5rem', padding: '0.5rem 1.5rem', boxShadow: '#535353', fontWeight: 'normal' }}>
          {`${teamName} 게임 결과 확인하기`}
      </div>
      {/* 결과 리스트 */}
      <div className="w-full flex flex-col items-center gap-6 mb-8">
        {displayResults.length === 0 ? (
          <div
            className="w-[90vw] max-w-xl bg-black rounded-[48px] flex items-center justify-center px-8 py-6 border-4 border-white shadow-lg"
            style={{ fontFamily: 'DungGeunMo, monospace', minHeight: '80px' }}
          >
            <span className="text-yellow-400 text-xl font-bold text-center">
              아직 경기 결과가 없습니다!<br />친구들에게 팀 링크를 공유해보세요
            </span>
          </div>
        ) : (
          displayResults.map((r, idx) => (
            <div
              key={idx}
              className="w-[90vw] max-w-xl bg-black rounded-[48px] flex items-center justify-between px-8 py-6 border-4 border-white shadow-lg"
              style={{ fontFamily: 'DungGeunMo, monospace' }}
            >
              <span className={
                r.result === "WIN"
                  ? "text-yellow-400 text-2xl font-normal mr-4"
                  : "text-gray-400 text-2xl font-normal mr-4"
              }>
                {r.result}
              </span>
              <span className="text-white text-l mr-2">{teamName}</span>
              <span className={
                r.result === "WIN"
                  ? "text-green-400 text-3xl font-normal mx-2"
                  : "text-gray-400 text-3xl font-normal mx-2"
              }>
                {r.myScore}
              </span>
              <span className="text-white text-2xl mx-2 font-bold">:</span>
              <span className={
                r.result === "LOSE"
                  ? "text-red-400 text-3xl font-normal mx-2"
                  : "text-white text-3xl font-normal mx-2"
              }>
                {r.opponentScore}
              </span>
              <span className="text-white text-l ml-2">{r.opponentName}</span>
            </div>
          ))
        )}
      </div>
      {/* 뒤로가기 버튼 */}
      <button
        onClick={onBack}
        className="bg-white text-[#555] font-bold py-3 px-8 rounded-full text-xl mb-8"
      >
        뒤로가기
      </button>
    </div>
  );
};

export default TeamResult;
