import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme/theme';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Home } from './pages/Home';
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Service } from "./pages/Service";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";
import { Error } from "./pages/Error";
import { Logout } from "./pages/Logout";
import { AdminLayout } from "./components/layouts/Admin-Layout";
import { AdminUsers } from "./pages/Admin-Users";
import { AdminContacts } from "./pages/Admin-Contacts";
import { AdminUpdate } from "./pages/Admin-Update";
import { ForgotPassword } from "./pages/forgot-password";
import { ResetPassword } from "./pages/ResetPassword";
import { AdminHome } from './pages/Admin-Home';
import { AdminServices } from "./pages/Admin-Services";
import { AdminServicesUpdate } from './pages/Admin-Service-Update';


const App = () => {
  return (
  <>
    <ThemeProvider theme={theme}>
    <BrowserRouter>
    <Navbar />
      <Routes>
         <Route path="/" element={<Home />}  />
         <Route path="/about" element={<About />}  />
         <Route path="/contact" element={<Contact />}  />
         <Route path="/service" element={<Service />}  />
         <Route path="/register" element={<Register />}  />
         <Route path="/login" element={<Login />}  />
         <Route path="/logout" element={<Logout />} />
         <Route path="*" element={<Error />} />
         <Route path="/forgot-password" element={<ForgotPassword />} />
         <Route path="/reset-password/:token" element={<ResetPassword />} /> {/* Add this route */}
         {/* Nested Routes for Admin */}
         <Route path="/admin" element={<AdminLayout />} >
          <Route path="users" element={<AdminUsers />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="users/:id/edit" element={<AdminUpdate />} />
          <Route path="admin-home" element={<AdminHome />} />
          <Route path="admin-services" element={<AdminServices />} />
          <Route path="admin-services/:id/edit" element={<AdminServicesUpdate />} />
          </Route>

      </Routes>
    
      </BrowserRouter>
    </ThemeProvider>
  </>
)};

export default App;