import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Provider } from "@/components/ui/provider"
import { useState, useContext, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import { Box, Flex } from '@chakra-ui/react'
import { Toaster, toaster } from "@/components/ui/toaster"
import { AuthProvider } from './components/context/AuthContext';
import LoginForm from './components/componentsApi/Login'
// import AllTables from './components/componentsApi/AllTables'
import YourTables from './components/componentsApi/SelectYourTables'
import MenuComponent from "./components/MenuComponent"
import CreateTable from "./components/componentsApi/CreateTable"

function App() {
  // Current component
  const [currentComponent, setCurrentComponent] = useState(null); 

  // Show component when a Menu is clicked
  const handleMenuClick = (component) => {
    setCurrentComponent(component);
  };

  return (
    <Provider>
      <Analytics />
      <SpeedInsights />
      <Toaster />
      <AuthProvider>
        <Box
          bgImage= {"url(/images/bg1.png)"} // image
          bgSize="cover" // Cover all area
          bgPosition="center" // Center image
          bgRepeat="no-repeat" // No repetition
          bgAttachment="fixed" // Fix image
          minHeight="100vh" // Min height equal to viewport
          width="100%" // Width 100%
          position="relative" // Relative position
          backgroundColor= "rgba(255, 255, 255, 0.7)" // Set opacity
          backgroundBlendMode= "overlay" // Mix colors
          >
          {/* Upper Right with Login bar */}
          <Flex justify="flex-end">
            <LoginForm />
          </Flex>
            
          {/* Menu */}
          <MenuComponent onMenuClick={handleMenuClick} />

          {/* Componente corrente */}
          {currentComponent === "CreateTable" && <CreateTable onClose={() => setCurrentComponent(null)} />}
          {currentComponent === "ShowTable" && <YourTables />}
        </Box>
      </AuthProvider>
    </Provider>
  )
}

export default App
