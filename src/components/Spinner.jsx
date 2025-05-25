import { ThreeDots } from "react-loader-spinner";
const Spinner = ({ text }) => {
  return (
    <div className="flex gap-1 items-center">
      <p className="text-blue-600 font-medium text-lg">{text}</p>
      <ThreeDots
        visible={true}
        height="50"
        width="50"
        color="#0047AB"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Spinner;
