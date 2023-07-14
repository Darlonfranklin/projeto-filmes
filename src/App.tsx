import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoutesApp from "./routes";

function App() {
  return (
    <>
      <div className="App">
        <RoutesApp />
        <ToastContainer autoClose={3000} />
      </div>
    </>
  );
}

export default App;
