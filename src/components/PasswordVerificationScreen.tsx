
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PasswordVerificationScreenProps {
  title: string;
  onVerify: (password: string) => void;
  onBack: () => void;
}

const PasswordVerificationScreen = ({ title, onVerify, onBack }: PasswordVerificationScreenProps) => {
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    onVerify(password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 to-sky-200 relative overflow-hidden">
      {/* Clouds */}
      <div className="absolute top-8 left-8 w-32 h-20 bg-white rounded-full opacity-90"></div>
      <div className="absolute top-12 right-16 w-24 h-16 bg-white rounded-full opacity-80"></div>
      
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
          <h2 className="text-xl font-bold">{title}</h2>
        </div>

        {/* Team Status Message */}
        <div className="bg-green-500 text-white px-8 py-4 rounded-3xl">
          <p className="text-lg font-bold text-center">
            팀 생성자만 확인 가능합니다!
          </p>
        </div>

        {/* Password Input Card */}
        <Card className="w-full max-w-sm bg-gray-600 text-white rounded-3xl border-0 shadow-lg">
          <CardContent className="p-6 text-center space-y-4">
            <p className="text-sm">
              게임 확인을 위해<br />
              비밀번호를 입력해 주세요
            </p>
            <div className="bg-white text-black text-2xl font-bold py-4 rounded-2xl">
              1234
            </div>
            <input
              type="password"
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl text-center text-black text-lg"
            />
            <Button 
              onClick={handleSubmit}
              className="w-full bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-full text-lg"
            >
              완료
            </Button>
          </CardContent>
        </Card>

        {/* Back Button */}
        <Button
          onClick={onBack}
          className="bg-white hover:bg-gray-50 text-gray-800 font-bold py-3 px-8 rounded-full"
        >
          뒤로가기
        </Button>
      </div>
    </div>
  );
};

export default PasswordVerificationScreen;
