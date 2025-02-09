import { Provider } from "@/components/ui/provider"
import { useState, useContext, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import { Box, Flex } from '@chakra-ui/react'
import { Toaster, toaster } from "@/components/ui/toaster"
import { ThemeContext } from "./components/context/ThemeContext"; 
import ThemeComponent from "./components/ThemeComponent"
import { AuthProvider } from './components/context/AuthContext';
import LoginPassword from './components/componentsApi/LoginPassword'
import AllDatabases from './components/componentsApi/AllDatabases'
import MenuComponent from "./components/MenuComponent"
import CreateTable from "./components/componentsApi/CreateTable"


function App() {
  const { lightMode } = useContext(ThemeContext);
  // Current component
  const [currentComponent, setCurrentComponent] = useState(null); 

  // Theme selection
  useEffect(() => {
    if (lightMode) {
        document.documentElement.classList.add("light");
    } else {
        document.documentElement.classList.remove("light");
    }
  }, [lightMode]);

  // Show component when a Menu is clicked
  const handleMenuClick = (component) => {
    setCurrentComponent(component);
  };

  return (
    <Provider>
      <Toaster />
      <AuthProvider>
        <Box
          bgImage= {lightMode ? "url(/images/bglights3.png)" : "url(/images/bg.jpg)" } // image
          bgSize="cover" // Cover all area
          bgPosition="center" // Center image
          bgRepeat="no-repeat" // No repetition
          bgAttachment="fixed" // Fix image
          minHeight="100vh" // Min height equal to viewport
          width="100%" // Width 100%
          position="relative" // Relative position
          >
          {/* Upper Right with Login bar */}
          <Flex justify="flex-end">
            <LoginPassword />
            <ThemeComponent />
          </Flex>
            
          {/* Menu */}
          <MenuComponent onMenuClick={handleMenuClick} />

          {/* Componente corrente */}
          {currentComponent === "CreateTable" && <CreateTable onClose={() => setCurrentComponent(null)} />}
          {currentComponent === "Read" && <AllDatabases />}
          {currentComponent === "Update" && <UpdateDatabase />}
          {currentComponent === "Delete" && <DeleteDatabase />}
        </Box>
      </AuthProvider>
    </Provider>
  )
}

export default App
