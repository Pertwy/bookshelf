import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';


export default function UserSearch() {
  const [users, setUsers] = useState([])
  const [usersSearched, setUsersSearched] = useState([])

  
  useEffect(() => {
    axios.get('/api/users/all')
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

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(0),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }));

  const classes = useStyles();





  function UserList(){
    return(
      usersSearched.slice(0, 30).map((user) =>{
      //usersSearched.map((user) =>{
      return(
        <>     

          <div className="member-card">
        
              <div className="member-card-photo">
                <Avatar className={classes.large} id={user._id} alt={user.userName} src={user.photo} />
              </div>


              <div className="member-card-info">
                <Link to={"/user/"+user._id} >
                  <h4 className="member-card-text-username">{user.userName}</h4>
                </Link>
                <h5 className="member-card-text">{user.givenName} {user.surname}</h5>
                <p className="member-card-text">{user.reviews.length} reviews</p>
              </div>

          </div>
          
          {/* <tr>
            <td className="pl-5 all-text">X</td>
            
            <td className="pl-5 all-text">{user.favorites.length}</td>
            <td className="pl-5 all-text">{user.books.length}</td>
            <td className="pl-5 all-text">{user.reviews.length}</td>

          </tr> */}
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

        <h4 className="all-text members-title-text">Book Lovers, Critics, and Friends - Find Bookshelf members </h4>


        <input onChange={({ target }) => handleFilter(target.value)} label="Search" placeholder="Search Members" />
        <div className="member-row">
          <UserList/>
        </div>
      </>

        
    </div>
  );
}