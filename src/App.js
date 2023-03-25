import "./App.css";
import { useEffect, useState } from "react";
import StartScreen from "./components/StartScreen";
import QuestionScreen from "./components/QuestionScreen";

function App() {
  const [start, setStart] = useState(false);
  const [questions, setQuestions] = useState(null);
  const onRestart = () => {
    setStart(false);
  };

  const fetchData = () => {
    return fetch(" https://opentdb.com/api.php?amount=5")
      .then((response) => response.json())
      .then((data) => setQuestions(data?.results))
      .catch((error) => console.log(error))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [start]);

  const playGameClick = () => {
    setStart(true);
  };

  return (
    <>
      {questions ? (
        <div className="App">
          {!start ? (
            <>
              <StartScreen />
              <button onClick={playGameClick}>Play Game</button>
            </>
          ) : (
            <>
              <QuestionScreen data={questions} />
              <button onClick={onRestart}>Restart Game</button>
            </>
          )}
        </div>
      ) : (
        <h1>Loading.....</h1>
      )}
    </>
  );
}

export default App;
