import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar"
import CreateGoal from "./components/CreateGoal"
import CreateDiaryEntry from "./components/CreateDiaryEntry"
import EntryList from "./components/EntryList"
import GoogleAPISearch from "./components/GoogleAPISearch"

function App() {
  return (
    <Router>
      <div >
        <Navbar />
      </div>
      
      <div className="container">
      <br/>
        <Route path="/" exact component={EntryList} />
        <Route path="/creategoal" component={CreateGoal} />
        <Route path="/creatediary" component={CreateDiaryEntry} />
        <Route path="/booksearch" component={GoogleAPISearch} />
      </div>
    </Router>
  );
}

export default App;
