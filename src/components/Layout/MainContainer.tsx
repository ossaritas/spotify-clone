const MainContainer = (props: { className?: string; children?: any }) => {
  return (
    <div className="grid grid-rows-[1.8fr_0.2fr] grid-cols-[0.1fr_1.9fr] gap-0 h-[100vh] bg-gray-700 overflow-auto">
      {props.children}
    </div>
  );
};

export default MainContainer;
