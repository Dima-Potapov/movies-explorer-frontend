import React from 'react';
import Button from '../Button/Button';
import Switch from '../Switch/Switch';
import './SearchForm.css';

const SearchForm = (props) => (
  <div className="search change">
    <form
      name='search-form'
      className='search__form search__box'
      onSubmit={props.onSubmit}
    >
      <fieldset className="search__input-box search__box">
        <input
          type="text"
          id="search-input"
          name="search-input"
          className="search__input search__box"
          placeholder="Фильм"
          required
        />

        <Button userClass="search__button"/>
      </fieldset>

      <fieldset className="search__switch-box search__box">
        <div className="search__line search__box"/>

        <Switch isChecked={true}/>

        <p className="search__switch-name search__box">
          Короткометражки
        </p>
      </fieldset>
    </form>
  </div>
);

export default SearchForm;
