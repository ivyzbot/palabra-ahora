import {
  Routes,
  Route,
  useNavigate,
  // Navigate,
  // Link,
  // useParams,
} from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import LearnPage from "./pages/LearnPage";
import ReviewPage from "./pages/ReviewPage";
import TestPage from "./pages/TestPage";

//test
import { refreshDB } from "./functions/updateDB.js";
// import { updateAirTableWords } from "./functions/apiCalls.js";

function App() {
  refreshDB();
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
