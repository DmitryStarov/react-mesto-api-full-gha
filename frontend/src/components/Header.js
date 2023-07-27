import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import logo from "../image/logo.svg";

export default function Header({ emailUser, onSignOut }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  function handleOpenMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className={`header ${isMenuOpen && "header_menu-opened"}`}>
      <img src={logo} alt="логотип" className="header__logo" />
      <Routes>
        <Route
          path="/sign-in"
          element={
            <Link className="header__link" to="/sign-up">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link className="header__link" to="/sign-in">
              Войти
            </Link>
          }
        />
        <Route
          path="/"
          element={
            <>
              <div className="header__user-info">
                <p className="header__email">{emailUser}</p>
                <button
                  className="header__signout-button"
                  type="button"
                  onClick={onSignOut}
                >
                  Выйти
                </button>
              </div>
              <button
                className="header__burger-menu"
                type="button"
                onClick={handleOpenMenu}
              >
                <span
                  className={`header__burger-line ${
                    isMenuOpen && "header__burger-line_active"
                  }`}
                ></span>

                <span
                  className={`header__burger-line ${
                    isMenuOpen && "header__burger-line_active"
                  }`}
                ></span>
                <span
                  className={`header__burger-line ${
                    isMenuOpen && "header__burger-line_active"
                  }`}
                ></span>
              </button>
            </>
          }
        />
      </Routes>
    </header>
  );
}
