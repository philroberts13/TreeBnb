import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <button><NavLink to="/signup">Sign Up</NavLink></button>
      </>
    );
  }

  return (
    <ul>
      <li className='bar'>
        <button><NavLink exact to="/">Home</NavLink></button>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
