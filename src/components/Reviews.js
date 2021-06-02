import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-alice-carousel/lib/alice-carousel.css"
import { Link } from 'react-router-dom';


//Feed me your lists aand i'll show them for you
export default function Reviews(props) {

    function Reviews(input){
        return (input.reviews.map(review => {
          return(

            <div className="row mb-2">
            `  <div>
                <img className="mr-2 review-image" src={review.book.image} alt={review.book.title}/>
              </div>

              <div className="pb-2">
                
                  <Link to={"/book/"+review.book._id}>
                    <h6 className="all-text review-name">{review.book.title}</h6>
                  </Link> 
                  
                  <p className="all-text review-text">{review.review}</p>
                  {review.rating > 0 &&(
                      <p className="all-text review-text"> -- {review.rating} Stars --</p>
                  )}
              </div>`
            </div>
            )
        }))
    }


  return (
    <div className="col-sm-12">
        <div className="full-width mt-2">
            <Reviews reviews={props.userData.reviews}/>
        </div>
    </div>   
  );


}