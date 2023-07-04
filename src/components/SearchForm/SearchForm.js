import React, {useEffect, useState} from 'react';
import Button from '../Button/Button';
import Switch from '../Switch/Switch';
import './SearchForm.css';
import { ERROR_TEXT_KEY_WORD } from '../../utils/const';

function SearchForm ({onSwitchChange, savedFilms, onSubmit, isSwitchOn, isSwitchDisabled, searchText = ''}) {
  const [searchString, setSearchString] = useState(searchText);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(
    () => setErrorMessage(''),
    [searchString]
  );

  const handleSwitchChange = () => onSwitchChange();

  const handleStringChange = (event) => setSearchString(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!searchString && !savedFilms) {
      setErrorMessage(ERROR_TEXT_KEY_WORD);

      return;
    }

    onSubmit(searchString);
  };

  return (
    <div className="search change">
      <form
        name='search-form'
        className='search__form search__box'
        onSubmit={handleSubmit}
      >
        <fieldset className="search__input-box search__box">
          <input
            type="text"
            id="search-input"
            name="search-input"
            className="search__input search__box"
            placeholder="Фильм"
            value={searchString}
            onChange={handleStringChange}
          />

          <Button type="submit" userClass="search__button"/>
        </fieldset>

        <fieldset className="search__switch-box search__box">
          <div className="search__line search__box"/>

          <Switch
            isChecked={isSwitchOn || false}
            onChange={handleSwitchChange}
            isDisabled={isSwitchDisabled}
          />

          <p className="search__switch-name search__box">
            Короткометражки
          </p>
        </fieldset>
      </form>

      <p className="search__input_error search__box">
        {errorMessage}
      </p>
    </div>
  )
}

export default SearchForm;
