import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { Navigate } from 'react-router';

const Home = () => {
  const navigate = useNavigate()
  const { authState } = useAuth()
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 4,
        py: 2,
        bgcolor: 'background.paper',
        boxShadow: 2,
      }}
    >
      {/* Logo / Title */}
      <Typography
        variant="h6"
        sx={{ fontWeight: 'bold', color: 'primary.main', letterSpacing: 1 }}
      >
        LMS
      </Typography>

      {/* Actions */}
      {!authState.isAuthenticated ? (
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="outlined"
          color="primary"
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            px: 3,
            '&:hover': { bgcolor: 'primary.light', color: 'white' },
          }}
          onClick={() => navigate('/signin')}
        >
          Sign In
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            px: 3,
            boxShadow: 3,
          }}
          onClick={() => navigate('/signup')}
        >
          Get Started
        </Button>
      </Box>
      ) : (
        <Navigate to="/dashboard" />
      )}

    </Box>
  );
};

export default Home;
