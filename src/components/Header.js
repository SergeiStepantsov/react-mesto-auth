import logo from "../images/header-logo.svg";
import { Link, Route, Routes } from "react-router-dom";

function Header({ email, onLogout }) {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Лого" />
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="header__conteiner">
                  <p className="header__email">{email}</p>
                  <Link
                    to="/sign-in"
                    className="header__button"
                    onClick={onLogout}
                  >
                    Выйти
                  </Link>
                </div>
              </>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Link
                to="/sign-in"
                className="header__button header__button_type_register"
              >
                Войти
              </Link>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Link
                to="/sign-up"
                className="header__button header__button_type_register"
              >
                Регистрация
              </Link>
            }
          />
        </Routes>
      </div>
    </header>
  );
}

export default Header;
