import React, { useState, useEffect } from "react";
import { FaEnvelope, FaKey, FaPaperPlane } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [otpGenerated, setOtpGenerated] = useState(false);

  const handleGenerateOtp = async () => {
  if (!email) return alert("Please enter your email");

  try {
    const res = await axios.post(
      "http://localhost:3000/api/users/send-forget-password-otp",
      { email },
      { withCredentials: true }
    );

    alert(res.data.message); // "OTP sent to your email to reset password"
    setOtpGenerated(true);
    setTimer(900); // 15 min
    setCanResend(false);
  } catch (err) {
    console.error("Error generating OTP:", err);
    alert(err?.response?.data?.message || "Failed to send OTP");
  }
};

  const handleResendOtp = () => {
    if (!canResend) return;
    // Ideally call backend to resend OTP
    setTimer(900);
    setCanResend(false);
    console.log("OTP resent");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !otp) {
      return alert("Please enter both email and OTP");
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/users/forgot-password",
        { email, otp },
        { withCredentials: true }
      );

      alert(res.data.message);
      // Optionally redirect to reset password page
      navigate("/reset-password", { state: { email } });
    } catch (err) {
      console.error("OTP verification failed:", err);
      alert(err?.response?.data?.message || "OTP verification failed");
    }
  };

  useEffect(() => {
    let countdown;
    if (otpGenerated && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (otpGenerated && timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(countdown);
  }, [timer, otpGenerated]);

  const formatTimer = () => {
    const min = Math.floor(timer / 60)
      .toString()
      .padStart(2, "0");
    const sec = (timer % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 dark:bg-gray-900 bg-white">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          <span className="text-purple-600">Forgot </span>
          <span className="text-white">Password</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700">
            <FaEnvelope className="text-gray-500 dark:text-gray-300 mr-2" />
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* OTP Input */}
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700">
            <FaKey className="text-gray-500 dark:text-gray-300 mr-2" />
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-white"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
            />
          </div>

          {/* Generate OTP Button */}
          <button
            type="button"
            onClick={handleGenerateOtp}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded transition duration-300 flex items-center justify-center gap-2"
          >
            <FaPaperPlane />
            Generate OTP
          </button>

          {/* Resend OTP with Timer */}
          <div className="text-sm text-center text-gray-500 dark:text-gray-300">
            {otpGenerated && !canResend ? (
              <>
                Resend OTP in <span className="font-semibold">{formatTimer()}</span>
              </>
            ) : otpGenerated && canResend ? (
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-purple-600 hover:underline font-semibold"
              >
                Resend OTP
              </button>
            ) : null}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
