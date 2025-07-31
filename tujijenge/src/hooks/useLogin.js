import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/api";

export function useLogin() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (email, password, selectedRole) => {
    setError(null);
    setLoading(true);

    try {
      const data = await loginUser({ email, password });
      localStorage.setItem("authToken", data.token || "");
      const userRole = data.role?.toLowerCase().trim();
      localStorage.setItem("role", userRole);

      const normalSelectedRole = selectedRole?.toLowerCase().trim(); 

      if (userRole !== normalSelectedRole) {
        setError(`Logged in as ${userRole} but selected incorrect path.`);
        setLoading(false);
        return;
      }

      if (userRole === "trainer") {
        navigate("/trainer");
      } else if (userRole === "supplier") {
        navigate("/Catalogue");
      } else {
        setError("Invalid user role");
      }
    } catch (error) {
      setError(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return { login, error, loading };
}