import React, {useState} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import UserDropDown from "../components/UserDropDown"
import "react-alice-carousel/lib/alice-carousel.css"
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

//Feed me your lists aand i'll show them for you
export default function Following(props) {
    const [currentUser, setCurrentUser] = useState("john@gmail.com")
    const [follow, setFollow] = useState("")


    function handleFollow(){
        let info = {"currentUser":currentUser, "follow":follow}
        axios.post('http://localhost:5000/api/users/followDropDown',info)
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
          <div className="avatar-div">
            <Avatar className={classes.large} id={person._id} alt={person.name} src={person.photo} />
            {/* <p className="all-text avatar-name">{person.name}</p> */}
            <Link to={"/user/"+person._id} className="">
              <p className="all-text avatar-name">{person.userName}</p>
            </Link>
          </div>
        )
      })
    )}
   



  return (

    <div className="row">


      <div className="col-sm-6">
        <div>
          <p className="all-text avatar-heading">FOLLOWING</p>
          <AvatarGroup className=" pb-2">
            <FollowingList following={props.userData.following}/>
          </AvatarGroup>
        </div>

        <div>
          <p className="all-text avatar-heading">FOLLOWERS</p>
          <AvatarGroup className=" pb-2">
            <FollowingList following={props.userData.followers}/>
          </AvatarGroup>
        </div>
      </div>
          

      <div className="col-sm-6">
        
        <h4 className="all-text avatar-heading">FOLLOW ANOTHER USER</h4>
        
        <div className="row">

          <div className="col-sm-6">
            <UserDropDown setEmail={setFollow}/>
          </div>

          <div className="col-sm-6">
            <Button style={{
                        borderRadius: 5,
                        borderColor: "#a9aeb3",
                        backgroundColor: "#a9aeb3",
                        color: "black",
                        padding: "7px 7px",
                        fontSize: "16px"
                        }}
                    onClick={() => handleFollow()}>Follow</Button>
          </div>

        </div>
      </div>
         


      
      </div>
  );
}