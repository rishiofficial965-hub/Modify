import { login, register, getMe, logout } from "../services/auth.api";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../auth.context";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  async function handleRegister({ username, email, password }) {
    try {
      setLoading(true);
      const data = await register({ email, password, username });
      setUser(data.user);
      return { success: true };
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, message: error.response?.data?.message || "Username or email already exists" };
    } finally {
      setLoading(false);
    }
  }
  
  async function handleLogin({ username, email, password }) {
    try {
      setLoading(true);
      const data = await login({ email, password, username });
      setUser(data.user);
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: error.response?.data?.message || "Invalid credentials" };
    } finally {
      setLoading(false);
    }
  }
  
  async function handleGetMe() {
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
  
  async function handleLogout() {
    try {
      setLoading(true);
      await logout();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  }
  
  return {
    user,
    loading,
    handleGetMe,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};
