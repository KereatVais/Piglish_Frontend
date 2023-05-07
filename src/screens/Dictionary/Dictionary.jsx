import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import './Dictionary.scss';

import trash from '../../common/img/trash.svg';
import useToken from "../../hooks/useToken";
import { api } from "../../api/api";
import useRefreshToken from "../../hooks/useRefreshToken";
import AddWordModal from "./AddWordModal";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUserData } from "../../reducers/authReducer";

const Dictionary = (props) => {
  const [words, setWords] = useState([]);
  const [modalIsShown, setModalShown] = useState(false)

  const userId = useSelector((state) => state.auth.userId)
  const dispatch = useDispatch();

  const { token, setToken, tokenIsExpired } = useToken();
  const { refreshToken, setRefreshToken } = useRefreshToken();

  useEffect(async () => {
    await checkToken();
    let words = [];
    await api.loginByToken(token.slice(7)).then(async (data) => {
      debugger
      words = await api.getWords(token, data.id);
    });
    setWords(words);
  }, [])

  const checkToken = async () => {
    if (tokenIsExpired()) {
      setToken(await api.refreshToken(refreshToken));
    }
  }


  const addWord = async (newWord, newTranslation) => {
    await checkToken();
    const word = await api.addWord(token, userId, newWord, newTranslation);

    const newWords = [...words];
    newWords.push({ id: word.id, word: newWord, translation: newTranslation })
    debugger;
    setWords(newWords);
  }

  const deleteWord = async (backendId) => {
    await checkToken();
    await api.deleteWord(token, backendId);

    const newWords = [...words];
    let frontendId = -1;
    newWords.forEach((word) => {
      if (word.id === backendId) {
        frontendId = newWords.indexOf(word);
      }
    })

    if (frontendId !== -1) {
      newWords.splice(frontendId, 1);
    }
    debugger
    setWords(newWords);
  }

  let i = 0;
  return (
    <div className='dictionary-container'>
      <div className='dictionary'>
        <h2>Мой словарь:</h2>
        <div className='add-button' onClick={() => setModalShown(true)}>
          + добавить
        </div>
        <div className='words'>
          {words.length === 0 &&
            <div className='nowords-tip'>
              ... Здесь пока ничего нет. Самое время добавить свое первое слово!
            </div>
          }
          {words.length !== 0 && words.map(pair => {
              i += 1;
              return (
                <div className="dictionary__position">
                  <input className='dictionary__real-id' type="hidden" value={pair.id} />
                  <div className='dictionary__num'>{i}</div>
                  <div className='dictionary__word'>{pair.word}</div>
                  <div className='dictionary__translation'>{pair.translation}</div>
                  <div className='dictionary__trash-icon'
                  onClick={() => deleteWord(pair.id)}>
                    <img src={trash} alt="Trash" />
                  </div>
                </div>)
            }
          )}
        </div>
      </div>
      {modalIsShown &&
        <div className='modal-container'>
          <AddWordModal add={addWord} closeModal={() => setModalShown(false)} />
        </div>
      }
    </div>
  );
}

export default Dictionary;