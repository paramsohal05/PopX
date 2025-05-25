import { useEffect, useState } from "react";
import Container from "../components/Container";
import educase from "../assets/educase.png";
import camera from "../assets/camera.png";
import Heading from "../components/Heading";
import Button from "../components/Button";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../database/firebase";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const Profile = () => {
  // usestates
  const [loading, setLoading] = useState(true);
  const [errMessage, setErrMessage] = useState("");
  const [user, setUser] = useState({
    uid: "",
    Name: "",
    Email: "",
    Phone: "",
    company: "",
    agency: false,
  });

  const navigate = useNavigate();

  // document title
  useEffect(() => {
    document.title = "PopX-Profile";
  }, []);

  // fetching user data
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const docRef = doc(db, "accounts", currentUser?.email);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();

            setUser({
              uid: userData.uid,
              Name: userData.Fullname,
              Email: userData.Email,
              Phone: userData.PhoneNumber,
              company: userData.Company || "",
              agency: userData.Agency === "Yes" ? true : false,
            });
          } else {
            console.log("No User Found");
            setErrMessage("No User Found");
          }
        } catch (error) {
          console.log("Error fetching user data:", error);
          setErrMessage("Error fetching user data");
        }
      } else {
        setUser(null);
        navigate(`/login`);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, navigate]);

  // handle logout function
  const handleLogout = () => {
    auth.signOut();
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      {loading ? (
        // loader
        <Container className="justify-center">
          <Spinner text="Please wait" />
        </Container>
      ) : (
        <div>
          {errMessage ? (
            // error message when data failed to fetch
            <Container className="justify-center">
              <p className="text-red-600 font-medium">{errMessage}</p>
              <Link
                to={`/login`}
                className="text-blue-600 font-semibold text-lg"
              >
                Try Again
              </Link>
            </Container>
          ) : (
            // main content when data successfully fetched
            <Container className="justify-start gap-4 p-3">
              <Heading title="My Account" className="text-xl" />
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative border-2 rounded-full w-fit">
                  <img
                    src={educase}
                    alt="Profile Picture"
                    className="w-32 h-32 rounded-full"
                  />
                  <img
                    src={camera}
                    alt="Add Photo"
                    className="w-12 h-12 rounded-full 
                      absolute -right-1 -bottom-2"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h6 className="text-blue-900 text-lg font-medium">
                    {user?.Name}
                  </h6>
                  <p className="text-gray-500 text-sm">{user?.Email}</p>
                  <p className="text-gray-500 text-sm">{user?.Phone}</p>
                </div>
              </div>

              {/* agency and company details */}
              {user?.agency ? (
                <div>
                  {user?.company ? (
                    <p className="text-gray-500 text-sm font-medium">
                      I am a agency owner of {user?.company} company.
                    </p>
                  ) : (
                    <p className="text-gray-500 text-sm font-medium">
                      I am a agency Owner
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  {user?.company && (
                    <p className="text-gray-500 text-sm font-medium">
                      I am a owner of {user?.company}
                    </p>
                  )}
                </div>
              )}
            {/* logout button */}
              <Button title="Logout" handleLogout={handleLogout} />
            </Container>
          )}
        </div>
      )}
    </>
  );
};

export default Profile;
