import React, { useState } from "react";
import './AddWordModal.scss';

import closeButton from '../../common/img/x.svg'

const AddWordModal = (props) => {
  const [newWord, setNewWord] = useState('');
  const [newTranslation, setNewTranslation] = useState('');

  const handleNewWordChange = (event) => {
    setNewWord(event.target.value);
  }

  const handleNewTranslationChange = (event) => {
    setNewTranslation(event.target.value);
  }

  const onSubmit = () => {
    props.add(newWord, newTranslation)
    props.closeModal();
  }

  return (
    <div className='add-word-modal'>
      <img onClick={props.closeModal} className='close-button' src={closeButton} alt="x" />
      <h3>Добавить новое слово:</h3>
      <div className='form'>
        <div className='form__item'>
          <label htmlFor="word">Слово:</label>
          <input value={newWord}
                 onChange={event => handleNewWordChange(event)}
                 type="text"
                 id='word' />
        </div>
        <div className='form__item'>
          <label htmlFor="translation">Перевод:</label>
          <input value={newTranslation}
                 onChange={event => handleNewTranslationChange(event)}
                 type="text"
                 id='translation' />
        </div>
      </div>
      <button onClick={onSubmit}>Добавить</button>
    </div>
  )
}

export default AddWordModal;