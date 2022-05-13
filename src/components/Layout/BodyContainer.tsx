const BodyContainer = (props: { className?: string; children?: any }) => {
  return (
    <div className="row-start-1 row-end-2 col-start-2 col-end-3 overflow-y-scroll pb-[50px] bg-gradient-to-br from-[#48a0b04d] to-[#000000]">
      {props.children}
    </div>
  );
};

export default BodyContainer;
