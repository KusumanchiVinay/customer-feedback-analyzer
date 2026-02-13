import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import FeedbackForm from "./pages/FeedbackForm";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/feedback" element={<FeedbackForm />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
