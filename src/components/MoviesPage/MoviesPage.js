import React from 'react';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import NavHeader from "../NavHeader/NavHeader";

function MoviesPage() {
  return (
    <React.Fragment>
      <NavHeader />
      <Movies/>
      <Footer/>
    </React.Fragment>
  );
}

export default MoviesPage;
