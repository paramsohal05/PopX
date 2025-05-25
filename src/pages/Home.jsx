import { useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import Heading from "../components/Heading";
import Paragraph from "../components/Paragraph";

const Home = () => {
  //  useffect for document title
  useEffect(() => {
    document.title = "PopX";
  }, []);

  return (
    <Container className="gap-4 justify-end">
      {/* title */}
      <Heading title="Welcome to PopX" />
      {/* some text */}
      <Paragraph
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum iure 
      possimus qui "
      />

      {/* signup button */}
      <Link
        to="/signup"
        className="bg-blue-700 rounded-lg w-full py-2 px-4 text-center text-white 
     font-medium hover:bg-blue-700/70 my-1"
      >
        Create Account
      </Link>

      {/* login button */}
      <Link
        to="/login"
        className="bg-purple-200 rounded-lg w-full py-2 px-4 text-center text-black 
     font-medium hover:bg-purple-300"
      >
        Already have an Account ? Login
      </Link>
    </Container>
  );
};

export default Home;
