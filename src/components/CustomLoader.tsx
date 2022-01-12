import Loader from 'react-loader-spinner';

interface Props {
  text: string;
}

const CustomLoader = ({ text }: Props) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <span className="font-bold text-lg text-white">{text}</span>
      <Loader type="Circles" color="#ffffffaa" />
    </div>
  );
};

export default CustomLoader;
