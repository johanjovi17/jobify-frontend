import "./login.css";
import { SignInButton, SignUpButton } from "@clerk/clerk-react";
import { toast } from "react-toastify";

const Login = () => {
  return (
    <div className="auth-container">
      <div className="auth-container-content">
        <h2 className="auth-container-content-header-top">
          More than a job Search.
        </h2>
        <h2 className="auth-container-content-header-bottom">
          Complete Job Finder.
        </h2>
        <div className="btn-container">
          <SignInButton mode="modal">
            <button className="auth-btn">Sign in</button>
          </SignInButton>

          <SignUpButton mode="modal" forceRedirectUrl="/home">
            <button className="auth-btn">Sign up</button>
          </SignUpButton>
        </div>
      </div>
    </div>
  );
};

export default Login;
