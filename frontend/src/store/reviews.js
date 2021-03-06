import { csrfFetch } from './csrf';

const LOAD_REVIEWS_PLACE = 'reviews/LOAD_REVIEWS_PLACE'
const ADD_REVIEW = 'reviews/ADD_REVIEW'
const LOAD_ONE_REVIEW = 'reviews/LOAD_ONE_REVIEW'
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW'
const REMOVE_REVIEW = 'reviews/DELETE_REVIEW'

export const loadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS_PLACE,
        reviews
    }
};

export const addReview = (review) => ({
    type: ADD_REVIEW,
    review
});

export const loadOneReview = (review) => ({
    type: LOAD_ONE_REVIEW,
    review
});

export const updateReview = (review) => ({
    type: UPDATE_REVIEW,
    review
});

export const removeReview = (reviewId) => ({
    type: REMOVE_REVIEW,
    reviewId
})

// export const getReviews = () => async dispatch => {
//     const response = await fetch(`/api/places/:placeId`);

//     if(response.ok) {
//         const reviews = await response.json();
//         dispatch(loadAllReviews(reviews));
//     }
// }

export const createReview = (payload) => async dispatch => {
    const response = await csrfFetch('/api/reviews/:placeId', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })
    if(response.ok){
        const newReview = await response.json()
        dispatch(addReview(newReview))
        return newReview
    }
    return response
}

export const getReivewsOfPlace = (placeId) => async (dispatch, getState) => {
    const res = await fetch(`/api/reviews/${placeId}`);
    if (res.ok) {
        const placeReviews = await res.json();
        return dispatch(loadReviews(placeReviews))
    }
}

export const getOneReview = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/edit/${reviewId}`);
    if(response.ok) {
        let review = await response.json();

        dispatch(loadOneReview(review));
    }
    return response;
}

export const editReview = (review) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/edit/${review.id}`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(review)
    })
    if(response.ok) {
        const updatedReview = await response.json()
        dispatch(updateReview(updatedReview))
        return updatedReview;
    }
    return response;
}

export const deleteReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/edit/${reviewId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })
    if (response.ok) {
        const deletedReview = await response.json();
        await dispatch(removeReview(reviewId))
        return deletedReview
    }
};

const initialState = {}


const reviewsReducer = (state = initialState, action) => {
    let newState;

    switch(action.type) {

        case LOAD_REVIEWS_PLACE:
            newState = {...state}
            let placeReviews = {};
            action.reviews.forEach(review => {
                placeReviews[review.id] = review;
            });
            return placeReviews;

        case ADD_REVIEW:
                newState = {
                ...state,
                [action.review.id]: action.review
                }
                return newState;

        case LOAD_ONE_REVIEW:
            newState = {...state}
            newState[action.review.id] = action.review;
            return newState;

        case REMOVE_REVIEW:{
            let newState = {...state};
            delete newState[action.reviewId];
            return newState;
            }


        default: return state;
        }
    }

    export default reviewsReducer;
