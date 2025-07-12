import React from "react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-200 to-gray-400 font-jalnan">
      <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-red-600">404</h1>
        <p className="text-lg text-gray-700 mb-6">페이지를 찾을 수 없습니다.</p>
        <a href="/" className="bg-blue-500 text-white rounded-full px-6 py-3 font-bold text-lg hover:bg-blue-600">홈으로 돌아가기</a>
      </div>
    </div>
  );
};

export default NotFound;
