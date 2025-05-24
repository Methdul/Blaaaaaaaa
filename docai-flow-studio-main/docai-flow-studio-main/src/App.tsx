
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

// Pages
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreatorDashboard from "./pages/CreatorDashboard";
import UserProfile from "./pages/UserProfile";
import Templates from "./pages/Templates";
import TemplateDetailPage from './pages/TemplateDetailPage';
import BecomeCreatorPage from './pages/BecomeCreatorPage'; // Import BecomeCreatorPage
import AiWriter from "./pages/AiWriter";
import ResumeBuilder from "./pages/ResumeBuilder";
import InvoiceBuilder from "./pages/InvoiceBuilder";
import LetterBuilder from "./pages/LetterBuilder";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/templates" element={<Templates />} /> {/* Templates can be public */}
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />

              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/creator-dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['creator']}>
                    <CreatorDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/ai-writer" 
                element={
                  <ProtectedRoute>
                    <AiWriter />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/resume-builder" 
                element={
                  <ProtectedRoute>
                    <ResumeBuilder />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/invoice-builder" 
                element={
                  <ProtectedRoute>
                    <InvoiceBuilder />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/letter-builder" 
                element={
                  <ProtectedRoute>
                    <LetterBuilder />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile"
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />
              <Route path="/templates/:templateId" element={<TemplateDetailPage />} />
              <Route 
                path="/become-creator"
                element={
                  <ProtectedRoute>
                    <BecomeCreatorPage />
                  </ProtectedRoute>
                }
              />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
