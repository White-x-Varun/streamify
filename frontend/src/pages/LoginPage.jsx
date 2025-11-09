import { ShipWheelIcon } from "lucide-react";
import React from "react";
// import { login } from "../lib/api.js";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin.js";
const LoginPage = () => {
  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
  });

  const { isPending, error, loginMutate } = useLogin();
  const handleLogin = (e) => {
    e.preventDefault();
    loginMutate(loginData);
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-4xl mx-auto bg-base-100 rounded-2xl shadow-xl overflow-hidden">
        {/* Form Section */}
        <div className="w-full p-6 sm:p-8 flex flex-col justify-center">
          {/* Logo */}
          <div className="mb-6 flex items-center gap-2">
            <ShipWheelIcon className="text-primary" size={36} />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Streamify
            </span>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <span>
                {error?.response?.data?.message || "Something went wrong"}
              </span>
            )}

            <div>
              <h2 className="text-2xl font-semibold">Welcome Back</h2>
              <p className="text-sm opacity-70">
                Sign in to your account to continue your language journey
              </p>
            </div>

            <div className="space-y-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isPending}
            >
              {isPending ? (
                <span className="loading loading-spinner loading-sm">
                  Signing In...
                </span>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="text-center mt-4">
              <p className="text-sm">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:underline">
                  Create one
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Image  */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary/25 to-secondary items-center justify-center p-8">
          <div className="max-w-md p-8">
            {/*Illustration*/}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                src="Video-call-I.png"
                alt="Language connection illustration"
                className="w-full h-full"
              />
            </div>
            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">
                Connect with Language partners worldwide
              </h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language
                skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
