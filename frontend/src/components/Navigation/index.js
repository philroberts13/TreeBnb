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
      <>
      <ProfileButton user={sessionUser} />
      <button><NavLink style={{textDecoration: 'none'}} to={'/places/form'}>Create Listing</NavLink></button>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <button><NavLink style={{textDecoration: 'none'}} to="/signup">Sign Up</NavLink></button>
      </>
    );
  }

  return (
    <ul>
      <li className='rightSide'>
        <button><NavLink style={{textDecoration: 'none'}} exact to="/">Home</NavLink></button>
        {isLoaded && sessionLinks}
        <button><NavLink style={{textDecoration: 'none'}} to='/places'>Tree Houses</NavLink></button>
      </li>
    </ul>
  );
}

export default Navigation;
