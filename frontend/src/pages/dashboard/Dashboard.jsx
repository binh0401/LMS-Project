import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useAuth from "../../hooks/useAuth";
import { LogOut, LayoutDashboard, BookOpen, NotebookPen, Settings, User } from "lucide-react";

function Sparkline() {
  const points = [5, 20, 12, 28, 18, 30, 15, 26, 22, 32, 20, 27, 24, 34, 25];
  const width = 1000;
  const height = 260;
  const padding = 8;
  const step = (width - padding * 2) / (points.length - 1);
  const maxY = Math.max(...points) + 5;
  const minY = Math.min(...points) - 5;
  const scaleY = (v) => {
    return height - padding - ((v - minY) / (maxY - minY)) * (height - padding * 2);
  };
  const d = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${padding + i * step},${scaleY(p)}`)
    .join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-64 w-full">
      <defs>
        <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.35" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={d} fill="none" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" />
      <path d={`${d} L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`} fill="url(#grad)" />
    </svg>
  );
}

const Dashboard = () => {
  const { authState, logout } = useAuth();
  const user = authState?.user;

  return (
    <div className="bg-background text-foreground grid min-h-svh grid-cols-[72px_1fr]">
      {/* Sidebar */}
      <aside className="border-border sticky top-0 hidden h-svh flex-col items-center gap-4 border-r p-3 md:flex">
        <div className="mt-1 rounded-md bg-primary p-2 text-primary-foreground">
          <LayoutDashboard className="size-5" />
        </div>
        <nav className="flex flex-col gap-3 pt-2">
          <Button variant="outline" className="h-10 w-12 justify-center p-0" title="Overall">
            <LayoutDashboard className="size-4" />
          </Button>
          <Button variant="outline" className="h-10 w-12 justify-center p-0" title="Class">
            <BookOpen className="size-4" />
          </Button>
          <Button variant="outline" className="h-10 w-12 justify-center p-0" title="Homework">
            <NotebookPen className="size-4" />
          </Button>
        </nav>
        <div className="mt-auto flex flex-col items-center gap-3">
          <Button variant="ghost" size="icon" className="size-10">
            <User className="size-5" />
          </Button>
          <Button variant="ghost" size="icon" className="size-10">
            <Settings className="size-5" />
          </Button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex flex-col gap-6 p-4 md:p-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold tracking-tight md:text-2xl">{user ? `Welcome, ${user.name}` : "Student Dashboard"}</h1>
          <div className="ml-auto flex items-center gap-3">
            <div className="w-[320px] max-w-xs">
              <Input placeholder="Search..." className="w-full" />
            </div>
            <Button variant="outline" onClick={logout}>
              <LogOut className="mr-2 size-4" /> Logout
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_420px]">
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Sparkline />
            </CardContent>
          </Card>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Class</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-muted-foreground text-sm">No class scheduled today.</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Homework</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm">
                  <li className="flex items-center justify-between py-2">
                    <span>Math worksheet</span>
                    <span className="text-muted-foreground">Due Fri</span>
                  </li>
                  <li className="flex items-center justify-between border-t py-2">
                    <span>History reading</span>
                    <span className="text-muted-foreground">Due Mon</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom wide panel */}
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground text-sm">Write your study notes here...</div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
