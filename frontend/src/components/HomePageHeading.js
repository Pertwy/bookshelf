import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import "../index.css"


export default function HomePageHeading(props) {

  return (
    <div className={"py-4 home-page-heading-div"}>

    <div className={""}>
      <h2 className={"all-text home-page-heading"}>The social network for book lovers</h2>
      <div className={"col"}>
        <p className={"all-text home-page-bullets"}>View what's on your friends bookshelves</p>
        <p className={"all-text home-page-bullets"}>Track books you've read</p>
        <p className={"all-text home-page-bullets"}>Save the books you haven't got around to reading</p>
        <p className={"all-text home-page-bullets"}>Let friends know what's good</p>
      </div>
    </div>
  </div>
  );
}
