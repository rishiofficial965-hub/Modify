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
  const {  handleLogin } = useAuth();
  const Navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    await handleLogin({ username, password, email });
    Navigate("/");
  }

  return (
    <main className="relative flex justify-center items-center h-screen bg-[#e6eff7]">
      <Nav />
      <div
        className="
      bg-white/30
      backdrop-blur-2xl
      shadow-[0_8px_32px_rgba(31,38,135,0.37)]
      border border-black/20
      rounded-2xl
      p-10
      flex flex-col
      items-center
      gap-6
    "
      >
        <div className="flex justify-center items-center font-bold text-green-800 drop-shadow-lg gap-2 pr-4">
          <i className="text-3xl pt-1 fa-solid fa-arrow-right-to-bracket"></i>
          <h1 className="text-3xl">Login</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-72">
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
            type="text"
            name="username"
            placeholder="Enter username"
            className="bg-white/20 text-black/80 font-medium  placeholder-gray-300 px-4 py-3 rounded-lg focus:outline-none border border-black/30  backdrop-blur-md"
          />
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            type="text"
            name="email"
            placeholder="Enter email address"
            className="bg-white/20 text-black/80 font-medium  placeholder-gray-300 px-4 py-3 rounded-lg focus:outline-none border border-black/30  backdrop-blur-md"
          />
          <div className="relative w-full">
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              type={eyetoggle ? "password" : "text"}
              name="password"
              placeholder="Enter password"
              className="bg-white/20 w-full text-black/80 font-medium  placeholder-gray-300 px-4 py-3 rounded-lg focus:outline-none border border-black/30 backdrop-blur-md"
            />
            <div
              onClick={() => {
                setEyetoggle(!eyetoggle);
              }}
              className="absolute right-3 top-3.5 cursor-pointer"
            >
              <div className="text-black/80 text-md">
                {eyetoggle ? (
                  <i className="fa-solid fa-eye-slash"></i>
                ) : (
                  <i className="fa-solid fa-eye"></i>
                )}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="rounded-lg bg-green-900 text-white font-semibold px-4 py-3  hover:bg-green-800 transition backdrop-blur-md active:scale-95 cursor-pointer"
          >
            Submit
          </button>
        </form>
        <p className="text-black/80 font-medium">
          Don't have an account ?{" "}
          <Link className="text-red-900 font-bold" to="/register">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
