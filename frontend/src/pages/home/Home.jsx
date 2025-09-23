import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

const Home = () => {
  const navigate = useNavigate()
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
    </Box>
  );
};

export default Home;
