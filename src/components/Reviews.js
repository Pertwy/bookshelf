import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-alice-carousel/lib/alice-carousel.css"


//Feed me your lists aand i'll show them for you
export default function Reviews(props) {

    function Reviews(input){
        return (input.reviews.map(review => {
          return(
            <div className="pb-2">
                <h6 className="all-text review-name">{review.book.title}</h6>
                <p className="all-text review-text">{review.review}</p>
                {review.rating &&(
                    <p className="all-text review-text"> -- {review.rating} Stars --</p>
                )}
            </div>
            )
        }))
    }


  return (
    <div className="col-sm-12">
        <div className="full-width mt-2">
            <Reviews reviews={props.userData.reviews}/>
            {/* {console.log(props.userData.reviews)} */}
        </div>
    </div>   
  );


}