import { useEffect, useRef, useState } from "react";
import ScoreScreen from "./ScoreScreen";
const QuestionScreen = ({ data }) => {
  const [question, setQuestion] = useState(data[0].question);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [scoreScreen, setScoreScreen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    if (!scoreScreen) {
      if (index <= 4) {
        setQuestion(data[index].question);
      }
      setCorrect(null);
      setSubmitted(false);
      ref.current.value = "";
    }
  }, [index, scoreScreen]);

  const nextClick = () => {
    if (index < 4) setIndex((prevState) => prevState + 1);
    else {
      setIndex(0);
      setScoreScreen(true);
    }
  };
  const submitAnswer = () => {
    setSubmitted(true);
    setShowScore(true);
    const submittedAns = ref.current.value;
    if (
      submittedAns.toLowerCase() === data[index].correct_answer.toLowerCase()
    ) {
      setCorrect(true);
      setScore((prevState) => prevState + 1);
    } else setCorrect(false);
  };

  return (
    <>
      {scoreScreen ? (
        <ScoreScreen score={score} />
      ) : (
        <>
          <h2>{question}</h2>
          Your answer is
          <input ref={ref} disabled={submitted} />
          <button onClick={submitAnswer} disabled={submitted}>
            Submit
          </button>
          {showScore && (
            <p>Your answer is {correct ? "Correct" : "Incorrect"}</p>
          )}
          <p>Your score is {`${score}/${index + 1}`}</p>
          <button onClick={nextClick}>
            {index < 4 ? "Next Question" : "End Game"}
          </button>
        </>
      )}
    </>
  );
};

export default QuestionScreen;
