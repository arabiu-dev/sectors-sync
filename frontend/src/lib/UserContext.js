import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [sector, setSector] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("_sectors_sync_token");

    if (storedToken) {
      const storedUsername = sessionStorage.getItem("_sectors_sync_username");
      setUsername(storedUsername);
      setToken(storedToken);
    }
  }, [navigate]);

  useEffect(() => {
    if (!token) return;
    fetch(`https://sectors-synce-arabiu.koyeb.app/api/v1/auth/sector`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        token,
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
        if (data.id) setSector(data);
        else setSector({});
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [token, sector]);

  return (
    <UserContext.Provider
      value={{ username, token, setToken, setUsername, sector, setSector }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
