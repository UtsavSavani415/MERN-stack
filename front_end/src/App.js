import "./App.css";
import NavBar from "./components/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import PrivateComponent from "./components/PrivateComponent";


function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <Routes>

            <Route element={<PrivateComponent />} >
              <Route path="/" element={<h1>Products</h1>} />
              <Route path="/add" element={<h1>Add Products</h1>} />
              <Route path="/update" element={<h1>Update Products</h1>} />
              <Route path="/logout" element={<h1>Logged out</h1>} />
              <Route path="/profile" element={<h1>Profile</h1>} />
            </Route>

            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    </>
  );
}

export default App;
