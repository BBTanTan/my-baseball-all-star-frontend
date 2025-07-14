import useFixViewportHeight from "/src/hooks/useFixViewportHeight";

const MobileLayout = ({ children }) => {
  useFixViewportHeight();

  return (
    <div className="w-screen flex justify-center bg-[#f5f5f5]">
      <div
        className="w-full max-w-[390px] overflow-hidden"
        style={{ height: "calc(var(--vh, 1vh) * 100)" }}
      >
        {children}
      </div>
    </div>
  );
};

export default MobileLayout;

