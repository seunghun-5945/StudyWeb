import React, { useEffect, useState } from "react";
import styled from "styled-components";
import sogong from "../src/jsons/sogong.json";
import backgroundMusic from "../src/music/music.mp3"; // 배경음 파일 경로

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: lightgray;
`;

const Title = styled.h1`
  font-size: 50px;
  color: red;
`;

const QuestionArea = styled.div`
  width: 80%;
  max-width: 1200px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  background-color: white;
  font-size: 25px;
  margin-top: 80px;
  padding: 20px;
  text-align: center;
`;

const AnswerBox = styled.input`
  margin-top: 20px;
  width: 80%;
  max-width: 1000px;
  height: 50px;
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
  width: 80%;
  max-width: 1000px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const CorrectBtn = styled.button`
  width: 200px;
  height: 50px;
  border-radius: 15px;
  cursor: pointer;
  font-size: 20px;
  background-color: lightsalmon;
`;

const App = () => {
  const [answer, setAnswer] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const handleInput = (e) => {
    setAnswer(e.target.value.toLowerCase());
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        clickPassBtn();
      } else {
        clickCorrectBtn();
      }
    }
  };

  const clickCorrectBtn = () => {
    const trimmedAnswer = answer.trim().toLowerCase();
    const currentAnswer = Array.isArray(sogong[currentIndex].answer)
      ? sogong[currentIndex].answer.map(word => word.trim().toLowerCase())
      : [sogong[currentIndex].answer.trim().toLowerCase()];
  
    const sortedTrimmedAnswer = trimmedAnswer.split(' ').sort().join(' ');
    const sortedCurrentAnswer = currentAnswer.map(ans => ans.split(' ').sort().join(' '));
  
    if (currentIndex === sogong.length - 1) {
      alert("마지막 문제입니다");
    } else if (sortedCurrentAnswer.some(ans => ans === sortedTrimmedAnswer)) {
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
      alert(`정답은: ${sogong[currentIndex].answer} 입니다`);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    const audioElement = document.getElementById("backgroundMusic");
    audioElement.muted = !audioElement.muted;
  };

  return (
    <Container>
      <audio autoPlay loop id="backgroundMusic">
        <source src={backgroundMusic} type="audio/mp3" />
      </audio>
      <QuestionArea>{sogong[currentIndex].question}</QuestionArea>
      <AnswerBox
        placeholder="정답을 입력하세요"
        value={answer}
        onChange={handleInput}
        onKeyPress={handleKeyPress}
      />
      <BtnArea>
        <CorrectBtn onClick={clickCorrectBtn}>정답</CorrectBtn>
        <CorrectBtn onClick={clickPassBtn}>패스</CorrectBtn>
        <CorrectBtn onClick={toggleMute} style={{ backgroundColor: "lightblue" }}>
          {isMuted ? "음소거 해제" : "음소거"}
        </CorrectBtn>
      </BtnArea>
    </Container>
  );
}

export default App;
