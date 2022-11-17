import {Link, NavLink} from 'react-router-dom';
import './appHeader.scss';
import {FC} from "react";

const AppHeader: FC = () => (
  <header className="app__header">
    <h1 className="app__title">
      <Link to="/">
        <span>Marvel</span> information portal
      </Link>
    </h1>
    <nav className="app__menu">
      <ul>
        <li>
          <NavLink
            end
            style={({isActive}) => ({'color': isActive ? '#9f0013' : 'inherit'})}
            to="/">
            Characters
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({isActive}) => ({'color': isActive ? '#9f0013' : 'inherit'})}
            to="/comics">
            Comics
          </NavLink>
        </li>
        {/* без end - нестрогое сравнение, чтобы заголовок Comics подсвечивался и при просмотре любого отдельного комикса */}
      </ul>
    </nav>
  </header>
)


export default AppHeader;
