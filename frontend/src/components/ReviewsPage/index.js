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
    const [errors, setErrors] = useState(['nada'])


    const handleSubmit = async (e) => {
        e.preventDefault();

        const newReview = {
            userId,
            placeId,
            review_body

        };


   const createdReview = dispatch(createReview(newReview))
    .catch(async (response) => {
      const data = await response.json();
      if (data && data.errors) {
        if (data.errors)
        setErrors(data.errors);
      }});

    if (newReview.review_body) {
      console.log(newReview)
      history.push(`/places/${placeId}`)
    }

      };

    return (
    <div>
      {errors && !(errors[0] === 'nada') && (
          <ul>
          {errors?.map((error) => (
            <li>{error}</li>
          ))}
          </ul>
        )}
        <form className="createForm" onSubmit={handleSubmit}>
        <label>
        What did you think?
        <input
          type="text"
          value={review_body}
          onChange={(e) => setReview(e.target.value)}
        />
      </label>
      <button type="submit">Add</button>
      </form>
    </div>
    )
}

export default ReviewsPage;
