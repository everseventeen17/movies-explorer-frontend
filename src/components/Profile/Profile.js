import "./Profile.css";
import Header from "../Header/Header";
import { useEffect, useState, useContext } from "react";
import useFormWithValidation from "../../utils/useFormWithValidation";
import {IS_EMAIL} from "../../utils/constants";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
function  Profile({onUpdateUser, isEditingBegun, setEditingStatus, onLogout, onLoading, isServerResponseErrorText, setIsServerResponseErrorText, onBurgerClick, loggedIn, isSuccess, onSuccess}) {

  const currentUser = useContext(CurrentUserContext);
  const [isCurrentUser, setIsCurrentUser] = useState(true);
  const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation();

  useEffect(() => {
    currentUser.name !== values.name || currentUser.email !== values.email ? setIsCurrentUser(false) : setIsCurrentUser(true);
  }, [currentUser, values]);

  useEffect(() => {
    resetForm(false, currentUser);
  }, [resetForm, currentUser]);

  useEffect(() => {
    setIsServerResponseErrorText("");
    onSuccess("")
  }, [setIsServerResponseErrorText, onSuccess]);

  function handleEditClick() {
    setEditingStatus(!isEditingBegun);
    onSuccess("")
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(isValid && !onLoading && !isCurrentUser) {
      onUpdateUser(values);
    }
  }

  return (
<main>
      <Header onBurgerClick={onBurgerClick} loggedIn={loggedIn} />
      <section className="profile">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <form className='profile__form'>

          <label className="profile__input-wrapper">
            Имя
            <input type="text" name="name" className={`profile__input ${errors.name ? "form__input_type_error" : ""}`}  required minLength="2" maxLength="30" disabled={isEditingBegun ? false : true} onChange={handleChange} value={values.name || ""}/>
          </label>
          <span id="profile__text-error" className={`profile__text-error ${errors.name ? "profile__text-error_visible" : ""}`}>{errors.name}</span>

          <label className="profile__input-wrapper">
            E-mail
            <input type="email" name="email" pattern={IS_EMAIL} className={`profile__input ${errors.email ? "form__input_type_error" : ""}`} required disabled={isEditingBegun ? false : true} onChange={handleChange} value={values.email || ""}/>
          </label>
          <span id="profile__text-error" className={`profile__text-error ${errors.email ? "profile__text-error_visible" : ""}`}>{errors.email}</span>
          <p className={`registration__api-error ${isValid ? 'registration__api-error_active' : ""}`}>{isServerResponseErrorText}</p>
          <p className="registration__api-success">{isSuccess}</p>
          <button type="submit" className={`profile__button ${!isEditingBegun ? "profile__button_hidden" : ""}  `} onClick={handleSubmit} disabled={isValid && !isCurrentUser ? false : true}>{onLoading ? "Сохранение..." : "Сохранить"}</button>

        <div className={`profile__actions-wrapper ${isEditingBegun ? "profile__actions-wrapper_hidden" : ""}`}>
          <button className="profile__btn-action profile__btn-action_type_edit-profile " type="button" onClick={handleEditClick}>Редактировать</button>
          <button className="profile__btn-action profile__btn-action_type_exit " type="button" onClick={onLogout} >Выйти из аккаунта</button>
        </div>

        </form>
      </section>
</main>


  );
}

export default Profile;
