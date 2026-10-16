import React from 'react';
import Profile from '../Profile/Profile';
import NavHeader from '../NavHeader/NavHeader';

function ProfilePage({onLogout}) {
  return (
    <React.Fragment>
      <NavHeader />
      <Profile onLogout={onLogout}/>
    </React.Fragment>
  );
}

export default ProfilePage;
