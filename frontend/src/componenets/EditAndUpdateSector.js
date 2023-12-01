import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../lib/UserContext";
import createNestedStructure from "../lib/createNestedStructure";
import NestedDropdown from "./NestedDropdown";
import { useNavigate } from "react-router-dom";

const ErrorMessage = () => (
  <p className="Text__label" style={{ textAlign: "center" }}>
    All Fields are required.
  </p>
);

const EditAndUpdateSector = () => {
  const { token, sector, setSector } = useContext(UserContext);
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [nameWordError, setNameWordError] = useState("Can't be empty");
  const [terms, setTerms] = useState(false);
  const [tempHolder, setTempHolder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sector || !sector.options) return;
    setName(sector.name);
    setTerms(sector.terms);
    setSelectedOptions(sector.options.map((i) => i.id));
  }, []);

  useEffect(() => {
    fetch(`https://sectors-synce-arabiu.koyeb.app/api/v1/options`, {
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.status === 403) {
          console.error("Unauthorized access.");
          return;
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          const nestedStructure = createNestedStructure(data);
          setOptions(nestedStructure);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const validate = () => {
    setIsValid(false);
    if (!name.trim()) {
      setNameWordError("Can't be empty");
      return false;
    }

    if (!selectedOptions.length || !terms) {
      setError("All Fields are required.");
      return false;
    }
    setIsValid(true);
    return true;
  };

  const createSector = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://sectors-synce-arabiu.koyeb.app/api/v1/auth/add_sector`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            token,
          },
          body: JSON.stringify({
            name: name.trim(),
            terms: terms,
            options: selectedOptions,
          }),
        }
      );

      if (response.status === 201) {
        console.log("Sector created successfully");
        setSector((p) => ({
          ...p,
          name,
          terms,
          options: tempHolder ? tempHolder : p.options,
        }));
        navigate("/home");
      } else {
        console.error("Failed to create sector:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating sector:", error);
    }
    setLoading(false);
  };

  return (
    <section className="Container">
      <p className="Text__label" style={{ textAlign: "center" }}>
        Please enter your name and pick the Sectors you are currently involved
        in.
      </p>
      <div className="Container__setup">
        {error && <ErrorMessage />}
        <label htmlFor="name-input" className="InputLabel">
          Name
        </label>
        <div className="input-container modal">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name-input"
            type="text"
            placeholder="e.g. Dune"
            className={!isValid && !name.trim() ? "red-border" : ""}
          />
          {!isValid && !name.trim() && (
            <span className="cant-be-empty-span text-L">{nameWordError}</span>
          )}
        </div>

        <NestedDropdown
          options={options}
          setSelectedOptions={setSelectedOptions}
          selectedOptions={selectedOptions}
          setTempHolder={setTempHolder}
        />
        <div className="IncludeFieldsList__item space">
          <input
            onChange={(e) => setTerms(!terms)}
            id="terms-input"
            checked={terms}
            type="checkbox"
            className="Checkbox"
          />
          <label htmlFor="terms-input" className="InputLabel">
            Agree to terms
          </label>
          {!isValid && !name.trim() && (
            <span className="cant-be-empty-span text-L">{nameWordError}</span>
          )}
        </div>
        <button
          onClick={async () => {
            const isValid = validate();
            if (isValid === true) await createSector();
          }}
          className="Button Button--primary"
        >
          {loading ? "Loading..." : "Update sectors"}
          <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="currentColor"
              d="m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default EditAndUpdateSector;
