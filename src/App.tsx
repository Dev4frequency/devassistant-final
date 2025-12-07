import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import Index from "./pages/Index";
import EditorPage from "./pages/EditorPage";
import LearnPage from "./pages/LearnPage";
import ModulePage from "./pages/ModulePage";
import InteractiveExamplesPage from "./pages/InteractiveExamplesPage";
import AIAssistancePage from "./pages/AIAssistancePage";
import AntiCopyPastePage from "./pages/AntiCopyPastePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/editor" element={<EditorPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/learn/:moduleId" element={<ModulePage />} />
            <Route path="/interactive-examples" element={<InteractiveExamplesPage />} />
            <Route path="/ai-assistance" element={<AIAssistancePage />} />
            <Route path="/anti-copy-paste" element={<AntiCopyPastePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;