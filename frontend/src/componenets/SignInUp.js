import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignInUp({ setIsBoardModalOpen }) {
  const [username, setUsername] = useState("");
  const [passwordError, setPasswordError] = useState("Can't be empty");
  const [nameWordError, setNameWordError] = useState("Can't be empty");
  const [succcessMsg, setSuccessMsg] = useState("");
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
        if (response.status === 403) {
          console.error("Unauthorized access.");
        } else {
          console.error("Error:", response);
        }
        return;
      }

      const data = await response.json();

      if (isSignin) {
        sessionStorage.setItem("_sectors_sync_token", data.token);
        sessionStorage.setItem("_sectors_sync_username", data.username);
        navigate("/home");
      }

      setIsSignin((p) => !p);
      setSuccessMsg("Sign up success! You can login in.");
    } catch (error) {
      console.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsBoardModalOpen(false);
      }}
    >
      <article className="Container">
        <div className="modal Container__setup">
          {succcessMsg && <p className="Text__label">{succcessMsg}</p>}
          <h3 className="Header__title">{isSignin ? "Sign in" : "Sign up"}</h3>
          <label htmlFor="name-input" className="InputLabel">
            Username
          </label>
          <div className="input-container">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="name-input"
              type="text"
              placeholder="e.g. Korra Dune"
              className={!isValid && !username.trim() ? "red-border" : ""}
            />
            {!isValid && !username.trim() && (
              <span className="cant-be-empty-span text-L">{nameWordError}</span>
            )}
          </div>
          <label htmlFor="password-input" className="InputLabel">
            Password
          </label>
          <div className="input-container">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password-input"
              type="password"
              placeholder="e.g. Min 6 chars"
              className={!isValid && !password.trim() ? "red-border" : ""}
            />
            {!isValid && !password.trim() && (
              <span className="cant-be-empty-span text-L">{passwordError}</span>
            )}
          </div>
          <button
            disabled={loading}
            onClick={async () => {
              const isValid = validate();
              if (isValid === true) await handleSubmit();
            }}
            className="Button Button--primary"
          >
            {isSignin ? "Login" : "Create"}
          </button>
          <p
            className="InputLabel Cursor"
            onClick={() => {
              setIsSignin((p) => !p);
            }}
          >
            {isSignin ? "Need an account?" : "Sign in"}
          </p>
        </div>
      </article>
    </div>
  );
}
