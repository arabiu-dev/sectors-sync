import React, { useContext } from "react";
import { UserContext } from "../lib/UserContext";
import { useNavigate } from "react-router-dom";

function capitalizeWord(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export default function Home() {
  const { username, sector } = useContext(UserContext);
  const navigate = useNavigate();

  //loader
  if (!sector)
    return (
      <p className="Text__label" style={{ textAlign: "center" }}>
        Loading...
      </p>
    );

  return (
    <main>
      <article className="Container">
        <h1 className="Title">
          Welcome to your account, {capitalizeWord(username)}!
        </h1>
        {!sector.id && (
          <>
            <p className="Text__label" style={{ textAlign: "center" }}>
              You currently have no sector preferences set. Please go here to
              customize your preferences.
            </p>
            <button
              onClick={() => {
                navigate("/update");
              }}
              className="Button Button--primary"
            >
              Add preferences
              <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="currentColor"
                  d="m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z"
                />
              </svg>
            </button>
          </>
        )}

        {sector.id && (
          <>
            <p className="Text__label" style={{ textAlign: "center" }}>
              Here are your existing sector preferences:-
            </p>
            <div className="Container__setup Signup_button">
              <h3 className="Header__title">Sector preferences</h3>
              <p className="Text__label">{sector.name}</p>
              <section>
                <ul className="IncludeFieldsList">
                  {sector.options?.map((sector) => (
                    <li className="IncludeFieldsList__item" key={sector.name}>
                      <input
                        className="Checkbox"
                        type="checkbox"
                        id="include-uppercase"
                        name="includesUppercase"
                        checked
                        readOnly
                      />
                      <label className="InputLabel" htmlFor="include-uppercase">
                        {sector.name}
                      </label>
                    </li>
                  ))}
                </ul>
              </section>
              <section className="Header">
                <h2 className="Header__title">Agree to terms</h2>
                <div className="IncludeFieldsList__item">
                  <input
                    className="Checkbox"
                    type="checkbox"
                    id="include-uppercase"
                    name="includesUppercase"
                    checked={sector.terms}
                    readOnly
                  />
                </div>
              </section>
              <button
                onClick={() => {
                  navigate("/update");
                }}
                className="Button Button--primary"
              >
                Edit preferences
                <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill="currentColor"
                    d="m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z"
                  />
                </svg>
              </button>
            </div>
          </>
        )}
      </article>
    </main>
  );
}
