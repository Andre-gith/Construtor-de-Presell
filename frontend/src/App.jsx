import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreatePresell from "./pages/CreatePresell";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<CreatePresell />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;