import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState, useEffect} from 'react';


export default function UserDropDown(props) {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState("")

  useEffect(() => {
    axios.get('http://localhost:5000/testusers/')
      .then(response => 
          {setUsers(response.data)})
      //.then(console.log(users))
      .catch((error) => {
        console.log(error);
      })
  },[])


  function handleChange(target){
    props.setEmail(target)
    setUser(target)
  }

 
  return (
    <div>
        <label>Choose a user</label>
        <select 
            required
            className="form-control"
            value={user}
            onChange={(({target}) => 
                    handleChange(target.value))}>
            {
            users.map((user) => {
                return( 
                <option 
                
                    value={user.email}>{user.email}
                </option>);
            })
            }
        </select>
    </div>
  );
}