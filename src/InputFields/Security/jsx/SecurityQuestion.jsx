import React, { useEffect, useState } from "react";
import Dropdown from "../../Selectors/jsx/Dropdown";
import TextField from "../../TextInput/jsx/TextField";
import styles from "../css/SecurityQuestion.module.css";

const SecurityQuestion = ({
  questions = [],
  setResult,
  color,
  placeholder = "Select a question",
}) => {
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleQuestionChange = (value) => {
    setSelectedQuestion(value[0]);
  };

  useEffect(() => {
    setResult({ question: selectedQuestion, answer });
  }, [answer, selectedQuestion, setResult]);

  return (
    <div className={styles.securityQuestion}>
      <Dropdown
        options={questions}
        placeholder={placeholder}
        value={selectedQuestion}
        setResult={handleQuestionChange}
        label="Select a Security Question"
        color={color}
      />

      {selectedQuestion && (
        <div className={styles.answer}>
          <TextField
            type="text"
            label="Answer"
            placeholder="Enter your answer"
            value={answer}
            setResult={setAnswer}
            color={color}
            required
            errorMessage="Please provide an answer."
          />
        </div>
      )}
    </div>
  );
};

export default SecurityQuestion;
