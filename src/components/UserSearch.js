import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

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
          
          <tr>
            <td className="all-text">X</td>
            <Link to={"/user/"+user._id} className="">
              <td className="all-text">{user.userName}</td>
            </Link>
            <td className="all-text">{user.favorites.length}</td>
            <td className="all-text">{user.books.length}</td>
            <td className="all-text"><button>+</button></td>
          </tr>
        </>
      )
    }))
  }


  function handleFilter(input){
    console.log(input)

    let test = users.filter(function(value){
      return value.userName.toLowerCase().includes(input.toLowerCase())
    })

    setUsersSearched(test)
  }


 
  return (
    <div>

      <>
        <h5 className="all-text">Peoples</h5>
        <input onChange={({ target }) => handleFilter(target.value)} label="Search" placeholder="Search User" />
      </>

      <table >
            <tr>
              <th className="all-text">Photo</th>
              <th className="all-text">User Name</th>
              <th className="all-text">Bookshelf</th>
              <th className="all-text">Read</th>
              <th className="all-text">Add</th>
            </tr>
            <UserList/>
      </table>

  
    </div>
  );
}