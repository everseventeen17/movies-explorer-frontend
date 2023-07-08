import { Link } from 'react-router-dom';
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useFormWithValidation from "../../utils/useFormWithValidation";
import {IS_EMAIL} from "../../utils/constants";
import './Login.css'
import logo from "../../images/logo.svg";

function Login({onLogin, onLoading, isServerResponseErrorText, setIsServerResponseErrorText, loggedIn, onSubmit}) {
  const { values, errors, isValid, handleChange } = useFormWithValidation();
  useEffect(() => {
    setIsServerResponseErrorText("");
  }, [setIsServerResponseErrorText]);

  function handleSubmit(e) {
    e.preventDefault();
    if(isValid && !onLoading) {
      onLogin(values);
    }
  }

  return loggedIn ? (
    <Navigate to="/" replace />
  ) : (
    <main>
      <section className="auth">

        <Link to="/" className="auth__logo ">
          <img className="auth__logo-img" src={logo} alt={'Логотип'}></img>
        </Link>

        <h2 className='auth__title'>Рады видеть!</h2>

        <form className='auth__form' onSubmit={onSubmit}>

          <label className="auth__input-wrapper">E-mail
            <input name="email" pattern={IS_EMAIL} type="email" className={`auth__input ${errors.email ? "auth__input_type_error" : ""}`} minLength="2" maxLength="30" required onChange={handleChange} value={values.email || ''} />
            <span id="auth__text-error" className={`auth__text-error ${errors.email ? "auth__text-error_visible" : ""}`}>{errors.email}</span>
          </label>

          <label className="auth__input-wrapper">Пароль
            <input name="password" type="password" className={`auth__input ${errors.password ? "auth__input_type_error" : ""}`} minLength="2" maxLength="30" required onChange={handleChange} value={values.password || ''} />
            <span id="auth__text-error" className={`auth__text-error ${errors.password ? "auth__text-error_visible" : ""}`}>{errors.password}</span>
          </label>

          <p className={`registration__api-error ${isValid ? 'registration__api-error_active' : ""}`}>{isServerResponseErrorText}</p>

          <button type="submit" className="auth__button" disabled={!isValid} onClick={handleSubmit}>
            {onLoading ? "Вход..." : "Войти"}
          </button>
          <p className='auth__text'>Ещё не зарегистрированы? <Link className='auth__link' to='/signup'>Регистрация</Link></p>
        </form>

      </section>
    </main>
  )
}

export default Login;
