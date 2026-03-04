import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Nav from "../components/Nav";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [eyetoggle, setEyetoggle] = useState(true);
  const [useEmailLogin, setUseEmailLogin] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { handleLogin } = useAuth();
  const Navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");
    const result = await handleLogin({ username, password, email });
    if (result && result.success) {
      Navigate("/home");
    } else {
      setErrorMsg(result?.message || "Invalid credentials");
    }
  }

  return (
    <main className="flex justify-center items-center min-h-screen bg-black text-white">
      <Nav />

      <div className="bg-[#121212] border border-gray-800 rounded-3xl p-10 flex flex-col items-center gap-6 w-[380px]">

        <div className="flex justify-center items-center font-bold gap-2">
          <i className="text-3xl pt-1 text-green-500 fa-solid fa-arrow-right-to-bracket"></i>
          <h1 className="text-3xl">Login</h1>
        </div>

        {errorMsg && <p className="text-red-500 text-sm font-semibold">{errorMsg}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">

          {!useEmailLogin ? (
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              name="username"
              placeholder="Enter username"
              className="bg-[#121212] border border-gray-700 px-4 py-3 rounded-md focus:outline-none focus:border-green-500"
            />
          ) : (
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="text"
              name="email"
              placeholder="Enter email address"
              className="bg-[#121212] border border-gray-700 px-4 py-3 rounded-md focus:outline-none focus:border-green-500"
            />
          )}

          <div className="relative w-full">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={eyetoggle ? "password" : "text"}
              name="password"
              placeholder="Enter password"
              className="bg-[#121212] w-full border border-gray-700 px-4 py-3 rounded-md focus:outline-none focus:border-green-500"
            />

            <div
              onClick={() => setEyetoggle(!eyetoggle)}
              className="absolute right-3 top-3 cursor-pointer text-gray-400"
            >
              {eyetoggle ? (
                <i className="fa-solid fa-eye-slash"></i>
              ) : (
                <i className="fa-solid fa-eye"></i>
              )}
            </div>
          </div>
         
          <div className="flex items-center justify-end text-xs gap-2 text-gray-400">
            <button
              type="button"
              onClick={() => setUseEmailLogin(!useEmailLogin)}
              className="relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-300 focus:outline-none bg-[#34C759] shadow-[inset_0_0_2px_rgba(0,0,0,0.1)]"
            >
              <span
                className={`inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.3)] transition-transform duration-300 ${
                  useEmailLogin ? 'translate-x-[16px]' : 'translate-x-[2px]'
                }`}
              />
            </button>
            
            <span 
              onClick={() => setUseEmailLogin(!useEmailLogin)}
              className="cursor-pointer transition-colors duration-300 text-white font-medium hover:text-[#34C759]"
            >
              {!useEmailLogin ? "Username" : "Email"}
            </span>
          </div>

            <button
            type="submit"
            className="bg-[#1DB954] text-black font-semibold py-3 rounded-full hover:scale-102 transition active:scale-95 cursor-pointer"
          >
            Continue
          </button>


        </form>

        <p className="text-gray-400">
          Don't have an account ?{" "}
          <Link className="text-white font-semibold hover:underline" to="/register">
            Register
          </Link>
        </p>

      </div>
    </main>
  );
};

export default Login;