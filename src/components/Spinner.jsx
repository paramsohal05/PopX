import {BeatLoader} from 'react-spinners'

const Spinner = ({ text }) => {
  return (
    <div className="flex gap-1 items-center">
      <p className="text-blue-600 font-medium text-lg">{text}</p>
      <BeatLoader
      color="#0047AB" 
      />
    </div>
  );
};

export default Spinner;
