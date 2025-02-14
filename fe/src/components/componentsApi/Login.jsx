import { useState, useContext, useEffect } from "react";
import { Input, Button, Box, Flex, Text } from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { toaster } from "@/components/ui/toaster";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  // Check login
  const { isLogged, setIsLogged, setUser } = useContext(AuthContext);
  // Check theme
  const { lightMode } = useContext(ThemeContext);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    if (username && password) {
      try {
        const response = await fetch("https://appapi.pythonanywhere.com/login_user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
        const result = await response.json();
        
        if (result.success) {
          setIsLogged(true);
          setUser(username);
          localStorage.setItem("isLogged", "true");
          localStorage.setItem("username", username);

          toaster.success({
            title: "Login Successful",
            description: "Welcome! You have full access to the tools and commands!",
            duration: 2000,
          });
        } else {
          toaster.error({
            title: "Login Failed",
            description: "The credentials are wrong. Please try again",
            duration: 2000,
          });
        }
      } catch (err) {
        toaster.error({
          title: "Error",
          description: "An error occurred. Please try again.",
          duration: 2000,
        });
      } finally {
        setLoading(false);
      }
    } else {
      toaster.error({
        title: "Error",
        description: "Please insert credentials.",
        duration: 2000,
      });
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    if (registerUsername && registerPassword) {
      try {
        const response = await fetch("https://appapi.pythonanywhere.com/register_user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ registerUsername, registerPassword }),
        });
        const result = await response.json();
        
        if (result.success) {
          setIsLogged(true);
          setUser(registerUsername);
          localStorage.setItem("isLogged", "true");
          localStorage.setItem("username", registerUsername);

          toaster.success({
            title: "Register Successful",
            description: "Welcome! You are now registered!",
            duration: 2000,
          });
        } else {
          toaster.error({
            title: "Register failed",
            description: "Username already exists. Please try again",
            duration: 2000,
          });
        }
      } catch (err) {
        toaster.error({
          title: "Error",
          description: "An error occurred. Please try again.",
          duration: 2000,
        });
      } finally {
        setLoading(false);
      }
    } else {
      toaster.error({
        title: "Error",
        description: "Please insert credentials.",
        duration: 2000,
      });
      setLoading(false);
    }
  };

  return (
    <Flex justify="flex-end" className={lightMode ? "textforlight" : "textfordark"}>
      {isLogged ? (
        <Text>User Logged: {username}</Text>
      ) : (
        <Flex>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin} disabled={loading}>
            <Text>{loading ? "Loading..." : "Login"}</Text>
          </Button>

          {/* Register button that opens dialog with form */}
          <DialogRoot size="md" motionPreset="slide-in-bottom">
            <DialogTrigger asChild>
              <Button>
                Register
              </Button>
            </DialogTrigger>
            <DialogContent className="textblacklightredbg">
              <DialogHeader>
                <Flex justify="center">
                  <DialogTitle>
                    <Text textStyle="2xl" fontWeight="italic" className="fast_changecolor_red">REGISTER</Text>
                  </DialogTitle>
                  <DialogCloseTrigger />
                </Flex>
              </DialogHeader>
              <DialogBody>
                <Flex justify="center">
                  <Input
                    bg="white"
                    type="text"
                    placeholder="Create username"
                    value={registerUsername}
                    onChange={(e) => setRegisterUsername(e.target.value)}
                  />
                  <Input
                    bg="white"
                    type="password"
                    placeholder="Create password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                  />
                </Flex>
                <br />
                <Flex justify="center">
                  <Button onClick={handleRegister} disabled={loading}>
                    <Text>{loading ? "Loading..." : "Register"}</Text>
                  </Button>
                </Flex>
              </DialogBody>
            </DialogContent>
          </DialogRoot>
        </Flex>
      )}
    </Flex>
  );
}
