import "./App.css";
import React from "react";
// import Quiz from './components/Quiz';
import Question from "./components/Question";

function App() {
  const [quiz, setQuiz] = React.useState([]);
  const [start, setStart] = React.useState(true);
  const [checkAnswer, setCheckAnswer] = React.useState(false);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&category=9")
      .then((res) => res.json())
      .then((data) => setQuiz(data.results));
  }, []);
  console.log(quiz);

  function startQuiz() {
    setStart((prevStart) => !prevStart);
  }

  function increaseCount() {
    setCount((prevCount) => prevCount + 1);
  }
  console.log(quiz);
  return (
    <div className={start ? "quiz-start" : "quiz-started"}>
      {start && <h1 className="title">Quizzical</h1>}
      {start && (
        <p className="description">
          Answer the Questions and Test your General Knowledge.
        </p>
      )}
      {start && (
        <button className="start-button" onClick={startQuiz}>
          START
        </button>
      )}
      {!start &&
        quiz.map((object) => {
          return (
            <Question
              key={object.question}
              {...object}
              checkAnswer={checkAnswer}
              increaseCount={increaseCount}
            />
          );
        })}
      {!start && (
        <div className="check-button">
          {checkAnswer && (
            <h2 className="play-again">
              You scored {count}/10 correct answers
            </h2>
          )}
          {!checkAnswer && (
            <button
              className="check-answers"
              onClick={() => setCheckAnswer(true)}
            >
              Check Answers
            </button>
          )}
          {checkAnswer && (
            <button
              className="check-answers"
              onClick={() => {
                setCount(0);
                setCheckAnswer(false);
              }}
            >
              Play Again
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
