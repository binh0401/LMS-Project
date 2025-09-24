import { Link, Navigate, Outlet, useLocation } from "react-router";

import useAuth from "../../hooks/useAuth";
import { GalleryVerticalEnd } from "lucide-react"
import { ThemeToggle } from "../../components/ui/theme-toggle"

const AuthPage = () => {
  const { authState } = useAuth();

  // ✅ Early return if user is already authenticated
  if (authState.isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
     <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 relative">
      {/* Theme Toggle in top-right corner */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link to="/" className="flex items-center gap-2 self-center text-2xl font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Vãi lồn LMS
        </Link>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthPage;
