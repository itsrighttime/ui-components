import React, { useState, useRef, useEffect } from "react";
import style from "../css/OtpField.module.css";
import { apiCaller } from "../../../utils/apiCaller";
import { UtilsLogger } from "../../../utils/logger/logger.util";

const logger = UtilsLogger.logger;

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
