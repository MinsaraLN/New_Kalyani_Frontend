import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock } from "lucide-react";
import { Link } from "react-router-dom";
import axios from 'axios'

const UserLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail]=useState("");
  const [passwordHash, setPasswordHash]=useState("");

// UserLogin component handles login functionality for users
  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      const response =await axios.post("http://localhost:8086/auth/login", {
        email,
        passwordHash
      });
      alert("login successfull");
      console.log(response.data);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('token', response.data.token);
      console.log(localStorage.getItem('userId'));
      console.log(localStorage.getItem('token'));
      navigate("/adminPage");
    }catch(err){
      console.error(err)
      alert("Login failed");
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <Lock className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-4xl text-foreground mb-2">Login</h1>
          <p className="text-muted-foreground">New Kalyani Jewellers</p>
        </div>

        <div className="bg-card p-8 rounded-lg card-shadow">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="person@example.com"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={passwordHash}
                onChange={(e) => setPasswordHash(e.target.value)}
                placeholder="Enter your password"
              />
            </div>

            <Button type="submit" size="lg" className="w-full">
              Sign In
            </Button>
          </form>

          <div className="mt-6 flex justify-between">
            <Link
              to="/user/register"
              className="text-sm text-muted-foreground hover:text-primary transition-smooth"
            >
              Signup
            </Link>

            <Link
              to="/user/forget-password"
              className="text-sm text-muted-foreground hover:text-primary transition-smooth"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
              ← Back to website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;