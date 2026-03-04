import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Nav from "../components/Nav";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eyetoggle, setEyetoggle] = useState(true);
  const { handleRegister } = useAuth();

  const Navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    await handleRegister({ username, password, email });
    Navigate("/");
  }

  return (
    <main className="flex justify-center items-center min-h-screen bg-black text-white">
      <Nav />

      <div className="bg-[#121212] border border-gray-800 rounded-xl p-10 flex flex-col items-center gap-6 w-[380px]">

        <div className="flex justify-center items-center font-bold gap-2">
          <i className="fa-solid fa-person-circle-plus text-2xl text-green-500"></i>
          <h1 className="text-3xl">Register</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">

          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            name="username"
            placeholder="Enter username"
            className="bg-[#121212] border border-gray-700 px-4 py-3 rounded-md focus:outline-none focus:border-green-500"
          />

          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            name="email"
            placeholder="Enter email address"
            className="bg-[#121212] border border-gray-700 px-4 py-3 rounded-md focus:outline-none focus:border-green-500"
          />

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

          <button
            type="submit"
            className="bg-[#1DB954] text-black font-semibold py-3 rounded-full hover:scale-105 transition active:scale-95"
          >
            Continue
          </button>

        </form>

        <p className="text-gray-400">
          Already have an account ?{" "}
          <Link className="text-white font-semibold hover:underline" to="/login">
            Login
          </Link>
        </p>

      </div>
    </main>
  );
};

export default Register;