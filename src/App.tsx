import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import Index from "./pages/Index";
//import NotFound from "./pages/NotFound";
//import JewelleryCategory from "./pages/JewelleryCategory";
//import GemCategory from "./pages/GemCategory";
//import ProductDetail from "./pages/ProductDetail";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
//import BranchManagement from "./pages/admin/BranchManagement";
//import ProductManagement from "./pages/admin/ProductManagement";
//import CategoryManagement from "./pages/admin/CategoryManagement";
//import MetalManagement from "./pages/admin/MetalManagement";
//import ServiceRequests from "./pages/admin/ServiceRequests";
//import UserManagement from "./pages/admin/UserManagement";
//import ReviewManagement from "./pages/admin/ReviewManagement";
//import GemManagement from "./pages/admin/GemManagement";
=======
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
>>>>>>> master

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<Index />} />
          <Route path="/jewellery/:category" element={<JewelleryCategory />} />
          <Route path="/gems" element={<GemCategory />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="branches" element={<BranchManagement />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="categories" element={<CategoryManagement />} />
            <Route path="metals" element={<MetalManagement />} />
            <Route path="requests" element={<ServiceRequests />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="reviews" element={<ReviewManagement />} />
            <Route path="gems" element={<GemManagement />} />
          </Route>
          <Route path="*" element={<NotFound />} />
=======
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/register" element={<UserRegister/>}/>
>>>>>>> master
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
