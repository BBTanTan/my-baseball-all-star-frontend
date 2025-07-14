// 카카오 SDK 초기화 (최초 1회)
if (typeof window !== 'undefined' && window.Kakao && !window.Kakao.isInitialized()) {
  window.Kakao.init('YOUR_KAKAO_JAVASCRIPT_KEY'); // 여기에 실제 키 입력
}
  // 카카오톡 공유 함수
  const handleKakaoShare = () => {
    if (window.Kakao && window.Kakao.isInitialized()) {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: '친구와 야구팀 대결!',
          description: `아래 링크로 팀을 구성해 대결에 참여하세요! (테스트용)`,
          imageUrl: 'https://i.imgur.com/2yaf2wb.png', // 최소한의 썸네일(필수)
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
        buttons: [
          {
            title: '팀 대결 참여하기',
            link: {
              mobileWebUrl: shareUrl,
              webUrl: shareUrl,
            },
          },
        ],
      });
    } else {
      alert('카카오톡 공유를 사용할 수 없습니다.');
    }
  };
// ShareModal.jsx
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  LineShareButton,
  LineIcon,
  WhatsappShareButton,
  WhatsappIcon
} from 'react-share';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';

const ShareModal = ({ shareUrl, open, onClose, title }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert("복사에 실패했습니다.");
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={v => { if (!v) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/40 fixed inset-0 z-50" />
        <Dialog.Content 
          className="bg-white rounded-2xl shadow-xl p-6 w-[90vw] max-w-md fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-50"
          aria-describedby="share-description"
        >
          <Dialog.Title className="text-lg font-bold mb-2">{title || "공유하기"}</Dialog.Title>
          <p className="text-sm text-gray-600 mb-4" id="share-description">이 링크를 친구에게 공유해보세요!</p>
          {/* 공유 링크 */}
          <div className="flex items-center gap-2 mb-4">
            <input
              readOnly
              className="flex-1 border rounded-full px-3 py-1 text-sm"
              value={shareUrl}
            />
            <button
              onClick={handleCopy}
              className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm"
            >
              {copied ? "복사됨!" : "복사"}
            </button>
          </div>

          {/* 닫기 */}
          <Dialog.Close asChild>
            <button className="absolute top-2 right-2 text-xl">×</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ShareModal;
