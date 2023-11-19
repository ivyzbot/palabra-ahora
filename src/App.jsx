import {
  Routes,
  Route,
  useNavigate,
  // Navigate,
  // useParams,
} from "react-router-dom";
import Navigation from "./components/Navigation";
import LearnPage from "./pages/LearnPage";
import ReviewPage from "./pages/ReviewPage";
import TestPage from "./pages/TestPage";

import "./App.css";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<LearnPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </>
  );
}

export default App;
