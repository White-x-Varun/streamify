import React, { useState } from "react";
import { BrainCog } from "lucide-react";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup.js";

const SignupPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  // const queryClient = useQueryClient();
  // const {
  //   mutate: signupMutation,
  //   isPending,
  //   error,
  // } = useMutation({
  //   mutationFn: signup,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["authUser"] });
  //     navigate("/onboarding");
  //   },
  // });
  const { isPending, error, signupMutation } = useSignup();
  const handleSubmit = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-base-200"
      data-theme="forest"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* LEFT SIDE FORM */}
        <div className="flex-1 flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <div className="mb-6 flex items-center justify-center lg:justify-start gap-2">
            <BrainCog className="w-10 h-10 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Streamify
            </span>
          </div>
          {/*Error Message*/}
          {error && (
            <span>
              {error?.response?.data?.message || "Something went wrong"}
            </span>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-center lg:text-left">
                  Create an Account
                </h2>
                <p className="text-sm opacity-70 text-center lg:text-left">
                  Join Streamify and start your language learning adventure!
                </p>
              </div>

              <div className="space-y-3">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Full Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="input input-bordered w-full"
                    value={signupData.fullName}
                    onChange={(e) =>
                      setSignupData({ ...signupData, fullName: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Email@gmail.com"
                    className="input input-bordered w-full"
                    value={signupData.email}
                    onChange={(e) =>
                      setSignupData({ ...signupData, email: e.target.value })
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
                    placeholder="*******"
                    className="input input-bordered w-full"
                    value={signupData.password}
                    onChange={(e) =>
                      setSignupData({ ...signupData, password: e.target.value })
                    }
                    required
                    autoComplete="new-password"
                  />
                  <p className="text-xs mt-1 opacity-70">
                    Password must be at least 6 characters.
                  </p>
                </div>
              </div>

              <span className="text-xs leading-tight block text-center lg:text-left">
                I agree to Streamify's{" "}
                <span className="text-primary hover:underline">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-primary hover:underline">
                  Privacy Policy
                </span>
                .
              </span>

              <button className="btn btn-primary w-full mt-2">
                {isPending ? (
                  <span className="loading  loading-spinner loading-xs">
                    Loading...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>

              <div className="text-sm text-center mt-4">
                <p>
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-primary font-semibold hover:underline"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="hidden lg:flex flex-1 bg-primary/10 flex-col items-center justify-center p-10">
          <div className="relative aspect-square max-w-sm w-full">
            <img
              src="/Video-call-I.png"
              alt="Language connection illustration"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-center space-y-3 mt-6 px-4">
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
  );
};

export default SignupPage;
