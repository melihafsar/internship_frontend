// import './App.css'
import { RouterProvider } from "react-router-dom";
import { router } from './routes';

import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from './components/mode-toggle';
 
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <ModeToggle />
    </ThemeProvider>
  )
}
 
export default App