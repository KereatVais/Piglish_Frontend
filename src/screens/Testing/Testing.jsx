import React, { useEffect, useState } from "react";
import './Testing.scss';
import { useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";
import { api } from "../../api/api";
import useRefreshToken from "../../hooks/useRefreshToken";

const Testing = (props) => {
  const [testType, setTestType] = useState('cards');
  const [amount, setAmount] = useState(6);
  const [method, setMethod] = useState('random');
  const { token, setToken, tokenIsExpired } = useToken();
  const { refreshToken, setRefreshToken } = useRefreshToken();

  const handleTestTypeChange = (changeEvent) => {
    setTestType(changeEvent.target.value);
  }

  const handleAmountChange = (changeEvent) => {
    setAmount(changeEvent.target.value);
  }

  const handleMethodChange = (changeEvent) => {
    setMethod(changeEvent.target.value);
  }

  const navigate = useNavigate();

  useEffect(async () => {
    if (tokenIsExpired()) {
      setToken(await api.refreshToken(refreshToken));
    }
  })

  const onSubmit = async () => {
    const requestedWords = await api.sendWordsForTesting(token, amount, method)
    if (testType === 'find-word') {
      navigate('/testing/find-word', {
        state: {
          words: requestedWords
        }
      })
    } else if (testType === 'find-translation') {
      navigate('/testing/find-translation', {
        state: {
          words: requestedWords
        }
      })
    } else if (testType === 'cards') {
      navigate('/testing/cards', {
        state: {
          words: requestedWords
        }
      })
    } else if (testType === 'write-word') {
      navigate('/testing/write-word', {
        state: {
          words: requestedWords
        }
      })
    }
  }

  return (
    <div className='container_bg_gray'>
      <div className='testing'>
        <h2>Тестирование:</h2>
        <form className='form'>
          <div className='form__block'>
            <h3 className='form__subtitle'>Выберите тест:</h3>
            <div className='form__answers form__answers_section_test'>
              <div>
                <div className='form__item'>
                  <input type="radio" id='cards' name='test-type' value='cards'
                         checked={testType === 'cards'}
                         onChange={handleTestTypeChange} />
                  <label htmlFor="cards">Карточки</label>
                </div>
                <div className='form__hint'>Подходит для первичного знакомства со словами</div>
              </div>
              <div>
                <div className='form__item'>
                  <input type="radio" id='find-word' name='test-type' value='find-word'
                         checked={testType === 'find-word'}
                         onChange={handleTestTypeChange} />
                  <label htmlFor="find-word">Найди слово</label>
                </div>
                <div className='form__hint'>Нужно выбрать правильное слово для заданного перевода</div>
              </div>
              <div>
                <div className='form__item'>
                  <input type="radio" id='find-translation' name='test-type' value='find-translation'
                         checked={testType === 'find-translation'}
                         onChange={handleTestTypeChange} />
                  <label htmlFor="find-translation">Найди перевод</label>
                </div>
                <div className='form__hint'>Нужно выбрать правильный перевод для заданного слова</div>
              </div>
              <div>
                <div className='form__item'>
                  <input type="radio" id='write-word' name='test-type' value='write-word'
                         checked={testType === 'write-word'}
                         onChange={handleTestTypeChange} />
                  <label htmlFor="cards">Напиши слово</label>
                </div>
                <div className='form__hint'>Нужно целиком написать слово для заданного перевода</div>
              </div>
            </div>
          </div>

          <div className='form__block'>
            <h3 className='form__subtitle'>Выберите количество слов:</h3>
            <div className='form__answers'>
              <div className='form__item'>
                <input type="radio" id='first' name='amount' value='6'
                       checked={amount == 6}
                       onChange={handleAmountChange} />
                <label htmlFor="first">6</label>
              </div>
              <div className='form__item'>
                <input type="radio" id='second' name='amount' value='8'
                       checked={amount == 8}
                       onChange={handleAmountChange} />
                <label htmlFor="second">8</label>
              </div>
              <div className='form__item'>
                <input type="radio" id='third' name='amount' value='10'
                       checked={amount == 10}
                       onChange={handleAmountChange} />
                <label htmlFor="third">10</label>
              </div>
              <div className='form__item'>
                <input type="radio" id='fourth' name='amount' value='12'
                       checked={amount == 12}
                       onChange={handleAmountChange} />
                <label htmlFor="fourth">12</label>
              </div>
            </div>
          </div>

          <div className='form__block'>
            <h3 className='form__subtitle'>Какие слова вы хотите потренировать?</h3>
            <div className='form__answers'>
              <div className='form__item'>
                <input type="radio" id='random' name='method' value='random'
                       checked={method === 'random'}
                       onChange={handleMethodChange} />
                <label htmlFor="random">Случайные</label>
              </div>
              <div className='form__item'>
                <input type="radio" id='last' name='method' value='last'
                       checked={method === 'last'}
                       onChange={handleMethodChange} />
                <label htmlFor="last">Последние добавленные</label>
              </div>
            </div>
          </div>
        </form>
        <button onClick={onSubmit}>Начать</button>
      </div>
    </div>
  )
}

export default Testing;