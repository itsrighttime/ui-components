import { useEffect, useState } from "react";
import { Dropdown } from "../../Selectors/jsx/Dropdown.jsx";
import { TextField } from "../../TextInput/jsx/TextField.jsx";
import styles from "../css/SecurityQuestion.module.css";

/**
 * `SecurityQuestion` is a React component that renders a dropdown for selecting a security question
 * and an input field for providing the corresponding answer. The selected question and answer are
 * returned via the `setResult` callback.
 * 
 * @component
 * 
 * @param {Object} props - Component props.
 * @param {Array<string>} [props.questions=[]] - List of available security questions for selection.
 * @param {function} props.setResult - Callback function that receives an object with `question` and `answer`.
 * @param {string} [props.color] - Primary color for dropdown and input field styling.
 * @param {string} [props.placeholder="Select a question"] - Placeholder text for the dropdown.
 * @param {string} [props.width="300px"] - Width of the component container.
 * @param {Object} [props.value={}] - Initial values for question and answer: `{ question, answer }`.
 * @param {boolean} [props.required=false] - Whether selecting a question and providing an answer is required.
 * 
 * @example
 * <SecurityQuestion
 *   questions={["Your first pet?", "Mother's maiden name?"]}
 *   setResult={(res) => console.log(res)}
 *   color="#00AEEF"
 *   value={{ question: "Your first pet?", answer: "Fluffy" }}
 *   required={true}
 * />
 * 
 * @returns {JSX.Element} A security question selector with answer input field.
 */
export const SecurityQuestion = ({
  questions = [],
  setResult,
  color,
  placeholder = "Select a question",
  width = "300px",
  value = {},
  required = false,
}) => {
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    if (value?.question && value?.answer && !selectedQuestion) {
      setSelectedQuestion(value.question);
      setAnswer(value.answer);
    }
  }, [value, selectedQuestion]);

  const handleQuestionChange = (value) => {
    setSelectedQuestion(value[0]);
  };

  useEffect(() => {
    setResult({ question: selectedQuestion, answer });
  }, [answer, selectedQuestion]);

  return (
    <div className={styles.securityQuestion} style={{ width }}>
      <Dropdown
        options={questions}
        placeholder={placeholder}
        value={selectedQuestion === "" ? [] : [selectedQuestion]}
        setResult={handleQuestionChange}
        label="Select a Security Question"
        color={color}
        width="100%"
        required={required}
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
            width="100%"
          />
        </div>
      )}
    </div>
  );
};
