import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios"

import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import Adduser from "./pages/Adduser"
import AddBook from "./pages/AddBook"
import Profile from "./pages/Profile"
import AddList from "./pages/AddList"
import ViewBook from "./idPages/ViewBook"
import User from "./idPages/User"
import SearchResults from "./pages/SearchResults"
import AllLists from './idPages/AllLists';
// import FireAuth from "./components/fireAuth"
import Nav2 from "./components/Nav2"

axios.defaults.withCredentials = true

function App() {
  return (
    <Router>
      {/* <div >
        <Navbar />
      </div> */}

      <div >
        <Nav2 />
      </div>

      <div style={{backgroundColor: "#2f3031"}}>
      <br/>
        <Route path="/" exact component={HomePage} />
        <Route path="/test" exact component={Adduser} />
        <Route path="/booksearch" component={AddBook} />
        <Route path="/lists" component={AddList} />
        <Route path="/profile" component={Profile} />
        <Route path="/book/:id" component={ViewBook} />
        <Route path="/user/:id" component={User} />
        <Route path="/alllists" component={AllLists} />

        {/* <Route path="/searchresults/" component={SearchResults} /> */}
        <Route
        path="/searchresults/:name"
        render={props => <SearchResults {...props} />}
      />
      </div>
    </Router>
  );
}

export default App;
