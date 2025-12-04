import "./App.css";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
// import About from "./components/About";

function App() {
  return (
    <>
      <Navbar title="TextUtils" />
      <div className="container  my-5">
        {/* <About /> */}
        <TextForm heading="Enter your text to analyze below:" />
      </div>
    </>
  );
}

export default App;
