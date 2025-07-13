// ShareModal.jsx
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  LineShareButton,
  LineIcon,
} from 'react-share';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';

const ShareModal = ({ shareUrl }) => {
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
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="bg-black text-white py-2 px-4 rounded-full">
          🔗 공유하기
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/40 fixed inset-0" />
        <Dialog.Content className="bg-white rounded-2xl shadow-xl p-6 w-[90vw] max-w-md fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
          <Dialog.Title className="text-lg font-bold mb-2">공유하기</Dialog.Title>
          <p className="text-sm text-gray-600 mb-4">이 링크를 친구에게 공유해보세요!</p>
          
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

          {/* SNS 버튼 */}
          <div className="flex justify-around mt-2">
            <FacebookShareButton url={shareUrl}>
              <FacebookIcon size={40} round />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl}>
              <TwitterIcon size={40} round />
            </TwitterShareButton>
            <LineShareButton url={shareUrl}>
              <LineIcon size={40} round />
            </LineShareButton>
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
