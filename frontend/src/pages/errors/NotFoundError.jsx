import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Stack,
  Divider,
  Alert,
  AlertTitle,
  Chip,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Collapse
} from '@mui/material';
import {
  ErrorOutline,
  Home,
  Refresh,
  ArrowBack,
  BugReport,
  Wifi,
  Security,
  Search,
  ExpandMore,
  ExpandLess,
  ContentCopy
} from '@mui/icons-material';

// 404 Not Found Error Page
const NotFoundError = () => {
  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        textAlign="center"
        py={4}
      >
        <Paper elevation={3} sx={{ p: 6, borderRadius: 3 }}>
          <Box mb={3}>
            <Typography
              variant="h1"
              color="primary"
              sx={{
                fontSize: { xs: '4rem', sm: '6rem', md: '8rem' },
                fontWeight: 'bold',
                lineHeight: 1,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              404
            </Typography>
          </Box>
          
          <Box mb={3}>
            <Search sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h4" gutterBottom color="text.primary">
              Page Not Found
            </Typography>
            <Typography variant="body1" color="text.secondary" maxWidth={500}>
              Sorry, we couldn't find the page you're looking for. The page might have been removed,
              renamed, or temporarily unavailable.
            </Typography>
          </Box>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              startIcon={<Home />}
              onClick={() => window.location.href = '/'}
              sx={{ px: 4 }}
            >
              Go Home
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<ArrowBack />}
              onClick={() => window.history.back()}
              sx={{ px: 4 }}
            >
              Go Back
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
};


export default NotFoundError;