import React from 'react';
import Header from '../../components/shared/Header';
import Footer from '../../components/shared/Footer';
import Main from './components/Main';
import { useEffect } from 'react';

const Home = () => {
  return (
    <>
      <Header />
      <Main />
      <Footer /> 
    </>
  );
};

export default Home;
