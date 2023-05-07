import React, { useEffect, useState } from "react";
import './FindWord.scss';
import { useLocation, useNavigate } from "react-router-dom";

const FindWord = (props) => {
  const words = useLocation().state.words;

  const [currentPair, setCurrentPair] = useState(words[0]);
  const [cnt, setCnt] = useState(1);
  const [wordsToChoose, setWordsToChoose] = useState([]);
  const [rightWordsCnt, setRightWordsCnt] = useState(0);
  const [allWords, setAllWords] = useState([]);

  const [chosenOption, setChosenOption] = useState('0');

  const navigate = useNavigate();

  useEffect(() => {
    let allWordsVariable = [];
    for (let i = 0; i < words.length; i++) {
      allWordsVariable[i] = words[i].word
    }
    setAllWords(allWordsVariable);

    const all = allWordsVariable;
    for (let i = 0; i < all.length; i = i + 1) {
      if (currentPair.word === all[i]) {
        const a = all[i];
        all[i] = all[0];
        all[0] = a;
        break;
      }
    }
    setWordsToChoose(shuffleWords(allWordsVariable.slice(0, 4)));
  }, words)

  const increaseRightWords = () => {
    setRightWordsCnt(rightWordsCnt + 1);
    return rightWordsCnt + 1;
  }

  const onSubmit = () => {
    let rightWords = rightWordsCnt;
    if (wordsToChoose[chosenOption] === currentPair.word) {
      rightWords = increaseRightWords();
      debugger;
    }

    if (cnt !== words.length) {
      setCnt(cnt + 1);
      setCurrentPair(words[cnt]);

      const shuffledWords = shuffleWords(allWords)
      for (let i = 0; i < shuffledWords.length; i = i + 1) {
        if (words[cnt].word === shuffledWords[i]) {
          const a = shuffledWords[i];
          shuffledWords[i] = shuffledWords[0];
          shuffledWords[0] = a;
          break;
        }
      }
      setWordsToChoose(shuffleWords(shuffledWords.slice(0, 4)));
    } else {
      navigate('/testing/congratulations', {
        state: {
          rightAnswers: rightWords,
          totalAnswers: allWords.length
        }
      })
    }
  }

  const shuffleWords = (words) => {
    return words.map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  const handleOptionChange = (event) => {
    setChosenOption(event.target.value);
  }

  return (
    <div className='find-word-section'>
      <form>
        <h3>{currentPair.translation}</h3>
        <p>Выберите слово:</p>
        <div className='variants'>
          <div className='variants__item'>
            <input type="radio" id='first' name='options' value='0'
                   checked={chosenOption === '0'}
                   onChange={handleOptionChange} />
            <label htmlFor='first'>{wordsToChoose[0]}</label>
          </div>
          <div className='variants__item'>
          <input type="radio" id='second' name='options' value='1'
                 checked={chosenOption === '1'}
                 onChange={handleOptionChange} />
          <label htmlFor='second'>{wordsToChoose[1]}</label>
          </div>
          <div className='variants__item'>
          <input type="radio" id='third' name='options' value='2'
                 checked={chosenOption === '2'}
                 onChange={handleOptionChange} />
          <label htmlFor='third'>{wordsToChoose[2]}</label>
          </div>
          <div className='variants__item'>
          <input type="radio" id='fourth' name='options' value='3'
                 checked={chosenOption === '3'}
                 onChange={handleOptionChange} />
          <label htmlFor='fourth'>{wordsToChoose[3]}</label>
          </div>
        </div>
      </form>
      <button onClick={onSubmit}>Дальше</button>
    </div>
  )
}

export default FindWord;