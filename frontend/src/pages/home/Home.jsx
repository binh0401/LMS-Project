import React from 'react';
import useAuth from '../../hooks/useAuth';
import { Navigate } from 'react-router';
import Header from '../../components/shared/Header';
import Footer from '../../components/shared/Footer';

const Home = () => {
  return (
    <>
      <Header />
      <Footer /> 
    </>
  );
};

export default Home;
