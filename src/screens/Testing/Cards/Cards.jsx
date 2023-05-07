import React, { useEffect, useState } from "react";
import './Cards.scss';
import { useLocation, useNavigate } from "react-router-dom";

const Cards = (props) => {
  debugger;
  const words = useLocation().state.words;

  const [currentPair, setCurrentPair] = useState(words[0]);
  const [cnt, setCnt] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
  }, words)

  const onSubmit = () => {
    if (cnt !== words.length) {
      setCnt(cnt + 1);
      setCurrentPair(words[cnt]);

    } else {
      navigate('/testing/congratulations', { state: {
          rightAnswers: -1,
          totalAnswers: words.length
        }})
    }
  }


  return (
    <div className='testing-cards'>
      <h2>Карточки:</h2>
      <div className='card'>
        <div className='card__word'>{currentPair.word}</div>
        <div className='card__translation'>{currentPair.translation}</div>
      </div>
      <button onClick={onSubmit}>Дальше</button>
    </div>
  )
}

export default Cards;