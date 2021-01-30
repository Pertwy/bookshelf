import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import Adduser from "./pages/Adduser"
import AddBook from "./pages/AddBook"
// import FireAuth from "./components/fireAuth"

function App() {
  return (
    <Router>
      <div >
        <Navbar />
      </div>

      <div className="container">
      <br/>
        <Route path="/" exact component={HomePage} />
        <Route path="/test" exact component={Adduser} />
        <Route path="/booksearch" component={AddBook} />
      </div>
    </Router>
  );
}

export default App;
