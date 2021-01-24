import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar"
import EntryList from "./components/EntryList"
import EntryListTest from "./components/EntryListTest"
import GoogleAPISearch from "./components/GoogleAPISearch"
// import FireAuth from "./components/fireAuth"

function App() {
  return (
    <Router>
      <div >
        <Navbar />
      </div>

      <div className="container">
      <br/>
        <Route path="/" exact component={EntryList} />
        <Route path="/test" exact component={EntryListTest} />
        <Route path="/booksearch" component={GoogleAPISearch} />
        {/* <Route path="/auth" component={GoogleAPISearch} /> */}
      </div>
    </Router>
  );
}

export default App;
