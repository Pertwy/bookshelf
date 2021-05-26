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


      <div className="col-sm-12">

      <div className="">
        {props.owner &&(
          <>
        <div className="row">
          <div className="col-sm-6">
            <Link to={"/members"}>
              <div>
                Find members to follow
              </div>
            </Link>
          </div>
          
        </div></>)}


        <div className="full-width mt-2">
          <p className="all-text avatar-heading">FOLLOWING</p>
          <div>
          <AvatarGroup className=" pb-2">
            <FollowingList following={props.userData.following}/>
          </AvatarGroup>
          </div>
        </div>

        <div>
          <p className="all-text avatar-heading mt-3">FOLLOWERS</p>
          <AvatarGroup className=" pb-2">
            <FollowingList following={props.userData.followers}/>
          </AvatarGroup>
        </div>

      </div>
        
      </div>

      </div>
  );
}