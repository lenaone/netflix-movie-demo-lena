import React, { useState } from "react";
import "./ReviwBox.style.css";

const ReviewBox = ({ reviews }) => {
  const [toggle, setToggle] = useState(false);

  const toggleExpand = (id) => {
   return toggle === id ? setToggle(false) : setToggle(id);
  };

  const noReview = !Array.isArray(reviews) || reviews.length === 0;

  if (noReview) {
    return <p>0 reviews for this movie</p>;
  }

  return (
    <div>
      {Array.isArray(reviews) && reviews.map((review) => 
        <div className="review-box" key={review.id}>
          <h5 className="fw-bold">{review.author}</h5>
          <p className={"text-box " + (toggle === review.id ? "expand" : "fold")}>
            {review.content.length > 400 && toggle !== review.id
              ? `${review.content.slice(0, 400)}...`
              : review.content}
          </p>
          { review.content.length > 400 && (
            <button className="more-button" onClick={() => toggleExpand(review.id)}>
             {toggle === review.id ? "접기" : "더보기"}
          </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewBox;
