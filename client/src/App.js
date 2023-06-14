import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./Layout/Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import "./styles/app.css"
import CreatePage from "./pages/CreatePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreatePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
