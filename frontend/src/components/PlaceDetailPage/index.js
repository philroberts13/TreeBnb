import React, { useEffect } from "react";
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getPlaceById, deletePlace } from "../../store/places";
import { useHistory } from "react-router-dom";
// import { getReviews } from "../../store/places";
import "./Detail.css";
import { getReivewsOfPlace } from "../../store/reviews";


function PlaceDetailPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { placeId } = useParams();
    const user = useSelector((state) => state.session.user);
    const place = useSelector(state => (state.places[placeId]));
    const sessionUser = useSelector(state => state.session.user);
    const reviews = useSelector(state => {
        return (state.reviews)
    });

    useEffect(() => {
        dispatch(getPlaceById(placeId))
        dispatch(getReivewsOfPlace(placeId))
    }, [dispatch, placeId]);

    const removePlace = async (e) => {
        await dispatch(deletePlace(placeId));

    }

    let hostLinks;

    if (sessionUser?.id === place?.userId) {
      hostLinks = (
        <>
        <button onClick={removePlace}><NavLink style={{textDecoration: 'none'}} to="/places">Delete</NavLink></button>
        <button><NavLink style={{textDecoration: 'none'}} to={`/places/edit/${placeId}`}>Edit</NavLink></button>
        </>
      );
    }

    let userLink;
    if (sessionUser.id) {
        userLink = (
        <h2>Reviews<button><NavLink style={{textDecoration: 'none'}} to={`/reviews/${placeId}`}>+</NavLink></button></h2>
        )
    }


       let reviewList = Object.values(reviews)?.map(review => (
        <li key={review.id}>

        {review.review_body}
        {console.log(review.userId, "review")}
        {(sessionUser.id === review.userId)&& <button ><NavLink style={{textDecoration: 'none'}} to={`/reviews/edit/${review.id}`}><FontAwesomeIcon icon={faPen} /></NavLink></button>}
        </li>
        ))
        console.log(sessionUser.id, "session")
    return (
        <div >
            <h1 className="name">{place?.name}</h1>
            <div className="placeCard">
            <div className="image">
            <img src={place?.imageUrl} alt="" />
            </div>
            <div className="details">
            <ul>{place?.address}</ul>
            <ul>
            {place?.city}, {place?.state}
            </ul>
            <ul>Per Night:  ${place?.price}</ul>
            </div>
            </div>
            {hostLinks}
            {userLink}
            {reviewList}



        </div>
    )
}

export default PlaceDetailPage;


{/* <button onClick={removeReview(review.id)}>Delete</button> */}
// <button onClick={removePlace}>Delete</button>



            // <NavLink to={`/reviews/places/${place.id}`}>
            // <button>Review</button>
            // </NavLink>

// const reviews = useSelector(state => {
    //     return Object.values(state.reviews)
    // })


    // useEffect(() => {
    //     dispatch(getReviews())
    //   }, [dispatch]);

    //   useEffect(() => {
    //     dispatch(getPlaceById(placeId))
    //   }, [placeId, dispatch]);
    // place.Review.map()
