import React from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css"


export default function Footer() {

    return (
        <div class="container-fluid pb-0 mb-0 pt-3 footer-backgroud">
     <footer>
         <div class="row  justify-content-center py-3">
             <div class="col-11">
                 <div class="row ">
                     
                     <div class="col-xl-8 col-md-4 col-sm-4 col-12 mx-auto a">
                         <h3 class="text-muted mb-md-0 mb-3 bold-text">Bookshelf.</h3>
                         <h6 class="mt-5 text-muted bold-text"><b>JOHN PERKINS</b></h6><small className={"all-text"}> johnpatrickperkins@gmail.com</small>
                     </div>

                     <div class="col-xl-2 col-md-4 col-sm-4 col-12">
                         <h6 class="mb-3 mb-lg-4 bold-text "><b>MENU</b></h6>
                         <ul class="list-unstyled">
                            <li>
                                <Link to="/" className="footer-link">Home</Link>
                            </li>

                            <li className="navbar-item">
                                <Link to="/test" className="footer-link" >Sign In/Up</Link>
                            </li>
        
                            <li className="navbar-item ">
                                <Link to="/profile" className="footer-link">Profile</Link>
                            </li>
                         </ul>
                     </div>

                     {/* <div class="col-xl-2 col-md-4 col-sm-4 col-12">
                        <h6 class="mt-55 mt-2 text-muted bold-text"><b>JOHN PERKINS</b></h6><small> <span><i class="fa fa-envelope" aria-hidden="true"></i></span> johnpatrickperkins@gmail.com</small>
                     </div> */}
                 </div>
             </div>
         </div>
     </footer>
 </div>
    );

}