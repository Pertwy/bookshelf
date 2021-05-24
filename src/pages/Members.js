import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState, useEffect} from 'react';
import UserDropDown from "../components/UserDropDown"
import 'react-notifications-component/dist/theme.css'
import UserSearch from "../components/UserSearch";


export default function Members() {

  const [currentUser, setCurrentUser] = useState("")

  return (
    <div className="container">
        <div className="container center-all">

          
          <UserDropDown setEmail={setCurrentUser}/>

          <div>
            <UserSearch/>
          </div>

        </div>
      </div>
  );
}

