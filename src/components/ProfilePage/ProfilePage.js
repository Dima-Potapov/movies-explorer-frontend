import React from 'react';
import Profile from '../Profile/Profile';
import NavHeader from "../NavHeader/NavHeader";

function ProfilePage() {
  return (
    <React.Fragment>
      <NavHeader />
      <Profile/>
    </React.Fragment>
  );
}

export default ProfilePage;
