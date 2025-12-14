import React, { useState, useRef, useEffect } from "react";
import style from "../css/OtpField.module.css";
import { apiCaller } from "../../../utils/apiCaller.js";
import { UtilsLogger } from "../../../utils/logger/logger.util.js";

const logger = UtilsLogger.logger;

/**
 * `OtpField` is a React component that renders a multi-input OTP (One-Time Password) field.
 * It supports numeric or alphanumeric input, handles backspace and paste events, 
 * and automatically submits the OTP to a backend verification endpoint.
 * 
 * @component
 * 
 * @param {Object} props - Component props.
 * @param {number} [props.length=6] - Number of OTP input fields.
 * @param {function} props.setResult - Callback function to return the valid OTP.
 * @param {string} [props.color] - Primary color for the OTP input fields.
 * @param {string} [props.width="300px"] - Width of the OTP input container.
 * @param {string} [props.verifcationEndpoint] - API endpoint for OTP verification.
 * @param {string|number} [props.userId] - User ID to send along with OTP verification request.
 * @param {function} [props.setError] - Callback function to set error messages from verification.
 * @param {boolean} [props.isNumeric=true] - Whether the OTP should accept numeric characters only.
 * 
 * @example
 * <OtpField
 *   length={6}
 *   color="#00AEEF"
 *   width="250px"
 *   userId="12345"
 *   verifcationEndpoint="/api/verify-otp"
 *   setResult={(otp) => console.log("Verified OTP:", otp)}
 *   setError={(err) => console.error("OTP Error:", err)}
 * />
 * 
 * @returns {JSX.Element} The OTP input field component.
 */
export const OtpField = ({
  length = 6,
  setResult,
  color,
  width = "300px",
  verifcationEndpoint,
  userId,
  setError,
  isNumeric = true,
}) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const [colorType, setColorType] = useState("");
  const inputRefs = useRef([]);

  const validateChar = (char) => {
    return isNumeric ? /^\d$/.test(char) : char.length === 1;
  };

  const handleChange = (element, index) => {
    const value = element.value;
    if (!validateChar(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (element.nextSibling) element.nextSibling.focus();
  };

  const handleResult = async (value) => {
    if (!verifcationEndpoint) {
      logger.warn({
        message: "Verification endpoint is not pass as prop",
      });
    }
    const response = await apiCaller({
      endpoint: verifcationEndpoint,
      method: "POST",
      data: {
        userId,
        otp: value,
      },
    });

    if (response.error) setError(response.error);
    else {
      if (response?.success) {
        setResult(value);
      } else {
        setColorType("colorError");
        setError("Invalid Code, Try Again!");
        setResult(null);

        setTimeout(() => {
          setOtp(Array(length).fill(""));
          setColorType("");
          setError("");
          inputRefs.current[0]?.focus();
        }, 3000);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const data = e.clipboardData.getData("Text").slice(0, length).split("");
    const filtered = data.filter((char) => validateChar(char)).slice(0, length);

    if (filtered.length === length) {
      setOtp(filtered);
      handleResult(filtered.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];
      if (otp[index]) {
        newOtp[index] = "";
      } else if (index > 0) {
        newOtp[index - 1] = "";
        inputRefs.current[index - 1]?.focus();
      }
      setOtp(newOtp);
    }
  };

  const handleFocus = (e) => e.target.select();

  useEffect(() => {
    const joinedOtp = otp.join("");
    if (joinedOtp.length === length) handleResult(joinedOtp);
  }, [otp]);

  const cssVariable = {
    "--color": color || "var(--colorCyan)",
    "--width": width,
  };

  return (
    <div className={style.otpInputContainer} style={cssVariable}>
      {otp.map((char, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={char}
          ref={(el) => (inputRefs.current[index] = el)}
          className={`${style.otpInput} ${style[colorType]}`}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={handleFocus}
          onPaste={handlePaste}
          inputMode={isNumeric ? "numeric" : "text"}
        />
      ))}
    </div>
  );
};
