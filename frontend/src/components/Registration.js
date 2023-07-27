import { Link } from "react-router-dom";
import useValidator from "../hooks/useValidator";

export default function Registration({ onRegistration }) {
  const { inputValues, errors, handleChange, isValid } = useValidator();

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegistration(inputValues);
  }
  return (
    <section className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form name="register" className="form auth__form" onSubmit={handleSubmit}>
        <fieldset className="auth__fieldset">
          <label className="auth__field">
            <input
              type="email"
              name="email"
              id="email-input"
              placeholder="Email"
              className="auth__input auth__input_type_email"
              minLength="6"
              maxLength="40"
              autoComplete="off"
              value={inputValues.email || ""}
              onChange={handleChange}
              required
            />
            <span className="auth__error-message">{errors.email}</span>
          </label>
          <label className="auth__field">
            <input
              type="password"
              name="password"
              id="password-input"
              placeholder="Пароль"
              className="auth__input auth__input_type_password"
              minLength="6"
              maxLength="40"
              autoComplete="off"
              value={inputValues.password || ""}
              onChange={handleChange}
              required
            />
            <span className="auth__error-message">{errors.password}</span>
          </label>
          <button
            type="submit"
            className={`auth__button-submit ${
              !isValid && "auth__button-submit_disable"
            }`}
            disabled={!isValid}
          >
            Зарегистрироваться
          </button>
        </fieldset>
      </form>
      <p className="auth__paragraph">
        Уже зарегистрированы?{" "}
        <Link className="auth__link" to="/sign-in">
          Войти
        </Link>
      </p>
    </section>
  );
}
