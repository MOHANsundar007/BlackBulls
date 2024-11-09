import React from "react";
import { auth } from "./firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();

  const signIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        navigate("/home");  
      })
      .catch((error) => console.error("Error signing in: ", error));
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => setUser(null))
      .catch((error) => console.error("Error signing out: ", error));
  };

  return (
    <div className="app-container">
      {user ? (
        <div>
          <button className="sign-out-btn" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      ) : (
        <div className="login-container">
          <button className="sign-in-btn" onClick={signIn}>
            Sign in with Google
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
