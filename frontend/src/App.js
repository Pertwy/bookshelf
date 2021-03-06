import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios"

import HomePage from "./pages/HomePage"
import Profile from "./pages/Profile"
import AddList from "./pages/AddList"
import ViewBook from "./idPages/ViewBook"
import User from "./idPages/User"
import SearchResults from "./pages/SearchResults"
import Footer from './components/Footer';
import FollowingBookshelves from './pages/FollowingBookshelves';
import LogInSignIn from './pages/LogInSignIn';
import Members from "./pages/Members"
import Navbar from "./components/Navbar"
import ViewList from './idPages/ViewList';

axios.defaults.withCredentials = true

function App() {

  return (
    <Router>

      <div>
        <Navbar />
      </div>

      <div className={"mainer-container"}>
        <div className={"main-container"}>
          <br/>
            <Route path="/" exact component={HomePage} />
            <Route path="/lists" component={AddList} />
            <Route path="/profile" component={Profile} />
            <Route path="/book/:id" component={ViewBook} />
            <Route path="/list/:id" component={ViewList} />
            <Route path="/user/:id" component={User} />
            <Route path="/followingBookshelves" component={FollowingBookshelves} />
            <Route path="/signup" component={LogInSignIn} />
            <Route path="/members" component={Members} />


            {/* <Route path="/searchresults/" component={SearchResults} /> */}
            <Route
            path="/searchresults/:name"
            render={props => <SearchResults {...props} />}
          />
        </div>
      </div>


      <div>
        <Footer/>
      </div>



      
    </Router>
  );
}

export default App;
