import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getReviews } from "../../store/reviews";
// import { getReviews } from "../../store/reviews";


function ReviewsPage() {
    const dispatch = useDispatch();
    // const place = useSelector(state => (state.places[placeId]));


    const reviews = useSelector(state => {
        return Object.values(state.reviews);
      });

      console.log(reviews)

      useEffect(() => {
        dispatch(getReviews())
      }, [dispatch]);




      if(!reviews) return null;

    return (
        <div>
            <h1>Reviews</h1>
            <ul>
            </ul>
        </div>
    )
}

export default ReviewsPage;
