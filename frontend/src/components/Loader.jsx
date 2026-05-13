import { Spin } from "antd";
const Loader = () => {
  return (
    <div className="w-full h-[60vh] flex items-center justify-center">
      <Spin style={{ color: "white" }} size="large" />
    </div>
  );
};

export default Loader;
