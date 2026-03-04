import { useState, useEffect, useRef } from "react";
import { AuthContext } from "./auth.context";
import { getMe } from "./services/auth.api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const hasFetched = useRef(false);

  async function handleGetMe() {
    if (hasFetched.current) return;
    hasFetched.current = true;
    
    try {
      setLoading(true);
      const data = await getMe();
      setUser(data.user);
    } catch (error) {
      console.error("Error fetching user session:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleGetMe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
