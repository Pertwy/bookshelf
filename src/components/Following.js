import React, {useState} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import UserDropDown from "../components/UserDropDown"
import "react-alice-carousel/lib/alice-carousel.css"
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { makeStyles } from '@material-ui/core/styles';


//Feed me your lists aand i'll show them for you
export default function Following(props) {
    const [currentUser, setCurrentUser] = useState("john@gmail.com")
    const [follow, setFollow] = useState("")


    function handleFollow(){
        let info = {"currentUser":currentUser, "follow":follow}
        axios.post('http://localhost:5000/api/users/follow',info)
          .then(response => console.log(response))
    }
  
  
    const useStyles = makeStyles((theme) => ({
      root: {
        display: 'flex',
        '& > *': {
          margin: theme.spacing(1),
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
  


    function FollowingList(input) {
      return (input.following.map(person => {
  
        return (  
          <Avatar className={classes.small} id={person._id} alt={person.name} src={person.photo} />
        )
      })
    )}
   



  return (

    <div className="row">
      <div className="col-sm-12 col-md-4">
        
          <div >
            <div className="row space-between book-row-div">
              <h3 className="book-row-title" >FOLLOWING</h3>
              <h6>VIEW ALL</h6>
            </div>

            <div>
              <AvatarGroup className="pt-2 pb-2">
                <FollowingList following={props.userData.following}/>
              </AvatarGroup>
            </div>
          </div>

          <div >
            <h4>Follow another user</h4>
            <UserDropDown setEmail={setFollow}/>
            <button onClick={() => handleFollow()}>Follow</button>
          </div>


      </div>
      </div>
  );
}