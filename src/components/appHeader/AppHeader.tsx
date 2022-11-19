import { FC } from 'react';

import { Link, NavLink } from 'react-router-dom';

import './appHeader.scss';

import { RoutesEnum } from '../../enum';

export const AppHeader: FC = () => (
  <header className="app__header">
    <h1 className="app__title">
      <Link to={RoutesEnum.MAIN_PAGE} className="title__button">
        <span>Marvel</span> information portal
      </Link>
    </h1>
    <nav className="app__menu">
      <ul>
        <li className="block__button">
          <NavLink
            end
            style={({ isActive }) => ({ color: isActive ? '#9f0013' : 'inherit' })}
            to={RoutesEnum.MAIN_PAGE}
          >
            Characters
          </NavLink>
        </li>
        <li className="block__button">
          <NavLink
            style={({ isActive }) => ({ color: isActive ? '#9f0013' : 'inherit' })}
            to={RoutesEnum.COMICS}
          >
            Comics
          </NavLink>
        </li>
      </ul>
    </nav>
  </header>
);
