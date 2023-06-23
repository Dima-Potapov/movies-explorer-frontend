import React from 'react';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';
import NavHeader from '../NavHeader/NavHeader';

const SavedMoviesPage = () => (
  <React.Fragment>
    <NavHeader />
    <SavedMovies/>
    <Footer/>
  </React.Fragment>
);

export default SavedMoviesPage;
