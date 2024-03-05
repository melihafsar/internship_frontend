import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "./context/AuthContext";
import Router from "./router";
import { Toaster } from "@/components/ui/toaster";
import { UtilProvider } from "./context/UtilContext";
import Loader from "./components/Loader";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <UtilProvider>
          <Loader />
          <Router />
          <Toaster />
        </UtilProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
