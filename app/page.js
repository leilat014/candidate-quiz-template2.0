'use client';
import React, { useState } from 'react';
import { quiz } from './data.js';

const Page = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const { questions, results } = quiz;

  // Select answer
  const onAnswerSelected = (answerKey) => {
    setSelectedAnswers(prev => ({ ...prev, [activeQuestion]: answerKey }));
  };

  // Proceed to next question or show results
  const nextQuestion = () => {
    if (activeQuestion < questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateResult = () => {
    let answerFrequency = { A: 0, B: 0, C: 0, D: 0, E: 0 };
    Object.values(selectedAnswers).forEach(answer => {
      answerFrequency[answer] = (answerFrequency[answer] || 0) + 1;
    });
    
    // Find the highest frequency value
    const highestFrequency = Math.max(...Object.values(answerFrequency));
    
    // Collect all categories that have the highest frequency
    const topCategories = Object.entries(answerFrequency).filter(([key, value]) => value === highestFrequency).map(([key]) => key);
    
    // Handling multiple top results
    if (topCategories.length > 1) {
      // If you want to return a string indicating a tie
      return `${topCategories.map(category => quiz.results[category]).join(' and ')}`;
      // If you want to return an array of tied results for further processing
      // return topCategories.map(category => results[category]);
    } else {
      // Handling a single top result
      return results[topCategories[0]];
    }
  };
  

  return (
    <div className='container'>
      <h1>City Council Candidate Quiz</h1>
      {!showResult ? (
        <div className='quiz-container'>
          <h3>Question: {activeQuestion + 1}/{questions.length}</h3>
          <h3>{questions[activeQuestion].question}</h3>
          {Object.entries(questions[activeQuestion].answers).map(([key, value]) => (
            <li
              key={key}
              onClick={() => onAnswerSelected(key)}
              className={selectedAnswers[activeQuestion] === key ? 'li-selected' : 'li-hover'}
            >
              {key}: {value}
            </li>
          ))}
          <button onClick={nextQuestion} className='btn'>
            {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      ) : (
        <div className='quiz-container'>
          <h3>Results</h3>
          <p>Your Result: <b>{calculateResult()}</b></p>
          <a href = "https://mustangnews.net/local-election-guide-whos-running/" target="_top">Learn more about each candidate here</a>
          <button onClick={() => window.location.reload()}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default Page;
