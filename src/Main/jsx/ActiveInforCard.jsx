// ActiveInforCard.js

import React, { useState, useEffect } from "react";
import styles from "../css/ActiveForms.module.css";
import formDP from "../../Images/danishan.jpeg";
import IconButton from "../../InputFields/Actions/jsx/IconButton";
import {
  analyticsIcon,
  copyIcon,
  directShareIcon,
  editIcon,
  previewIcon,
} from "../../Images/icons";
import { calculateTimeLeft, parseDateTime } from "../helper/timeHelperFun";

export const ActiveInforCard = ({ formId, color }) => {
  const catagory = "Creation";
  const title = "letsCreate Registration Process";
  const tag = "letsCreate";
  const date = "23-09-2024"; // Example date
  const time = "04:12 PM"; // Example time (12-hour format)
  const submissionCount = "25";
  const desc =
    "Let's Create registration is simple. Enter basic details, verify your email, and set up your profiles.";

  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (timeLeft === "Expired") return;
    const expirationDate = parseDateTime(date, time);
    const initialTimeLeft = calculateTimeLeft(expirationDate);
    setTimeLeft(initialTimeLeft);

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(expirationDate);
      setTimeLeft(newTimeLeft);
    }, 60 * 1000);

    return () => clearInterval(timer);
  }, [date, time, timeLeft]); // Only re-run if date or time change

  const handleEditClick = () => {
    console.log("Edit Click");
  };

  const handleFormViewClick = () => {
    console.log("FormView Click");
  };

  const handleShareClick = () => {
    console.log("Share Click");
  };

  const handleAnalyticsClick = () => {
    console.log("Analytics Click");
  };

  const handleDuplicateClick = () => {
    console.log("Duplicate Click");
  };

  return (
    <div className={styles.activeInforCard}>
      <div className={styles.secWrapper1}>
        <div className={styles.sec1}>
          <div className={styles.dpImage}>
            <img src={formDP} alt="Form DP" />
          </div>
          <p>{catagory}</p>
        </div>
        <div className={styles.sec2}>
          <IconButton
            label={"Edit"}
            icon={editIcon}
            color={color}
            onClick={handleEditClick}
          />
          <IconButton
            label={"Form Preview"}
            icon={previewIcon}
            color={color}
            onClick={handleFormViewClick}
          />
          <IconButton
            label={"Share Form"}
            icon={directShareIcon}
            color={color}
            onClick={handleShareClick}
          />
          <IconButton
            label={"Analytics"}
            icon={analyticsIcon}
            color={color}
            onClick={handleAnalyticsClick}
          />
          <IconButton
            label={"Duplicate"}
            icon={copyIcon}
            color={color}
            onClick={handleDuplicateClick}
          />
        </div>
      </div>
      <div className={styles.secWrapper2}>
        <div className={styles.sec3}>
          <div className={styles.titleTag}>
            <p className={styles.title}>{title}</p>
            <p className={styles.tag}>{tag}</p>
          </div>
          <p className={styles.desc}>{desc}</p>
        </div>
        <div className={styles.sec4}>
          <div className={styles.submissionWrapper}>
            <div className={styles.submissionInfo}>
              <p className={styles.label}>Total Submission</p>
              <p className={styles.submission}>{submissionCount}</p>
            </div>
          </div>
          <p className={styles.dateTime}>
            Expire At: {date}, {time}
          </p>
          <p className={`${styles.expire} ${styles.dateTime}`}>
            {timeLeft !== "Expired" ? `Time Left: ${timeLeft}` : `Expired`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActiveInforCard;
