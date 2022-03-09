import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux"
import {editReview, getOneReview} from '../../store/reviews';

function ReviewsEditPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const {reviewId} = useParams();
    const review = useSelector(state => state.reviews[reviewId])
    const [review_body, setReview] = useState(review.review_body);

    const updateReview = (e) => setReview(e.target.value)

    useEffect(() => {
        dispatch(getOneReview(reviewId))
    }, [dispatch, reviewId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedReview = {
            ...review,
            review_body

        };


    dispatch(editReview(updatedReview));

    let placeId = review.placeId
    history.push(`/places/${placeId}`)

      };


    return (
    <div>
        <form className="createForm" onSubmit={handleSubmit}>
        <label>
        Second thoughts?
        <input
          type="text"
          value={review_body}
          onChange={updateReview}
          required
        />
      </label>
      <button type="submit">Add</button>
      </form>
      <h2>No thoughts?</h2>
      <button></button>
    </div>
    )
}
export default ReviewsEditPage;
