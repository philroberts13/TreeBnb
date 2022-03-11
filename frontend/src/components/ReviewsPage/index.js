import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux"
import {createReview} from '../../store/reviews';
// import './createPlace.css';


function ReviewsPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const {placeId} = useParams();
    const user = useSelector((state) => state.session.user);
    const userId = user.id

    const [review_body, setReview] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();

        const newReview = {
            userId,
            placeId,
            review_body

        };


    dispatch(createReview(newReview));


    history.push(`/places/${placeId}`)

    // await dispatch(getPlaceList(user?.id))

      };

    return (
    <div>
        <form className="createForm" onSubmit={handleSubmit}>
        <label>
        What did you think?
        <input
          type="text"
          value={review_body}
          onChange={(e) => setReview(e.target.value)}
          required
        />
      </label>
      <button type="submit">Add</button>
      </form>
    </div>
    )
}

export default ReviewsPage;
