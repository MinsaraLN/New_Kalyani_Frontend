import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { UserPlus } from "lucide-react";
import axios from 'axios'

// UserRegister component handles register functionality for users
const UserRegister = () => {
  const navigate = useNavigate();

  const [userFname, setUserFname] = useState("");
  const [userLname, setUserLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    e.preventDefault();
    try{
      const response =await axios.post("http://localhost:8086/auth/register", {
        firstName: userFname,
        lastName: userLname,
        email: email,
        password: password,
        roleId: role==="manager"?2:1
      });
      alert("login successfull");
      console.log(response.data);
      navigate("/user/login");
    }catch(err){
      console.error(err)
      alert("signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <UserPlus className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-4xl text-foreground mb-2">User Registration</h1>
          <p className="text-muted-foreground">Create your account</p>
        </div>

        <div className="bg-card p-8 rounded-lg card-shadow">
          <form onSubmit={handleSignUp} className="space-y-6">
            <div>
              <Label htmlFor="fname">First Name</Label>
              <Input
                id="fname"
                type="text"
                required
                value={userFname}
                onChange={(e) => setUserFname(e.target.value)}
                placeholder="First Name"
              />
            </div>

            <div>
              <Label htmlFor="lname">Last Name</Label>
              <Input
                id="lname"
                type="text"
                required
                value={userLname}
                onChange={(e) => setUserLname(e.target.value)}
                placeholder="Last Name"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
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
              <Label htmlFor="role">role</Label>
              <Input
                id="role"
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="role"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>

            <Button type="submit" size="lg" className="w-full">
              Register
            </Button>
          </form>

          <div className="mt-6 text-center">
            <a href="/user/login" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
              ← Back to login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
