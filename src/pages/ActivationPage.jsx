import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { server } from "../../server";

function ActivationPage() {
  const { activation_token } = useParams();
  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'error'

  const activateEmail = useCallback(async () => {
    setStatus("loading");
    try {
      const response = await axios.post(
        `${server}/user/activation`,
        { activation_token },
        { 
          headers: { "Content-Type": "application/json" },
          withCredentials: true // Required for CORS and authentication
        }
      );
      console.log("Activation success:", response.data);
      setStatus("success");
    } catch (e) {
      console.log("Full error details:", {
        message: e.message,
        code: e.code,
        status: e.response?.status,
        data: e.response?.data,
        headers: e.response?.headers,
        config: e.config
      });
      
      // Check if it's a specific error type
      if (e.response?.status === 400 || e.response?.status === 401) {
        setStatus("invalid_token");
      } else if (e.response?.status === 500) {
        setStatus("server_error");
      } else if (e.code === 'NETWORK_ERROR' || e.code === 'ECONNREFUSED') {
        setStatus("network_error");
      } else if (e.response?.status === 404) {
        setStatus("endpoint_not_found");
      } else {
        setStatus("error");
      }
    }
  }, [activation_token]);

  useEffect(() => {
    if (activation_token) {
      activateEmail();
    }
  }, [activation_token, activateEmail]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
      {status === "success" && (
        <div className="text-center">
          <p className="text-green-600 text-lg font-semibold mb-4">
            🎉 Your account has been successfully created!
          </p>
          <p className="text-gray-600">
            You can now login to your account and start shopping.
          </p>
        </div>
      )}

      {status === "invalid_token" && (
        <div className="text-center">
          <p className="text-red-600 text-lg font-semibold mb-4">
            ❌ Invalid or expired activation token
          </p>
          <p className="text-gray-600">
            Please check your email for a valid activation link or request a new one.
          </p>
        </div>
      )}

      {status === "server_error" && (
        <div className="text-center">
          <p className="text-red-600 text-lg font-semibold mb-4">
            ⚠️ Server error occurred
          </p>
          <p className="text-gray-600">
            Please try again in a few moments. If the problem persists, contact support.
          </p>
        </div>
      )}

      {status === "network_error" && (
        <div className="text-center">
          <p className="text-red-600 text-lg font-semibold mb-4">
            🔌 Network connection error
          </p>
          <p className="text-gray-600">
            Unable to connect to the server. Please check your internet connection.
          </p>
        </div>
      )}

      {status === "endpoint_not_found" && (
        <div className="text-center">
          <p className="text-red-600 text-lg font-semibold mb-4">
            🔍 Activation endpoint not found
          </p>
          <p className="text-gray-600">
            The activation service is currently unavailable. Please contact support.
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="text-center">
          <p className="text-red-600 text-lg font-semibold mb-4">
            ❌ Activation failed
          </p>
          <p className="text-gray-600">
            An unexpected error occurred. Please try again or contact support.
          </p>
        </div>
      )}

      {status === "loading" && (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Activating your account...</p>
        </div>
      )}

      {(status === "invalid_token" || status === "error" || status === "server_error") && (
        <button
          onClick={activateEmail}
          disabled={status === "loading"}
          className="bg-green-600 hover:bg-green-500 text-white py-2 px-6 rounded font-semibold transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Retrying..." : "Try Again"}
        </button>
      )}

      {status === "idle" && (
        <button
          onClick={activateEmail}
          className="bg-green-600 hover:bg-green-500 text-white py-2 px-6 rounded font-semibold transition-all duration-200"
        >
          Verify Your Account
        </button>
      )}
    </div>
  );
}

export default ActivationPage;
