import { Link, Outlet, useLocation } from "react-router";
import { Box, Card, CardContent, Typography } from "@mui/material";

const AuthPage = () => {
  const location = useLocation();
  const isSignIn = location.pathname.endsWith("/signin");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      {/* Page Title */}
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", mb: 1, color: "primary.main" }}
      >
        Welcome to LMS
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
        {isSignIn
          ? "Sign in to access your account"
          : "Create a new account to get started"}
      </Typography>

      {/* Auth Card */}
      <Card sx={{ maxWidth: 420, width: "100%", boxShadow: 4, borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Outlet />
        </CardContent>
      </Card>

      {/* Switch Links */}
      <Typography
        variant="body2"
        sx={{ mt: 3, textAlign: "center", color: "text.secondary" }}
      >
        {isSignIn ? (
          <>
            No account?{" "}
            <Link to="/signup" style={{ textDecoration: "none", color: "#1976d2" }}>
              Sign Up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link to="/signin" style={{ textDecoration: "none", color: "#1976d2" }}>
              Sign In
            </Link>
          </>
        )}
      </Typography>

      {/* Back to Home */}
      <Typography variant="body2" sx={{ mt: 2 }}>
        <Link to="/" style={{ textDecoration: "none", color: "text.secondary" }}>
          ← Back to Home
        </Link>
      </Typography>
    </Box>
  );
};

export default AuthPage;
