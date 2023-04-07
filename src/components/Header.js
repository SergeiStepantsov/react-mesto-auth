import logo from "../images/header-logo.svg";
import { Link } from "react-router-dom";

function Header({ email, loggedIn, onLogout, registerPage, loginPage }) {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Лого" />
      {loggedIn && (
        <div className="header__conteiner">
          <p className="header__email">{email}</p>
          <button className="header__button" onClick={onLogout}>
            Выйти
          </button>
        </div>
      )}
      {registerPage && (
        <Link
          to="/sign-in"
          className="header__button header__button_type_register"
        >
          Войти
        </Link>
      )}
      {loginPage && (
        <Link
          to="/sign-un"
          className="header__button header__button_type_register"
        >
          Регистрация
        </Link>
      )}
    </header>
  );
}

export default Header;
