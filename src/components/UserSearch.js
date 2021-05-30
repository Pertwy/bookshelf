import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

export default function UserSearch() {
  const [users, setUsers] = useState([])
  const [usersSearched, setUsersSearched] = useState([])

  
  useEffect(() => {
    axios.get('http://localhost:5000/api/users/all')
      .then(response => 
          {setAllData(response.data)})
      .catch((error) => {
        console.log(error);
      })
  },[])


  function setAllData(response){
    
    setUsersSearched(response)
    setUsers(response)
  }


  function UserList(){
    return(
      usersSearched.slice(0, 30).map((user) =>{
      //usersSearched.map((user) =>{
      return(
        <>     
          
          <tr>
            <td className="pl-5 all-text">X</td>
            <Link to={"/user/"+user._id} className="">
              <td className="pl-5 all-text">{user.userName}</td>
            </Link>
            <td className="pl-5 all-text">{user.givenName} {user.surname}</td>
            <td className="pl-5 all-text">{user.favorites.length}</td>
            <td className="pl-5 all-text">{user.books.length}</td>
            <td className="pl-5 all-text">{user.reviews.length}</td>

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

    //setUsers(test)
    setUsersSearched(test)
  }


 
  return (
    <div >

      <>
        <h5 className="all-text">Search Members</h5>
        <input onChange={({ target }) => handleFilter(target.value)} label="Search" placeholder="Search Members" />
        <div>
          <table className="member-table">
              <tr>
                <th className="pl-5 all-text">Photo</th>
                <th className="pl-5 all-text">User Name</th>
                <th className="pl-5 all-text">Name</th>
                <th className="pl-5 all-text">Bookshelf</th>
                <th className="pl-5 all-text">Read</th>
                <th className="pl-5 all-text">Reviews</th>
              </tr>
              <UserList/>
          </table>
        </div>
      </>

      

  
    </div>
  );
}