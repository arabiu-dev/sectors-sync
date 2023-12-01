import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignInUp = ({ setIsSignInUpModalOpen }) => {
  const [username, setUsername] = useState("");
  const [passwordError, setPasswordError] = useState("Can't be empty");
  const [nameWordError, setNameWordError] = useState("Can't be empty");
  const [successMsg, setSuccessMsg] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isSignin, setIsSignin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    setIsValid(false);

    if (!username.trim() || !password.trim()) {
      setNameWordError("Can't be empty");
      setPasswordError("Can't be empty");
      return false;
    }

    if (password.trim().length < 6) {
      setPasswordError("Min length is six");
      return false;
    }

    setIsValid(true);
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://sectors-synce-arabiu.koyeb.app/api/v1/${
          isSignin ? "signin" : "signup"
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      if (!response.ok) {
        handleError(response);
        return;
      }

      const data = await response.json();

      if (isSignin) {
        handleSignIn(data);
      } else {
        handleSignUp();
      }
    } catch (error) {
      console.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleError = (response) => {
    if (response.status === 403) {
      console.error("Unauthorized access.");
    } else {
      console.error("Error:", response);
    }
  };

  const handleSignIn = (data) => {
    sessionStorage.setItem("_sectors_sync_token", data.token);
    sessionStorage.setItem("_sectors_sync_username", data.username);
    navigate("/home");
  };

  const handleSignUp = () => {
    setIsSignin((p) => !p);
    setSuccessMsg("Sign up success! You can log in.");
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsSignInUpModalOpen(false);
      }}
    >
      <article className="Container">
        <div className="modal Container__setup">
          {successMsg && <p className="Text__label">{successMsg}</p>}
          <h3 className="Header__title">{isSignin ? "Sign in" : "Sign up"}</h3>
          {renderInput(
            "name-input",
            "Username",
            username,
            setUsername,
            nameWordError,
            isValid
          )}
          {renderInput(
            "password-input",
            "Password",
            password,
            setPassword,
            passwordError,
            isValid,
            "password"
          )}
          <button
            disabled={loading}
            onClick={() => validate() && handleSubmit()}
            className="Button Button--primary"
          >
            {loading ? "Loading..." : `${isSignin ? "Login" : "Create"}`}
          </button>
          <p
            className="InputLabel Cursor"
            onClick={() => setIsSignin((p) => !p)}
          >
            {isSignin ? "Need an account?" : "Sign in"}
          </p>
        </div>
      </article>
    </div>
  );
};

const renderInput = (
  id,
  label,
  value,
  onChange,
  error,
  isValid,
  type = "text"
) => (
  <>
    <label htmlFor={id} className="InputLabel">
      {label}
    </label>
    <div className="input-container">
      <input
        id={id}
        type={type}
        placeholder={`e.g. ${label}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={!isValid && !value.trim() ? "red-border" : ""}
      />
      {!isValid && !value.trim() && (
        <span className="cant-be-empty-span text-L">{error}</span>
      )}
    </div>
  </>
);

export default SignInUp;
