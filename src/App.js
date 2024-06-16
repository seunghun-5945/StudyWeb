import React, { useEffect, useState } from "react";
import styled from "styled-components";
import sogong from "../src/jsons/sogong.json";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: lightgray;
  h1 {
    font-size: 50px;
  }
`;

const QuestionArea = styled.div`
  width: 1500px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  background-color: white;
  font-size: 25px;
  margin-top: 80px;
`;

const AnswerBox = styled.input`
  margin-top: 20px;
  width: 800px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  text-align: center;

  border: 1px solid gray;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border: 3px solid lightsalmon;
  }
`;

const BtnArea = styled.div`
  width: 500px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const CorrectBtn = styled.button`
  margin-top: 20px;
  width: 200px;
  height: 50px;
  border-radius: 15px;
  cursor: pointer;
  font-size: 30px;
  background-color: lightsalmon;
`;

const App = () => {
  const [answer, setAnswer] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && e.shiftKey) {
        e.preventDefault(); // 쉬프트 + 엔터의 기본 동작 방지
        clickPassBtn();
      }
    };

    // 이벤트 리스너 등록
    document.addEventListener("keydown", handleKeyPress);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentIndex]); // currentIndex가 변경될 때마다 useEffect 실행

  const handleInput = (e) => {
    setAnswer(e.target.value.toLowerCase());
  };

  const clickCorrectBtn = () => {
    const trimmedAnswer = answer.replace(/\s/g, "");
    const currentAnswer = Array.isArray(sogong[currentIndex].answer) ? sogong[currentIndex].answer.map(word => word.replace(/\s/g, "").toLowerCase()) : [sogong[currentIndex].answer.replace(/\s/g, "").toLowerCase()];
    if (currentIndex === sogong.length - 1) {
      alert("마지막 문제입니다");
    } else if (currentAnswer.includes(trimmedAnswer)) {
      setCurrentIndex(currentIndex + 1);
      setAnswer('');
    } else {
      alert("틀렸습니다");
    }
  };

  const clickPassBtn = () => {
    if (currentIndex === sogong.length - 1) {
      alert("마지막 문제입니다");
    } else {
      setCurrentIndex(currentIndex + 1);
      setAnswer('');
      alert("정답은:" + sogong[currentIndex].answer + "입니다");
    }
  };

  return (
    <Container>
      <h1 style={{color:"5red"}}>"enter 누르면 정답 shift + enter 누르면 패스"</h1>
      <QuestionArea><h1>{sogong[currentIndex].question}</h1></QuestionArea>
      <AnswerBox placeholder="정답을 입력하세요" value={answer} onChange={handleInput}/>
      <BtnArea>
        <CorrectBtn onClick={clickCorrectBtn}>정답</CorrectBtn>
        <CorrectBtn onClick={clickPassBtn}>패스</CorrectBtn>
      </BtnArea>
    </Container>
  );
}

export default App;
