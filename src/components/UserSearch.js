import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState, useEffect} from 'react';


export default function UserSearch() {
  const [users, setUsers] = useState([])
  const [usersSearched, setUsersSearched] = useState([])



  const [user, setUser] = useState("")
  const [search, setSearch] = useState("")

  useEffect(() => {
    axios.get('http://localhost:5000/api/users/all')
      .then(response => 
          {setUsers(response.data)})
      .catch((error) => {
        console.log(error);
      })
  },[])


  function UserList(){
    return(
      usersSearched.map((user) =>{
      return(
        <>
          <p className="all-text">{user.userName}</p>
        </>
      )
    }))
  }

  function handleFilter(input){
    console.log(input)

    let test = users.filter(function(value){
      return value.userName.includes(input)
    })

    setUsersSearched(test)
  }


 
  return (
    <div>

      <>
        <h5 className="all-text">Peoples</h5>
        <input onChange={({ target }) => handleFilter(target.value)} label="Search" placeholder="Search User" />
      </>

      <UserList/>

    </div>
  );
}