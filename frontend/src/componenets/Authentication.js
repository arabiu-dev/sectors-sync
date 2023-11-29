import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../lib/UserContext";
import { useNavigate } from "react-router-dom";
import SignInUp from "./SignInUp";

export default function Splash() {
  const [isSignInUpModalOpen, setIsSignInUpModalOpen] = useState(false);
  const { token } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/home");
  }, [token, navigate]);

  return (
    <div>
      <div className="Signup_button">
        <button
          onClick={() => {
            setIsSignInUpModalOpen(true);
          }}
          className="Button Button--primary"
        >
          Account
          <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="currentColor"
              d="m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z"
            />
          </svg>
        </button>
      </div>
      {isSignInUpModalOpen && (
        <SignInUp setIsSignInUpModalOpen={setIsSignInUpModalOpen} />
      )}
    </div>
  );
}
