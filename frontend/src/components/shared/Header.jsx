
import {Link, useNavigate} from "react-router"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { BookOpenText, LogOut } from "lucide-react"
import useAuth from "../../hooks/useAuth"

export default function Header() {
  const navigate = useNavigate()
  const {authState} = useAuth()
  return (
    <div>
      <header
        className="fixed top-0 z-50 flex h-14 w-full items-center gap-3 bg-background/5 px-3 backdrop-blur-md supports-[backdrop-filter]:bg-background/5 md:h-16 md:px-4"
      >
        <Link to="/" className="flex items-center gap-2">
          <BookOpenText className="h-5 w-5 md:h-6 md:w-6" />
          
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Lồn lồn gì đấy
        </h3>



        </Link>

        <div className="ml-auto flex items-center gap-2 md:gap-3">
          {authState.isAuthenticated ? (
            <>
              <span className="hidden text-sm text-muted-foreground md:inline">Welcome, {authState.user?.name}</span>
              <Button asChild variant="outline">
                <Link to="/dashboard">
                  Dashboard
                </Link>
              </Button>
              <Button asChild>
                <Link to="/logout">
                <LogOut className="mr-2 size-4" />
                Logout
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button  className="justify-self-end" asChild>
                <Link to="/signin">
                  Get Started 
                </Link>
              </Button>
            </>
          )}
          <ThemeToggle />
        </div>
      </header>
    </div>
  )
}
