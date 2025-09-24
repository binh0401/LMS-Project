/**
 * v0 by Vercel.
 * @see https://v0.app/t/oGjjsW0EMNl
 * Documentation: https://v0.app/docs#integrating-generated-code-into-your-nextjs-app
 */
import {Link, useNavigate} from "react-router"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export default function Header() {
  const navigate = useNavigate()
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
        <Link to="/" className="mr-6 hidden lg:flex">
          <ShirtIcon className="h-6 w-6" />
          <span className="sr-only">LMS</span>
        </Link>
        <div className="ml-auto flex gap-2">
          <ThemeToggle />
          <Button variant="outline" className="justify-self-end" onClick={() => navigate("/signin")}>
            Sign in
          </Button>
          <Button className="justify-self-end" onClick={() => navigate("/signup")}>Sign Up</Button>
        </div>
      </header>
    </div>
  )
}

function ShirtIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
    </svg>
  )
}