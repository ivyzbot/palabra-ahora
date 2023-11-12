import {
  Routes,
  Route,
  // Link,
  // useParams,
  // Navigate,
  // useNavigate
} from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import LearnPage from "./components/LearnPage";
import ReviewPage from "./components/ReviewPage";
import TestPage from "./components/TestPage";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </>
  );
}

export default App;
