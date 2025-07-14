import { useState } from "react";
import { Button } from "@/components/ui/button";
import ShareModal from "@/components/ShareModal";
const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const PasswordSetupScreen = ({ teamName = "드림팀", playerIds = [], onComplete, onBack, onHome }) => {
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  const handleSubmit = async () => {
    console.log("팀 목록 : ", playerIds);
    if (password.length > 0) {
      try {
        // 서버로 팀 정보 전송
        const res = await fetch(`${SERVER_BASE_URL}/teams`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            teamName,
            playerIds,
            password
          })
        });
        if (!res.ok) throw new Error("서버 오류");
        const data = await res.json();
        console.log("팀 정보 저장 성공:", data);
        // 서버에서 teamUuid 반환
        const teamUuid = data.teamUuid || "test-uuid";
        const url = `${window.location.origin}/friend-battle/join?teamUuid=${teamUuid}`;
        setShareUrl(url);
        setIsSubmitted(true);
      } catch (err) {
        alert("팀 정보 저장 실패: " + err.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#b3e3fd] relative overflow-hidden flex flex-col items-center justify-center font-jalnan">
      {/* 구름 이미지 */}
      <img src="/back_ground.png" alt="Home Background" className="w-full h-full object-cover absolute inset-0 z-0" style={{ minHeight: "100vh", minWidth: "100vw" }} />
      {/* 타이틀 */}
      <div className="z-10 mt-6 mb-1 text-center font-title" style={{ color: "#535353", fontSize: "1.5rem", display: "inline-block", padding: "0.2em 0.7em", textStroke: "0.1px #fff", fontWeight: "bold" }}>
        MY BASEBALL<br />ALL✪STAR
      </div>
      {/* 메인 카드 */}
      <div className="flex flex-col items-center w-full z-10 mt-4" style={{ width: '60vw', maxWidth: '400px' }}>
        <div className="bg-[#444] text-white rounded-full px-6 py-3 mb-3 font-jalnan text-xl font-bold w-full text-center">
          친구와 경기
        </div>
        <div className="bg-[#4ec16e] rounded-xl flex flex-col items-center py-5 px-2 mb-4 w-full">
          <div className="text-white text-2xl font-jalnan mb-2">{teamName}</div>
          <img src="/element/field.png" alt="Field" style={{ width: "80px", marginBottom: "12px" }} />
        </div>
        <div className="bg-[#666] rounded-xl px-4 py-5 flex flex-col items-center w-full">
          <div className="text-white text-base font-jalnan mb-2 text-center">개인 확인을 위해<br />비밀번호를 입력해 주세요</div>
          <input
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-2 py-2 rounded-xl text-center text-black text-base font-jalnan mb-2"
            style={{ background: "#fff" }}
            maxLength={12}
            disabled={isSubmitted}
          />
          <Button
            onClick={handleSubmit}
            className="w-full bg-[#444] text-white rounded-full py-2 text-base font-jalnan"
            disabled={password.length === 0 || isSubmitted}
          >
            완료
          </Button>
        </div>
        {isSubmitted && (
          <div className="w-full max-w-md mx-auto mt-4">
            <div className="flex space-x-4 w-full">
              <Button
                onClick={() => setShowShareModal(true)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-8 py-4 rounded-full w-1/2"
              >
                공유하기
              </Button>
              <Button
                onClick={onHome}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-8 py-4 rounded-full w-1/2"
              >
                또 경기하기
              </Button>
            </div>
          </div>
        )}
      </div>
      <ShareModal
        shareUrl={shareUrl}
        title={teamName + " 팀을 공유해요!"}
        open={showShareModal}
        onClose={() => setShowShareModal(false)}
      />
    </div>
  );
};

export default PasswordSetupScreen;
