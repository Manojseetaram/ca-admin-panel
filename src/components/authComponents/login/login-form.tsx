"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { handleLoginForm } from "@/lib/authApi/login/loginAdmin"
import { useRouter } from "next/navigation" 


export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {

  const router = useRouter() 

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
  
    try {
      const response = await handleLoginForm(email, password) 
      const token = response.data.token
      localStorage.setItem("authToken", token)



      if (response.status === "success") {
        router.push("/home") 

      } else {
        alert("Login Failed: " + response.message)
      }
  
    } catch (error) {
      console.error("Login failed:", error)
      alert("Login failed. Please try again.")
    }
  }
  
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleFormSubmit}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your <span className="text-primary">Account</span></h1>
        <p className="text-balance text-sm text-muted-foreground">
          Manage numbers, and secure success.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="Email" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgotpassword"
              className="ml-auto text-muted-foreground text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <Input id="password" name="password" type="password" required placeholder="Password"/>
        </div>
        <Button type="submit" className="w-full bg-primary hover:bg-blue-500 font-semibold text-lg">
          Login
        </Button>
      </div>
    </form>
  )
}
