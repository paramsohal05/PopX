import { useState } from "react";
import InputField from "../components/InputField";
import Container from "../components/Container";
import { auth } from "../database/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../database/firebase";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Paragraph from "../components/Paragraph";
import { useEffect } from "react";

const SignUp = () => {
  // useStates
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    company: "",
    agency: "",
  });
  const [errorMessage, setErrorMessage] = useState();

  const navigate = useNavigate();

  // useState for dcument title
  useEffect(() => {
    document.title = "PopX-Signup";
  }, []);

  //  handleSubmit function
  const handleSubmitFunc = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const docRef = doc(db, "accounts", formData?.email);
      const docSnap = await getDoc(docRef);
      if (docSnap?.exists()) {
        setErrorMessage("Account already created");
      } else {
        await setDoc(docRef, {
          Fullname: formData?.fullName,
          PhoneNumber: formData?.phoneNumber,
          Email: formData?.email,
          Password: formData?.password,
          Company: formData?.company,
          Agency: formData?.agency,
          uid: userCredential?.user?.uid,
        });
      }
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.log("Signup error", error);
      setErrorMessage(error.message || "Failed to create account");

      setLoading(false);
    }
  };

  return (
    <>
      <Container className={"max-w-[450px]"}>
        <div className="flex flex-col gap-4 w-full">
          <Heading title="Create your PopX account" />
          <Paragraph text="Kindly fill the required details below to register with PopX services" />
          <form
            onSubmit={handleSubmitFunc}
            method="POST"
            className="flex flex-col gap-4 w-full"
          >
            {/* fullname */}
            <InputField
              label={"Fullname"}
              placeholder={"William John"}
              type="text"
              required
              value={formData?.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
            {/* Phone number */}
            <InputField
              label={"Phone Number"}
              placeholder={"+91 9678977897"}
              type="number"
              required
              value={formData?.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
            />
            {/* Email Address */}
            <InputField
              label={"Email Address"}
              placeholder={"william@gmail.com"}
              type="email"
              required
              value={formData?.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {/* password */}
            <InputField
              label={"Password"}
              placeholder={"password"}
              type="password"
              required
              value={formData?.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {/* company name */}
            <InputField
              label={"Company"}
              placeholder={"xyz pvt ltd"}
              type="company"
              value={formData?.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
            />

            {/* agency */}
            <div>
              <label htmlFor="agency" className="text-sm text-gray-700">
                Are you an agency? <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="flex gap-4">
                <label className="flex gap-2">
                  <span className="text-sm font-bold text-gray-600">Yes</span>
                  <input
                    type="radio"
                    value="Yes"
                    name="Agency"
                    checked={formData?.agency === "Yes"}
                    onChange={(e) =>
                      setFormData({ ...formData, agency: e.target.value })
                    }
                  />
                </label>
                <label className="flex gap-2">
                  <span className="text-sm font-bold text-gray-600">No</span>
                  <input
                    type="radio"
                    value="No"
                    name="Agency"
                    checked={formData?.agency === "No"}
                    onChange={(e) =>
                      setFormData({ ...formData, agency: e.target.value })
                    }
                  />
                </label>
              </div>
            </div>

            {/* signup button */}
            <div>
              {loading ? (
                <Spinner text="Creating Account..." />
              ) : (
                <Button title="Create Account" />
              )}
            </div>
            <div>
              {errorMessage && (
                <span className="text-red-600 font-medium">{errorMessage}</span>
              )}
            </div>
          </form>

          {/* login button */}
          <div className="flex flex-col sm:flex-row gap-2 items-center justify-center">
            <p className="text-gray-500 text-center">
              If already have account?
            </p>
            <Link to="/login" className="text-blue-600 text-sm font-medium">
              Login
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SignUp;
