import { useEffect, useState } from "react";
import "./Profile.css";
import {useFormValidationHook} from "../../utils/useFormValidationHook";
import Header from "../Header/Header";

function Profile({ user,onBurgerClick }) {
  const [isEditingBegun, setIsEditingBegun] = useState(false);
  const { values, errors, isValid, handleChange, resetForm } = useFormValidationHook();
  function handleEditClick() {
    setIsEditingBegun(true);
  }
  function handleSubmit(e) {
    e.preventDefault();
  }
  useEffect(() => {
    resetForm(true, user);
  }, [resetForm, user]);

  return (
    <main>
      <Header onBurgerClick={onBurgerClick} />
      <section className="profile">
        <h1 className="profile__title">Привет, {user.name}!</h1>
        <form className='profile__form'>

          <label className="profile__input-wrapper">
            Имя
            <input type="text" name="name" className={`profile__input ${errors.name ? "form__input_type_error" : ""}`}  required minLength="2" maxLength="30" disabled={isEditingBegun ? false : true} onChange={handleChange} value={values.name || ""}/>
          </label>

          <label className="profile__input-wrapper">
            E-mail
            <input type="email" name="email" className={`profile__input ${errors.email ? "form__input_type_error" : ""}`} required disabled={isEditingBegun ? false : true} onChange={handleChange} value={values.email || ""}/>
          </label>
          <p className={`registration__api-error ${isEditingBegun ? 'registration__api-error_active' : ""}`}>Что-то пошло не так...</p>

          <button type="submit" className={`profile__button ${!isEditingBegun ? "profile__button_hidden" : ""}  `} onClick={handleSubmit} disabled={isValid ? false : true}>Сохранить</button>

        <div className={`profile__actions-wrapper ${isEditingBegun ? "profile__actions-wrapper_hidden" : ""}`}>
          <button className="profile__btn-action profile__btn-action_type_edit-profile " type="button" onClick={handleEditClick}>Редактировать</button>
          <button className="profile__btn-action profile__btn-action_type_exit " type="button">Выйти из аккаунта</button>
        </div>

        </form>
      </section>
    </main>


  );
}

export default Profile;
