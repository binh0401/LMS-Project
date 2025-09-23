import React from "react";
import { Box, Card, CardContent, Typography, Button, Stack } from "@mui/material";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const { authState, logout } = useAuth();

  const user = authState?.user;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
        p: 3,
      }}
    >
      <Card
        sx={{
          maxWidth: 500,
          width: "100%",
          boxShadow: 6,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}>
            Dashboard
          </Typography>

          {user ? (
            <>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Welcome, {user.name} 👋
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
                Role: {user.role} <br />
                Email: {user.email}
              </Typography>
            </>
          ) : (
            <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
              Loading user info...
            </Typography>
          )}

          <Stack direction="row" justifyContent="center" spacing={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={logout}
              sx={{ borderRadius: 2, px: 3 }}
            >
              Logout
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;
