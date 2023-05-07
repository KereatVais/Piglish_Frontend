import React, { useEffect, useState } from "react";
import './WriteWord.scss';
import { useLocation, useNavigate } from "react-router-dom";

const WriteWord = (props) => {
  const words = useLocation().state.words;

  const [currentPair, setCurrentPair] = useState(words[0]);
  const [cnt, setCnt] = useState(1);
  const [inputValue, setInputValue] = useState('')
  const [rightWordsCnt, setRightWordsCnt] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {

  }, [])

  const increaseRightWords = () => {
    setRightWordsCnt(rightWordsCnt + 1);
    return rightWordsCnt + 1;
  }

  const onSubmit = () => {
    debugger
    let rightWords = rightWordsCnt;
    if (inputValue === currentPair.word) {
      rightWords = increaseRightWords();
      debugger;
    }

    if (cnt !== words.length) {
      setCnt(cnt + 1);
      setCurrentPair(words[cnt]);

    } else {
      debugger
      navigate('/testing/congratulations', { state: {
          rightAnswers: rightWords,
          totalAnswers: words.length
        }})
    }

    setInputValue('');
  }

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
  }

  return (
    <div className='testing'>
      <div>
        <div>{currentPair.translation}</div>
        <input type="text" value={inputValue} onChange={event => handleChange(event)}/>
      </div>
      <button onClick={onSubmit}>Дальше</button>
    </div>
  )
}

export default WriteWord;