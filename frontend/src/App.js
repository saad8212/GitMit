import "./App.css";
import Navbar from "./components/layout/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import NoPage from "./components/pages/NoPage";   
import PrivateComponent from "./components/privateComponent"; 
import CreatePhone from "./components/pages/form/CreatePhonebook";
import PhoneBook from "./components/pages/PhoneBook";
import Signup from "./components/pages/form/Signup";
import Login from './components/pages/form/Login';
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>

          <Route element={<PrivateComponent />}>
            <Route path="/create-directory" element={<CreatePhone/>} />
            <Route path="/" element={<PhoneBook/> } />
            <Route path="*" element={<NoPage />} />
          </Route>
          {/* Logged out user */}
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </BrowserRouter> 
    </>
  );
}

export default App;
