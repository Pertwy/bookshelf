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
                     
                     <div class="col-xl-6 col-md-6 col-sm-6 col-12 mx-auto a">
                         <h3 class="text-muted mb-md-0 mb-3 bold-text">Bookshelf</h3>
                     </div>

                     <div class="col-xl-6 col-md-6 col-sm-6 col-12 mx-auto a mb-3">
                         <h6 class="  text-muted bold-text"><b>BY JOHN PERKINS</b></h6><small className={"all-text"}> johnpatrickperkins@gmail.com</small>
                     </div>

                 </div>
             </div>
         </div>
     </footer>
 </div>
    );

}