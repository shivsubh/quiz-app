import React from "react";

export default function Question(props) {
  const [selected, setSelected] = React.useState("");
  const [options, setOptions] = React.useState([]);
  function shuffleArray(array) {
    array.sort(() => Math.random() - 0.5);
  }

  const {
    category,
    correct_answer,
    difficulty,
    incorrect_answers,
    question,
    type,
    checkAnswer,
    increaseCount,
  } = props;

  function getOptions() {
    const options = [];
    incorrect_answers.map((option) => options.push(option));
    options.push(correct_answer);
    shuffleArray(options);
    return options;
  }

  function getButtonClass(option) {
    let className = "";
    if (selected === option) {
      if (checkAnswer) {
        if (option === correct_answer) {
          className = "correct";
        } else className = "wrong";
      } else className = "selected";
    } else {
      if (checkAnswer) {
        if (option === correct_answer) className = "correct";
        else className = "options";
      } else className = "options";
    }
    return className;
  }

  React.useEffect(() => {
    setOptions(getOptions());
  }, []);

  React.useEffect(() => {
    if (checkAnswer && selected === correct_answer) {
      increaseCount();
    }
  }, [checkAnswer, selected]);

  return (
    <div>
      <h3 className="question">{question}</h3>
      <div className="options-container">
        {options.map((option) => (
          <button
            key={option}
            className={getButtonClass(option)}
            onClick={
              selected === option
                ? () => setSelected("")
                : () => setSelected(option)
            }
          >
            {option}
          </button>
        ))}
      </div>
      <hr />
    </div>
  );
}
