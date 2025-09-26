import React from "react";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { Link } from "react-router";
import GoogleCustomSignUpButton from "../../components/GoogleCustomSignUpButton";

const SignUpForm = ({ 
  className,
  ...props
}) => {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      name: "",
      dob: "",
      gender: "",
      role: "",
      email: "",
      password: "",
    },
  });

  const { signup, authState } = useAuth();

  const onSubmit = async (data) => {
    try {
      await signup(data);
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create an Account</CardTitle>
          <CardDescription>
            Join our platform and get started in minutes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              {/* Social Login Buttons */}
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="currentColor"
                    />
                  </svg>
                  Sign up with Apple
                </Button>
                <GoogleCustomSignUpButton />
              </div>
              
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>

              <div className="grid gap-6">
                {/* Name Field */}
                <div className="grid gap-3">
                  <Label htmlFor="name">Full Name</Label>
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: "Name is required" }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        className={errors.name ? "border-red-500" : ""}
                      />
                    )}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                {/* Date of Birth Field */}
                <div className="grid gap-3">
                  <Label htmlFor="dob" className="px-1">Date of Birth</Label>
                  <Controller
                    name="dob"
                    control={control}
                    rules={{ required: "Date of Birth is required" }}
                    render={({ field }) => (
                      <DatePicker
                        date={field.value ? new Date(field.value) : undefined}
                        setDate={(date) => field.onChange(date ? date.toISOString().split('T')[0] : '')}
                        placeholder="Select your date of birth"
                        className={errors.dob ? "border-red-500" : ""}
                      />
                    )}
                  />
                  {errors.dob && (
                    <p className="text-sm text-red-500">{errors.dob.message}</p>
                  )}
                </div>

                {/* Gender Field */}
                <div className="grid gap-3">
                  <Label htmlFor="gender">Gender</Label>
                  <Controller
                    name="gender"
                    control={control}
                    rules={{ required: "Gender is required" }}
                    render={({ field }) => (
                      <select
                        {...field}
                        id="gender"
                        className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.gender ? "border-red-500" : ""}`}
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    )}
                  />
                  {errors.gender && (
                    <p className="text-sm text-red-500">{errors.gender.message}</p>
                  )}
                </div>

                {/* Role Field */}
                <div className="grid gap-3">
                  <Label htmlFor="role">Role</Label>
                  <Controller
                    name="role"
                    control={control}
                    rules={{ required: "Role is required" }}
                    render={({ field }) => (
                      <select
                        {...field}
                        id="role"
                        className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.role ? "border-red-500" : ""}`}
                      >
                        <option value="">Select role</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    )}
                  />
                  {errors.role && (
                    <p className="text-sm text-red-500">{errors.role.message}</p>
                  )}
                </div>

                {/* Email Field */}
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email format",
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        className={errors.email ? "border-red-500" : ""}
                      />
                    )}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="password"
                        type="password"
                        className={errors.password ? "border-red-500" : ""}
                      />
                    )}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </Button>

                {/* Authentication Error Display */}
                {authState.error && (
                  <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
                    {authState.error}
                  </div>
                )}
              </div>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/signin" className="underline underline-offset-4">
                  Sign in
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default SignUpForm;
