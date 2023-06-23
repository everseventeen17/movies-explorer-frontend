import { Link } from 'react-router-dom';
import { useFormValidationHook } from "../../utils/useFormValidationHook";
import './Register.css'
import logo from "../../images/logo.svg";

function Register() {
  const { values, errors, isValid, handleChange } = useFormValidationHook();
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <main>
      <section className="registration">

        <Link to="/" className="registration__logo ">
          <img className="registration__logo-img" src={logo} alt="Логотип"></img>
        </Link>

        <h2 className='registration__title'>Добро пожаловать!</h2>

        <form className='registration__form'>

          <label className="registration__input-wrapper">Имя
          <input name="name" type="text" className={`registration__input ${errors.name ? "registration__input_type_error" : " "}`}  minLength="3" maxLength="30" required onChange={handleChange} value={values.name || ''} />
          {/*<span id="registration__text-error" className={`registration__text-error ${errors.name ? "registration__text-error_visible" : ""}`}>{errors.name}</span>*/}
          </label>

          <label className="registration__input-wrapper">E-mail
          <input name="email" type="email" className={`registration__input ${errors.email ? "registration__input_type_error" : " "}`} minLength="3" maxLength="30" required onChange={handleChange} value={values.email || ''} />
          {/*<span id="registration__text-error" className={`registration__text-error ${errors.email ? "registration__text-error_visible" : ""}`}>{errors.email}</span>*/}
          </label>

          <label className="registration__input-wrapper">Пароль
          <input name="password" type="password" className={`registration__input ${errors.password ? "registration__input_type_error" : " "}`} minLength="3" maxLength="30" required onChange={handleChange} value={values.password || ''} />
          {/*<span id="registration__text-error" className={`registration__text-error ${errors.password ? "registration__text-error_visible" : ""}`}>{errors.password}</span>*/}
          </label>

          <p className={`registration__api-error ${isValid ? 'registration__api-error_active' : ""}`}>Что-то пошло не так...</p>

          <button type="submit" className={`registration__button ${!isValid ? 'registration__button_disabled' : ""}`} disabled={!isValid} onClick={handleSubmit} >Зарегистрироваться</button>
          <p className='registration__text'>Уже зарегистрированы? <Link className='registration__link' to='/signin'>Войти</Link></p>
        </form>

      </section>
      </main>
  )
}

export default Register;
