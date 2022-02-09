import React from "react";

export default function Quiz(props) {
    const [quiz, setQuiz] = React.useState([])
    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=10&category=9")
            .then(res => res.json())
        .then(data => setQuiz(data))
    }, [])
    console.log(quiz);
}