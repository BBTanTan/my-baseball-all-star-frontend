import { useState } from "react";
import TeamResult from "./TeamResult";

const PasswordVerificationScreen = ({ teamName, teamId, onBack }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [teamResultData, setTeamResultData] = useState(null);

  const handleVerify = async () => {
    setError("");
    if (!teamId) {
      setError("팀 정보가 없습니다.");
      return;
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/play-results/${teamId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      if (!res.ok) {
        setError("비밀번호가 올바르지 않습니다.");
        return;
      }
      const data = await res.json();
      console.log("팀 결과 데이터:", data);
      setTeamResultData(data);
    } catch (err) {
      setError("서버 오류: " + err.message);
    }
  };

  if (teamResultData) {
    return <TeamResult 
    teamName={teamName}
    results={teamResultData.playResults} 
    onBack={onBack} />;
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start relative font-jalnan mt-7" style={{ backgroundImage: "url('/back_ground.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      {/* 타이틀 */}
      <div className="mt-16 mb-6 text-center font-title text-3xl font-bold text-[#535353]" style={{ WebkitTextStroke: '0.5px #fff', textStroke: '0.5px #fff' }}>
        MY BASEBALL<br />ALL✪STAR
      </div>
      {/* 게임 결과 확인 타이틀 */}
      <div className="bg-[#555] text-white rounded-full px-8 py-4 mb-4 text-xl font-normal">
        {`${teamName} 게임 결과 확인하기`}
      </div>
      {/* 팀 생성자만 확인 가능 안내 */}
      <div className="bg-[#4ec16e] text-white rounded-xl px-8 py-3 mb-6 text-lg font-normal">
        팀 생성자만 확인 가능합니다!
      </div>
      {/* 비밀번호 입력 카드 */}
      <div className="bg-[#666] rounded-3xl px-8 py-6 flex flex-col items-center mb-6" style={{ maxWidth: 340, width: '100%' }}>
        <div className="text-white text-lg font-normal mb-2 text-center">
          개인 확인을 위해<br />비밀번호를 입력해 주세요
        </div>
        <input
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={e => { setPassword(e.target.value); setError(""); }}
          className="w-full px-4 py-3 rounded-2xl text-center text-black text-xl font-normal mb-4"
          style={{ background: '#fff' }}
        />
        {error && <div className="text-red-500 text-sm font-bold mb-2">{error}</div>}
        <button
          className="w-full bg-[#555] text-white rounded-full py-3 text-xl font-normal mb-2"
          style={{ boxShadow: '#333 0px 2px 8px 0px' }}
          onClick={handleVerify}
        >
          완료
        </button>
      </div>
      {/* 뒤로가기 버튼 */}
      <button
        onClick={onBack}
        className="bg-white text-[#555] font-bold py-3 px-8 rounded-full text-xl"
        style={{ marginTop: '8px' }}
      >
        뒤로가기
      </button>
    </div>
  );
}
export default PasswordVerificationScreen;
