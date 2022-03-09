import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

// import { getReviews } from "../../store/reviews";


function ReviewsTestPage() {
    const dispatch = useDispatch();



    // const reviews = useEffect( async () => {
    //     await dispatch(getReviews())
    // }, [dispatch])

    return (
        <div>
            <h1>hi</h1>

        </div>
    )
}

export default ReviewsTestPage;
