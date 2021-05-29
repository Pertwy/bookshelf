import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState, useEffect} from 'react';
import 'react-notifications-component/dist/theme.css'
import UserSearch from "../components/UserSearch";


export default function Members() {

  return (
    <div className="container">
        <div className="container center-all">

          <UserSearch/>
          
        </div>
      </div>
  );
}

