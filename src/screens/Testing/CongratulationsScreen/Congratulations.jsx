import React from "react";
import { useLocation } from "react-router-dom";
import './Congratulations.scss';

const CongratulationsScreen = (props) => {
  const rightAnswers = useLocation().state.rightAnswers;
  const totalAnswers = useLocation().state.totalAnswers;

  return (
    <div className='container_bg_gray'>
      <div className='congratulations'>
        <h2>Поздравляем!</h2>
        {rightAnswers !== -1 &&
          <div className='result'>Ваш результат: {rightAnswers}/{totalAnswers}</div>
        }
        {rightAnswers === -1 &&
          <div className='result'>Вы выучили {totalAnswers} слов</div>
        }
        <a href="/">
          <button>На главную</button>
        </a>
      </div>
    </div>
  );
}

export default CongratulationsScreen;