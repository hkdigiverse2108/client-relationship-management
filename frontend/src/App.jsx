// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'

// function App() {
//   return (
//     <div className="App">
//       <h1>Hello World!</h1>
//     </div>
//   );
// }

// export default App


import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { SidebarProvider } from "@/context/SidebarContext";
import AppRouter from "@/router/AppRouter";
export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SidebarProvider>
          <BrowserRouter>
            <AppRouter />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3500,
                style: {
                  borderRadius: "10px",
                  background: "var(--color-surface)",
                  color: "var(--color-text)",
                  border: "1px solid var(--color-border)",
                  boxShadow: "var(--shadow-md)",
                },
              }}
            />
          </BrowserRouter>
        </SidebarProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
