import "./Profile.css";
import Header from "../Header/Header";
import { useEffect, useState, useContext } from "react";
import useFormWithValidation from "../../utils/useFormWithValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
function  Profile({onUpdateUser, onLogout, onLoading, isServerResponseErrorText, setIsServerResponseErrorText, onBurgerClick, loggedIn}) {

  const currentUser = useContext(CurrentUserContext);
  const [isEditingBegun, setEditingStatus] = useState(false);
  const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation();


  useEffect(() => {
    resetForm(false, currentUser);
  }, [resetForm, currentUser]);

  useEffect(() => {
    setIsServerResponseErrorText("");
  }, [setIsServerResponseErrorText]);

  function handleEditClick() {
    setEditingStatus(!isEditingBegun);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values);
    setEditingStatus(!isEditingBegun);
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

          <label className="profile__input-wrapper">
            E-mail
            <input type="email" name="email" className={`profile__input ${errors.email ? "form__input_type_error" : ""}`} required disabled={isEditingBegun ? false : true} onChange={handleChange} value={values.email || ""}/>
          </label>
          <p className={`registration__api-error ${isValid ? 'registration__api-error_active' : ""}`}>{isServerResponseErrorText}</p>

          <button type="submit" className={`profile__button ${!isEditingBegun ? "profile__button_hidden" : ""}  `} onClick={handleSubmit} disabled={isValid ? false : true}>{onLoading ? "Сохранение..." : "Сохранить"}</button>

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
