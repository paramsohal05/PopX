import { twMerge } from "tailwind-merge";

const Container = ({ children, className }) => {
  
  const newClassName = twMerge(
    `flex flex-col items-center justify-end min-h-screen bg-gray-100
    mx-auto p-5 justify-start max-w-96 shadow-2xl rounded-lg`,
    className
  );


  return <div className={newClassName}>{children}</div>;
};

export default Container;
