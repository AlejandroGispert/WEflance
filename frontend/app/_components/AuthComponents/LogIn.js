"use client";

import React, { useState } from "react";
import Cookies from "js-cookie";
import { handleLogIn } from "../../utils/auth";
import {
  getUserInfo,
  getUserPathByRole,
} from "../../utils/userUtil";
import { toast } from "react-toastify";
import SpinnerMini from "../client-dashboard-components/SpinnerMini";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setIsLoading(true);

    if (!email || !password) {
      setFormError("Please fill in both fields.");
      return;
    }

    await handleLogIn(email, password, async () => {
      const userInfo = await getUserInfo();
      const userRole = userInfo.role;
      Cookies.set("userRole", userRole);
      Cookies.set("userId", userInfo.id);
      toast.success("Logged in successfully! 🎉");

      const dashboardPath = getUserPathByRole(userRole);
      window.location.replace(dashboardPath);
    });
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-xl max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-primary-blue mb-4">
        {"Sign In"}
      </h2>
      <form
        onSubmit={onSubmit}
        className="w-full space-y-4"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full px-4 py-2 border border-neutral rounded-lg focus:outline-none focus:border-primary-blue"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full px-4 py-2 border border-neutral rounded-lg focus:outline-none focus:border-primary-blue"
        />
        <button
          type="submit"
          className=" flex items-center justify-center w-full bg-primary-purple text-white py-2 rounded-lg hover:bg-primary-purple-dark transition-colors"
        >
          {isLoading ? (
            <SpinnerMini />
          ) : (
            <span>Sign In</span>
          )}
        </button>
      </form>
      {formError && (
        <p className="mt-4 text-red-500">{formError}</p>
      )}
    </div>
  );
};

export default LogIn;
