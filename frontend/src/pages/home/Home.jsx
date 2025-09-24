import React from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { Navigate } from 'react-router';
import Header from '../../components/shared/Header';
import Footer from '../../components/shared/Footer';

const Home = () => {
  const navigate = useNavigate()
  const { authState } = useAuth()
  return (
    <>
      <Header />
      <Footer />
    </>
  );
};

export default Home;
