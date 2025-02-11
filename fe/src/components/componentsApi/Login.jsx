import { useState, useContext, useEffect } from "react";
import { Input, Button, Box, Flex, Text } from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { toaster } from "@/components/ui/toaster";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
        </Flex>
      )}
    </Flex>
  );
}
