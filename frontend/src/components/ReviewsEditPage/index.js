import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from "react-redux";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { useSelector } from "react-redux"
import {editReview, getOneReview, deleteReview} from '../../store/reviews';


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

    let placeId = review.placeId

    const removeReview = async (e) => {
        await dispatch(deleteReview(placeId));

    }

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
      <p>No thoughts?</p>
      <button onClick={removeReview}>
          <NavLink style={{textDecoration: 'none'}} to={`/places/${placeId}`}><FontAwesomeIcon icon={faTrashCan} /></NavLink>
      </button>
    </div>
    )
}
export default ReviewsEditPage;
