import { useEffect, useState } from "react";
import Container from "../components/Container";
import InputField from "../components/InputField";
import Heading from "../components/Heading";
import Paragraph from "../components/Paragraph";
import Spinner from "../components/Spinner";
import Button from "../components/Button";
import { auth, db } from "../database/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  // useStates
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [inputData, setInputData] = useState({
    Email: "",
    Password: "",
  });

  const navigate = useNavigate();

  // TITLE USEEFFECT
  useEffect(() => {
    document.title = "PopX-Login";
  }, []);

  // login function
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErr("");

      if (!inputData?.Email || !inputData?.Password) {
        setErr("Please fill in the all fields");
        return;
      }

      const docRef = doc(db, "accounts", inputData?.Email);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        setErr("No Account found. Kindly fill correct details");
        return;
      }

      const userData = docSnap.data();
      //  verify password
      if (userData?.Password !== inputData?.Password) {
        setErr("Invalid Password");
        return;
      }

      //  login
      try {
        await signInWithEmailAndPassword(
          auth,
          inputData?.Email,
          inputData?.Password
        );
        setUser({
          name: userData?.Fullname,
          email: userData?.Email,
        });
      } catch (authError) {
        console.log("Auth Error", auth);
        if (authError.code === "auth/invalid-credential") {
          setErr("Invalid email or password");
        } else {
          setErr("Login Failed. Please try again.");
        }
      }
      navigate("/account");
    } catch (error) {
      console.log("Login Error", error);
      setErr(error.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="items-start gap-4">
      <Heading title="Login to your account" />
      <Paragraph
        text="Fill the registered email and correct password in the below 
          given fields to login."
      />
      <form onSubmit={handleLogin} className="mt-2 flex flex-col gap-4 w-full">
        <InputField
          type="email"
          placeholder="Enter the registered Email Address"
          label="Email Address"
          required
          value={inputData?.Email}
          onChange={(e) =>
            setInputData({ ...inputData, Email: e.target.value })
          }
        />
        <InputField
          type="password"
          placeholder="Enter the correct Password"
          label="Password"
          required
          value={inputData?.Password}
          onChange={(e) =>
            setInputData({ ...inputData, Password: e.target.value })
          }
        />
        {/* login button */}
        <div>
          {loading ? <Spinner text="Logging in" /> : <Button title="Login" />}
          {err && <p className="text-red-600 font-medium">{err}</p>}
        </div>
      </form>
      {/* register button */}
      <div className="flex flex-col sm:flex-row gap-2 items-center justify-center w-full">
        <p className="text-gray-500 text-center">If do not have account?</p>
        <Link to="/signup" className="text-blue-600 text-sm font-medium">
          Register
        </Link>
      </div>
    </Container>
  );
};

export default Login;
