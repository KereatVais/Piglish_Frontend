import React, { useEffect, useState } from "react";
import './FindTranslation.scss';
import { useLocation, useNavigate } from "react-router-dom";

const FindTranslation = (props) => {
  const translations = useLocation().state.words;

  const [currentPair, setCurrentPair] = useState(translations[0]);
  const [cnt, setCnt] = useState(1);
  const [translationsToChoose, setTranslationsToChoose] = useState([]);
  const [rightTranslationsCnt, setRightTranslationsCnt] = useState(0);
  const [allTranslations, setAllTranslations] = useState([]);

  const [chosenOption, setChosenOption] = useState('0');

  const navigate = useNavigate();

  useEffect(() => {
    let allTranslationsVariable = [];
    for (let i = 0; i < translations.length; i++) {
      allTranslationsVariable[i] = translations[i].translation
    }
    setAllTranslations(allTranslationsVariable);
    setTranslationsToChoose(allTranslationsVariable.slice(0, 4))
  }, translations)

  const increaseRightTranslations = () => {
    setRightTranslationsCnt(rightTranslationsCnt + 1);
    return rightTranslationsCnt + 1;
  }

  const onSubmit = () => {
    let rightTranslations = rightTranslationsCnt;
    if (translationsToChoose[chosenOption] === currentPair.translation) {
      rightTranslations = increaseRightTranslations();
      debugger;
    }

    if (cnt !== translations.length) {
      setCnt(cnt + 1);
      setCurrentPair(translations[cnt]);

      const shuffledTranslations = shuffleTranslations(allTranslations)
      for (let i = 0; i < shuffledTranslations.length; i = i + 1) {
        if (translations[cnt].translation === shuffledTranslations[i]) {
          const a = shuffledTranslations[i];
          shuffledTranslations[i] = shuffledTranslations[0];
          shuffledTranslations[0] = a;
          break;
        }
      }
      setTranslationsToChoose(shuffleTranslations(shuffledTranslations.slice(0, 4)));
    } else {
      navigate('/testing/congratulations', {
        state: {
          rightAnswers: rightTranslations,
          totalAnswers: allTranslations.length
        }
      })
    }
  }

  const shuffleTranslations = (translations) => {
    return translations.map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  const handleOptionChange = (event) => {
    setChosenOption(event.target.value);
  }

  return (
    <div className='find-translation-section'>
      <form>
        <h3>{currentPair.word}</h3>
        <p>Выберите перевод:</p>
        <div className='variants'>
          <div className='variants__item'>
            <input type="radio" id='first' name='options' value='0'
                   checked={chosenOption === '0'}
                   onChange={handleOptionChange} />
            <label htmlFor='first'>{translationsToChoose[0]}</label>
          </div>
          <div className='variants__item'>
            <input type="radio" id='second' name='options' value='1'
                   checked={chosenOption === '1'}
                   onChange={handleOptionChange} />
            <label htmlFor='second'>{translationsToChoose[1]}</label>
          </div>
          <div className='variants__item'>
            <input type="radio" id='third' name='options' value='2'
                   checked={chosenOption === '2'}
                   onChange={handleOptionChange} />
            <label htmlFor='third'>{translationsToChoose[2]}</label>
          </div>
          <div className='variants__item'>
            <input type="radio" id='fourth' name='options' value='3'
                   checked={chosenOption === '3'}
                   onChange={handleOptionChange} />
            <label htmlFor='fourth'>{translationsToChoose[3]}</label>
          </div>
        </div>
      </form>
      <button onClick={onSubmit}>Дальше</button>
    </div>
  )
}

export default FindTranslation;