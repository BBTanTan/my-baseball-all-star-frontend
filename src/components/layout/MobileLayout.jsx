const MobileLayout = ({
  children,
  className = "",
  innerBg = "#b3e3fd",
  outerBg = "#b3e3fd"
}) => (
  <div
    className="w-full min-h-screen flex flex-col items-center justify-center"
    style={{ background: outerBg }}
  >
    <div
        className={`relative w-full max-w-[430px] min-h-screen mx-auto overflow-hidden ${className}`}
        style={{
        background: innerBg,
        }}
    >
      {children}
    </div>
  </div>
);

export default MobileLayout;