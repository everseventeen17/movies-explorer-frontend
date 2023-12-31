import { Link } from 'react-router-dom';
import { useFormValidationHook } from "../../utils/useFormValidationHook";
import './Login.css'
import logo from "../../images/logo.svg";

function Register() {
  const { values, errors, isValid, handleChange } = useFormValidationHook();
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <main>
      <section className="auth">

        <Link to="/" className="auth__logo ">
          <img className="auth__logo-img" src={logo} alt={'Логотип'}></img>
        </Link>

        <h2 className='auth__title'>Рады видеть!</h2>

        <form className='auth__form'>

          <label className="auth__input-wrapper">E-mail
            <input name="email" type="email" className={`auth__input ${errors.email ? "auth__input_type_error" : ""}`} minLength="2" maxLength="30" required onChange={handleChange} value={values.email || ''} />
            {/*<span id="auth__text-error" className={`auth__text-error ${errors.email ? "auth__text-error_visible" : ""}`}>{errors.email}</span>*/}
          </label>

          <label className="auth__input-wrapper">Пароль
            <input name="password" type="password" className={`auth__input ${errors.password ? "auth__input_type_error" : ""}`} minLength="2" maxLength="30" required onChange={handleChange} value={values.password || ''} />
            {/*<span id="auth__text-error" className={`auth__text-error ${errors.password ? "auth__text-error_visible" : ""}`}>{errors.password}</span>*/}
          </label>

          <p className={`registration__api-error ${isValid ? 'registration__api-error_active' : ""}`}>Что-то пошло не так...</p>

          <button type="submit" className={`auth__button ${!isValid ? 'auth__button_disabled' : ""}`} disabled={!isValid} onClick={handleSubmit} >Войти</button>
          <p className='auth__text'>Ещё не зарегистрированы? <Link className='auth__link' to='/signup'>Регистрация</Link></p>
        </form>

      </section>
    </main>


  )
}

export default Register;
