import { twMerge } from "tailwind-merge";

const Heading = ({ title, className }) => {
  const newClassName = twMerge(
    "text-blue-900 font-bold text-3xl text-center md:text-left",
    className
  );
  return <h1 className={newClassName}>{title}</h1>;
};

export default Heading;
