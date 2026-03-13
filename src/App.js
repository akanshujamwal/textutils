// import "./App.css";
// import Navbar from "./components/Navbar";
// import TextForm from "./components/TextForm";
// // import About from "./components/About";

// function App() {
//   return (
//     <>
//       <Navbar title="TextUtils" />
//       <div className="container  my-5">
//         {/* <About /> */}
//         <TextForm heading="Enter your text to analyze below:" />
//       </div>
//     </>
//   );
// }

// export default App;
import "./App.css";

import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import About from "./components/About";
import Footer from "./components/Footer";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar title="TextUtils" />

      <div className="container py-4">
        <Routes>
          <Route
            path="/"
            element={<TextForm heading="Enter your text to analyze below:" />}
          />

          <Route path="/about" element={<About />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
