import { useState, useContext } from "react";
import { Input, Button, Box, Flex, Text } from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { toaster } from "@/components/ui/toaster";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // Check login
  const { isLogged, setIsLogged } = useContext(AuthContext);
  // Check theme
  const { lightMode } = useContext(ThemeContext);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://appapi.pythonanywhere.com/login_password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });
      const result = await response.json();
      setIsLogged(result === true);
      {result === true ? (
        toaster.success({
          title: "Login Successful",
          description: "Welcome! You have full access to the tools and commands!",
          duration: 2000,
        })
      ) : (
        toaster.error({
          title: "Login Failed",
          description: "The credentials are wrong. Please try again",
          duration: 2000,
        })
      )}
    } catch (err) {
      toaster.error({
        title: "Error",
        description: "An error occurred. Please try again.",
        duration: 2000,
      })
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex justify="flex-end" className={lightMode ? "textforlight" : "textfordark"}>
      {isLogged ? (
        <Text>User Logged</Text>
      ) : (
        <Flex>
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin} disabled={loading}>
            <Text>
              {loading ? (
                "Loading..."
              ) : "Login"}
            </Text> 
          </Button>
        </Flex>
      )}
    </Flex>
  );
}
